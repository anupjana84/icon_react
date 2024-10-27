<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Salesman;
use App\Models\SalesItem;
use App\Models\SalesPayment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with('customer', 'order', 'salesItems', 'salesPayment', 'salesItems.product')->latest()->paginate(10);
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
        // Validate the incoming request
        $request->validate([
            'name' => 'nullable|string|max:255|required_with:phone',
            'phone' => 'nullable|numeric|digits_between:10,15|required_with:name',
            'address' => 'nullable|string|max:500|required_with:name,phone',
            'wpnumber' => 'nullable|numeric|digits_between:10,15',
            'pin' => 'nullable|string|min:6|max:6|required_with:name,phone',
            'orderId' => 'nullable|string|max:100',
            'cash' => 'nullable|numeric|required_without_all:online',
            'online' => 'nullable|numeric|required_without_all:cash',
            'gst' => 'required|string|in:yes,no',
            'finance' => 'nullable|string|in:hdb_finance,bajaj_finance',
            'salesman' => 'nullable|array',
            'rows' => 'required|array|min:1',
            'rows.*.category' => 'required|string|max:100',
            'rows.*.brand' => 'required|string|max:100',
            'rows.*.model' => 'required|string|max:100',
            'rows.*.quantity' => 'required|integer|min:1',
            'rows.*.rate' => 'required|numeric|min:0',
            'rows.*.saleRate' => 'required|numeric|min:0',
            'rows.*.point' => 'nullable|numeric|min:0',
            'rows.*.freeDelivery' => 'required|string|in:yes,no',
            'rows.*.code' => 'required|string|max:50',
            'rows.*.productQuantity' => 'required|integer|min:1',
            'rows.*.productId' => 'required|integer|exists:products,id',
            'custId' => 'nullable|integer|exists:customers,id',
        ]);
    //   dd($request->all());
        // Handle customer creation or fetching
        $customer = null;
    
        if ($request->phone) {
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
                $customer = Customer::findOrFail($request->custId);
            }
        }
    
        // Create the Sale record
        $sale = Sale::create([
            'order_id' => $request->orderId,
            'gst' => $request->gst,
            'customer_id' => $customer ? $customer->id : null,
            'shipping_address' => $request->address,
            'shipping_pin' => $request->pin,
        ]);
    
        $totalPoints = 0;
        // Create SalesItem records
        foreach ($request->rows as $row) {
            $points = $row['point'] * $row['quantity'];
            // Create the SalesItem
            $salesItem = SalesItem::create([
                'sale_id' => $sale->id, // Link to the Sale
                'product_id' => $row['productId'],
                'quantity' => $row['quantity'],
                'price'=>$row['saleRate'],
                'shipping_address' => $request->address,
                'shipping_pin' => $request->pin,
            ]);
            Product::find($row['productId'])->update([
                'quantity' => $row['productQuantity'] - $row['quantity'], // Update the product quantity
            ]);
            $totalPoints += $points; // Update the total points for the customer
        }
    
        // Create the SalesPayment record
        $salesPayment = SalesPayment::create([
            'sale_id' => $sale->id, // Link to the Sale
            'amount' => ($request->cash ?? 0) + ($request->online ?? 0), // Total amount from cash and online payments
            'payment_date' => now(), // Use the current date or from the request if provided
            'online_payment' => $request->online,
            'cash_payment' => $request->cash,
            'finance' => $request->finance,
        ]);
    
        // Update the customer's sales_ids with the new sale IDs
        if ($customer) {
            $currentSalesIds = json_decode($customer->sales_ids, true) ?? [];
            $updatedSalesIds = array_unique(array_merge($currentSalesIds, [$sale->id])); // Store only the Sale ID
            $customer->sales_ids = json_encode($updatedSalesIds);
            $customer->save();
        }
    
        if (is_array($request->salesman) && !empty($request->salesman))  {
        // dd($request->salesman['id']);
            $salesman = Salesman::findOrFail($request->salesman['id']);
            if ($salesman && $salesman->status){
                $salesman->point = $request->salesman['point'] + $totalPoints;
                $salesman->save();
            }
        }
    
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
