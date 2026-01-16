import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { authService } from '../services/authService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userRole = authService.getUserRole();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error en logout:', error);
      navigate('/login');
    }
  };

  return (
    <>
      <Header isAuthenticated={true} />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            ¡Bienvenido a UIO Paws!
          </h1>
          <p className="dashboard-subtitle">
            Rol: {userRole} | Gracias por ser parte de nuestra comunidad
          </p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2 className="card-title">🐾 Ver Animales</h2>
            <p className="card-description">
              Explora nuestros animales disponibles para adopción. Cada uno de ellos 
              está esperando un hogar lleno de amor y cuidado.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/animals')}>
              Ver Animales
            </button>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">🎁 Qué Donar</h2>
            <p className="card-description">
              Tu ayuda es fundamental. Conoce qué artículos necesitas para cuidar 
              de nuestros amigos peludos y cómo puedes contribuir.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/donate')}>
              Ver Donaciones
            </button>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">🤝 Sé Voluntario</h2>
            <p className="card-description">
              Únete a nuestro equipo de voluntarios y marca la diferencia en la 
              vida de muchos animales que necesitan tu ayuda.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/volunteer')}>
              Ser Voluntario
            </button>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">👤 Mi Perfil</h2>
            <p className="card-description">
              Gestiona tu información personal, actualiza tus datos y revisa 
              el estado de tus solicitudes de adopción y voluntariado.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/profile')}>
              Ver Perfil
            </button>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">📋 Mis Solicitudes</h2>
            <p className="card-description">
              Revisa el estado de tus aplicaciones de adopción, voluntariado 
              y donaciones. Mantente informado sobre el progreso.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/my-applications')}>
              Ver Solicitudes
            </button>
          </div>

          <div className="dashboard-card">
            <h2 className="card-title">📞 Contactos de Emergencia</h2>
            <p className="card-description">
              Gestiona tus contactos de emergencia para que podamos comunicarnos 
              rápidamente en caso de ser necesario.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/emergency-contacts')}>
              Gestionar Contactos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
