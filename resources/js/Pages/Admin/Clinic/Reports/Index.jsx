import React from 'react';
import { Head } from '@inertiajs/react';

export default function ClinicReportDashboard({ metrics }) {

    const formatRp = (number) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number);

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <Head title="Laporan & Keuangan Klinik" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                    Dashboard Keuangan Klinik
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Gross Revenue Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow">
                        <h3 className="text-blue-100 font-medium text-sm tracking-wide uppercase">Total Omzet Kasar</h3>
                        <p className="text-2xl font-bold mt-2">{formatRp(metrics.gross_revenue)}</p>
                    </div>

                    {/* Pending Commissions Card */}
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow">
                        <h3 className="text-red-100 font-medium text-sm tracking-wide uppercase">Beban Komisi Afiliasi (Tertunda)</h3>
                        <p className="text-2xl font-bold mt-2">{formatRp(metrics.pending_commissions)}</p>
                    </div>

                    {/* Net Estimated Card */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow">
                        <h3 className="text-green-100 font-medium text-sm tracking-wide uppercase">Estimasi Pendapatan Bersih</h3>
                        <p className="text-2xl font-bold mt-2">{formatRp(metrics.net_estimated)}</p>
                    </div>

                    {/* Active Patients Card */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow">
                        <h3 className="text-purple-100 font-medium text-sm tracking-wide uppercase">Total Pasien Aktif / Selesai</h3>
                        <p className="text-3xl font-bold mt-2">{metrics.total_bookings} <span className="text-lg font-normal">Sesi</span></p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-sm text-gray-500">
                    <p>* Catatan: Beban komisi adalah potongan bagi jaringan pengarah yang berhasil mendatangkan pasien baru melalui URL rujukan mereka dan terverifikasi melakukan pembayaran penuh.</p>
                </div>
            </div>
        </div>
    );
}
