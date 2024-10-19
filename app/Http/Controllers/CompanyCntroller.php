<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyCntroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Company::latest()->paginate(10);
        // dd($company);
        return Inertia::render('backend/company/Index',[
            'company' => $company,
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
            'name' =>'required|string|max:255',
            'address' =>'required|string',
            'phone_number' =>'required|string',
            'gst_number' => 'required|string',
            'total_due' => 'required|numeric|min:0',
        ]);
        // dd($request->all());
        Company::create([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'gst_number' => $request->gst_number,
            'total_due' => $request->total_due,
        ]);
        return back()->with('success','Company created successfully.');
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
            'name' =>'required|string|max:255',
            'address' =>'required|string',
            'phone_number' =>'required|string',
            'gst_number' => 'required|string',
            'total_due' => 'required|numeric|min:0',
        ]);

        $company = Company::find($id);
        $company->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'gst_number' => $request->gst_number,
            'total_due' => $request->total_due,
        ]);
        return back()->with('success','Company updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $company = Company::find($id);
            $company->delete();
            return back()->with('success','Company deleted successfully.');
        } catch (\Exception $e) {
            if($e){
                return redirect()->back()->withErrors('Faild to delete company');
            }
        }
        
    }
}
