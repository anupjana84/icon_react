<?php

namespace App\Http\Controllers;

use Validator;
use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $brands = Brand::latest()->paginate(10);
        return Inertia::render('backend/brand/Index',[
            'brands' => $brands,
        ]);
    }

    
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
            'name' => 'required|string|unique:brands,name',
        ]);
        $brand = Brand::create($request->all());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $brand)
    {
        $request->validate([
            'name' => 'required|string|unique:brands,name',
        ]);
        Brand::find($brand)->update($request->all());
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($brand)
    {
        $brand = Brand::find($brand);
        $brand->delete();
        return back();
    }

    public function getAll(){
        $category = Category::orderBy('name', 'asc')->get();
        $brands = Brand::orderBy('name', 'asc')->get();
        return response()-> json(
            [
                'category' => $category,
                'brands' => $brands,
            ], 200
            );
    }
}
