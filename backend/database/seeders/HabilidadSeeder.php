<?php

namespace Database\Seeders;

use App\Models\Habilidad;
use Illuminate\Database\Seeder;

class HabilidadSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Matemáticas' => 'Álgebra, cálculo y resolución de problemas.', 'Inglés' => 'Conversación y comprensión lectora.', 'Programación' => 'Fundamentos de desarrollo de software.'] as $nombre => $descripcion) {
            Habilidad::firstOrCreate(['nombre' => $nombre], ['descripcion' => $descripcion]);
        }
    }
}
