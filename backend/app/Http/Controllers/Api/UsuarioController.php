<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Usuario::orderByDesc('id_usuario')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->rules());
        $usuario = Usuario::create($data);

        return response()->json($usuario->refresh(), 201);
    }

    public function show(Usuario $usuario): JsonResponse
    {
        return response()->json($usuario);
    }

    public function update(Request $request, Usuario $usuario): JsonResponse
    {
        $data = $request->validate($this->rules($usuario));
        $usuario->update($data);

        return response()->json($usuario->refresh());
    }

    public function destroy(Usuario $usuario): Response
    {
        $usuario->delete();

        return response()->noContent();
    }

    private function rules(?Usuario $usuario = null): array
    {
        return [
            'nombre' => ['required', 'string', 'max:191'],
            'correo' => ['required', 'email', 'max:191', Rule::unique('usuarios', 'correo')->ignore($usuario)],
            'contrasena' => [$usuario ? 'sometimes' : 'required', 'required', 'string', 'min:8', 'max:128'],
            'estado' => ['required', Rule::in(['activo', 'inactivo'])],
        ];
    }
}
