<?php

namespace App\Listeners;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RewardAffiliateCommission
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        // Event ini asumsikan menerima object Transaction yang bari di bayar (contoh di lempar di ClinicTransactionController)
        $transaction = $event->transaction ?? $event;

        if ($transaction->status === 'paid' && $transaction->affiliate_code) {

            // Cari Affiliate / User pemilik code tersebut
            $affiliate = User::where('affiliate_code', $transaction->affiliate_code)->first();

            if ($affiliate && $affiliate->id !== $transaction->user_id) {
                // Hitung komisi (Misalnya 10% dari transaksi)
                $commissionAmount = $transaction->amount * 0.10;

                DB::table('commissions')->insert([
                    'affiliate_id' => $affiliate->id,
                    'transaction_id' => $transaction->id,
                    'amount' => $commissionAmount,
                    'status' => 'pending', // Pending hingga siap diwithdraw
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
