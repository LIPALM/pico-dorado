import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PedidoCard from "../components/PedidoCard";
import ModalPedido from "../components/ModalPedido";
import type { PedidoData } from "../components/ModalPedido";
import TicketDetail from "../components/TicketDetail";

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
    refresco: string;
    descripcion?: string;
    metodoPago: string;
    total: number;
    fecha: string;
    hora: string;
    estado: "En Preparación" | "Listo" | "Entregado";
  }>>([]);

  // Estado para el modal de detalles del ticket
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<typeof fichas[0] | null>(null);
  
  // Estado para el filtro de pedidos activos
  const [filtroEstado, setFiltroEstado] = useState<"Todos" | "En Preparación" | "Listo">("Todos");

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
    
    const ahora = new Date();
    const nuevaFicha = {
      numero: nuevoNumero,
      plato: pedidoData.plato,
      categoria: pedidoData.categoria,
      cantidad: pedidoData.cantidad,
      refresco: pedidoData.refresco,
      descripcion: pedidoData.descripcion,
      metodoPago: pedidoData.metodoPago,
      total: pedidoData.total,
      fecha: ahora.toLocaleDateString(),
      hora: ahora.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }),
      estado: "En Preparación" as const,
    };

    setFichas((prev) => [...prev, nuevaFicha]);
    return nuevoNumero;
  };

  // Función para cambiar el estado de un pedido
  const handleCambiarEstado = (numeroTicket: number, nuevoEstado: "En Preparación" | "Listo" | "Entregado") => {
    setFichas(fichas.map(ficha => 
      ficha.numero === numeroTicket 
        ? { ...ficha, estado: nuevoEstado }
        : ficha
    ));
  };

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case "platos":
        return (
          <div>
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
        const pedidosActivos = fichas.filter(f => f.estado !== "Entregado");
        const pedidosFiltrados = filtroEstado === "Todos"
          ? pedidosActivos
          : pedidosActivos.filter(f => f.estado === filtroEstado);
          
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Pedidos Activos</h1>

            {/* Filtros */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setFiltroEstado("Todos")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filtroEstado === "Todos"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Todos ({pedidosActivos.length})
              </button>
              <button
                onClick={() => setFiltroEstado("En Preparación")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filtroEstado === "En Preparación"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                En Preparación ({pedidosActivos.filter(f => f.estado === "En Preparación").length})
              </button>
              <button
                onClick={() => setFiltroEstado("Listo")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filtroEstado === "Listo"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Listos ({pedidosActivos.filter(f => f.estado === "Listo").length})
              </button>
            </div>

            {/* Lista de pedidos */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              {pedidosFiltrados.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg">No hay pedidos activos</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Los pedidos aparecerán aquí cuando se tomen
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidosFiltrados.map((ficha, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-xl p-6 shadow-sm transition-all ${
                        ficha.estado === "En Preparación"
                          ? "bg-blue-50 border-blue-200"
                          : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-lg font-bold text-slate-800">
                              TICKET #{String(ficha.numero).padStart(3, "0")}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              ficha.estado === "En Preparación"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-green-200 text-green-800"
                            }`}>
                              {ficha.estado}
                            </span>
                            <span className="text-sm text-slate-500">
                              {ficha.hora}
                            </span>
                          </div>
                  
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            {ficha.plato} - {ficha.categoria}
                          </h3>
                  
                          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                            <div>
                              <span className="font-semibold">Cantidad:</span> {ficha.cantidad}
                            </div>
                            <div>
                              <span className="font-semibold">Refresco:</span> {ficha.refresco}
                            </div>
                          </div>

                          {ficha.descripcion && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-3">
                              <p className="text-xs text-yellow-700 font-semibold mb-1">
                                ⚠️ Notas Especiales:
                              </p>
                              <p className="text-sm text-slate-700">{ficha.descripcion}</p>
                            </div>
                          )}
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col gap-3 ml-6">
                          {ficha.estado === "En Preparación" && (
                            <button
                              onClick={() => handleCambiarEstado(ficha.numero, "Listo")}
                              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-semibold shadow-md hover:shadow-lg"
                            >
                              ✓ Marcar como Listo
                            </button>
                          )}
                          {ficha.estado === "Listo" && (
                            <button
                              onClick={() => handleCambiarEstado(ficha.numero, "Entregado")}
                              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold shadow-md hover:shadow-lg"
                            >
                              ✓ Marcar como Entregado
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "tickets-generados":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Fichas Generadas</h1>
            
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
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full">
                              TICKET #{String(ficha.numero).padStart(3, "0")}
                            </span>
                            <span className="text-xs text-slate-500">
                              {ficha.fecha} - {ficha.hora}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-1">
                            {ficha.plato} - {ficha.categoria}
                          </h3>
                          <div className="flex gap-4 text-sm text-slate-600">
                            <span>Cantidad: {ficha.cantidad}</span>
                            <span>|</span>
                            <span>Refresco: {ficha.refresco}</span>
                            <span>|</span>
                            <span>Pago: {ficha.metodoPago}</span>
                          </div>
                          <p className="text-lg font-bold text-amber-700 mt-2">
                            Total: Bs. {ficha.total}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setTicketSeleccionado(ficha);
                            setIsTicketDetailOpen(true);
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                        >
                          Ver Detalles
                        </button>
                      </div>  
                    </div>
                  ))}
                </div>
              )}

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
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {renderContent()}
      </div>

      <ModalPedido
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plato={platoSeleccionado}
        onFinalizarPedido={handleFinalizarPedido}
      />
    
      <TicketDetail
        isOpen={isTicketDetailOpen}
        onClose={() => setIsTicketDetailOpen(false)}
        ticket={ticketSeleccionado}
      />
    </div>
  );
}

export default Dashboard;