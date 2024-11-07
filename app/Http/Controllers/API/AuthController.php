<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Responses\ApiError;
use App\Http\Responses\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the request data
        $validateRequest = Validator::make(
            $request->all(),
            [
                'phone' => 'required|string|regex:/^[0-9]{10}$/', // 10 digits, only 0-9
                'password' => 'required|string|min:6',
            ]
        );
        if ($validateRequest->fails()) {
            // Return an error if validation fails
            return response()->json(
                (new ApiError(422, 'Validation failed', $validateRequest->errors()))->toArray(),
                422
            );
        }
        // Attempt to authenticate the user
        if (!Auth::attempt(['phone' => $request->phone, 'password' => $request->password])) {
            // Return an error if authentication fails
            return response()->json(
                (new ApiError(401, 'Invalid credentials'))->toArray(),
                401
            );
        }

        // Retrieve the authenticated user
        $user = Auth::user();

        // Generate an API token for the authenticated user
        $token = $user->createToken('api_token')->plainTextToken;

        // Return a successful login response with the token and token_type
        return response()->json(
            (new ApiResponse(200, [
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Login successful'))->toArray(),
            200
        );
    }

   
    public function logout(Request $request)
    {
        // Ensure the user is authenticated before logging out
        if (!Auth::check()) {
            return response()->json(
                (new ApiError(401, 'Not logged in'))->toArray(),
                401
            );
        }

        // Revoke the current access token
        $request->user()->currentAccessToken()->delete();

        // Return a successful logout response
        return response()->json(
            (new ApiResponse(200, null, 'Logged out successfully'))->toArray(),
            200
        );
    }

    public function getUser(Request $request){
        $user = $request->user();
        // Ensure the user is authenticated before retrieving their data
        if (!$user) {
            return response()->json(
                (new ApiError(401, 'Not logged in'))->toArray(),
                401
            );
        }

        // Return the user data
        return response()->json(
            (new ApiResponse(200, $user, 'User data retrieved successfully'))->toArray(),
            200
        );
    }

    
}
