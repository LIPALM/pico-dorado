import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";  // ← NUEVO
import { estaAutenticado, cerrarSesion, obtenerUsuarioLocal } from "./services/auth";  // ← NUEVO

function App() {
  const isAuth = estaAutenticado();
  const usuario = obtenerUsuarioLocal();

  const handleCerrarSesion = () => {
    cerrarSesion();
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      {/* ✅ Navbar solo si hay sesión */}
      {isAuth && (
        <nav className="flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white shadow-md">
          <div className="flex gap-6 items-center">
            <Link to="/" className="hover:text-amber-100 font-semibold transition">
              🏠 Inicio
            </Link>
            <Link to="/dashboard" className="hover:text-amber-100 font-semibold transition">
              📊 Dashboard
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {usuario && (
              <span className="text-sm bg-white/20 px-4 py-2 rounded-full">
                👤 {usuario.nombre} ({usuario.rol})
              </span>
            )}
            <button
              onClick={handleCerrarSesion}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              🚪 Cerrar sesión
            </button>
          </div>
        </nav>
      )}

      {/* Rutas */}
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Home />} />
        
        {/* Login: Si ya está autenticado, redirigir al dashboard */}
        <Route 
          path="/login" 
          element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        {/* Dashboard: Ruta protegida */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Ruta por defecto: Redirigir al login si no está autenticado */}
        <Route 
          path="*" 
          element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;