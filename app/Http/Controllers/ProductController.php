<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Services\CloudinaryService;
use Illuminate\Support\Facades\URL;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Pagination\LengthAwarePaginator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProductController extends Controller
{


private function generateBarcodeNumber( $companyName, $purchaseRate, $gstStatus)
{
    // Extract day, month, and year from the date
    $dateString = Carbon::now()->toDateString(); // Today's date in 'Y-m-d'
    $date = new \DateTime($dateString);
    $day = $date->format('d');
    $month = $date->format('m');
    $year = $date->format('Y');

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
    // $products = Product::with('brand', 'category', 'details')->latest()->paginate(10);
    // dd($products);
    $products = Product::with('brand', 'category', 'details')
    ->selectRaw('brand, category, model, details_id, SUM(quantity) as total_quantity')
    ->groupBy('brand', 'category', 'model', 'details_id')
    ->paginate(10);

    //   dd($products);
    
    return Inertia::render('backend/product/Index', [
        'product' => $products,
    ]);
}


    public function stock($role = 'all'){

        if($role == 'all'){
            $product = Product::with('brand', 'category')->latest()->paginate(10);
        } else if($role == 'empty'){
            $product = Product::with('brand', 'category')
                ->where('quantity', '=', 0)
                ->latest()
                ->paginate(10);
        } else if($role == 'new'){
            $product = Product::with('brand', 'category')
                ->where('created_at', '>=', Carbon::now()->subDays(5))
                ->latest()
                ->paginate(10);
        } else if($role == 'low'){
            $product = Product::with('brand', 'category')
                ->where('quantity', '<', 5)
                ->where('quantity', '!=', 0)
                ->latest()
                ->paginate(10);
        } else if($role == 'available'){
            $product = Product::with('brand', 'category')
                ->where('quantity', '>', 5)
                ->latest()
                ->paginate(10);
        } else if($role == 'six_months'){
            $product = Product::with('brand', 'category')
                ->where('created_at', '<=', Carbon::now()->subMonths(6))
                ->latest()
                ->paginate(10);
        } else if($role == 'one_year'){
            $product = Product::with('brand', 'category')
                ->where('created_at', '<=', Carbon::now()->subYear())
                ->latest()
                ->paginate(10);
        }
        // dd($product);
        return Inertia::render('backend/product/Stock', [
            'product' => $product,
            'selectedRole' => $role
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()

    { 
        $category = Category::all();
        $brands = Brand::all();
        // dd($company);
    //    return $category;
        return Inertia::render('backend/product/Create',[
            'category' => $category,
            'brands' => $brands,
        ]);
    }

    


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    
        
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
    

    // $thumbnailPath = null;
    // $imagePaths = [];


    // // Handle thumbnail image upload
    // if ($request->hasFile('thumbnail')) {
    //     $folderPath = 'icon_computer/product_images/thumbnail';
    //     $thumbnail = $this->cloudinaryService->uploadImage($request->file('thumbnail'), $folderPath);
    //     $thumbnailPath = $thumbnail;
    // }

    // // Handle multiple image uploads
    // if ($request->hasFile('image_url')) {
    //     foreach ($request->file('image_url') as $image) {
    //         $folderPath = 'icon_computer/product_images/images';
    //         $image_url = $this->cloudinaryService->uploadImage($image, $folderPath);
    //         // Store the path without adding $baseDir again
    //         $imagePaths[] =$image_url; 
    //     }
    // }

// dd($imagePaths);

    // dd($imagePaths);

    // Generate barcode number
    $barcodeNumber = $this->generateBarcodeNumber( 'IconComputer', $request->purchase_price, true);
    // dd($barcodeNumber);

    // Create a new product with all the data including image paths
    $product = Product::create([
        
        'model' => $request->model,
        'quantity' => $request->quantity,
        'point' => $request->point,
        'free_delivery' => $request->free_delivery,
        'sale_price' => $request->sale_price,
        'purchase_price' => $request->purchase_price,
        'category' => $request->category,
        'brand' => $request->brand,
        'code' => $barcodeNumber
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
    public function show(Request $request)
    {
        $brand = $request->query('brand');
        $category = $request->query('item');
        $model = $request->query('model');
        // dd( $brand, $category, $model);
        $product = Product::with(['category', 'brand', 'purchase.company', 'details'])
                            ->whereHas('brand', function ($query) use ($brand) {
                                $query->where('name', $brand); // Assuming 'name' is the field in 'brands' table
                            })
                            ->whereHas('category', function ($query) use ($category) {
                                $query->where('name', $category); // Assuming 'name' is the field in 'categories' table
                            })
                            ->where('model', '=', $model)
                            ->get();
                // dd($product);
                  
                $groupedProducts = $product->groupBy(function ($product) {
                    // dd($product->brand);
                    return 0;
                })->map(function ($group) {
                    return [
                        'brand' => Brand::find($group->first()->brand),
                        'category' => Category::find($group->first()->category),
                        'details' => $group->first()->details,
                        'model' => $group->first()->model,
                        'purchases' => $group->flatMap->purchases, // Flatten and gather all purchases for the group
                        'products'=>$group
                    ];
                });
                // dd($groupedProducts);
        return Inertia::render('backend/product/Show', [
            'product' => $groupedProducts,
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
        $product = Product::where('code', $code)->with('category', 'brand', 'details')->first();
        if ($product) {
            return response()->json($product, 200);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    public function allBarcode(Request $request)
    {
        // Get the selected date range from the request or default to 'all'
        $dateRange = $request->input('date_range', 'all');
    
        // Query the Product model based on the date range
        $query = Product::query();
    
        switch ($dateRange) {
            case 'today':
                $query->whereDate('created_at', Carbon::today());
                break;
                    
            case 'last_3_days':
                $query->where('created_at', '>=', Carbon::now()->subDays(3));
                break;
    
            case 'last_1_week':
                $query->where('created_at', '>=', Carbon::now()->subWeek());
                break;
    
            case 'last_1_month':
                $query->where('created_at', '>=', Carbon::now()->subMonth());
                break;
    
            case 'all':
            default:
                // No additional filtering for "all"
                break;
        }
    
        // Get the filtered products and duplicate each product based on its quantity
        $products = $query->with('brand', 'category')->get()->flatMap(function ($product) {
            return array_fill(0, $product->quantity, $product);
        });
    
        // Paginate the duplicated products manually
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $perPage = 24;
        $currentProducts = $products->slice(($currentPage - 1) * $perPage, $perPage)->values();
        $paginatedProducts = new LengthAwarePaginator($currentProducts, $products->count(), $perPage, $currentPage);
        // Correct the URL generation for pagination
       $paginatedProducts->withPath(URL::route('settings.products'));
        // Pass data to Inertia view
        return Inertia::render('backend/settings/pages/ProductSettings', [
            'products' => $paginatedProducts,
            'dateRange' => $dateRange
        ]);
    }
    
}
