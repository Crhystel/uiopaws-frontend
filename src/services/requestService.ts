import api from '../api/axios';
import { Pet } from './petService';

export interface AdoptionRequest {
    id: number;
    user_id: number;
    pet_id: number;
    status: 'pending' | 'approved' | 'rejected';
    message?: string;
    pet?: Pet;
    user?: any; // Define User interface if needed
    created_at: string;
}

export const getRequests = async () => {
    const response = await api.get('/adoption-requests');
    return response.data;
};

export const createRequest = async (petId: number, message?: string) => {
    const response = await api.post('/adoption-requests', { pet_id: petId, message });
    return response.data;
};

export const updateRequestStatus = async (id: number, status: 'approved' | 'rejected') => {
    const response = await api.put(`/adoption-requests/${id}`, { status });
    return response.data;
};
