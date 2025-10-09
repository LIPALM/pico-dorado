import { useState } from "react";
import { Link } from "react-router-dom";
import loginIcon from "../assets/login.png";
import platoLogin from "../assets/icono.png";

function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular envío de email (puedes implementar esto en el backend más adelante)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setEnviado(true);
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
          <img src={loginIcon} alt="Recuperar" className="w-20 h-30 mb-2" />

          <h1 className="text-lg font-semibold text-gray-800 tracking-widest mb-2">
            RECUPERAR CONTRASEÑA
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Ingresa tu email y te enviaremos instrucciones
          </p>

          {!enviado ? (
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                {loading ? "Enviando..." : "Enviar Instrucciones"}
              </button>
            </form>
          ) : (
            <div className="w-full max-w-sm">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-md text-sm mb-4">
                <p className="font-semibold mb-1">✅ Email enviado</p>
                <p>Revisa tu correo electrónico para restablecer tu contraseña.</p>
              </div>
            </div>
          )}

          {/* Enlace a login */}
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-gray-600 hover:text-orange-500 transition flex items-center justify-center gap-2"
            >
              <span>←</span>
              <span>Volver al login</span>
            </Link>
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

export default RecuperarPassword;