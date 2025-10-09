import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrar } from "../services/auth";
import loginIcon from "../assets/usuario.png"; // Usa la misma imagen o crea una nueva
import platoLogin from "../assets/icono.png";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await registrar(nombre, email, password, 'cajero');
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: "url('/src/assets/fondo-login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Columna izquierda: Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10">
          <img src={loginIcon} alt="Registro" className="w-20 h-30 mb-2" />

          <h1 className="text-lg font-semibold text-gray-800 tracking-widest mb-6">
            R E G I S T R O
          </h1>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Nombre Completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={3}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm transition"
            />

            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm transition"
            />

            <input
              type="password"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm transition"
            />

            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm transition"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-medium text-gray-800 bg-orange-100 hover:bg-orange-200 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? "Registrando..." : "Crear Cuenta"}
            </button>
          </form>

          {/* Enlace a login */}
          <div className="mt-6 text-center">
            <div className="flex items-center gap-2 justify-center text-sm text-gray-600">
              <span>¿Ya tienes cuenta?</span>
              <Link 
                to="/login" 
                className="text-orange-500 hover:text-orange-600 font-semibold transition"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha: Imagen plato */}
        <div className="hidden md:flex md:w-4/5 bg-gray-50 items-center justify-center">
          <img src={platoLogin} alt="Plato" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Registro;