<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\CloudinaryService;
use Illuminate\Container\Attributes\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProductController extends Controller
{
    protected $cloudinaryService;

    public function __construct(CloudinaryService $cloudinaryService)
    {
        $this->cloudinaryService = $cloudinaryService;
    }


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

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        
        $product = Product::with('brand')->paginate(5);
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
        $company = Company::all();
        // dd($company);
    //    return $category;
        return Inertia::render('backend/product/Create',[
            'category' => $category,
            'brands' => $brands,
            'company' => $company
        ]);
    }


//     public function store(Request $request)
// {
//     // Check if the thumbnail file exists in the request
//     if ($request->hasFile('thumbnail')) {
//         // Upload the file to Cloudinary with transformation and folder specification
//         try {
//             $uploadedFile = cloudinary()->upload($request->file('thumbnail')->getRealPath(), [
//                 'folder' => 'uploads',
//                 'transformation' => [
//                     'width' => 400,
//                     'height' => 400,
//                     'crop' => 'fill'
//                 ]
//             ]);

//             // Get the secure URL of the uploaded file
//             $uploadedFileUrl = $uploadedFile->getSecurePath();
//             $publicId = $uploadedFile->getPublicId();

//             // Check if the file exists on Cloudinary
//             $exists = cloudinary()->resource($publicId)->exists();

//             // Debugging output
//             dd([
//                 'uploadedFileUrl' => $uploadedFileUrl,
//                 'fileExists' => $exists
//             ]);

//         } catch (\Exception $e) {
//             return response()->json(['error' => $e->getMessage()], 500);
//         }
//     } else {
//         return response()->json(['error' => 'No thumbnail file uploaded'], 400);
//     }
// }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    
        dd($request->all());
        
    $request->validate([
        'description' => 'nullable|string',
        'model' => 'required|string',
        'quantity' => 'required|integer',
        'point' => 'required|integer',
        'free_delivery' => 'nullable',
        'discount' => 'nullable|numeric',
        'status' => 'nullable|string',
        'sale_price' => 'required|numeric',
        'purchase_price' => 'required|numeric',
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'image_url' => 'nullable|array',
        'image_url.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        'category' => 'required|exists:categories,id',
        'brand' => 'required|exists:brands,id',
        'warranty' => 'nullable|date',
    ]);
    

    $thumbnailPath = null;
    $imagePaths = [];


    // Handle thumbnail image upload
    if ($request->hasFile('thumbnail')) {
        $folderPath = 'icon_computer/product_images/thumbnail';
        $thumbnail = $this->cloudinaryService->uploadImage($request->file('thumbnail'), $folderPath);
        $thumbnailPath = $thumbnail;
    }

    // Handle multiple image uploads
    if ($request->hasFile('image_url')) {
        foreach ($request->file('image_url') as $image) {
            $folderPath = 'icon_computer/product_images/images';
            $image_url = $this->cloudinaryService->uploadImage($image, $folderPath);
            // Store the path without adding $baseDir again
            $imagePaths[] =$image_url; 
        }
    }

// dd($imagePaths);

    // dd($imagePaths);

    // Generate barcode number
    // $barcodeNumber = $this->generateBarcodeNumber($request->pruchase_receive_date, $request->pruchase_name, $request->purchase_price, $request->product_gst);
    // dd($barcodeNumber);

    // Create a new product with all the data including image paths
    $product = Product::create([
        
        'description' => $request->description,
        'model' => $request->model,
        'quantity' => $request->quantity,
        'point' => $request->point,
        'free_delivery' => $request->free_delivery,
        'discount' => $request->discount,
        'status' => $request->status,
        'sale_price' => $request->sale_price,
        'purchase_price' => $request->purchase_price,
        'thumbnail_image' => $thumbnailPath, // Save thumbnail path
        'image' => json_encode($imagePaths,  JSON_UNESCAPED_SLASHES), // Save image paths as JSON
        'category' => $request->category,
        'brand' => $request->brand,
        'warranty'=> $request->warranty,  // Added new field for wear and tear. 
    ]);

    // Redirect back with success message
    return back()->with('success', 'Product created successfully.');
       
    }

    public function storeChunk(Request $request){
       

    $request->validate(
            [
                'pruchase_name' => 'required|string|max:255',
                'pruchase_date' => 'required|date',
                'gst_number'=> 'required|string',
                'pruchase_receive_date' => 'required|date',
                'address' => 'nullable|string',
                'pruchase_phone' => 'required|string',
                'pruchase_invoice_no' => 'required|string',
                'rows' => 'required|array',
                'gst'=> 'nullable|string',
                'rows.*.category' => 'required|exists:categories,id',
                'rows.*.brand' => 'required|exists:brands,id',
                'rows.*.model' => 'required|string|max:255',
                'rows.*.hsnCode' => 'nullable|string|max:255',
                'rows.*.quantity' => 'required|integer|min:1',
                'rows.*.rate' => 'required|numeric|min:0',
                'rows.*.saleRate' => 'required|numeric|min:0',
                'rows.*.total' => 'required|numeric|min:0',
                'rows.*.point' => 'required|string|max:255',
                'rows.*.freeDelivery' => 'required|in:yes,no',
            ]
        ); 
        // dd($request->all());

        foreach( $request->rows as $row ){
            // dd($row);
            $barcodeNumber = $this->generateBarcodeNumber($request->pruchase_receive_date, $request->pruchase_name, $row['rate'], $request->gst === 'yes' ? 1 : 0);
            // dd($barcodeNumber);
            Product::create([
               'model' => $row['model'],
                'quantity' => $row['quantity'],
                'purchase_phone' => $request->pruchase_phone,
                'hsn_code' => $row['hsnCode'],
                'gst' => $request->gst,
                'point' => $row['point'],
                'free_delivery' => $row['freeDelivery'],
                'purchase_address' => $request->address,
                'purchase_date' => $request->pruchase_date,
                'purchase_receive_date' => $request->pruchase_receive_date,
                'code' => $barcodeNumber
            ]);
        }

        return back()->with('success', 'Products created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $products = $product->load('category', 'brand', 'purchases', 'purchases.company');
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
        $category = Category::all();
        $brands = Brand::all();
        
        $product = $product->load('category', 'brand');
        // dd($product);
        return Inertia::render('backend/product/Edit', [
            'product' => $product,
            'category' => $category,
            'brands' => $brands
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        dd($request);
        dd($request->all());

    }
     
    public function updateProduct (Request $request, $id){
        dd($request);
        dd($request->all());
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
        if ($thumbnail) {
            $this->cloudinaryService->deleteImage($thumbnail);
        }
        // Delete all image paths
        // dd($imagePaths);
        if ($imagePaths) {
            if ( count($imagePaths) > 0) {
                foreach ($imagePaths as $imagePath) {
                    $this->cloudinaryService->deleteImage($imagePath);  
                }
            }
       }

        // Delete the product from the database
        $product->delete();

        return back()->with('success', 'Product deleted successfully.');
          
        } catch (\Exception $e) {
            if($e){
                return redirect()->back()->withErrors('Faild to delete product');
            }
        }
    }

    public function getProductByCode($code)
    {
        // Assuming 'code' is a unique identifier for the product in the database
        $product = Product::where('code', $code)->with('category', 'brand')->first();

        if ($product) {
            return response()->json($product, 200);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }
}
