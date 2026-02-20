import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ stats }) {
    return (
        <AdminLayout
            header={
                <h2 className="font-heading font-semibold text-xl text-brand-primary dark:text-brand-primary leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100 font-sans">
                            <h3 className="text-2xl font-heading font-bold text-brand-primary dark:text-brand-primary mb-2">
                                Welcome to Indepth Admin
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                This dashboard gives you an overview of platform activity. Select a module from the navigation above to manage specific resources.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Users Stat */}
                        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-brand-primary dark:bg-brand-primary text-brand-primary dark:text-brand-primary">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Users</dt>
                                        <dd>
                                            <div className="text-lg font-bold text-slate-900 dark:text-slate-50">{stats?.users || 0}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        {/* Additional placeholder stats */}
                        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-brand-primary dark:bg-brand-primary text-brand-primary dark:text-brand-primary">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Programs</dt>
                                        <dd>
                                            <div className="text-lg font-bold text-slate-900 dark:text-slate-50">{stats?.programs || 0}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
