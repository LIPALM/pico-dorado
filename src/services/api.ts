import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Ticket {
  _id?: string;
  numero: number;
  plato: string;
  categoria: string;
  cantidad: number;
  refresco: string;
  descripcion?: string;
  metodoPago: string;
  total: number;
  fecha: string;
  hora: string;
  estado: 'En Preparación' | 'Listo' | 'Entregado';
  activo: boolean;
  createdAt?: Date;
}

// Crear un nuevo ticket
export const crearTicket = async (ticketData: Omit<Ticket, 'numero' | '_id' | 'createdAt' | 'activo'>): Promise<Ticket> => {
  const response = await axios.post(`${API_URL}/tickets`, ticketData);
  return response.data;
};

// Obtener todos los tickets
export const obtenerTodosTickets = async (): Promise<Ticket[]> => {
  const response = await axios.get(`${API_URL}/tickets/todos`);
  return response.data;
};

// Obtener tickets activos
export const obtenerTicketsActivos = async (): Promise<Ticket[]> => {
  const response = await axios.get(`${API_URL}/tickets/activos`);
  return response.data;
};

// Actualizar estado del ticket
export const actualizarEstadoTicket = async (numero: number, estado: string): Promise<Ticket> => {
  const response = await axios.patch(`${API_URL}/tickets/${numero}/estado`, { estado });
  return response.data;
};

// Anular ticket
export const anularTicket = async (numero: number): Promise<any> => {
  const response = await axios.patch(`${API_URL}/tickets/${numero}/anular`);
  return response.data;
};

// Obtener reporte diario
export const obtenerReporteDiario = async (): Promise<any> => {
  const response = await axios.get(`${API_URL}/tickets/reporte-diario`);
  return response.data;
};