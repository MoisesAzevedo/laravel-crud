<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $results = DB::select('select * from users');
        return response()->json($results);
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

        // Validação dos dados do formulário
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Criação de um novo usuário no banco de dados
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

         // Gera um evento para indicar que o usuário foi registrado
        event(new Registered($user));

        // Obtém informações do dispositivo do usuário (agente do usuário)
        $device = substr($request->userAgent() ?? '', 0, 255);

        // Retorna uma resposta JSON com um token de acesso e status HTTP 201 (Created)
        return response()->json([
            'access_token' => $user->createToken($device)->plainTextToken,
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
            'name' => ['nullable','string', 'max:255'],
            'email' => ['nullable','string', 'email', 'max:255', Rule::unique('users')->ignore($id),],
            'password' => ['nullable','required_with:password_confirmation','confirmed', Password::defaults()],

        ]);


        $vehicle = User::find($id);
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;


        //..atualiza os atributos do objeto recuperado com os dados do objeto Request

        if ($name){
            $vehicle->name = $name;
        }

        if ($email) {
            $vehicle->email = $email;
        }

        if ($password){
            $password = Hash::make($request->password);
            $vehicle->password = $password;
        }

        //..persite as alterações na base de dados
        $vehicle->save();
        //..retorna a view index com uma mensagem
        $vehicles = User::all();

        return response()->json($vehicle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vehicle = User::find($id)->delete();
    }
}
