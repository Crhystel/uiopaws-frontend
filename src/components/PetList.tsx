import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Pet {
    id: number;
    name: string;
    type: string;
    status: string;
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await api.get('/pets');
                setPets(response.data);
            } catch (error) {
                console.error("Failed to fetch pets", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <p>Cargando mascotas...</p>;

    return (
        <div className="pet-grid">
            {pets.map(pet => (
                <div key={pet.id} className="glass-panel pet-card">
                    <div className="pet-image-placeholder">
                        {pet.type === 'Dog' ? '🐶' : '🐱'}
                    </div>
                    <div className="pet-info">
                        <div className="pet-name">{pet.name}</div>
                        <div className="pet-type">{pet.type}</div>
                        <span className={`status-badge ${pet.status === 'Available' ? 'status-available' : 'status-adopted'}`}>
                            {pet.status === 'Available' ? 'Disponible' : 'Adoptado'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PetList;
