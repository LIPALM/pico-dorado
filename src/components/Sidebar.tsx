import { FaHome, FaBox, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import usuario from "../assets/usuario.png"; // ← tu imagen de perfil

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-orange-200 flex flex-col justify-between p-6">
      {/* Parte superior */}
      <div>
        {/* Perfil */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="mb-0 text-xl font-bold text-gray-800">Pico Dorado</h2>
          <img
            src={usuario} // ← imagen circular
            alt="Usuario"
            className="w-32 h-32 rounded-full mb-2"
          />
          <p className="text-sm text-gray-600">Bienvenido</p>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-3">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-300 rounded-lg transition text-lg"
          >
            <FaHome className="text-orange-600 text-xl" />
            <span>Caja</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-300 rounded-lg transition text-lg"
          >
            <FaEnvelope className="text-orange-600 text-xl" />
            <span>Próximamente...</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-300 rounded-lg transition text-lg"
          >
            <FaBox className="text-orange-600 text-xl" />
            <span>Próximamente...</span>
          </a>
        </nav>
      </div>

      {/* Parte inferior */}
      <button
        onClick={() => {
          localStorage.removeItem("auth");
          window.location.href = "/login";
        }}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-200 rounded-lg transition text-lg"
      >
        <FaSignOutAlt className="text-red-600 text-xl" />
        <span>Salir</span>
      </button>
    </div>
  );
}

export default Sidebar;
