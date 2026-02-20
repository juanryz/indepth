import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans tracking-wide transition-colors duration-300">
            <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/admin">
                                    <span className="font-heading font-bold text-xl text-brand-primary tracking-wider">
                                        INDEPTH ADMIN
                                    </span>
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link
                                    href="/admin"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out hover:text-brand-primary focus:outline-none focus:border-brand-primary 
                                    ${window.location.pathname === '/admin' ? 'border-brand-primary text-brand-primary dark:text-brand-primary' : 'border-transparent text-gray-500 dark:text-gray-400'}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out hover:text-brand-primary focus:outline-none focus:border-brand-primary 
                                    ${window.location.pathname.startsWith('/admin/users') ? 'border-brand-primary text-brand-primary dark:text-brand-primary' : 'border-transparent text-gray-500 dark:text-gray-400'}`}
                                >
                                    Users
                                </Link>
                                {/* Future Links will go here */}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {/* Settings Dropdown Placeholder */}
                            <div className="ml-3 relative">
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 hover:text-brand-primary focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {auth?.user?.name || 'Admin User'}
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-slate-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
