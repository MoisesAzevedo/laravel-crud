<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{


    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
/*
    public static function boot()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Chave primária auto-incremento
            $table->string('names', 30); // Coluna de texto 'names'
            $table->string('email', 30)->unique(); // Coluna de texto 'email' com restrição única
            $table->string('password', 60); // Coluna de texto 'password'
            $table->tinyInteger('authorize_location'); // Coluna tinyint 'authorize_location'
            $table->date('created_at'); // Coluna de data 'created_at'
            $table->date('updated_at')->nullable(); // Coluna de data 'updated_at' permitindo nulo
            $table->date('deleted_at')->nullable(); // Coluna de data 'deleted_at' permitindo nulo
            $table->timestamps(); // Cria duas colunas de data/hora para controle de criação/atualização de registros
        });
    }
 */

}
