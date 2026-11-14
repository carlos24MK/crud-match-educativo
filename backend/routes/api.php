<?php

use App\Http\Controllers\Api\HabilidadController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('products', ProductController::class);
Route::apiResource('usuarios', UsuarioController::class)->parameters(['usuarios' => 'usuario']);
Route::apiResource('habilidades', HabilidadController::class)->parameters(['habilidades' => 'habilidad']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
