<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $primaryKey = 'id_usuario';

    public $timestamps = false;

    protected $fillable = ['nombre', 'correo', 'contrasena', 'estado'];

    protected $hidden = ['contrasena'];

    protected function casts(): array
    {
        return ['contrasena' => 'hashed', 'fecha_registro' => 'datetime'];
    }
}
