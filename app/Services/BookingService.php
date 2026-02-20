<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
use Exception;

class BookingService
{
    /**
     * Create a new booking preventing race conditions by using a pessimistic lock.
     *
     * @param int $patientId
     * @param int $scheduleId
     * @param array $screeningData
     * @return Booking
     * @throws Exception
     */
    public function createBooking(int $patientId, int $scheduleId, array $screeningData = []): Booking
    {
        return DB::transaction(function () use ($patientId, $scheduleId, $screeningData) {
            // Lock the schedule row for update
            $schedule = Schedule::where('id', $scheduleId)->lockForUpdate()->first();

            if (!$schedule) {
                throw new Exception('Jadwal tidak ditemukan.');
            }

            if (!$schedule->is_available) {
                // If another patient has already claimed it
                throw new Exception('Maaf, slot waktu ini sudah diambil orang lain.');
            }

            // Mark schedule as unavailable
            $schedule->update(['is_available' => false]);

            // Create the booking record
            $booking = Booking::create([
                'patient_id' => $patientId,
                'schedule_id' => $schedule->id,
                'screening_data' => $screeningData,
                'status' => 'pending', // Awaiting payment
            ]);

            // Asumsikan ada Transaction model dan payment logic
            $transaction = \App\Models\Transaction::create([
                'user_id' => $patientId,
                'item_type' => Booking::class,
                'item_id' => $booking->id,
                'amount' => 500000, // Misal harga hardcode sesi
                'status' => 'pending',
                'affiliate_code' => request()->cookie('affiliate_code') // Tarik cookie rujukan referal
            ]);

            return $booking;
        });
    }
}
