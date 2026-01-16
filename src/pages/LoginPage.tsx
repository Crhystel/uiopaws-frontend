import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#f8f9fa'
      }}>
        {/* Columna izquierda - Imagen */}
        <div style={{
          flex: '1',
          backgroundImage: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Elementos decorativos */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '150px',
            height: '150px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%'
          }} />
          
          {/* Contenido */}
          <div style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              UIO PAWS
            </h1>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '30px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Plataforma de adopción y cuidado animal<br />
              Encuentra tu compañero perfecto
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginTop: '40px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>500+</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Animales rescatados</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>300+</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Adopciones exitosas</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>50+</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Voluntarios</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          backgroundColor: 'white'
        }}>
          <div style={{ width: '100%', maxWidth: '450px' }}>
            {/* Logo/Icono */}
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#48bb78',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 30px',
              boxShadow: '0 10px 25px rgba(72, 187, 120, 0.3)'
            }}>
              <span style={{ fontSize: '2rem', color: 'white' }}>🐾</span>
            </div>

            {/* Título */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '10px'
              }}>
                Bienvenido
              </h2>
              <p style={{
                color: '#718096',
                fontSize: '1rem'
              }}>
                Inicia sesión para continuar
              </p>
            </div>

            {/* Formulario */}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
