import { Navigate } from 'react-router-dom';
import { estaAutenticado } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!estaAutenticado()) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}

export default ProtectedRoute;