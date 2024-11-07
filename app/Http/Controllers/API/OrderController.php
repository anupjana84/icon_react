<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function index(){
        $orders = Order::latest()->paginate(10);
        return response()->json(
            (new ApiResponse(200, $orders, 'Orders fetched successfully' ))->toArray()
        );
    }

    public function show($id){
        $order = Order::find($id);
        if (!$order) {
            return response()->json(
                (new ApiResponse(404, null, 'Order not found' ))->toArray()
            );
        }
        return response()->json(
            (new ApiResponse(200, $order, 'Order fetched successfully' ))->toArray()
        );
    }

    public function store(Request $request){
       $validateRequest = Validator::make(
         $request->all(),
         [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|digits_between:10,10',
            'address' => 'required|string|max:500',
            'pin' => 'required|string|min:6|max:6',
            'custId' => 'nullable|integer|exists:customers,id',
         ]
       );
       if ($validateRequest->fails()) {
         return response()->json(
           (new ApiResponse(422, 'Validation failed', $validateRequest->errors()))->toArray(),
           422
         );
       }

       if (is_null($request->custId)) {
        // Create a new customer
        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
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
}
