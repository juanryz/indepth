import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

export default function BookingCreate() {
    const { availableSchedules, flash } = usePage().props;
    const [step, setStep] = useState(1);

    // Form State
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedScheduleId, setSelectedScheduleId] = useState('');
    const [screening, setScreening] = useState({
        feeling: '',
        goal: '',
        previous_therapy: 'no'
    });

    const handleScreeningChange = (e) => {
        setScreening({ ...screening, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('clinic.booking.store'), {
            schedule_id: selectedScheduleId,
            screening_data: screening
        });
    };

    const dates = Object.keys(availableSchedules);
    const currentSlots = selectedDate ? availableSchedules[selectedDate] : [];

    return (
        <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
            <Head title="Booking Sesi Terapi" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-8">Reservasi Sesi Konseling</h1>

                {flash?.error && (
                    <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
                        {flash.error}
                    </div>
                )}

                {/* Progress Bar Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <span className={`px-4 py-2 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1. Jadwal</span>
                    <span className="w-12 h-1 bg-gray-200 mx-2"></span>
                    <span className={`px-4 py-2 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2. Asesmen Awal</span>
                    <span className="w-12 h-1 bg-gray-200 mx-2"></span>
                    <span className={`px-4 py-2 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3. Konfirmasi</span>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Step 1: Pilih Jadwal */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Pilih Jadwal yang Tersedia</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setSelectedScheduleId(''); // reset slot
                                    }}
                                >
                                    <option value="">-- Pilih Tanggal --</option>
                                    {dates.map(date => <option key={date} value={date}>{date}</option>)}
                                </select>
                            </div>

                            {selectedDate && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Sesi/Terapis</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {currentSlots.map(slot => (
                                            <div
                                                key={slot.id}
                                                onClick={() => setSelectedScheduleId(slot.id)}
                                                className={`p-4 border rounded-lg cursor-pointer transition ${selectedScheduleId === slot.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600' : 'hover:border-blue-400'}`}
                                            >
                                                <div className="font-bold text-lg">{slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}</div>
                                                <div className="text-sm text-gray-600">{slot.therapist.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end mt-8">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={!selectedScheduleId}
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Patient Screening Form */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold border-b pb-2">Formulir Asesmen Awal</h2>
                            <p className="text-gray-500 text-sm">Informasi ini rahasia dan membantu kami menentukan kecocokan sesi untuk Anda.</p>

                            <div>
                                <label className="block font-medium mb-1">Ceritakan secara singkat keluhan utama Anda saat ini</label>
                                <textarea name="feeling" rows="3" required value={screening.feeling} onChange={handleScreeningChange} className="w-full border-gray-300 rounded-md shadow-sm" placeholder="Contoh: Saya sering merasa cemas saat berada di keramaian..."></textarea>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Apa tujuan/harapan Anda mengikuti sesi ini?</label>
                                <textarea name="goal" rows="2" required value={screening.goal} onChange={handleScreeningChange} className="w-full border-gray-300 rounded-md shadow-sm"></textarea>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Apakah sebelumnya pernah mengikuti terapi/konseling?</label>
                                <select name="previous_therapy" value={screening.previous_therapy} onChange={handleScreeningChange} className="w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="no">Belum Pernah</option>
                                    <option value="yes">Pernah</option>
                                </select>
                            </div>

                            {/* Branching Logic Example */}
                            {screening.previous_therapy === 'yes' && (
                                <div className="p-4 bg-gray-50 border rounded mt-4">
                                    <label className="block font-medium mb-1">Boleh ceritakan pengalaman tersebut?</label>
                                    <textarea name="previous_experience" rows="2" onChange={handleScreeningChange} className="w-full border-gray-300 rounded-md shadow-sm"></textarea>
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                <button type="button" onClick={prevStep} className="px-6 py-2 border rounded hover:bg-gray-100">Kembali</button>
                                <button type="button" onClick={nextStep} disabled={!screening.feeling || !screening.goal} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Lanjutkan</button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Konfirmasi */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold border-b pb-2">Konfirmasi Reservasi</h2>

                            <div className="bg-gray-50 p-6 rounded-lg text-lg space-y-4">
                                <div><span className="font-semibold text-gray-600">Jadwal:</span> {selectedDate}</div>
                                <div><span className="font-semibold text-gray-600">ID Sesi Terpilih:</span> {selectedScheduleId}</div>
                                <div><span className="font-semibold text-gray-600">Keluhan:</span> <br />"{screening.feeling}"</div>
                            </div>

                            <p className="text-sm text-gray-500">
                                Dengan menekan tombol Konfirmasi, sistem akan mengunci jadwal ini untuk Anda.
                            </p>

                            <div className="flex justify-between mt-8">
                                <button type="button" onClick={prevStep} className="px-6 py-2 border rounded hover:bg-gray-100">Ubah Data</button>
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded shadow-lg hover:bg-green-700">Konfirmasi & Lanjut Pembayaran</button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}
