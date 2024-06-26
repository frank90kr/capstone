<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorePaymentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }

    //Funzione per il pagamento
    public function processPayment(Request $request)
    {
        // Valida i dati ricevuti
        $validatedData = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        // Simula la logica di pagamento fittizio
        $paymentStatus = 'success'; 

        // Crea nuovo pagamento
        $payment = Payment::create([
            'user_id' => Auth::id(),
            'course_id' => $validatedData['course_id'],
            'amount' => $validatedData['amount'],
            'payment_status' => $paymentStatus,
        ]);

        // risposta JSON fittizia
        return response()->json([
            'status' => $paymentStatus,
            'payment' => $payment,
        ]);
    }
//Verifica se l'utente ha già acquistato il corso
    public function checkPurchase(Request $request)
    {
        $userId = Auth::id();
        $courseId = $request->input('course_id');

        $hasPurchased = Payment::where('user_id', $userId)
                                ->where('course_id', $courseId)
                                ->exists();

        return response()->json(['hasPurchased' => $hasPurchased]);
    }
}
