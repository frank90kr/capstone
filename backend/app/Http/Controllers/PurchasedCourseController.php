<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Course; // Assicurati di importare correttamente il modello dei corsi

class PurchasedCourseController extends Controller
{
    public function index()
    {
        // Verifica che l'utente sia autenticato
        if (!auth()->check()) {
            return response()->json(['message' => 'Utente non autenticato'], 401);
        }

        // Recupera i pagamenti dell'utente corrente
        $payments = Payment::where('user_id', auth()->id())->get();

        // Recupera i corsi acquistati attraverso i pagamenti
        $purchasedCourses = [];
        foreach ($payments as $payment) {
            $course = Course::find($payment->course_id);
            if ($course) {
                $purchasedCourses[] = $course;
            }
        }

        return response()->json($purchasedCourses);
    }
}
