import React, { useEffect, useState } from 'react';
import { getRequests, updateRequestStatus, AdoptionRequest } from '../services/requestService';

const AdminRequestManager: React.FC = () => {
    const [requests, setRequests] = useState<AdoptionRequest[]>([]);
    const [error, setError] = useState('');

    const fetchRequests = async () => {
        try {
            const data = await getRequests();
            setRequests(data);
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || 'Error fetching requests';
            setError(msg);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
        try {
            await updateRequestStatus(id, status);
            fetchRequests();
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Solicitudes de Adopción</h1>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Usuario</th>
                            <th className="border p-2">Mascota</th>
                            <th className="border p-2">Mensaje</th>
                            <th className="border p-2">Estado</th>
                            <th className="border p-2">Fecha</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id}>
                                <td className="border p-2">{req.id}</td>
                                <td className="border p-2">{req.user?.name || req.user_id}</td>
                                <td className="border p-2">{req.pet?.name || req.pet_id}</td>
                                <td className="border p-2">{req.message}</td>
                                <td className="border p-2">
                                    <span className={`px-2 py-1 rounded ${req.status === 'approved' ? 'bg-green-200' :
                                        req.status === 'rejected' ? 'bg-red-200' : 'bg-yellow-200'
                                        }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="border p-2">{new Date(req.created_at).toLocaleDateString()}</td>
                                <td className="border p-2">
                                    {req.status === 'pending' && (
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleStatusUpdate(req.id, 'approved')}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors shadow-sm"
                                            >
                                                Aprobar
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(req.id, 'rejected')}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors shadow-sm"
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRequestManager;
