<?php

namespace Database\Seeders;

use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Payment::create([
            'user_id' => 1, 
            'course_id' => 1, 
            'amount' => 99.99,
            'payment_status' => 'completed'
        ]);
    }
}
