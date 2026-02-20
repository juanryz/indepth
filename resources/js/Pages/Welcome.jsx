import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
    SparklesIcon,
    ShieldCheckIcon,
    ArrowTrendingUpIcon,
    ArrowPathIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

// --- Reusable Framer Motion Variants ---
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

const textRevealItem = {
    hidden: { opacity: 0, y: 100, rotate: 2 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
};

const fadeUpItem = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Welcome({ canLogin, canRegister }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: containerRef });

    // Smooth out the scroll progress for parallax
    const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100, mass: 0.5 });

    // Core Parallax Transforms
    const heroY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

    // Custom Cursor tracking (Luxury detail)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHoveringLink, setIsHoveringLink] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);

        // Add listeners to links for custom cursor effects
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => setIsHoveringLink(true));
            el.addEventListener('mouseleave', () => setIsHoveringLink(false));
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', () => setIsHoveringLink(true));
                el.removeEventListener('mouseleave', () => setIsHoveringLink(false));
            });
        };
    }, []);

    const benefits = [
        { title: "Anxiety & Stress", desc: "Melepaskan ketegangan mental dan fisik akibat tekanan hidup modern secara mendalam.", icon: ShieldCheckIcon },
        { title: "Trauma Healing", desc: "Memproses luka masa lalu dan fobia tanpa harus mengalami kembali trauma tersebut.", icon: SparklesIcon },
        { title: "Peak Performance", desc: "Meningkatkan kepercayaan diri, fokus, dan motivasi untuk pencapaian eksklusif.", icon: ArrowTrendingUpIcon },
        { title: "Habit Control", desc: "Menghentikan kebiasaan buruk langsung dari akarnya dengan akurasi klinis.", icon: ArrowPathIcon }
    ];

    return (
        <div
            ref={containerRef}
            className="h-screen overflow-y-auto overflow-x-hidden bg-[#000000] text-white selection:bg-luxury-gold-500 selection:text-black font-sans scroll-smooth"
            style={{ perspective: "1000px" }}
        >
            <Head title="Indepth | Eksklusif Mental Wellness" />

            {/* Custom Luxury Cursor (Follows Mouse) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold-500 pointer-events-none z-[100] mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHoveringLink ? 2.5 : 1,
                    backgroundColor: isHoveringLink ? "rgba(212, 175, 55, 1)" : "rgba(212, 175, 55, 0)",
                    borderWidth: isHoveringLink ? "0px" : "1px",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />

            <Navbar />

            {/* Section 1: Massive Hero (Antikode/Premium Style) */}
            <section className="relative h-[200vh]">
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
                    className="sticky top-0 h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-20 overflow-hidden"
                >
                    {/* Atmospheric Lighting */}
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-luxury-gold-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/4 -translate-y-1/4"></div>

                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full max-w-7xl mx-auto z-10">
                        {/* Eyebrow */}
                        <motion.div variants={fadeUpItem} className="overflow-hidden mb-8">
                            <span className="inline-block font-heading tracking-[0.2em] text-xs sm:text-sm uppercase text-luxury-gold-500 font-bold border border-luxury-gold-500/30 px-6 py-2 rounded-full backdrop-blur-md">
                                Exclusive Clinical Hypnotherapy
                            </span>
                        </motion.div>

                        {/* Massive Typography - Masked Reveal */}
                        <div className="space-y-[-2vw]">
                            <div className="overflow-hidden py-4">
                                <motion.h1 variants={textRevealItem} className="text-[12vw] sm:text-[9vw] leading-[0.85] font-heading font-black tracking-tighter text-white">
                                    TEMUKAN
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden py-4 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
                                <motion.h1 variants={textRevealItem} className="text-[12vw] sm:text-[9vw] leading-[0.85] font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-300 via-luxury-gold-500 to-luxury-gold-700">
                                    KEDAMAIAN
                                </motion.h1>
                                <motion.p variants={fadeUpItem} className="text-gray-400 font-sans font-medium text-lg sm:text-2xl max-w-sm leading-relaxed mt-4 sm:mt-0 xl:max-w-md">
                                    Dari dalam. Lepaskan beban pikiran Anda bersama ahli kami.
                                </motion.p>
                            </div>
                        </div>

                        {/* Interactive Magnetic CTA */}
                        <motion.div variants={fadeUpItem} className="mt-16 sm:mt-24">
                            <Link href="/contact" className="group inline-flex items-center gap-6">
                                <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-luxury-gold-500/50 group-hover:bg-luxury-gold-500 transition-colors duration-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-luxury-gold-500 scale-0 group-hover:scale-100 rounded-full origin-center transition-transform duration-500 ease-out"></div>
                                    <ChevronDownIcon className="w-8 h-8 text-luxury-gold-500 group-hover:text-black relative z-10 -rotate-90 group-hover:translate-x-2 transition-all duration-300" />
                                </div>
                                <span className="font-heading text-xl sm:text-3xl tracking-wide uppercase group-hover:text-luxury-gold-400 transition-colors duration-300">
                                    Reservasi Privat
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 2: Kinetic Typography & Philosophy */}
            <section id="tentang" className="relative z-20 py-32 sm:py-48 px-4 sm:px-8 lg:px-16 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start"
                    >
                        <motion.div variants={textRevealItem} className="lg:col-span-4">
                            <h2 className="text-5xl sm:text-6xl font-heading font-bold text-white leading-none">
                                Apa Itu <br />
                                <span className="text-luxury-gold-500">Hipnoterapi?</span>
                            </h2>
                        </motion.div>

                        <motion.div variants={fadeUpItem} className="lg:col-span-8 lg:pl-16">
                            <p className="text-2xl sm:text-4xl text-gray-300 font-sans leading-tight font-medium">
                                "Banyak orang salah memahami hipnoterapi sebagai kehilangan kendali."
                            </p>
                            <p className="mt-10 text-xl sm:text-2xl text-gray-500 font-sans leading-relaxed">
                                Kenyataannya, ini adalah kondisi relaksasi yang sangat dalam dan terfokus. Anda <strong className="text-white font-normal">tetap memegang kendali penuh</strong>, namun pikiran bawah sadar Anda menjadi lebih terbuka menerima saran positif untuk melepaskan pola pikir lama.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section 3: The Benefits (Bento Grid / Apple Style Interaction) */}
            <section id="manfaat" className="py-32 px-4 sm:px-8 lg:px-16 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-6xl font-heading font-bold text-white mb-20 text-center uppercase tracking-wider"
                    >
                        Transformasi <span className="text-luxury-gold-500">Nyata</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="group relative h-[400px] rounded-[2rem] bg-[#111] border border-white/5 overflow-hidden flex flex-col justify-end p-8"
                            >
                                {/* Immersive background glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Icon floats down to center on hover */}
                                <motion.div
                                    className="absolute top-8 right-8 text-luxury-gold-500 group-hover:scale-150 group-hover:-translate-x-[50%] group-hover:translate-y-[100%] transition-all duration-700 ease-in-out opacity-20 group-hover:opacity-5"
                                >
                                    <benefit.icon className="w-32 h-32" />
                                </motion.div>

                                <div className="relative z-10">
                                    <benefit.icon className="w-10 h-10 text-luxury-gold-400 mb-6 group-hover:-translate-y-2 transition-transform duration-300" />
                                    <h3 className="text-2xl font-bold font-heading text-white mb-4">{benefit.title}</h3>
                                    <p className="text-gray-400 font-sans leading-relaxed group-hover:text-gray-200 transition-colors">
                                        {benefit.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Luxury Experience (Fullscreen Image Reveal) */}
            <section className="relative h-screen bg-black flex items-center px-4 sm:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Luxury minimal interior" className="w-full h-full object-cover opacity-20 filter grayscale blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-2xl"
                    >
                        <motion.h2 variants={textRevealItem} className="text-5xl sm:text-7xl font-heading font-black text-white mb-8 leading-tight">
                            Privasi & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600">Kenyamanan.</span>
                        </motion.h2>
                        <motion.p variants={fadeUpItem} className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-sans border-l-2 border-luxury-gold-500 pl-6">
                            Setiap sesi dilakukan di ruang yang nyaman, rahasia terjamin sepenuhnya, dan pendekatan yang <span className="text-white italic">tailor-made</span> khusus untuk tiap individu, bukan metode massal.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Section 5: The Final CTA (Hyper-minimalist) */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#000] text-center px-4 py-32 border-t border-white/5">
                {/* Massive animated background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] select-none">
                    <h1 className="text-[20vw] font-black font-heading tracking-tighter text-luxury-gold-500 whitespace-nowrap">
                        INDEPTH
                    </h1>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="relative z-10"
                >
                    <motion.h2 variants={textRevealItem} className="text-5xl sm:text-7xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter mb-12">
                        Mulai <br /> Langkah <span className="text-luxury-gold-500 font-serif italic normal-case tracking-normal">pertama.</span>
                    </motion.h2>

                    <motion.div variants={fadeUpItem}>
                        <Link href="/contact" className="group relative inline-flex items-center justify-center">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 blur-[20px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full"></span>
                            <span className="relative inline-flex px-14 py-6 bg-black border border-luxury-gold-500/50 text-white rounded-full font-heading uppercase tracking-widest font-bold text-lg group-hover:bg-luxury-gold-500 group-hover:text-black transition-all duration-500 items-center gap-4">
                                Hubungi Konselor
                                <ChevronDownIcon className="w-5 h-5 -rotate-90 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
