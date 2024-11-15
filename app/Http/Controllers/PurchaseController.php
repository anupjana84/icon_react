<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Product;
use App\Models\Category;
use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Rules\SimilarInvoice;
use Illuminate\Validation\Rule;
use Illuminate\Pagination\LengthAwarePaginator;

class PurchaseController extends Controller
{
    private function generateBarcodeNumber($dateString, $companyId, $purchaseRate, $gstStatus)
{
    
    // Extract day, month, and year from the date
    $date = new \DateTime($dateString);
    $day = $date->format('d'); // e.g., "27"
    $month = $date->format('m'); // e.g., "09"
    $year = $date->format('Y'); // e.g., "2024"

    // Extract the first two letters of the company name
    $companyName = Company::find($companyId)->name; // e.g., "Incredible Company" (Note: Replace with actual company name)
    $companyInitials = strtoupper(substr($companyName, 0, 2)); // e.g., "IC"

    // Format the purchase rate as a 7-digit number by padding with zeros if necessary
    $rate = str_pad($purchaseRate, 7, '0', STR_PAD_LEFT); // e.g., "15000" becomes "0015000"
    $formattedRate = preg_replace_callback('/^0+/', function ($matches) {
        $length = strlen($matches[0]);
        $randomChars = '';
        for ($i = 0; $i < $length; $i++) {
            $randomChars .= chr(rand(65, 90)); // Replace each leading zero with a random uppercase letter (A-Z)
        }
        return $randomChars;
    }, $rate);

    // Determine GST status (GY for yes, GN for no)
    $gst = $gstStatus ? 'GY' : 'GN'; // e.g., "GY"

    // Concatenate all parts to form the barcode number
    return "{$day}{$companyInitials}{$formattedRate}{$month}{$year}{$gst}";
}
public function index()
{
    // Fetch and group the purchases
    $purchases = Purchase::with('products', 'company', 'products.category')
        ->orderBy('purchase_receive_date', 'desc')
        ->paginate(10);
    //    dd($purchases);
    // Return the paginated items to your Inertia view
    return Inertia::render('backend/purchase/Index', [
        'purchase' => $purchases,
    ]);
}
    public function create(){
        $category = Category::orderBy('name', 'asc')->get();
        $brands = Brand::orderBy('name', 'asc')->get();
        $company = Company::orderBy('name', 'asc')->get();

        // dd($company);
    //    return $category;
        return Inertia::render('backend/purchase/Create',[
            'category' => $category,
            'brands' => $brands,
            'company' => $company
        ]);
    }
    public function store(Request $request){
        // dd($request->all());
        $request->validate([
            'company' => 'required|exists:companies,id',
            'purchase_invoice_no' => [
                'required',
                'unique:purchases,purchase_invoice_no',
                'string',
                new SimilarInvoice($request->purchase_date),
            ],
            'purchase_date' => 'required|date',
            'purchase_receive_date' => 'required|date|after_or_equal:purchase_date',
            'gst' => 'required',
            'rows.*.category' => 'required|exists:categories,id',
            'rows.*.brand' => 'required|exists:brands,id',
            'rows.*.model' => 'required|string|max:255',
            'rows.*.quantity' => 'required|integer|min:1',
            'rows.*.rate' => 'required|numeric|min:0',
            'rows.*.discount' => 'nullable|numeric',
            'rows.*.saleRate' => 'required|numeric|min:0',
            'rows.*.point' => 'required|string|max:255',
            'rows.*.freeDelivery' => 'required|in:yes,no',
        ]);
        // dd($request->all());

        $purchase = Purchase::create([
            'company_id' => $request->company,
            'purchase_invoice_no' => $request->purchase_invoice_no,
            'purchase_date' => $request->purchase_date,
            'purchase_receive_date' => $request->purchase_receive_date,
            'gst' => $request->gst === 'yes' ? 1 : 0,
        ]);
        // dd($purchase);

        collect($request->rows)->each(function($row) use ($request,$purchase ) {
            $product = Product::create([
                'category' => $row['category'],
                'brand' => $row['brand'],
                'model' => $row['model'],
                'quantity' => $row['quantity'],
                'purchase_qty'=>$row['quantity'],
                'purchase_price' => $row['rate'],
                'discount' => $row['discount'],
                'sale_price' => $row['saleRate'],
                'point' => $row['point'],
                'free_delivery' => $row['freeDelivery'],
                'code' => $this->generateBarcodeNumber(
                    $request->purchase_receive_date,
                    $request->company,
                    $row['rate']-$row['discount'],
                    $request->gst === 'yes' ? 1 : 0
                ),
                'purchase_id' => $purchase->id,
            ]);
        });

        return back()->with('success','Purchase Created Successfully!');
    }
    public function show($id){
        $purchase = Purchase::with('products', 'company', 'products.category', 'products.brand')->where('id', $id)->first();
        // dd($purchase);
        return Inertia::render('backend/purchase/Show',[
            'purchases' => $purchase
        ]);
    }
    public function update(Request $request, $id){
        // dd($request->all());
        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'purchase_invoice_no' => [
                'required',
                Rule::unique('purchases')->ignore($id),
               'string',
               new SimilarInvoice($request->purchase_date, $id),
            ],
            'purchase_date' => 'required|date',
            'purchase_receive_date' => 'required|date|after_or_equal:purchase_date',
            'gst' => 'required',
        ]);
        // dd($request->all());
        $purchase = Purchase::find($id);
        
        // dd($purchase->purchase_receive_date, $request->purchase_receive_date);
        if($purchase->purchase_receive_date != $request->purchase_receive_date ||
        $purchase->company_id != $request->company_id ||
        $purchase->gst != $request->gst) {
            // dd($purchase->with('products')->first()->products);
            // dd($request->purchase_receive_date, $request->company_id, $request->gst);
            // dd($purchase->with('products')->first()->products);
        collect($purchase->with('products')->first()->products)->each(function($row) use ($request) {
            $product = Product::find($row['id'])->update([
                'code' => $this->generateBarcodeNumber(
                    $request->purchase_receive_date,
                    $request->company_id,
                    $row['purchase_price']-$row['discount'],
                    $request->gst
                ),
            ]);
            // dd($product);
        });}

        $purchase->update([
            'company_id' => $request->company_id,
            'purchase_invoice_no' => $request->purchase_invoice_no,
            'purchase_date' => $request->purchase_date,
            'purchase_receive_date' => $request->purchase_receive_date, 
            'gst' => $request->gst,
        ]);
        return back()->with('success', 'Purchase successfully updated');
    }

    public function updateProduct(Request $request, $id)
    {
        // dd($id);

        $request->validate([
            'model' => 'required|string',
            'quantity' => 'required|integer',
            'point' => 'required|integer',
            'sale_price' => 'required|numeric',
            'purchase_price' => 'required|numeric',
            'category' => 'required|exists:categories,id',
            'brand' => 'required|exists:brands,id',
            'free_delivery'=> 'required|string|in:yes,no'
        ]);
        // dd($request->all());
        $product = Product::where('id',$id)->with('purchase','purchase.company')->first();
        // dd($product);
        $company = $product->purchase->company->id;
        $date = $product->purchase->purchase_receive_date;
        $gst = $product->purchase->gst;

        // dd($product->purchase_price,$request->purchase_price, $product->discount, $request->discount);
        $prod = Product::find($id);
        if($product->purchase_price!= $request->purchase_price || $product->discount !== $request->discount){
            // dd('true');
            $product->code = $this->generateBarcodeNumber($date,
             $company,
             ( $request->purchase_price - $request->discount), 
              $gst);
              $product->save();
        }
        $prod->update([
           'model' => $request->model,
            'quantity' => $request->quantity,
            'purchase_qty' => $request->quantity,
            'discount' => $request->discount,  // Assume no discount for now. Update if required.  // TODO: Add discount calculation.
            'point' => $request->point,
           'sale_price' => $request->sale_price,
            'purchase_price' => $request->purchase_price ,
            'category' => $request->category,
            'brand' => $request->brand,
            'free_delivery'=> $request->free_delivery,
        ]);
        return back()->with('success', 'Product successfully updated');
    }
}
