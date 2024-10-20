<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Salesman;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
            'name' => 'required|string|max:60',
            'phone' => 'required|string|regex:/^[0-9]{10}$/|unique:users', // 10 digits, only 0-9
            'wpnumber' => 'nullable|string',
            'password' => 'required|string|min:6',
            'point' => 'nullable|numeric',
            'other_point'=> 'nullable| numeric',
            'address' => 'nullable|string|max:255',
        ]);
        // dd($request->all());
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


    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|string|max:60',
            'phone' => 'required|string|regex:/^[0-9]{10}$/|unique:users,phone,'.$id, // 10 digits, only 0-9
            'wpnumber' => 'nullable|string',
            'status'=> 'nullable',
            'point' => 'nullable|numeric',
            'other_point'=> 'nullable|numeric',
            'address' => 'nullable|string|max:255',
        ]);
        // dd($request->all(), $id);

        $user = User::find($id);
        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'wpnumber' => $request->wpnumber,
        ]);

        $salesman = Salesman::where('user_id', $id)->first();
        // dd($salesman);
        $salesman->update([
            'point' => $request->point,
            'other_point' => $request->other_point,
            'address' => $request->address,
            'status' => $request->status,  // Change status if needed. If null, it remains the same.  // If status is changed, it should trigger a notification to the salesman.  // Make sure to update the notification system to send the notification when status changes.  // Make sure to handle the case when the salesman is not found (i.e., when user with given id does not exist in the salesman table).  // Make sure to handle the case
        ]);
        return back()->with('success', 'Salesman updated successfully');
    }

    public function destroy($id){
        $user = User::find($id);
        $user->delete();
        return back()->with('success', 'Salesman deleted successfully');
    }
}
