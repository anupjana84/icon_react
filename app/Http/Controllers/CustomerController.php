<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customer = Customer::latest()->paginate(10);
        //   dd($customer);
        return Inertia::render('backend/customer/Index', [
            'customers' => $customer,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:10',
            'wpnumber' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:255',
            'pin' => 'required|string|max:6',
        ]);
        $customer = Customer::where('name', '=', $request->name)->where('phone', '=', $request->phone)->first();
       if ($customer){
        return back()->with('error', 'Customer already exists');
       }
        Customer::create($request->all());
        return back()->with('success', 'Customer created successfully');
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
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:10',
            'wpnumber' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:255',
            'pin' => 'required|string|max:6',
        ]);
        Customer::find($id)->update($request->all());
        return back()->with('success', 'Customer updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Customer::find($id)->delete();
        return back()->with('success', 'Customer deleted successfully');
    }

    public function search(Request $request)
    {
        // dd($request->all());
        $name = $request->query('name');
        $phone = $request->query('phone');
        
        // Search for customer by name or phone
        $customer = Customer::Where('phone', $phone)
                            ->first();
        // dd($customer);
        // Return customer data if found
        if ($customer) {
            return response()->json($customer);
        }

        return response()->json(null); // Return null if no customer is found
    }
}
