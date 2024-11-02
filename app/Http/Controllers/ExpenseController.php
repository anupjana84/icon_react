<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::selectRaw('expense_date, SUM(amount) as total_amount')
        ->groupBy('expense_date')
        ->orderBy('expense_date', 'desc')
        ->paginate(10);

        return Inertia::render('backend/expense/Index', [
            'expenses' => $expenses,
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
            'category' => 'required|string',
            'amount' =>'required|numeric',
            'note' =>'nullable|string|max:255',
            'payment_method' => 'nullable| string'
        ]);
        // dd($request->all());
        Expense::create([
            'category' => $request->category,
            'amount' => $request->amount,
            'note' => $request->note,
            'payment_method' => $request->payment_method,
        ]);
        return back()->with('success', 'Expense added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($date)
    {
        $expenses = Expense::where('expense_date', $date)->get();
        // dd($expense);
        return Inertia::render('backend/expense/Show', [
            'expenses' => $expenses,
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
        $request->validate([
            'category' => 'required|string',
            'amount' =>'required|numeric',
            'note' =>'nullable|string|max:255',
            'payment_method' => 'nullable| string'
        ]);

        Expense::find($id)->update($request->all());
        return back()->with('success', 'Expense updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
