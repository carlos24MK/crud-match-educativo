<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::firstOrCreate(['correo' => 'demo@match.test'], [
            'nombre' => 'Estudiante de demostración',
            'contrasena' => 'DemoMatch2026',
            'estado' => 'activo',
        ]);
    }
}
