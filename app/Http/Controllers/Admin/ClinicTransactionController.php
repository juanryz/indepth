<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ClinicTransactionController extends Controller
{
    public function index()
    {
        // Ambil semua transaksi klinik (misalnya item_type = App\Models\Booking)
        $transactions = Transaction::where('item_type', Booking::class)
            ->whereIn('status', ['awaiting_validation', 'paid', 'failed'])
            ->with(['user:id,name,email'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Clinic/Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    public function approve(Transaction $transaction)
    {
        if ($transaction->status !== 'awaiting_validation') {
            return back()->with('error', 'Transaksi tidak dalam status menunggu validasi.');
        }

        DB::transaction(function () use ($transaction) {
            $transaction->update(['status' => 'paid']);

            // Update status booking jika item_type adalah Booking
            if ($transaction->item_type === Booking::class) {
                Booking::where('id', $transaction->item_id)->update(['status' => 'confirmed']);
            }

            // NOTE: Di sini nanti Listener Event AffiliateCommission akan dipicu
        });

        return back()->with('success', 'Pembayaran berhasil dikonfirmasi.');
    }

    public function reject(Transaction $transaction)
    {
        if ($transaction->status !== 'awaiting_validation') {
            return back()->with('error', 'Transaksi tidak dalam status menunggu validasi.');
        }

        DB::transaction(function () use ($transaction) {
            $transaction->update(['status' => 'failed']);

            if ($transaction->item_type === Booking::class) {
                Booking::where('id', $transaction->item_id)->update(['status' => 'cancelled']);
            }
        });

        return back()->with('success', 'Pembayaran ditolak. Pasien perlu mengunggah ulang atau membatalkan booking.');
    }
}
