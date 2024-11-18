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

    public function validation(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'nullable|string|max:255|required_with:phone',
        'phone' => 'nullable|numeric|digits_between:10,15|required_with:name',
        'address' => 'nullable|string|max:500|required_with:name,phone',
        'wpnumber' => 'nullable|numeric|digits_between:10,15',
        'pin' => 'nullable|string|min:6|max:6|required_with:name,phone',
        'salesman' => 'nullable|array',

        // Ensures 'rows' is an array with at least one entry
        'rows' => 'required|array|min:1',

        // Validation for each item in the 'rows' array
        'rows.*.category' => 'required|string|max:100',
        'rows.*.brand' => 'required|string|max:100',
        'rows.*.model' => 'required|string|max:100',
        'rows.*.sl_no' => 'required|string|max:100',
        'rows.*.warranty' => 'required|string|max:100',
        'rows.*.quantity' => 'required|integer|min:1',
        'rows.*.rate' => 'required|numeric|min:0',
        'rows.*.saleRate' => 'required|numeric|min:0',
        'rows.*.point' => 'nullable|numeric|min:0',
        'rows.*.freeDelivery' => 'required|string|in:yes,no',
        'rows.*.code' => 'required|string|max:50',
        'rows.*.productQuantity' => 'required|integer|min:1',
        'rows.*.productId' => 'required|integer|exists:products,id',

        // Optional customer ID, which must exist in the customers table if provided
        'custId' => 'nullable|integer|exists:customers,id',
    ]);

   return redirect()->back()->with('validated', true);

}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
     //   dd($request->all());

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
            'total' => 'required|integer',
            'discount' => 'nullable|numeric|min:0',
            'rows' => 'required|array|min:1',
            'rows.*.category' => 'required|string|max:100',
            'rows.*.brand' => 'required|string|max:100',
            'rows.*.model' => 'required|string|max:100',
            'rows.*.sl_no' => 'required|string|max:100',
            'rows.*.warranty' => 'required|string|max:100',
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
                        // Prepare an array to hold updated fields
                        $updates = [];

                        // Check each field and add to updates if changed
                        if ($customer->address !== $request->address) {
                            $updates['address'] = $request->address;
                        }
                        if ($customer->wpnumber !== $request->wpnumber) {
                            $updates['wpnumber'] = $request->wpnumber;
                        }
                        if ($customer->name !== $request->name) {
                            $updates['name'] = $request->name;
                        }
                        if ($customer->pin !== $request->pin) {
                            $updates['pin'] = $request->pin;
                        }

                        // Update the customer only if there are changes
                        if (!empty($updates)) {
                            $customer->update($updates);
                        }

                    }
                }
                // dd('kkmgnrj');
                // Create the Sale record
                $sale = Sale::create([
                    'order_id' => $request->orderId,
                    'gst' => $request->gst,
                    'customer_id' => $customer ? $customer->id : null,
                    'shipping_address' => $request->address,
                    'shipping_pin' => $request->pin,
                    'total' => $request->total,
                    'discount' => $request->discount ?? 0,
                    'finance' => $request->finance,
                    'gst_number' => $request->gstNumber,
                ]);
                // dd('kkmgnrj');
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
                        'warranty' => $row['warranty'] ?? '',
                        'sl_no' => $row['sl_no'],
                        'discount' => $row['discount'] ?? 0,
                    ]);
                    Product::find($row['productId'])->update([
                        'quantity' => $row['productQuantity'] - $row['quantity'], // Update the product quantity
                    ]);
                    $totalPoints += $points; // Update the total points for the customer
                }
                // dd('kkmgnrj');
                // Create the SalesPayment record
                $salesPayment = SalesPayment::create([
                    'sale_id' => $sale->id, // Link to the Sale
                    'amount' => ($request->total ) - ($request->discount?? 0), // Total amount from cash and online payments
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
                // dd('kkmgnrj');
        return back()->with('success', 'Sales Created successfully');
    }

    public function quickStore(Request $request ){
        dd($request->all());
        $request->validate([
            'gst' => 'required|string|in:yes,no',
            'total' => 'required|integer',
            'discount' => 'nullable|numeric|min:0',
            'payed' => 'required|numeric',
            'rows' => 'required|array|min:1',
            // Validation for each item in the 'rows' array
            'rows.*.category' => 'required|string|max:100',
            'rows.*.brand' => 'required|string|max:100',
            'rows.*.model' => 'required|string|max:100',
            'rows.*.quantity' => 'required|integer|min:1',
            'rows.*.rate' => 'required|numeric|min:0',
            'rows.*.saleRate' => 'required|numeric|min:0',
            'rows.*.code' => 'required|string|max:50',
            'rows.*.productQuantity' => 'required|integer|min:1',
            'rows.*.productId' => 'required|integer|exists:products,id',
        ]);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sale = Sale::with('customer', 'order', 'salesItems', 'salesPayment', 'salesItems.product', 'salesItems.product.category', 'salesItems.product.brand', 'salesItems.product.details')->findOrFail($id);

        return Inertia::render('backend/sale/Show', [
            'sale' => $sale,
        ]);
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
        // dd($request->all());
        $request->validate([
            'cash' => 'nullable|numeric|required_without_all:online',
            'online' => 'nullable|numeric|required_without_all:cash',
            'gst' => 'required|string|in:yes,no',
            'gstNumber' => 'nullable|string|max:20',
            'finance' => 'nullable|string|in:hdb_finance,bajaj_finance',
            'total' => 'required|integer',
            'discount' => 'nullable|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.warranty' => 'required|string|max:100',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'required|integer|min:1',
            'custId' => 'nullable|integer|exists:customers,id',
            'totalPoints' => 'required|integer',
        ]);
        $total = 0;
        foreach ($request->items as $item){
            $total += $item['total'];
        }
        // dd($total);
        $sale = Sale::find($id)->with('customer', 'customer.salesman', 'salesItems','salesItems.product', 'salesPayment');
        $sale->update([
            'gst' => $request->gst,
            'total' => $total,
            'discount' => $request->discount,
            'gst_number' => $request->gst_number
        ]);
        // Create new sales items
        foreach ($request->items as $item) {
            $sales_item = SalesItem::find($item['id']);
            if ($sales_item) {
                $sales_item->update([
                    'warranty' => $item['warranty'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    // 'sl_no' => $item->sl_no,
                    'discount' => $item['discount']
                ]);
            }
        }

        // Update sales payment
        $salePayment = SalesPayment::where('sale_id', $id);
        $salePayment->update([
            'amount' => $total - $request->discount,
            'online_payment' => $request->online,
            'cash_payment' => $request->cash,
            'finance' => $request->finance
        ]);
        if ($request->custId) {
            $totalPoint =0;
            foreach ($request->items as $item){
                $totalPoint += $item['point'] * $item['quantity'];
            }
            // dd($prevPoints);
        $customer = Customer::with('salesman')->where('id', $request->custId)->first();
       $salesman = $customer->salesman()?->first();
        // dd($salesman);
        if($salesman){
            $point = $salesman->point;
            $salesman->point = ($point-$request->prevPoints)+$prevPoints;
            $salesman->save();
        }
    }
    return back()->with('success', 'Sale updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    // Retrieve the sale with related sales items, sales payment, and customer
    $sale = Sale::where('id', $id)->with('salesItems', 'salesPayment', 'customer', 'salesItems.product', 'customer.salesman')->first();

    // Check if the sale exists
    if (!$sale) {
        return back();
    }

    // Loop through each sales item to update the product quantity
    foreach ($sale->salesItems as $salesItem) {
        $product = $salesItem->product;
        // dd($product->quantity, $salesItem->quantity);
        // Add back the quantity of the sales item to the product's stock
        $product->quantity += $salesItem->quantity;
        $product->save();
    }

    if ($sale->customer) {
        $selsids = json_decode($sale->customer->sales_ids);
        // Retrieve and decode the customer's sales IDs
        $salesIds = json_decode($sale->customer->sales_ids, true);
   
        // Check if sales IDs exist and is an array
        if (is_array($salesIds)) {
            // Remove the specific sale ID from the array
            $salesIds = array_filter($salesIds, function($saleId) use ($id) {
                return $saleId != $id;
            });
            
            // Re-index the array
            $salesIds = array_values($salesIds);
            // Otherwise, update the sales_ids field
            $sale->customer->sales_ids = json_encode($salesIds);
            $sale->customer->save();
        }
         // Get the customer's salesman
         $salesman = $sale->customer->salesman;
        // If the salesman exists and status is active
        if ($salesman && $salesman->status) {
            // Reduce the salesman's points
            $totalPoints = 0;
            foreach ($sale->salesItems as $salesItem) {
                $product = $salesItem->product;
                $pointsToReduce = $product->point * $salesItem->quantity;
                $totalPoints += $pointsToReduce;
            }
            $salesman->point -= $totalPoints;
            $salesman->save();
        }
    }

    

    // Delete the related sales payment
    $sale->salesPayment()->delete();

    // // Delete the related customer
    // $sale->customer()->delete();

    // Delete related sales items
    $sale->salesItems()->delete();

    // Delete the sale itself
    $sale->delete();

    return back()->with('success', 'Sale and related items deleted successfully.');
}


    public function invoice($id){
        $sale = Sale::with('customer', 'order', 'salesItems', 'salesPayment', 'salesItems.product', 'salesItems.product.category', 'salesItems.product.brand', 'salesItems.product.details')->findOrFail($id);
        return Inertia::render('backend/sale/InvoiceBill', [
            'sale' => $sale,
        ]);
    }
}
