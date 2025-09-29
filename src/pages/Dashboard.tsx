import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PedidoCard from "../components/PedidoCard";
import ModalPedido from "../components/ModalPedido";
import type { PedidoData } from "../components/ModalPedido";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("platos");
  
  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<{
    nombre: string;
    precio: string;
    imagen: string;
  } | null>(null);
  
  // Estado de fichas registradas con detalles
  const [fichas, setFichas] = useState<Array<{
    numero: number;
    plato: string;
    categoria: string;
    cantidad: number;
    metodoPago: string;
    total: number;
    fecha: string;
  }>>([]);
  
  // Lista de platos disponibles
  const pedidos = [
    {
      id: 1,
      imagen: "/platos/Pollo-Broaster3.png",
      nombre: "Pollo Broaster",
      precio: "Bs. 14",
      estado: "Disponible" as const,
    },
    { 
      id: 2,
      imagen: "/platos/Pollo-Broaster3.png",
      nombre: "Pollo al Spiedo",
      precio: "Bs. 18",
      estado: "Disponible" as const,
    },
    {
      id: 3,
      imagen: "/platos/pipocas.png",
      nombre: "Pipocas",
      precio: "Bs. 24",
      estado: "Agotado" as const,
    },
    {
      id: 4,
      imagen: "/platos/alitas-de-pollo.png",
      nombre: "Alitas de Pollo",
      precio: "Bs. 24",
      estado: "Agotado" as const,
    },
    {
      id: 5,
      imagen: "/platos/salchipapa.png",
      nombre: "Salchipapa",
      precio: "Bs. 24",
      estado: "Disponible" as const,
    },
  ];

  // Función al seleccionar un plato - abre el modal
  const handleSeleccionar = (pedido: typeof pedidos[0]) => {
    setPlatoSeleccionado({
      nombre: pedido.nombre,
      precio: pedido.precio,
      imagen: pedido.imagen,
    });
    setIsModalOpen(true);
  };

  // Función para finalizar el pedido y generar ticket
  const handleFinalizarPedido = (pedidoData: PedidoData): number => {
    const nuevoNumero = fichas.length > 0 ? Math.max(...fichas.map(f => f.numero)) + 1 : 1;
    
    const nuevaFicha = {
      numero: nuevoNumero,
      plato: pedidoData.plato,
      categoria: pedidoData.categoria,
      cantidad: pedidoData.cantidad,
      metodoPago: pedidoData.metodoPago,
      total: pedidoData.total,
      fecha: new Date().toLocaleDateString(),
    };

    setFichas((prev) => [...prev, nuevaFicha]);
    return nuevoNumero;
  };

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case "platos":
        return (
          <div>
            {/*<h1 className="text-3xl font-bold mb-6 text-slate-800">Tomar Pedido - Menú</h1>*/}

            {/* Cards de platos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pedidos.map((pedido) => (
                <PedidoCard
                  key={pedido.id}
                  imagen={pedido.imagen}
                  nombre={pedido.nombre}
                  precio={pedido.precio}
                  estado={pedido.estado}
                  onSeleccionar={() => handleSeleccionar(pedido)}
                />
              ))}
            </div>
          </div>
        );

      case "pagos":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Registro de Pagos</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-center">
                Módulo de pagos en desarrollo...
              </p>
              <p className="text-sm text-slate-500 text-center mt-2">
                Aquí se registrarán los diferentes métodos de pago (efectivo, tarjeta, QR)
              </p>
            </div>
          </div>
        );

      case "pedidos-activos":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Pedidos Activos</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-center">
                Consulta de pedidos activos en desarrollo...
              </p>
              <p className="text-sm text-slate-500 text-center mt-2">
                Aquí se mostrarán los pedidos en preparación y listos para entregar
              </p>
            </div>
          </div>
        );

      case "tickets-generados":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Fichas Generadas</h1>
            
            {/* Listado de fichas */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">
                Tickets Registrados Hoy
              </h2>
              
              {fichas.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg">No hay fichas generadas</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Las fichas aparecerán aquí cuando tomes pedidos
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fichas.map((ficha, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-xs text-amber-600 font-semibold block mb-1">
                            TICKET - {String(ficha.numero).padStart(3, "0")}
                          </span>
                          <h3 className="text-xl font-bold text-slate-800">
                            {ficha.plato}: {ficha.categoria}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Cantidad: {ficha.cantidad}</p>
                          <p className="text-xs text-slate-500">total: {ficha.total}</p>
                          <p className="text-xs text-slate-500">Pago: {ficha.metodoPago}</p>
                          <p className="text-xs text-slate-400">{ficha.fecha}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resumen */}
              {fichas.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">
                      Total de tickets generados:
                    </span>
                    <span className="text-2xl font-bold text-amber-600">
                      {fichas.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "anular-pedidos":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Anular Pedidos</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-center">
                Anulación de pedidos en desarrollo...
              </p>
              <p className="text-sm text-slate-500 text-center mt-2">
                Aquí se podrán cancelar pedidos antes de su preparación
              </p>
            </div>
          </div>
        );

      case "reporte-diario":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Reporte Diario</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-center">
                Reporte de ventas en desarrollo...
              </p>
              <p className="text-sm text-slate-500 text-center mt-2">
                Aquí se mostrará el resumen de ventas diarias para cierre de caja
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Dashboard</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-center">Selecciona una opción del menú</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Modal de pedido */}
      <ModalPedido
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plato={platoSeleccionado}
        onFinalizarPedido={handleFinalizarPedido}
      />
    </div>
  );
}

export default Dashboard;