<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Product;
use App\Models\Category;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    private function generateBarcodeNumber($dateString, $companyId, $purchaseRate, $gstStatus)
{
    date_default_timezone_set('Asia/Kolkata');
    $time = date('H:i:s');  // Example time: 02:30:15
    list($hours, $minutes, $seconds) = explode(':', $time);
    // Extract day, month, and year from the date
    $date = new \DateTime($dateString);
    $day = $date->format('d'); // e.g., "27"
    $month = $date->format('m'); // e.g., "09"
    $year = $date->format('Y'); // e.g., "2024"

    // Extract the first two letters of the company name
    $companyName = Company::find($companyId)->name; // e.g., "Incredible Company" (Note: Replace with actual company name)
    $companyInitials = strtoupper(substr($companyName, 0, 2)); // e.g., "IC"

    // Format the purchase rate as a 7-digit number by padding with zeros if necessary
    $formattedRate = str_pad($purchaseRate, 7, '0', STR_PAD_LEFT); // e.g., "15000" becomes "0015000"

    // Determine GST status (GY for yes, GN for no)
    $gst = $gstStatus ? 'GY' : 'GN'; // e.g., "GY"

    // Concatenate all parts to form the barcode number
    return "{$day}{$companyInitials}{$formattedRate}{$month}{$year}{$gst}{$hours}{$minutes}{$seconds}";
}
    public function index(){
        $purchase = Purchase::with('products', 'company')
        ->orderBy('purchase_receive_date', 'desc')
        ->get()
        ->groupBy(function ($item) {
            return $item->purchase_receive_date . '-' . $item->company_id;
        });
    
    return Inertia::render('backend/purchase/Index', [
        'purchase' => $purchase,
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
}
