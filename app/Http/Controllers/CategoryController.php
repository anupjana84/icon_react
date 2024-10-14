<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::orderBy('created_at','desc')->paginate(10);
        // dd($category);
        return Inertia::render('backend/category/Index',[
            'items' => $category,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' =>'required|string|max:255|unique:categories,name',
            'hsn_code'=>'required|string|max:255',
            'gst'=> 'required|numeric|min:0'
        ]);
        // dd($request->all());
        Category::create([
            'name' => $request->name,
            'hsn_code' => $request->hsn_code,
            'gst' => $request->gst,
        ]);
        return back()->with('success','Item created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $item)
    {
        $category = Category::find($item);
        $request->validate([
            'name' =>'required|string|max:255',
            'hsn_code'=>'required|string|max:255',
            'gst'=> 'required|numeric|min:0'
        ]);
        // dd($category);
        $category->update($request->only('name', 'hsn_code', 'gst'));
        return back()->with('success','Item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($category)
    {
        // dd($category);
        $category = Category::find($category);
        $category->delete();
        return back()->with('success','Item deleted successfully.');
    }
}
