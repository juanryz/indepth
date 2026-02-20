<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function create()
    {
        // Fetch all available future schedules, grouped by date
        $schedules = Schedule::with('therapist:id,name')
            ->where('is_available', true)
            ->whereDate('date', '>=', Carbon::today())
            ->orderBy('date')
            ->orderBy('start_time')
            ->get()
            ->groupBy('date');

        return Inertia::render('Clinic/Bookings/Create', [
            'availableSchedules' => $schedules
        ]);
    }

    public function store(Request $request, BookingService $bookingService)
    {
        $validated = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'screening_data' => 'required|array', // Validasi kuesioner kelayakan
        ]);

        try {
            $booking = $bookingService->createBooking(
                auth()->id(),
                $validated['schedule_id'],
                $validated['screening_data']
            );

            return redirect()->route('clinic.booking.show', $booking->id)
                ->with('success', 'Booking berhasil! Silakan lanjutkan pembayaran.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function show(Booking $booking)
    {
        if ($booking->patient_id !== auth()->id()) {
            abort(403);
        }

        $booking->load('schedule.therapist');

        return Inertia::render('Clinic/Bookings/Show', [
            'booking' => $booking
        ]);
    }
}
