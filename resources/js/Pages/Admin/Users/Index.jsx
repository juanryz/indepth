import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Index({ users, filters, flash }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('admin.users.index'));
    };

    return (
        <AdminLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-heading font-semibold text-xl text-brand-primary dark:text-brand-primary leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route('admin.users.create')}
                        className="px-4 py-2 bg-brand-primary text-slate-900 font-medium rounded-md hover:bg-brand-primary transition-colors"
                    >
                        Create User
                    </Link>
                </div>
            }
        >
            <Head title="Manage Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                            <form onSubmit={handleSearch} className="mb-6 flex gap-4">
                                <input
                                    type="text"
                                    name="search"
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                    placeholder="Search users..."
                                    className="border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-300 focus:border-brand-primary focus:ring-brand-primary rounded-md shadow-sm flex-1 max-w-md"
                                />
                                <button type="submit" className="px-4 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-slate-900 rounded-md hover:bg-gray-700 dark:hover:bg-white transition-colors">
                                    Search
                                </button>
                            </form>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-900">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(user.created_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={route('admin.users.edit', user.id)} className="text-brand-primary hover:text-brand-primary dark:text-brand-primary dark:hover:text-brand-primary mr-4">
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.data.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No users found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Placeholder */}
                            <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                <div>Showing {users.from || 0} to {users.to || 0} of {users.total} results</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
