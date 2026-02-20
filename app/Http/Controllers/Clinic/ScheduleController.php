<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::where('therapist_id', auth()->id())
            ->whereDate('date', '>=', Carbon::today())
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Clinic/Schedules/Index', [
            'schedules' => $schedules
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        Schedule::create([
            'therapist_id' => auth()->id(),
            'date' => $validated['date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'is_available' => true,
        ]);

        return redirect()->back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function destroy(Schedule $schedule)
    {
        if ($schedule->therapist_id !== auth()->id() || !$schedule->is_available) {
            abort(403, 'Akses ditolak atau jadwal sudah dibooking.');
        }

        $schedule->delete();

        return redirect()->back()->with('success', 'Jadwal berhasil dihapus.');
    }
}
