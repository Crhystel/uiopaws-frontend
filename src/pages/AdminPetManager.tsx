import React, { useEffect, useState } from 'react';
import { getPets, createPet, updatePet, deletePet, Pet } from '../services/petService';

const AdminPetManager: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [formData, setFormData] = useState<Partial<Pet>>({
        name: '', species: '', breed: '', age: 0, description: '', status: 'available', image_url: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [error, setError] = useState('');

    const fetchPets = async () => {
        try {
            const data = await getPets();
            setPets(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const payload = {
            ...formData,
            age: formData.age ? parseInt(String(formData.age)) : undefined,
        };
        try {
            if (isEditing && editId) {
                await updatePet(editId, payload);
            } else {
                await createPet(payload);
            }
            setFormData({ name: '', species: '', breed: '', age: 0, description: '', status: 'available', image_url: '' });
            setIsEditing(false);
            setEditId(null);
            fetchPets();
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || 'Error saving pet';
            const validationErrors = err.response?.data?.errors ? JSON.stringify(err.response?.data?.errors) : '';
            setError(`${msg} ${validationErrors}`);
        }
    };

    const handleEdit = (pet: Pet) => {
        setFormData(pet);
        setIsEditing(true);
        setEditId(pet.id);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deletePet(id);
            fetchPets();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Mascotas</h1>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-gray-50">
                <h2 className="text-xl mb-2">{isEditing ? 'Editar Mascota' : 'Nueva Mascota'}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="border p-2" required />
                    <select name="species" value={formData.species} onChange={handleChange} className="border p-2" required>
                        <option value="">Selecciona Especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                    </select>
                    <input name="breed" placeholder="Raza" value={formData.breed || ''} onChange={handleChange} className="border p-2" />
                    <input name="age" type="number" placeholder="Edad" value={formData.age || ''} onChange={handleChange} className="border p-2" />
                    <select name="status" value={formData.status} onChange={handleChange} className="border p-2">
                        <option value="available">Disponible</option>
                        <option value="adopted">Adoptado</option>
                        <option value="pending">Pendiente</option>
                    </select>
                    <input name="image_url" placeholder="URL Imagen (opcional)" value={formData.image_url || ''} onChange={handleChange} className="border p-2" />
                </div>
                <textarea name="description" placeholder="Descripción" value={formData.description || ''} onChange={handleChange} className="border p-2 w-full mt-2" />
                <button type="submit" className="bg-brand text-white px-6 py-2 rounded-lg hover:bg-brand-hover transition-colors font-semibold shadow-md">
                    {isEditing ? 'Actualizar Mascota' : 'Registrar Mascota'}
                </button>
                {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(false); setFormData({}); }} className="bg-gray-500 text-white px-6 py-2 ml-2 rounded-lg hover:bg-gray-600 transition-colors shadow-md">
                        Cancelar
                    </button>
                )}
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Especie</th>
                            <th className="border p-2">Estado</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map(pet => (
                            <tr key={pet.id}>
                                <td className="border p-2">{pet.id}</td>
                                <td className="border p-2">{pet.name}</td>
                                <td className="border p-2">{pet.species}</td>
                                <td className="border p-2">{pet.status}</td>
                                <td className="border p-3 text-center">
                                    <button onClick={() => handleEdit(pet)} className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-600 transition-colors">Editar</button>
                                    <button onClick={() => handleDelete(pet.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPetManager;
