<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users','App\Http\Controllers\UserController@index')->name('users');

//Register
//Route::post('auth/register', Auth\RegisterController::class);
Route::post('auth/register', 'App\Http\Controllers\UserController@Store')->name('auth.register');

Route::post('auth','App\Http\Controllers\LoginController@auth')->name('auth');

Route::put('update/{id}', 'App\Http\Controllers\UserController@update');

Route::delete('destroy/{id}', 'App\Http\Controllers\UserController@destroy');


