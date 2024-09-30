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
        dd($request->all());
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
