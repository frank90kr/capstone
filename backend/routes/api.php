<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UploadImageController;

// Rotte per verificare lo stato di autenticazione dell'utente
Route::middleware('auth:sanctum')->get('/user/authenticated', [UserController::class, 'checkAuthentication']);

// Rotte protette da autenticazione
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('user.profile');

    // Rotte per i corsi
    Route::get('/course/{id}', [CourseController::class, 'show'])->name('course.show'); // Nome della rotta per mostrare un corso
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy');

    // Rotte per le lezioni
    Route::get('/lessons', [LessonController::class, 'index'])->name('lessons.index');
});

// Rotta per l'elenco dei corsi (pubblica, non richiede autenticazione)
Route::get('/courses', [CourseController::class, 'index']);

// Rotta per la registrazione di un nuovo utente
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
