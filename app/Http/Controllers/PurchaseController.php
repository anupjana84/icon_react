<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Category;
use App\Models\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function index(){
        $purchase = Purchase::with('product', 'company')->orderBy('purchase_date', 'desc')->paginate(20);
        return Inertia::render('backend/purchase/Index', [
            'purchase' => $purchase,
        ]);
    }
    public function create(){
        $category = Category::all();
        $brands = Brand::all();
        $company = Company::all();
        // dd($company);
    //    return $category;
        return Inertia::render('backend/purchase/Create',[
            'category' => $category,
            'brands' => $brands,
            'company' => $company
        ]);
    }
    public function store(Request $request){
        dd($request->all());
    }
}
