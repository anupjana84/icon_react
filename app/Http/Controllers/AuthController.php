<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|regex:/^[0-9]{10}$/|unique:users', // 10 digits, only 0-9
            'wpnumber' => 'nullable|string',
            'role' => 'required|in:admin,manager,salesman,user', // Validate role
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'wpnumber' => $request->wpnumber,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        // Optionally, you can log the user in after registration
        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
        ]);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|regex:/^[0-9]{10}$/', // 10 digits, only 0-9
            'password' => 'required|string|min:6',
        ]);
        // dd($request->all());

        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'phone' => ['The provided credentials are incorrect.'],
            ]);
        }
        //   dd($user);
        if ($user && $user->role !== 'admin') {
        return back()->with('error', 'Invalid credentials');
        }
           // Log in the user
           Auth::login($user);

           return redirect()->route('products.index');
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        return redirect()->route('login');
    }
}
