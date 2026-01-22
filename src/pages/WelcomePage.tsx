import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-cream relative overflow-x-hidden font-poppins selection:bg-brand selection:text-white">
            {/* Background Blobs - Adjusted to match screenshot subtle positions */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-100/40 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-light/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/4 -z-10"></div>

            {/* Navbar */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-50">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🐾</span> {/* Placeholder for Logo Icon */}
                    <span className="text-2xl font-black text-brand-dark tracking-tight">UIO<span className="text-brand">Paws</span></span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 text-sm">
                    <a href="#" className="hover:text-brand transition-colors">Ver Animales</a>
                    <a href="#" className="hover:text-brand transition-colors">Qué Donar</a>
                    <a href="#" className="hover:text-brand transition-colors">Sé Voluntario</a>

                    <div className="h-4 w-px bg-gray-300 mx-2"></div>

                    <Link to="/login" className="hover:text-brand-dark transition-colors font-bold text-brand-dark">
                        Iniciar Sesión
                    </Link>
                    <Link to="/register" className="bg-brand hover:bg-brand-hover text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-brand/30 transition-all transform hover:-translate-y-0.5">
                        Registrarse
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-12 lg:pt-20 pb-20">
                <div className="container mx-auto px-6 z-10 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-brand text-brand-dark font-extrabold text-xs tracking-wider shadow-sm uppercase">
                                <span className="text-lg">🌱</span>
                                <span>Bienvenido a UIO Paws</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black text-brand-dark leading-[1.1] mb-6 tracking-tight">
                                Encuentra felicidad <br />
                                en <span className="relative inline-block z-10 text-brand-dark">
                                    cuatro patas.
                                    <svg className="absolute w-[105%] h-[30px] -bottom-2 -left-1 -z-10 text-brand opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99996C2.00025 6.99996 36.3149 -2.57141 99.4299 1.99996C162.545 6.57133 198.001 2.00001 198.001 2.00001" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
                                </span>
                            </h1>

                            <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Miles de historias esperan un nuevo comienzo.
                                Adopta, dona y transforma una vida hoy mismo.
                            </p>

                            <div className="flex gap-4 justify-center lg:justify-start items-center">
                                <Link to="/login" className="bg-brand text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-brand/40 hover:bg-brand-hover hover:-translate-y-1 transition-all flex items-center gap-2">
                                    <span>🐾</span> Adoptar Ahora
                                </Link>
                                <button className="bg-transparent border-2 border-brand-dark text-brand-dark px-8 py-3.5 rounded-full font-bold text-lg hover:bg-brand-dark hover:text-white hover:-translate-y-1 transition-all">
                                    Ser Voluntario
                                </button>
                            </div>

                            {/* Stats Tiny */}
                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-4">
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/44.jpg')" }}></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/men/32.jpg')" }}></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/65.jpg')" }}></div>
                                </div>
                                <div>
                                    <p className="font-extrabold text-brand-dark text-sm leading-none mb-0.5">+120 Adoptantes</p>
                                    <small className="text-gray-400 font-medium text-xs">Felices este mes</small>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Mascota feliz"
                                    className="rounded-[3rem] border-8 border-white shadow-2xl w-full max-w-lg mx-auto"
                                />
                                {/* Floating Card */}
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 pr-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-4 animate-float border-l-4 border-brand">
                                    <div className="bg-brand-light p-3 rounded-full text-brand-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 leading-tight">100% Verificado</p>
                                        <p className="text-xs text-gray-500 font-medium">Refugios seguros</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements behind image */}
                            <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200 rounded-full blur-xl opacity-60 -z-10 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works Section (Snippet) */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-4">¿Cómo funciona?</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-16">Tu camino para cambiar una vida es natural y sencillo.</p>

                    {/* Just placeholders for visual completeness based on screenshot bottom edge */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 blur-[1px]">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm h-64"></div>
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm h-64"></div>
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm h-64"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WelcomePage;
