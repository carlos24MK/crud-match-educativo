<?php

namespace Database\Factories;

use App\Models\Habilidad;
use Illuminate\Database\Eloquent\Factories\Factory;

class HabilidadFactory extends Factory
{
    protected $model = Habilidad::class;

    public function definition(): array
    {
        return ['nombre' => fake()->unique()->words(3, true), 'descripcion' => fake()->sentence()];
    }
}
