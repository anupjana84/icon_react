<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Product;
use App\Models\Category;
use App\Models\Purchase;
use Illuminate\Http\Request;
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
    $groupedPurchases = Purchase::with('products', 'company', 'products.category')
        ->orderBy('purchase_receive_date', 'desc')
        ->get()
        ->groupBy(function ($item) {
            return $item->purchase_receive_date . '-' . $item->company_id;
        });

    // Get the current page from the request (default is 1)
    $currentPage = request()->get('page', 1);

    // Define how many items you want to display per page
    $perPage = 10;

    // Slice the grouped data to get only the items for the current page
    $currentItems = $groupedPurchases->slice(($currentPage - 1) * $perPage, $perPage)->all();

    // Create a paginator instance
    $paginatedItems = new LengthAwarePaginator(
        $currentItems,
        $groupedPurchases->count(), // Total number of items
        $perPage,
        $currentPage,
        ['path' => request()->url(), 'query' => request()->query()]
    );

    // Return the paginated items to your Inertia view
    return Inertia::render('backend/purchase/Index', [
        'purchase' => $paginatedItems,
    ]);
}
    public function create(){
        $category = Category::all();
        $brands = Brand::all();
        $company = Company::all();
        // dd($company);
    //    return $category;
        return Inertia::render('backend/purchase/Create',[
            'category' => $category,
            'brands' => $brands,
            'company' => $company
        ]);
    }
    public function store(Request $request){
        $request->validate([
            'company' => 'required|exists:companies,id',
            'purchase_invoice_no' => 'required|string',
            'purchase_date' => 'required|date',
            'purchase_receive_date' => 'required|date',
            'gst' => 'required',
            'rows.*.category' => 'required|exists:categories,id',
            'rows.*.brand' => 'required|exists:brands,id',
            'rows.*.model' => 'required|string|max:255',
            'rows.*.quantity' => 'required|integer|min:1',
            'rows.*.rate' => 'required|numeric|min:0',
            'rows.*.saleRate' => 'required|numeric|min:0',
            'rows.*.point' => 'required|string|max:255',
            'rows.*.freeDelivery' => 'required|in:yes,no',
        ]);
        // dd($request->all());

        collect($request->rows)->each(function($row) use ($request) {
            $purchase = Purchase::create([
                'company_id' => $request->company,
                'purchase_invoice_no' => $request->purchase_invoice_no,
                'purchase_date' => $request->purchase_date,
                'purchase_receive_date' => $request->purchase_receive_date,
                'gst' => $request->gst === 'yes' ? 1 : 0,
            ]);
            $product = Product::create([
                'category' => $row['category'],
                'brand' => $row['brand'],
                'model' => $row['model'],
                'quantity' => $row['quantity'],
                'purchase_price' => $row['rate'],
                'sale_price' => $row['saleRate'],
                'point' => $row['point'],
                'free_delivery' => $row['freeDelivery'],
                'code' => $this->generateBarcodeNumber(
                    $request->purchase_receive_date,
                    $request->company,
                    $row['rate'],
                    $request->gst === 'yes' ? 1 : 0
                ),
            ]);
        
            // Associate the product with the purchase
            $purchase->product_id = $product->id;
            $purchase->save();
        });

        return back()->with('success','Purchase Created Successfully!');
    }
    public function show($company_id, $date){
        $purchase = Purchase::with('products', 'company', 'products.category', 'products.brand')->where('company_id', $company_id)->where('purchase_receive_date', $date)->get();
        return Inertia::render('backend/purchase/Show',[
            'purchases' => $purchase
        ]);
    }
}
