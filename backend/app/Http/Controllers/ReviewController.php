<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($courseId)
    {

        // $course = Course::with('payments', 'users', 'lessons')->findOrFail($id);
        // return response()->json($course);

        // Ottieni tutte le recensioni per il corso specificato
        $reviews = Review::with('user')->where('course_id', $courseId)->get();
        return response()->json($reviews);
    }

    public function store(Request $request, $courseId)
    {
        // Validazione dei dati ricevuti dal frontend
        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
        ]);

        // Crea una nuova recensione
        $review = new Review();
        $review->user_id = auth()->user()->id; // ID dell'utente autenticato
        $review->course_id = $courseId;
        $review->rating = $validatedData['rating'];
        $review->review = $validatedData['review'];
        $review->save();

        return response()->json($review);
    }
}
