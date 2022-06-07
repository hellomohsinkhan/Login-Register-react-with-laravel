<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    //

    public function store(Request $request){
        try{
           
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required',
                'password' => 'required',
              ]);
            if($validator->fails()) { 
                $messages = $validator->messages();
                return response()->json([
                    'status' => false,
                    'message' => $messages->all()
                ]);
            }
            $check = User::where('email',$request->email)->count();
            if($check>0){
                return response()->json([
                    'status' => true,
                    'message' => "Email Id Already Register"
                ]);
            }else{
                User::insert([
                  'name' => $request->name,
                  'email' => $request->email,
                  'password'=> Hash::make($request->password),
                  'created_at' => date("Y-m-d h:i:s"),  
                  'updated_at' => date("Y-m-d h:i:s")
                ]);
                return response()->json([
                    'status' => true,
                    'message' => "Registration successfully.."
                ]);
            }          
    
        }catch(Exception $e){
          Alert::error('Error', $e->getMessage());
          \Log::error($e->getMessage());
          abort(404);
        }
    }


    public function login(Request $request){

        $credentials = $request->only('email', 'password');
        //valid credential
        $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required',
              ]);
        if($validator->fails()) { 
            $messages = $validator->messages();
            return response()->json([
                'success' => false,
                'message' => $messages->all()
            ]);
        }
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => ['Login credentials are invalid.'],
                ], 200);
            }
        } catch (JWTException $e) {
        return $credentials;
            return response()->json([
                    'success' => false,
                    'message' => ['Could not create token.'],
                ], 200);
        }    
        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'token' => $token,
        ]);

        

    }




}
