<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'patient_id',
        'schedule_id',
        'screening_data',
        'status',
    ];

    protected $casts = [
        'screening_data' => 'array',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
