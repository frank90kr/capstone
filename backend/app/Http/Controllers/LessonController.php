<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::all();
        return response()->json($lessons);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       $lesson = Lesson::with('course_id')->findOrFail($id);
       return response()->json($lesson);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        //
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'language' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'content' => 'required|string',
        ]);
    
        $lesson = new Lesson();
        $lesson->language = $validatedData['language'];
        $lesson->title = $validatedData['title'];
        $lesson->course_id = $validatedData['course_id'];
        $lesson->content = $validatedData['content'];
    
        // Save the lesson
        $lesson->save();
    
        // Optionally, you can return a response or redirect
        return response()->json(['message' => 'Lesson created successfully', 'lesson' => $lesson], 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        //
    }
}
