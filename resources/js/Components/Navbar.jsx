import { Link } from '@inertiajs/react';
import { useTheme } from './ThemeProvider';
import { PrimaryButton } from './Button';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="fixed w-full z-50 bg-slate-50 dark:bg-slate-900 border-b border-gray-200/50 dark:border-slate-700/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <span className="font-heading font-bold text-2xl text-brand-primary tracking-wider">
                                INDEPTH
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center space-x-8">
                        <a href="#home" className="text-sm font-semibold tracking-wide text-gray-700 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-primary transition-colors">
                            Home
                        </a>
                        <a href="#tentang" className="text-sm font-semibold tracking-wide text-gray-700 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-primary transition-colors">
                            Tentang Hipnoterapi
                        </a>
                        <a href="#manfaat" className="text-sm font-semibold tracking-wide text-gray-700 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-primary transition-colors">
                            Manfaat
                        </a>
                        <a href="#faq" className="text-sm font-semibold tracking-wide text-gray-700 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-primary transition-colors">
                            FAQ
                        </a>

                        <div className="h-5 w-px bg-gray-300 dark:bg-gray-700"></div>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-brand-primary dark:text-gray-500 dark:hover:text-brand-primary focus:outline-none transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        <Link href="/contact">
                            <PrimaryButton className="px-6 py-2 shadow-md hover:shadow-brand-primary/40 rounded-full">Reservasi Privat</PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
