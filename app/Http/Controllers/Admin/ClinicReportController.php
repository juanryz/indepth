<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ClinicReportController extends Controller
{
    public function index()
    {
        // Total Omzet dari sesi yang lunas
        $grossRevenue = Transaction::where('item_type', Booking::class)
            ->where('status', 'paid')
            ->sum('amount');

        // Total beban komisi (Kewajiban) yang belum dibayarkan ke affiliate
        $pendingCommissions = DB::table('commissions')
            ->where('status', 'pending')
            ->sum('amount');

        // Laba Kotor Kasar
        $netEstimated = $grossRevenue - $pendingCommissions;

        // Metrik ekstra: jumlah pasien aktif
        $totalBookings = Booking::whereIn('status', ['confirmed', 'completed'])->count();

        return Inertia::render('Admin/Clinic/Reports/Index', [
            'metrics' => [
                'gross_revenue' => $grossRevenue,
                'pending_commissions' => $pendingCommissions,
                'net_estimated' => $netEstimated,
                'total_bookings' => $totalBookings
            ]
        ]);
    }
}
