<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    private function generateBarcodeNumber($dateString, $companyName, $purchaseRate, $gstStatus)
{
    // Extract day, month, and year from the date
    $date = new \DateTime($dateString);
    $day = $date->format('d'); // e.g., "27"
    $month = $date->format('m'); // e.g., "09"
    $year = $date->format('Y'); // e.g., "2024"

    // Extract the first two letters of the company name
    $companyInitials = strtoupper(substr($companyName, 0, 2)); // e.g., "IC"

    // Format the purchase rate as a 7-digit number by padding with zeros if necessary
    $formattedRate = str_pad($purchaseRate, 7, '0', STR_PAD_LEFT); // e.g., "15000" becomes "0015000"

    // Determine GST status (GY for yes, GN for no)
    $gst = $gstStatus ? 'GY' : 'GN'; // e.g., "GY"

    // Concatenate all parts to form the barcode number
    return "{$day}{$companyInitials}{$formattedRate}{$month}{$year}{$gst}";
}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        
        $product = Product::paginate(20);
        // dd($product);
        return Inertia::render('backend/product/Index', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()

    { 
        $category = Category::all();
        $brands = Brand::all();
    //    return $category;
        return Inertia::render('backend/product/Create',[
            'category' => $category,
            'brands' => $brands
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // dd($request->all());
 try {
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'model' => 'required|string',
        'quantity' => 'required|integer',
        'phone' => 'nullable|string',
        'hsn_code' => 'nullable|string',
        'product_gst' => 'nullable|numeric',
        'point' => 'required|integer',
        'free_delivery' => 'nullable',
        'pruchase_address' => 'nullable|string',
        'pruchase_date' => 'nullable|date',
        'pruchase_receive_date' => 'required|date',
        'discount' => 'nullable|numeric',
        'status' => 'nullable|string',
        'sale_price' => 'required|numeric',
        'purchase_price' => 'required|numeric',
        'pruchase_phone' => 'nullable|string',
        'purchase_gst' => 'nullable|numeric',
        'purchase_invoice_no' => 'nullable|string',
        'available_from' => 'nullable|date',
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'image_url' => 'nullable|array',
        'image_url.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        'category' => 'required|exists:categories,id',
        'brand' => 'required|exists:brands,id',
        'pruchase_name'=> 'required|string',
    ]);
    // dd($request->all());

    // Initialize variables for thumbnail and image paths
    $thumbnailPath = null;
    $imagePaths = [];

    // Define the base directory for product images
    $baseDir = 'product_images/';

    // Handle thumbnail image upload
    if ($request->hasFile('thumbnail')) {
        // Create thumbnail directory if it doesn't exist
        $thumbnailDirectory = public_path("storage/{$baseDir}thumbnails");
        if (!file_exists($thumbnailDirectory)) {
            mkdir($thumbnailDirectory, 0777, true);
        }

        // Store the thumbnail image
        $thumbnailImage = $request->file('thumbnail')->store('product_images/thumbnails', 'public');
        $thumbnailPath = "/storage/{$thumbnailImage}"; // Save the path
    }

    // Handle multiple image uploads
    if ($request->hasFile('image_url')) {
        // Create images directory if it doesn't exist
        $imagesDirectory = public_path("storage/{$baseDir}images");
        if (!file_exists($imagesDirectory)) {
            mkdir($imagesDirectory, 0777, true);
        }
    
        foreach ($request->file('image_url') as $image) {
            // Store each image
            $imagePath = $image->store('product_images/images', 'public');
            // Store the path without adding $baseDir again
            $imagePaths[] = "/storage/{$imagePath}"; 
        }
    }
    // dd($imagePaths);

    // Generate barcode number
    $barcodeNumber = $this->generateBarcodeNumber($request->pruchase_receive_date, $request->pruchase_name, $request->purchase_price, $request->product_gst);
    // dd($barcodeNumber);

    // Create a new product with all the data including image paths
    $product = Product::create([
        'name' => $request->name,
        'description' => $request->description,
        'model' => $request->model,
        'quantity' => $request->quantity,
        'phone' => $request->phone,
        'hsn_code' => $request->hsn_code,
        'product_gst' => $request->product_gst,
        'point' => $request->point,
        'free_delivery' => $request->free_delivery,
        'purchase_address' => $request->pruchase_address,
        'purchase_date' => $request->pruchase_date,
        'purchase_receive_date' => $request->pruchase_receive_date,
        'discount' => $request->discount,
        'status' => $request->status,
        'sale_price' => $request->sale_price,
        'purchase_price' => $request->purchase_price,
        'purchase_phone' => $request->pruchase_phone,
        'purchase_gst' => $request->pruchase_gst,
        'purchase_invoice_no' => $request->pruchase_invoice_no,
        'available_from' => $request->available_from,
        'thumbnail_image' => $thumbnailPath, // Save thumbnail path
        'image' => json_encode($imagePaths,  JSON_UNESCAPED_SLASHES), // Save image paths as JSON
        'category' => $request->category,
        'brand' => $request->brand,
        'purchase_name'=> $request->pruchase_name,  // Added new field for purchase name.
        'code'=> $barcodeNumber,  // Added new field for barcode number.  // Added new field for barcode number.
    ]);

    // Redirect back with success message
    return back()->with('success', 'Product created successfully.');
 } catch (\Throwable $th) {
    // Redirect back with error message
    return back()->with('error', 'An error occurred while creating the product. Please try again.');
 }
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $products = $product->load('category', 'brand');
        // dd($product);

        return Inertia::render('backend/product/Show', [
            'product' => $products,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
        $thumbnail = $product->thumbnail_image;
        $imagePaths = json_decode($product->image, true);

        // Delete the thumbnail image if it exists
        if ($thumbnail && file_exists(public_path($thumbnail))) {
            //  dd($thumbnail);
            unlink(public_path($thumbnail));
        }
        // Delete all image paths
        foreach ($imagePaths as $imagePath) {
            if (file_exists(public_path($imagePath))) {
                // dd($imagePath);
                unlink(public_path($imagePath));
            }
        }

        // Delete the product from the database
        $product->delete();

        return back()->with('success', 'Product deleted successfully.');
        } catch (\Throwable $th) {
            return back()->with('error', 'Failed to delete product.');
        }
       

    }
}
