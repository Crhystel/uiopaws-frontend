import React from 'react';
import { useAuth } from '../hooks/useAuth';
import ClientPetBrowser from './ClientPetBrowser';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container animate-fade-in">
      {user ? (
        <div>
          <div className="welcome-banner">
            <h1>Hola, {user.first_name}</h1>
            <p>Bienvenido de nuevo a UIO Paws. Tu rol es: {user.role}</p>
            <div style={{ marginTop: '1rem' }}>
              <button onClick={logout} className="btn-secondary">Cerrar Sesión</button>
            </div>
          </div>

          {user.role === 'admin' && (
            <div className="admin-panel shadow-sm" style={{ marginBottom: '2rem' }}>
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Panel de Administración</h3>
              <div className="flex gap-4">
                <Link to="/admin/pets" className="bg-brand text-white px-5 py-2 rounded-lg hover:bg-brand-hover transition-colors shadow-md font-medium">Gestionar Mascotas</Link>
                <Link to="/admin/requests" className="bg-white text-brand border border-brand px-5 py-2 rounded-lg hover:bg-brand-light hover:text-white transition-colors shadow-md font-medium">Gestionar Solicitudes</Link>
              </div>
            </div>
          )}

          <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Adopta un compañero
          </h2>
          <ClientPetBrowser />
        </div>
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Cargando información...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
