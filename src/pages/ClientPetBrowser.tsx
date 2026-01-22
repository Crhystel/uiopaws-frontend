import React, { useEffect, useState } from 'react';
import { getPets, Pet } from '../services/petService';
import { createRequest } from '../services/requestService';

const ClientPetBrowser: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

    const fetchPets = async () => {
        const manualPets: Pet[] = [
            {
                id: 1,
                name: 'Max',
                species: 'Perro',
                breed: 'Golden Retriever',
                age: 2,
                description: 'Max es un Golden Retriever lleno de energía y amor. Le encanta jugar con la pelota y es excelente con los niños.',
                status: 'available',
                image_url: '/golden-retriever-4390884_1280.jpg'
            },
            {
                id: 2,
                name: 'Luna',
                species: 'Gato',
                breed: 'Siamés',
                age: 1,
                description: 'Luna es una gata curiosa y cariñosa. Le gusta observar por la ventana y dormir en lugares soleados.',
                status: 'available',
                image_url: '/gato-6598701_1280.jpg'
            }
        ];

        try {
            const data = await getPets('available');
            // Combine API pets with manual pets, avoiding duplicates if possible or just prepending
            setPets([...manualPets, ...data]);
        } catch (err) {
            console.error(err);
            // Fallback to manual pets if API fails
            setPets(manualPets);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handleAdoptClick = (pet: Pet) => {
        setSelectedPet(pet);
        setShowModal(true);
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitRequest = async () => {
        if (!selectedPet) return;
        setIsLoading(true);
        try {
            await createRequest(selectedPet.id, message);
            setAlert({ msg: 'Solicitud enviada correctamente', type: 'success' });
            setShowModal(false);
            setMessage('');
            setSelectedPet(null);

            // Auto hide alert after 3 seconds
            setTimeout(() => setAlert(null), 3000);
        } catch (err: any) {
            setAlert({ msg: err.response?.data?.message || 'Error al enviar solicitud', type: 'error' });
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream relative overflow-hidden">
            {/* Alert Toast */}
            {alert && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-down ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                    <span className="text-2xl">{alert.type === 'success' ? '🎉' : '⚠️'}</span>
                    <p className="font-bold">{alert.msg}</p>
                    <button onClick={() => setAlert(null)} className="ml-4 text-gray-500 hover:text-gray-700 font-bold">✕</button>
                </div>
            )}

            {/* Background Blobs */}
            <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-brand-light rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 blur-[60px] animate-float -z-10"></div>
            <div className="absolute bottom-[10%] -left-[5%] w-[350px] h-[350px] bg-[#95D5B2] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50 blur-[60px] animate-float delay-2000 -z-10"></div>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32">
                <div className="container mx-auto px-4 z-10 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white border border-brand text-brand-dark font-bold shadow-sm">
                                <span className="text-xl">🌱</span>
                                <span className="text-sm tracking-wide">BIENVENIDO A UIO PAWS</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-6">
                                Encuentra felicidad <br />
                                en <span className="relative inline-block z-10">
                                    cuatro patas.
                                    <span className="absolute bottom-2 left-[-5px] w-[105%] h-[25px] bg-brand opacity-50 -z-10 transform -rotate-2 rounded-full"></span>
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 font-medium mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Miles de historias esperan un nuevo comienzo.
                                Adopta, dona y transforma una vida hoy mismo.
                            </p>
                            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                                <button className="bg-gradient-to-br from-brand to-brand-accent text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_25px_rgba(116,198,157,0.4)] hover:-translate-y-1 hover:brightness-105 transition-all">
                                    🐾 Adoptar Ahora
                                </button>
                                <button className="bg-white/80 backdrop-blur-sm border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-dark hover:text-white hover:-translate-y-1 transition-all">
                                    Ser Voluntario
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-4">
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-[url('https://randomuser.me/api/portraits/women/44.jpg')] bg-cover"></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-[url('https://randomuser.me/api/portraits/men/32.jpg')] bg-cover"></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-[url('https://randomuser.me/api/portraits/women/65.jpg')] bg-cover"></div>
                                </div>
                                <div>
                                    <p className="font-bold text-brand-dark leading-none">+120 Adoptantes</p>
                                    <small className="text-gray-500">Felices este mes</small>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="lg:w-1/2 text-center relative">
                            <div className="relative inline-block p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Mascota feliz"
                                    className="rounded-[40px] transform rotate-3 border-8 border-white shadow-[0_25px_50px_rgba(27,67,50,0.15)] max-w-full h-auto"
                                />
                                {/* Floating Card */}
                                <div className="hidden md:flex absolute bottom-8 left-0 bg-white p-4 rounded-2xl shadow-lg items-center gap-3 border-l-4 border-brand animate-float">
                                    <div className="bg-green-50 p-2 rounded-full text-brand">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                    </div>
                                    <div className="text-left leading-tight">
                                        <div className="font-bold text-sm text-gray-800">100% Verificado</div>
                                        <small className="text-gray-500 text-xs">Refugios seguros</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pet Grid Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-brand-dark mb-4">Nuestros Amigos</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Ellos están esperando por ti. Conoce a los pequeños que buscan un hogar lleno de amor.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pets.map(pet => (
                        <div key={pet.id} className="bg-white rounded-[30px] p-6 shadow-[0_10px_30px_rgba(27,67,50,0.03)] border border-brand/10 hover:-translate-y-2 hover:border-brand hover:shadow-[0_20px_40px_rgba(116,198,157,0.2)] transition-all duration-300">
                            <div className="h-64 relative cursor-pointer group rounded-2xl overflow-hidden mb-6" onClick={() => handleAdoptClick(pet)}>
                                <img
                                    src={pet.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800'}
                                    alt={pet.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-brand-dark shadow-sm">
                                    {pet.species}
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-brand-dark mb-1">{pet.name}</h2>
                                    <p className="text-gray-500 text-sm font-medium">{pet.breed} • {pet.age ? `${pet.age} años` : 'Edad desconocida'}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${pet.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {pet.status === 'available' ? 'Disponible' : pet.status}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">{pet.description}</p>

                            <button
                                onClick={() => handleAdoptClick(pet)}
                                className="w-full bg-gradient-to-r from-brand to-brand-accent text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span>🐾</span> Quiero Adoptarlo
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedPet && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl animate-fade-in-up my-8">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="w-full md:w-1/2">
                                <img
                                    src={selectedPet.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800'}
                                    alt={selectedPet.name}
                                    className="w-full h-64 object-cover rounded-xl shadow-md"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl font-bold mb-2 text-gray-800">{selectedPet.name}</h2>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-sm font-semibold">{selectedPet.species}</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">{selectedPet.breed}</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">{selectedPet.age ? `${selectedPet.age} años` : 'Edad desconocida'}</span>
                                </div>
                                <h3 className="font-bold text-gray-700 mb-2">Sobre mí:</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">{selectedPet.description || 'Sin descripción disponible.'}</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Solicitud de Adopción</h3>
                            <p className="mb-4 text-gray-600">¿Por qué quieres adoptar a {selectedPet.name}?</p>
                            <textarea
                                className="w-full border border-gray-200 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all resize-none"
                                rows={3}
                                placeholder="Cuéntanos sobre tu hogar y estilo de vida..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmitRequest}
                                    disabled={isLoading}
                                    className={`bg-brand text-white px-8 py-2.5 rounded-lg font-bold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-hover'}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Confirmar Adopción'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientPetBrowser;
