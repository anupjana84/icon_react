<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index($role = 'all')
    {
        
        // if ($role !== 'all') {
        //     dd($role);
        // }
        
        // Fetch users based on the selected role
        $users = User::where('role', '!=', 'admin')->when($role !== 'all', function ($query) use ($role) {
            $query->where('role', $role);
        })->paginate(10);

        return inertia('backend/user/Index', ['users' => $users, 'selectedRole' => $role]);
    }
}
