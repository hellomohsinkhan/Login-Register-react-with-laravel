<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/addCategory', [App\Http\Controllers\CategoryController::class,'store']);
Route::get('/category', [App\Http\Controllers\CategoryController::class,'index']);
Route::delete('/category/delete/{id}', [App\Http\Controllers\CategoryController::class,'destroy']);
Route::get('/category/edit/{id}', [App\Http\Controllers\CategoryController::class,'edit']);
Route::put('/category/update/{id}', [App\Http\Controllers\CategoryController::class,'update']);
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

///Register
Route::post('/register', [App\Http\Controllers\AuthController::class,'store']);
Route::post('/login', [App\Http\Controllers\AuthController::class,'login']);

