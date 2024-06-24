<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'user_id', 'rating', 'review'];

    public function course() : BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
