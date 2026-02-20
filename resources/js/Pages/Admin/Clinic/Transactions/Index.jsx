import React from 'react';
import { Head, router } from '@inertiajs/react';

export default function CSValidationIndex({ transactions }) {

    const handleAction = (id, actionType) => {
        const message = actionType === 'approve' ? 'Setujui pembayaran ini?' : 'Tolak pembayaran ini?';

        if (confirm(message)) {
            router.post(route(`clinic.admin.transactions.${actionType}`, id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <Head title="Validasi Pembayaran Klinik" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Antrean Validasi Pembayaran (Customer Service)</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl / ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bukti</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.data.map((trx) => (
                                <tr key={trx.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(trx.created_at).toLocaleDateString('id-ID')}
                                        <br />
                                        <span className="text-xs text-gray-400">#{trx.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{trx.user.name}</div>
                                        <div className="text-sm text-gray-500">{trx.user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        Rp {new Intl.NumberFormat('id-ID').format(trx.amount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {trx.status === 'awaiting_validation' && <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Menunggu Validasi</span>}
                                        {trx.status === 'paid' && <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Lunas</span>}
                                        {trx.status === 'failed' && <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Ditolak</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {trx.payment_proof ? (
                                            <a href={`/storage/${trx.payment_proof}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Lihat Gambar</a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {trx.status === 'awaiting_validation' ? (
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={() => handleAction(trx.id, 'approve')} className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded">Terima</button>
                                                <button onClick={() => handleAction(trx.id, 'reject')} className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Tolak</button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Selesai</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination controls logic goes here relying on transactions.links */}
            </div>
        </div>
    );
}
