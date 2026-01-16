import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  second_last_name?: string;
  document_type: string;
  document_number: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_role: string;
}

export interface User {
  id_user: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  second_last_name?: string;
  email: string;
  document_type: string;
  document_number: string;
  phone: string;
  profile_photo_url: string;
  is_active: boolean;
  roles: Role[];
}

export interface Role {
  name: string;
  guard_name: string;
}

export interface ValidationError {
  message: string;
  errors: {
    [field: string]: string[];
  };
}

export const authService = {
  // Login de usuario
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with:', credentials.email);
      
      // Enviar login con formato JSON según tu API Laravel
      const response = await api.post('/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      const { access_token, token_type, user_role } = response.data;
      
      console.log('Login successful, token received:', access_token);
      
      // Guardar token y rol en localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_role', user_role);
      
      return response.data;
    } catch (error: any) {
      console.error('Login error details:', error);
      
      // Manejar errores específicos de tu API Laravel
      if (error.response?.status === 404) {
        throw { 
          message: 'Usuario no encontrado en la base de datos.',
          error: error.response.data.error
        };
      }
      
      if (error.response?.status === 422) {
        throw { 
          message: 'Las credenciales son incorrectas.',
          errors: error.response.data.errors
        };
      }
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        throw { 
          message: 'No se puede conectar al servidor. Verifica que el backend esté corriendo en http://127.0.0.1:8000' 
        };
      }
      
      if (error.code === 'ECONNABORTED') {
        throw { 
          message: 'Tiempo de espera agotado. El servidor tarda demasiado en responder.' 
        };
      }
      
      throw error.response?.data || { message: 'Error en el login' };
    }
  },

  // Registro de usuario
  async register(userData: RegisterData): Promise<{ message: string }> {
    try {
      console.log('Attempting registration with:', userData.email);
      const response = await api.post('/register', userData);
      console.log('Registration successful');
      return response.data;
    } catch (error: any) {
      console.error('Registration error details:', error);
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        throw { 
          message: 'No se puede conectar al servidor. Verifica que el backend esté corriendo en http://127.0.0.1:8000' 
        };
      }
      
      if (error.code === 'ECONNABORTED') {
        throw { 
          message: 'Tiempo de espera agotado. El servidor tarda demasiado en responder.' 
        };
      }
      
      throw error.response?.data || { message: 'Error en el registro' };
    }
  },

  // Logout de usuario
  async logout(): Promise<{ message: string }> {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error: any) {
      console.error('Error en logout:', error);
      throw error.response?.data || { message: 'Error en el logout' };
    } finally {
      // Limpiar localStorage siempre
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
    }
  },

  // Obtener perfil de usuario
  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Error obteniendo el perfil' };
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  // Obtener el rol del usuario
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  },

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
};
