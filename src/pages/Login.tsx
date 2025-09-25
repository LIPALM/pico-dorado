import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginIcon from "../assets/login.png";   // ← tu imagen del usuario
import platoLogin from "../assets/icono.png"; // ← tu imagen del plato

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 700));

    if (email === "leo40lipa@gmail.com" && password === "123456") {
      localStorage.setItem("auth", "true");
      setLoading(false);
      navigate("/dashboard");
    } else {
      setLoading(false);
      setError("Credenciales inválidas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Columna izquierda: Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10">
          {/* Imagen login arriba */}
          <img src={loginIcon} alt="Login" className="w-20 h-30 mb-2" />

          <h1 className="text-lg font-semibold text-gray-800 tracking-widest mb-6">
            L O G I N
          </h1>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-black text-sm"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-black text-sm"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-sm py-3 flex items-center justify-center rounded-md font-medium text-gray-800 bg-orange-100 hover:bg-orange-200 transition"

            >
              {loading ? "Ingresando..." : "L o g i n"}
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center my-6 w-full max-w-sm">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div>

          {/* Botón Google */}
          <button className="w-32 max-w-sm py-3 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-sm font-medium text-gray-700 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>
        </div>

        {/* Columna derecha: Imagen plato */}
        <div className="hidden md:flex md:w-4/5 bg-gray-50 items-center justify-center">
          <img src={platoLogin} alt="Plato" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Login;
