import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";  // ← NUEVO
import RecuperarPassword from "./pages/RecuperarPassword";  // ← NUEVO
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";  // ← NUEVO
import ProtectedRoute from "./components/ProtectedRoute";
import { estaAutenticado, cerrarSesion, obtenerUsuarioLocal } from "./services/auth";

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
            <Link to="/perfil" className="hover:text-amber-100 font-semibold transition">
              👤 Mi Perfil
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {usuario && (
              <span className="text-sm bg-white/20 px-4 py-2 rounded-full">
                {usuario.nombre} ({usuario.rol})
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
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        
        <Route 
          path="/login" 
          element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        <Route 
          path="/registro" 
          element={isAuth ? <Navigate to="/dashboard" replace /> : <Registro />} 
        />
        
        <Route 
          path="/recuperar-contraseña" 
          element={isAuth ? <Navigate to="/dashboard" replace /> : <RecuperarPassword />} 
        />
        
        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } 
        />

        {/* Ruta por defecto */}
        <Route 
          path="*" 
          element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;