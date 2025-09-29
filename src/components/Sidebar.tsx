import { useState } from "react";
import { FaHome, FaSignOutAlt, FaChevronDown, FaChevronRight, FaUtensils, FaCreditCard, FaClipboardList, FaTicketAlt, FaTimes, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import usuario from "../assets/usuario.png";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navigate = useNavigate();
  const [isCajaExpanded, setIsCajaExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const cajaSubsections = [
    {
      id: "platos",
      icon: FaUtensils,
      label: "Platos",
      description: "Tomar pedidos"
    },
    {
      id: "pagos",
      icon: FaCreditCard,
      label: "Pagos",
      description: "Registrar pagos"
    },
    {
      id: "pedidos-activos",
      icon: FaClipboardList,
      label: "Pedidos Activos",
      description: "Consultar estado"
    },
    {
      id: "tickets-generados",
      icon: FaTicketAlt,
      label: "Tickets generados",
      description: "Cliente y caja"
    },
    {
      id: "anular-pedidos",
      icon: FaTimes,
      label: "Anular Pedidos",
      description: "Cancelar órdenes"
    },
    {
      id: "reporte-diario",
      icon: FaChartLine,
      label: "Reporte Diario",
      description: "Ventas del día"
    }
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col shadow-xl border-r border-slate-200">
      {/* Header con logo y usuario */}
      <div className="px-6 py-8 border-b border-slate-200 bg-white/50">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">PD</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Pico Dorado</h2>
          </div>
        </div>

        {/* Usuario */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <img
            src={usuario}
            alt="Usuario"
            className="w-12 h-12 rounded-full border-2 border-slate-200 object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-slate-700 text-sm">Caja</p>
            <p className="text-xs text-slate-500">En línea</p>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <nav className="space-y-2">
          {/* Módulo Principal - Caja */}
          <div>
            <button
              onClick={() => setIsCajaExpanded(!isCajaExpanded)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 text-left text-slate-700 hover:bg-white hover:shadow-sm"
            >
              <FaHome className="text-lg text-slate-500" />
              <span className="font-semibold flex-1">Caja</span>
              {isCajaExpanded ? (
                <FaChevronDown className="text-sm text-slate-400" />
              ) : (
                <FaChevronRight className="text-sm text-slate-400" />
              )}
            </button>

            {/* Subsecciones de Caja */}
            {isCajaExpanded && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-200 pl-4">
                {cajaSubsections.map((subsection) => {
                  const Icon = subsection.icon;
                  const isActive = activeSection === subsection.id;
                  
                  return (
                    <button
                      key={subsection.id}
                      onClick={() => onSectionChange(subsection.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left
                        ${isActive 
                          ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-800 shadow-sm' 
                          : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-800'
                        }
                      `}
                    >
                      <Icon 
                        className={`text-base ${
                          isActive ? 'text-amber-600' : 'text-slate-500'
                        }`} 
                      />
                      <div className="flex-1">
                        <span className="font-medium text-sm block">
                          {subsection.label}
                        </span>
                        <span className="text-xs text-slate-400">
                          {subsection.description}
                        </span>
                      </div>
                      
                      {/* Indicador activo */}
                      {isActive && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Sección de estado del sistema */}
        <div className="mt-8 px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <FaHome className="text-white text-sm" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-800">Sistema POS</p>
              <p className="text-xs text-blue-600">Operativo</p>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Footer con logout */}
      <div className="px-4 pb-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;