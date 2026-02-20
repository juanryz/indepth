<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    public function uploadForm(Transaction $transaction)
    {
        // Pastikan transaksi milik pasien yang sedang login dan status masih pending/unpaid
        if ($transaction->user_id !== auth()->id() || $transaction->status !== 'pending') {
            abort(403, 'Akses ditolak atau transaksi tidak valid.');
        }

        return Inertia::render('Clinic/Payments/Upload', [
            'transaction' => $transaction->load('item') // Asumsikan ada relasi polimorfik atau direct ke Booking
        ]);
    }

    public function storeProof(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id() || $transaction->status !== 'pending') {
            abort(403);
        }

        $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');

            $transaction->update([
                'payment_proof' => $path,
                'status' => 'awaiting_validation' // CS akan melihat status ini
            ]);

            return redirect()->route('clinic.booking.show', $transaction->item_id)
                ->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu validasi admin.');
        }

        return back()->with('error', 'Gagal mengunggah file.');
    }
}
