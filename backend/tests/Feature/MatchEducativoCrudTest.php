<?php

namespace Tests\Feature;

use App\Models\Habilidad;
use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class MatchEducativoCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_crud_hides_and_hashes_password_and_preserves_it_on_update(): void
    {
        $response = $this->postJson('/api/usuarios', [
            'nombre' => 'Ana', 'correo' => 'ana@example.test', 'contrasena' => 'ClaveSegura123', 'estado' => 'activo',
        ])->assertCreated()->assertJsonMissingPath('contrasena');
        $id = $response->json('id_usuario');
        $usuario = Usuario::findOrFail($id);
        $this->assertTrue(Hash::check('ClaveSegura123', $usuario->contrasena));
        $hash = $usuario->contrasena;
        $this->getJson('/api/usuarios')->assertOk()->assertJsonCount(1)->assertJsonMissingPath('0.contrasena');
        $this->getJson("/api/usuarios/{$id}")->assertOk()->assertJsonPath('nombre', 'Ana')->assertJsonMissingPath('contrasena');
        $this->putJson("/api/usuarios/{$id}", [
            'nombre' => 'Ana María', 'correo' => 'ana@example.test', 'estado' => 'inactivo',
        ])->assertOk()->assertJsonPath('estado', 'inactivo');
        $this->assertSame($hash, $usuario->fresh()->contrasena);
        $this->putJson("/api/usuarios/{$id}", [
            'nombre' => 'Ana María', 'correo' => 'ana@example.test', 'estado' => 'activo', 'contrasena' => 'NuevaClave123',
        ])->assertOk()->assertJsonMissingPath('contrasena');
        $this->assertTrue(Hash::check('NuevaClave123', $usuario->fresh()->contrasena));
        $this->deleteJson("/api/usuarios/{$id}")->assertNoContent();
        $this->getJson("/api/usuarios/{$id}")->assertNotFound();
        $this->assertDatabaseMissing('usuarios', ['id_usuario' => $id]);
    }

    public function test_usuario_validation_rejects_duplicates_and_invalid_fields(): void
    {
        $usuario = Usuario::factory()->create();
        $this->postJson('/api/usuarios', [
            'nombre' => 'Otro', 'correo' => $usuario->correo, 'contrasena' => 'ClaveSegura123', 'estado' => 'activo',
        ])->assertUnprocessable()->assertJsonValidationErrors('correo');
        $this->postJson('/api/usuarios', [
            'nombre' => '', 'correo' => 'no-es-correo', 'contrasena' => '123', 'estado' => 'otro',
        ])->assertUnprocessable()->assertJsonValidationErrors(['nombre', 'correo', 'contrasena', 'estado']);
    }

    public function test_habilidad_crud_and_optional_description(): void
    {
        $id = $this->postJson('/api/habilidades', ['nombre' => 'Matemáticas'])
            ->assertCreated()->json('id_habilidad');
        $this->getJson('/api/habilidades')->assertOk()->assertJsonCount(1);
        $this->getJson("/api/habilidades/{$id}")->assertOk()->assertJsonPath('nombre', 'Matemáticas');
        $this->putJson("/api/habilidades/{$id}", ['nombre' => 'Matemáticas', 'descripcion' => 'Álgebra'])
            ->assertOk()->assertJsonPath('descripcion', 'Álgebra');
        $this->deleteJson("/api/habilidades/{$id}")->assertNoContent();
        $this->getJson("/api/habilidades/{$id}")->assertNotFound();
        $this->deleteJson("/api/habilidades/{$id}")->assertNotFound();
    }

    public function test_habilidad_validation_and_cors_preflight(): void
    {
        $habilidad = Habilidad::factory()->create();
        $this->postJson('/api/habilidades', ['nombre' => $habilidad->nombre])
            ->assertUnprocessable()->assertJsonValidationErrors('nombre');
        $this->postJson('/api/habilidades', ['nombre' => str_repeat('a', 101)])
            ->assertUnprocessable()->assertJsonValidationErrors('nombre');
        $this->options('/api/usuarios/1', [], [
            'Origin' => 'http://127.0.0.1:5173',
            'Access-Control-Request-Method' => 'DELETE',
        ])->assertNoContent()->assertHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    }
}
