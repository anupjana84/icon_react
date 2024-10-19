<?php

namespace App\Http\Controllers;

use App\Models\Salesman;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class SalesmanController extends Controller
{
    protected function generateUniqueCode()
    {
        do {
            $code = strtoupper(Str::random(10)); // Generates a 10-character alphanumeric string (both letters and numbers)
        } while (!preg_match('/[A-Z]/', $code) || !preg_match('/\d/', $code) || Salesman::where('code', $code)->exists());
    
        return $code;
    }
    public function index(){
        $salesman = Salesman::with('user')->paginate(10);
        // dd($salesman);
        return inertia('backend/salesman/Index', [
            'salesman' => $salesman
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|regex:/^[0-9]{10}$/|unique:users', // 10 digits, only 0-9
            'wpnumber' => 'nullable|string',
            'password' => 'required|string|min:6',
            'point' => 'nullable|numeric',
            'other_point'=> 'nullable| numeric',
            'code' => 'required|string|unique:salesmen',
            'address' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'wpnumber' => $request->wpnumber,
            'role' => 'salesman',
            'password' => Hash::make($request->password),
        ]);

        Salesman::create([
            'user_id' => $user->id,
            'point' => $request->point,
            'other_point' => $request->other_point,
            'code' => $this->generateUniqueCode(),
            'address' => $request->address,
        ]);

        return back()->with('success', 'Salesman created successfully');
    }
}
