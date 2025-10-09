import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'cajero';
}

export interface LoginResponse {
  message: string;
  token: string;
  usuario: Usuario;
}

export interface RegistroResponse {
  message: string;
  token: string;
  usuario: Usuario;
}

// Login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    localStorage.setItem('auth', 'true'); // Para compatibilidad con tu código actual
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};

// Registrar nuevo usuario
export const registrar = async (
  nombre: string, 
  email: string, 
  password: string, 
  rol?: 'admin' | 'cajero'
): Promise<RegistroResponse> => {
  try {
    const response = await axios.post(`${API_URL}/registro`, {
      nombre,
      email,
      password,
      rol: rol || 'cajero'
    });
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    localStorage.setItem('auth', 'true');
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al registrar usuario');
  }
};

// Obtener perfil del usuario actual
export const obtenerPerfil = async (): Promise<Usuario> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay sesión activa');
    }
    
    const response = await axios.get(`${API_URL}/perfil`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al obtener perfil');
  }
};

// Cerrar sesión
export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('auth');
};

// Verificar si hay sesión activa
export const estaAutenticado = (): boolean => {
  return localStorage.getItem('token') !== null;
};

// Obtener usuario del localStorage
export const obtenerUsuarioLocal = (): Usuario | null => {
  const usuarioString = localStorage.getItem('usuario');
  if (usuarioString) {
    try {
      return JSON.parse(usuarioString);
    } catch {
      return null;
    }
  }
  return null;
};

// Obtener token
export const obtenerToken = (): string | null => {
  return localStorage.getItem('token');
};