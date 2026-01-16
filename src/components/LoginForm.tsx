import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validación de email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    // Validación de password
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await authService.login(formData);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Manejar errores específicos de la API Laravel
      if (error.error === 'Usuario no encontrado en la base de datos.') {
        setErrors({ 
          email: 'Usuario no encontrado en la base de datos.',
          general: 'Verifica tu email o regístrate si no tienes cuenta.'
        });
      } else if (error.message === 'Las credenciales son incorrectas.') {
        setErrors({ 
          password: 'Las credenciales son incorrectas.',
          general: 'Revisa tu email y contraseña.'
        });
      } else if (error.errors) {
        // Errores de validación 422
        const fieldErrors: FormErrors = {};
        if (error.errors.email) {
          fieldErrors.email = error.errors.email[0];
        }
        if (error.errors.password) {
          fieldErrors.password = error.errors.password[0];
        }
        setErrors(fieldErrors);
      } else {
        setErrors({ 
          general: error.message || 'Error en el login. Intenta nuevamente.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email Field */}
      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="email" style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#4a5568',
          fontSize: '14px'
        }}>
          Email
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="alva@gmail.com"
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              border: errors.email ? '2px solid #e53e3e' : '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#f7fafc',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            disabled={isLoading}
          />
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
            color: '#a0aec0'
          }}>
            📧
          </span>
        </div>
        {errors.email && (
          <div style={{ 
            color: '#e53e3e', 
            fontSize: '13px', 
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>⚠️</span> {errors.email}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div style={{ marginBottom: '32px' }}>
        <label htmlFor="password" style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#4a5568',
          fontSize: '14px'
        }}>
          Contraseña
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="123456789"
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              border: errors.password ? '2px solid #e53e3e' : '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#f7fafc',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            disabled={isLoading}
          />
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
            color: '#a0aec0'
          }}>
            🔒
          </span>
        </div>
        {errors.password && (
          <div style={{ 
            color: '#e53e3e', 
            fontSize: '13px', 
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>⚠️</span> {errors.password}
          </div>
        )}
      </div>

      {/* General Error */}
      {errors.general && (
        <div style={{ 
          color: '#e53e3e', 
          backgroundColor: '#fed7d7', 
          border: '1px solid #feb2b2',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '24px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>❌</span>
          {errors.general}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '14px 24px',
          backgroundColor: isLoading ? '#a0aec0' : '#48bb78',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isLoading ? 'none' : '0 4px 15px rgba(72, 187, 120, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {isLoading ? (
          <>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Iniciando sesión...
          </>
        ) : (
          <>
            <span>🚀</span>
            Iniciar Sesión
          </>
        )}
      </button>

      {/* Register Link */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <span style={{ color: '#718096', fontSize: '14px' }}>¿No tienes cuenta? </span>
        <a 
          href="/register" 
          style={{ 
            color: '#48bb78', 
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#38a169'}
          onMouseOut={(e) => e.currentTarget.style.color = '#48bb78'}
        >
          Regístrate aquí
        </a>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
};

export default LoginForm;
