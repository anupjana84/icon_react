<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::all();
        // dd($sales);
        return Inertia::render('backend/sale/Index', [
            'sales' => $sales,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('backend/sale/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|numeric|digits_between:10,15',
            'address' => 'required|string|max:500',
            'wpnumber' => 'nullable|numeric|digits_between:10,15',
            'pin' => 'required|string|min:6|max:6',
            'payment' => [
                'required',
                'string',
                Rule::in(['cash', 'card', 'online']), // Case-insensitive options
            ],
            'orderId' => 'nullable|string|max:100', // Can be null
            'rows' => 'required|array|min:1',
            'rows.*.category' => 'required|string|max:100',
            'rows.*.brand' => 'required|string|max:100',
            'rows.*.model' => 'required|string|max:100',
            'rows.*.quantity' => 'required|integer|min:1',
            'rows.*.rate' => 'required|numeric|min:0',
            'rows.*.saleRate' => 'required|numeric|min:0',
            'rows.*.point' => 'nullable|numeric|min:0',
            'rows.*.freeDelivery' => [
                'required',
                'string',
                Rule::in(['yes', 'no']),
            ],
            'rows.*.code' => 'required|string|max:50', // Assuming code is required
            'rows.*.productQuantity' => 'required|integer|min:1', // Product quantity must be an integer
            'rows.*.productId' => 'required|integer|exists:products,id', // Product ID must exist in the products table
            'custId' => 'nullable|integer|exists:customers,id', // Assuming custId is optional and should reference a customer
        ]);
        // dd($request->all());

        if (is_null($request->custId)) {
            // Create a new customer
            $customer = Customer::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'wpnumber' => $request->wpnumber,
                'pin' => $request->pin,
                'sales_ids' => json_encode([]), // Initialize with an empty JSON array
            ]);
        } else {
            // Fetch the existing customer
            $customer = Customer::find($request->custId);
        }

        // Initialize an array to store created Sale IDs
        $saleIds = [];

        // Iterate over each row and create a Sale
        foreach ($request->rows as $row) {
            // Calculate total price (quantity * rate)
           

            // Create the Sale
            $sale = Sale::create([
                'product_id' => $row['productId'],
                'customer_id' =>$customer->id, // Assuming user authentication is enabled
                'quantity' => $row['quantity'],
                'total_price' =>  $row['rate'],
                'shipping_address' => $request->address, // Using the customer's address
                'shipping_pin' => $request->pin,          // Using the customer's pin
                'payment_method' => $request->payment,
            ]);

            // Store the sale ID
            $saleIds[] = $sale->id;
        }

        // Update the customer's sales_ids with the new sale IDs
        // Update the customer's sales_ids with the new sale IDs
        $currentSalesIds = json_decode($customer->sales_ids, true);

        // If $currentSalesIds is null, set it to an empty array
        if (is_null($currentSalesIds)) {
            $currentSalesIds = [];
        }

        $updatedSalesIds = array_merge($currentSalesIds, $saleIds);
        $customer->sales_ids = json_encode($updatedSalesIds);
        $customer->save();
        return back()->with('success', 'Sales Created successfully');
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
