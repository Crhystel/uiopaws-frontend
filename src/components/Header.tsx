import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

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
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            UIO Paws
          </Link>
        </div>
        
        <nav className="nav-menu">
          <Link to="/animals" className="nav-link">
            Ver Animales
          </Link>
          <Link to="/donate" className="nav-link">
            Qué Donar
          </Link>
          <Link to="/volunteer" className="nav-link">
            Sé Voluntario
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="nav-link">
              Mi Perfil
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          )}
        </nav>
        
        <div className="header-actions">
          {isAuthenticated ? (
            <button 
              className="btn btn-outline"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/register" className="btn btn-primary">
              Registrarse
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
