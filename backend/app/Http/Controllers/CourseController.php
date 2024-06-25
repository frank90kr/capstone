<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::all();
        return response()->json($courses);
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
   
    //Prendo i 3 metodi presenti nel Model Course
        $course = Course::with('payments', 'users', 'lessons')->findOrFail($id);
        return response()->json($course);
    }

    //Creazione nuovo corso
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'course_img' => 'nullable|image|max:2048',
            'youtube_video' => 'nullable|string'
           
        ]);

        if ($request->hasFile('course_img')) {
            $imagePath = $request->file('course_img')->store('course_images', 'public');
            $validatedData['image'] = "storage/".$imagePath;
        }
        
        $creatorName = Auth::user()->name;
              
        $course = new Course();
        $course->fill($validatedData);
        $course->creator_name = $creatorName;
        $course->creator_id = Auth::id(); 

        // Se è stato fornito un video YouTube, salva il link completo
        if ($request->has('youtube_video')) {
            $course->youtube_video = $request->youtube_video;
        }

        $course->save();

        return response()->json($course, 201);
    }

    public function update(Request $request, $id)
    {
        // Validazione dei dati
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            
        ]);

        // Trova il corso da aggiornare
        // $course = Course::findOrFail($id);

        $course = Course::find($id);   
        
        $creator_id = Auth::user()->id;
        error_log($course);
      
        
        if ($creator_id !== $course->creator_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Aggiorna i campi del corso con i dati validati
        $course->title = $validatedData['title'];
        $course->description = $validatedData['description'];
        $course->price = $validatedData['price'];

        // Salva le modifiche
        $course->save();

        // Ritorna una risposta di successo
        return response()->json($course, 200);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        
       $course = Course::find($id);   
        
        $creator_id = Auth::user()->id;
        error_log($course);
      
        
        if ($creator_id !== $course->creator_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Rimuovi il corso
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }

    
}
