<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use HasFactory;

    // public $timestamps = false;

    protected $fillable = [
        'title', 
        'description', 
        'price', 
        'creator_id',
        'image',
    ];

    //Creatore del corso

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    public function users() : BelongsTo
    {
        return $this->belongsTo(User::class); //relazione uno a molti
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
