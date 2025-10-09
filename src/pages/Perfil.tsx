import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerPerfil } from "../services/auth";
import type { Usuario } from "../services/auth";
import Sidebar from "../components/Sidebar";

function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      const perfil = await obtenerPerfil();
      setUsuario(perfil);
      setNombre(perfil.nombre);
      setEmail(perfil.email);
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = () => {
    // Por ahora solo simula guardado
    // Puedes implementar un endpoint PUT /api/auth/perfil en el backend
    alert("Perfil actualizado (función por implementar en backend)");
    setEditando(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar activeSection="perfil" onSectionChange={() => {}} />
        <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar activeSection="perfil" onSectionChange={() => {}} />
      
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Mi Perfil</h1>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 max-w-2xl">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {usuario?.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{usuario?.nombre}</h2>
              <p className="text-slate-600">{usuario?.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                usuario?.rol === 'admin' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {usuario?.rol === 'admin' ? '👑 Administrador' : '👤 Cajero'}
              </span>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nombre Completo
              </label>
              {editando ? (
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-lg text-slate-800">{usuario?.nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Correo Electrónico
              </label>
              {editando ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="px-4 py-3 bg-slate-50 rounded-lg text-slate-800">{usuario?.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Rol
              </label>
              <p className="px-4 py-3 bg-slate-50 rounded-lg text-slate-800 capitalize">
                {usuario?.rol}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                ID de Usuario
              </label>
              <p className="px-4 py-3 bg-slate-50 rounded-lg text-slate-600 font-mono text-sm">
                {usuario?.id}
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
            {editando ? (
              <>
                <button
                  onClick={handleGuardar}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-semibold shadow-md"
                >
                  ✓ Guardar Cambios
                </button>
                <button
                  onClick={() => {
                    setEditando(false);
                    setNombre(usuario?.nombre || "");
                    setEmail(usuario?.email || "");
                  }}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all font-semibold"
                >
                  ✕ Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditando(true)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold shadow-md"
              >
                ✏️ Editar Perfil
              </button>
            )}
          </div>

          {/* Botón volver */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full mt-4 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;