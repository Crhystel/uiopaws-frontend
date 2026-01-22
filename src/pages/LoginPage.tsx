import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      navigate('/dashboard');
    } catch (err) {
      // Error handled by AuthContext or ignored
    }
  };

  return (
    <AuthLayout
      title="Bienvenido"
      subtitle="Ingresa a tu cuenta para continuar"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Contraseña"
          name="password"
          type="password"
          placeholder="........"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <div className="pt-2">
          <Button type="submit" isLoading={isLoading}>
            Iniciar Sesión
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
