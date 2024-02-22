<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function auth(Request $request){
        $credenciais = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($credenciais)){
            return response()->json([
                'success' => true,
                'message' => 'Usuário Logado',
                'redirect' => route('users')
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Email ou senha não cadastrados'
            ]);
        };
    }
}
