<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Habilidad;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class HabilidadController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Habilidad::orderByDesc('id_habilidad')->get());
    }

    public function store(Request $request): JsonResponse
    {
        return response()->json(Habilidad::create($request->validate($this->rules())), 201);
    }

    public function show(Habilidad $habilidad): JsonResponse
    {
        return response()->json($habilidad);
    }

    public function update(Request $request, Habilidad $habilidad): JsonResponse
    {
        $habilidad->update($request->validate($this->rules($habilidad)));

        return response()->json($habilidad->refresh());
    }

    public function destroy(Habilidad $habilidad): Response
    {
        $habilidad->delete();

        return response()->noContent();
    }

    private function rules(?Habilidad $habilidad = null): array
    {
        return [
            'nombre' => ['required', 'string', 'max:100', Rule::unique('habilidades', 'nombre')->ignore($habilidad)],
            'descripcion' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
