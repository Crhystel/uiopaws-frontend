import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const { register, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    second_last_name: '',
    document_type: '',
    document_number: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  return (
    <AuthLayout
      title="Únete a la familia"
      subtitle="Completa tus datos para ser parte de UIO Paws"
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-4 mb-6 rounded-xl border border-red-200 text-sm font-medium">
          {error}
        </div>
      )}

      <form className="space-y-8 text-left" onSubmit={handleSubmit}>

        {/* Sección: Información Personal */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-1">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Primer Nombre *" name="first_name" required placeholder="Ej. Ana" value={formData.first_name} onChange={handleChange} />
            <Input label="Segundo Nombre" name="middle_name" placeholder="Ej. María" value={formData.middle_name} onChange={handleChange} />
            <Input label="Apellido Paterno *" name="last_name" required placeholder="Ej. López" value={formData.last_name} onChange={handleChange} />
            <Input label="Apellido Materno" name="second_last_name" placeholder="Ej. Silva" value={formData.second_last_name} onChange={handleChange} />
          </div>
        </div>

        {/* Sección: Identificación y Contacto */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-1">Identificación y Contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold text-brand-dark mb-2">Tipo de Documento *</label>
              <select
                name="document_type"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-gray-700"
                value={formData.document_type}
                onChange={handleChange}
              >
                <option value="">Selecciona...</option>
                <option value="CC">Cédula</option>
                <option value="CE">C. Extranjería</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
            </div>
            <Input label="Número de Documento *" name="document_number" required placeholder="Ej. 1712345678" value={formData.document_number} onChange={handleChange} />
            <Input label="Teléfono de Contacto *" name="phone" type="tel" required placeholder="0991234567" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        {/* Sección: Seguridad de la Cuenta */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-dark border-b border-gray-100 pb-1">Seguridad de la Cuenta</h3>
          <div className="grid grid-cols-1 gap-4">
            <Input label="Correo Electrónico *" name="email" type="email" required placeholder="nombre@ejemplo.com" value={formData.email} onChange={handleChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Contraseña *" name="password" type="password" required placeholder="********" value={formData.password} onChange={handleChange} />
              <Input label="Confirmar Contraseña *" name="password_confirmation" type="password" required placeholder="Confirmar..." value={formData.password_confirmation} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" isLoading={isLoading}>
            Registrarse
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center mt-6">
        <span className="text-gray-600">¿Ya tienes cuenta?</span>
        <Link to="/login" className="ml-2 font-bold text-brand hover:text-brand-dark transition-colors">
          Inicia Sesión
        </Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
