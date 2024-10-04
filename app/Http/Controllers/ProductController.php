<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $products = [
            [
                'id' => 1,
                'name' => 'Laptop',
                'model' => 'LAP-1234',
                'sale_price' => 999.99,
                'purchase_price' => 750.00,
                'quantity' => 10,
                'phone' => '123-456-7890',
                'hsn_code' => '8471',
                'product_gst' => 18.00,
                'point' => 5,
                'description' => 'High-performance laptop',
                'free_delivery' => 'yes',
                'purchase_address' => '123 Tech Lane',
                'purchase_date' => '2024-01-15',
                'purchase_receive_date' => '2024-01-20',
                'discount' => 10.00,
                'status' => 'active',
            ],
            [
                'id' => 2,
                'name' => 'Smartphone',
                'model' => 'SPH-5678',
                'sale_price' => 499.99,
                'purchase_price' => 400.00,
                'quantity' => 25,
                'phone' => '234-567-8901',
                'hsn_code' => '8517',
                'product_gst' => 18.00,
                'point' => 3,
                'description' => 'Latest model smartphone',
                'free_delivery' => 'no',
                'purchase_address' => '456 Mobile Ave',
                'purchase_date' => '2024-02-10',
                'purchase_receive_date' => '2024-02-15',
                'discount' => 5.00,
                'status' => 'active',
            ],
            [
                'id' => 3,
                'name' => 'Wireless Headphones',
                'model' => 'WHP-9101',
                'sale_price' => 199.99,
                'purchase_price' => 150.00,
                'quantity' => 50,
                'phone' => '345-678-9012',
                'hsn_code' => '8518',
                'product_gst' => 18.00,
                'point' => 2,
                'description' => 'Noise-cancelling wireless headphones',
                'free_delivery' => 'yes',
                'purchase_address' => '789 Sound St',
                'purchase_date' => '2024-03-05',
                'purchase_receive_date' => '2024-03-10',
                'discount' => 15.00,
                'status' => 'active',
            ],
            // Add more products as needed
        ];
        $product = Product::all();
        return Inertia::render('backend/product/Index', [
            'products' => $products,
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
            $thumbnailImage = $request->file('thumbnail')->store('thumbnails', 'public');
            $thumbnailPath = "/{$baseDir}{$thumbnailImage}"; // Save the path
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
                $imagePath = $image->store('images', 'public');
                $imagePaths[] = "/{$baseDir}{$imagePath}"; // Store the path
            }
        }
    
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
            'image' => json_encode($imagePaths), // Save image paths as JSON
            'category' => $request->category,
            'brand' => $request->brand,
        ]);
    
        // Redirect back with success message
        return back()->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
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
        //
    }
}
