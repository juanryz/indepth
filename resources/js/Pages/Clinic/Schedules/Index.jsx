import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

export default function ScheduleIndex() {
    const { schedules, flash } = usePage().props;
    const [form, setForm] = useState({
        date: '',
        start_time: '',
        end_time: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('clinic.schedules.store'), form, {
            onSuccess: () => setForm({ date: '', start_time: '', end_time: '' })
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus jadwal ini?')) {
            router.delete(route('clinic.schedules.destroy', id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <Head title="Manajemen Jadwal Terapis" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Manajemen Jadwal</h1>

                {flash?.success && (
                    <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
                        {flash.error}
                    </div>
                )}

                {/* Form Tambah Jadwal */}
                <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-lg bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold border-b pb-2">Tambah Jadwal Baru</h2>
                    <div>
                        <label className="block font-medium">Tanggal</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-medium">Jam Mulai</label>
                            <input type="time" name="start_time" value={form.start_time} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium">Jam Selesai</label>
                            <input type="time" name="end_time" value={form.end_time} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Simpan Jadwal</button>
                </form>

                {/* Tabel Jadwal */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Jadwal Anda (Mendatang)</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left">Tanggal</th>
                                <th className="px-6 py-3 text-left">Waktu</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {schedules.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td className="px-6 py-4">{schedule.date}</td>
                                    <td className="px-6 py-4">{schedule.start_time} - {schedule.end_time}</td>
                                    <td className="px-6 py-4">
                                        {schedule.is_available ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Tersedia</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Dipesan</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        <button
                                            onClick={() => handleDelete(schedule.id)}
                                            disabled={!schedule.is_available}
                                            className="text-red-600 hover:text-red-900 focus:outline-none"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {schedules.length === 0 && <p className="mt-4 text-gray-500">Belum ada jadwal yang dibuat.</p>}
                </div>
            </div>
        </div>
    );
}
