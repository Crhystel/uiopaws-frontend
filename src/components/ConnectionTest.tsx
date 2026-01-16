import React, { useState } from 'react';
import { authService } from '../services/authService';

const ConnectionTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const testLogin = async () => {
    setIsLoading(true);
    setResult('Probando login con formato JSON de tu API Laravel...');

    try {
      const response = await authService.login({
        email: 'alva@gmail.com',
        password: '123456789'
      });
      
      setResult(`✅ Login Exitoso:\n\n${JSON.stringify(response, null, 2)}\n\nToken guardado en localStorage\nRedirigiendo al dashboard...`);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error: any) {
      console.error('Login test failed:', error);
      
      if (error.error === 'Usuario no encontrado en la base de datos.') {
        setResult(`❌ Error 404: Usuario no encontrado\n\n${error.error}\n\nSolución:\n1. Verifica que el usuario exista en la BD\n2. Revisa el email: alva@gmail.com`);
      } else if (error.message === 'Las credenciales son incorrectas.') {
        setResult(`❌ Error 422: Credenciales incorrectas\n\n${error.message}\n\nSolución:\n1. Verifica la contraseña: 123456789\n2. Revisa el email: alva@gmail.com`);
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        setResult(`❌ Error de Conexión\n\nNo se puede conectar al backend en http://127.0.0.1:8000\n\nSolución:\n1. Inicia Laravel: php artisan serve\n2. Verifica puerto 8000\n3. Configura CORS si es necesario`);
      } else {
        setResult(`❌ Error Desconocido\n\n${error.message || 'Error en el login'}\n\nDetalles: ${JSON.stringify(error, null, 2)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🔧 Test de Login - API Laravel UIO Paws</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={testLogin} 
          disabled={isLoading}
          style={{
            padding: '15px 20px',
            backgroundColor: isLoading ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? 'Probando...' : '🚀 Probar Login Real'}
        </button>
      </div>

      {result && (
        <div style={{
          padding: '15px',
          backgroundColor: result.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          whiteSpace: 'pre-line',
          fontFamily: 'monospace',
          fontSize: '12px',
          marginTop: '15px'
        }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <strong>📋 Configuración:</strong><br />
        &nbsp;&nbsp;• Backend: http://127.0.0.1:8000/api<br />
        &nbsp;&nbsp;• Endpoint: POST /login<br />
        &nbsp;&nbsp;• Formato: JSON<br />
        <br />
        <strong>👤 Credenciales de prueba:</strong><br />
        &nbsp;&nbsp;Email: alva@gmail.com<br />
        &nbsp;&nbsp;Password: 123456789<br />
        <br />
        <strong>🔍 Abre la consola (F12) para ver logs detallados</strong>
      </div>
    </div>
  );
};

export default ConnectionTest;
