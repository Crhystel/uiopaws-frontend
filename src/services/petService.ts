import api from '../api/axios';

export interface Pet {
    id: number;
    name: string;
    species: string;
    breed?: string;
    age?: number;
    description?: string;
    status: 'available' | 'adopted' | 'pending';
    image_url?: string;
}

export const getPets = async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get('/pets', { params });
    return response.data;
};

export const getPet = async (id: number) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
};

export const createPet = async (petData: Partial<Pet>) => {
    const response = await api.post('/pets', petData);
    return response.data;
};

export const updatePet = async (id: number, petData: Partial<Pet>) => {
    const response = await api.put(`/pets/${id}`, petData);
    return response.data;
};

export const deletePet = async (id: number) => {
    const response = await api.delete(`/pets/${id}`);
    return response.data;
};
