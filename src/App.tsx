import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // Verificar si el usuario está logueado
  const isLoggedIn = localStorage.getItem("auth") === "true";

  return (
    <BrowserRouter>
      {/* ✅ Navbar solo si hay sesión */}
      {isLoggedIn && (
        <nav className="flex gap-4 bg-yellow-600 p-4 text-white">
          <Link to="/">Inicio</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button
            onClick={() => {
              localStorage.removeItem("auth"); // Cerrar sesión
              window.location.href = "/login"; // Redirigir
            }}
            className="hover:text-yellow-300"
          >
            Cerrar sesión
          </button>
        </nav>
      )}

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
