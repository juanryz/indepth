import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

export default function PaymentUpload() {
    const { transaction, flash } = usePage().props;
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('payment_proof', file);
        // Method override required by Laravel for FormData PUT/PATCH if needed, but we use POST here
        // formData.append('_method', 'POST'); 

        router.post(route('clinic.payments.storeProof', transaction.id), formData, {
            forceFormData: true,
        });
    };

    return (
        <div className="max-w-3xl mx-auto py-10 sm:px-6 lg:px-8">
            <Head title="Upload Bukti Pembayaran" />

            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Pembayaran Sesi</h1>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8 text-blue-800">
                    <p className="font-semibold text-lg">Total Tagihan: Rp {new Intl.NumberFormat('id-ID').format(transaction.amount)}</p>
                    <p className="mt-2">Silakan transfer ke rekening berikut:</p>
                    <div className="font-mono bg-white p-3 rounded border mt-2 w-max shadow-sm">
                        BCA - 1234567890<br />
                        a/n Klinik Hipnoterapi
                    </div>
                </div>

                {flash?.error && (
                    <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unggah Bukti Transfer (JPG/PNG)</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFileChange}
                            className="mt-2 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            required
                        />
                    </div>

                    {preview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau:</p>
                            <img src={preview} alt="Pratinjau Bukti" className="max-w-xs rounded shadow" />
                        </div>
                    )}

                    <div className="pt-4 border-t">
                        <button
                            type="submit"
                            disabled={!file}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 disabled:opacity-50 transition"
                        >
                            Kirim Bukti Pembayaran
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
