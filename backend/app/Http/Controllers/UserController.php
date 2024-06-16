<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function checkAuthentication()
    {
        // Verifica se l'utente è autenticato
        if (Auth::check()) {
            return response()->json(['authenticated' => true], 200);
        }

        return response()->json(['authenticated' => false], 401);
    }
}
