import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PedidoCard from "../components/PedidoCard";
import ModalPedido from "../components/ModalPedido";
import type { PedidoData } from "../components/ModalPedido";
import TicketDetail from "../components/TicketDetail";
import * as api from "../services/api";
import type { Ticket } from "../services/api";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("platos");
  const navigate = useNavigate();
  
  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platoSeleccionado, setPlatoSeleccionado] = useState<{
    nombre: string;
    precio: string;
    imagen: string;
  } | null>(null);

  // Estado de fichas desde la API
  const [fichas, setFichas] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  // Estado para el modal de detalles del ticket
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<Ticket | null>(null);
  
  // Estado para el filtro de pedidos activos
  const [filtroEstado, setFiltroEstado] = useState<"Todos" | "En Preparación" | "Listo">("Todos");

  // Estados para anulación de pedidos
  const [mostrarModalAnular, setMostrarModalAnular] = useState(false);
  const [pedidoAAnular, setPedidoAAnular] = useState<Ticket | null>(null);
  const [motivoAnulacion, setMotivoAnulacion] = useState("");

  // Cargar tickets al montar el componente
  useEffect(() => {
    cargarTickets();
  }, []);

  // Funcion para cargar tickets desde la API
  const cargarTickets = async () => {
    try {
      setLoading(true);
      const tickets = await api.obtenerTodosTickets();
      setFichas(tickets);
    } catch (error) {
      console.error("Error al cargar tickets:", error);
      alert("Error al cargar los tickets desde el servidor");
    } finally {
      setLoading(false);
    }
  };

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

  // Función para finalizar el pedido y guardar en la API
  const handleFinalizarPedido = async (pedidoData: PedidoData): Promise<number> => {
    try {
      const nuevoTicket = await api.crearTicket({
        plato: pedidoData.plato,
        categoria: pedidoData.categoria,
        cantidad: pedidoData.cantidad,
        refresco: pedidoData.refresco,
        descripcion: pedidoData.descripcion,
        metodoPago: pedidoData.metodoPago,
        total: pedidoData.total,
        fecha: pedidoData.fecha,
        hora: pedidoData.hora,
        estado: "En Preparación"
      });

      // Recargar tickets
      await cargarTickets();
      
      return nuevoTicket.numero;
    } catch (error) {
      console.error("Error al crear ticket:", error);
      alert("Error al guardar el ticket en el servidor");
      return 0;
    }
  };

  // Función para cambiar el estado de un pedido
  const handleCambiarEstado = async (numeroTicket: number, nuevoEstado: "En Preparación" | "Listo" | "Entregado") => {
    try {
      await api.actualizarEstadoTicket(numeroTicket, nuevoEstado);
      await cargarTickets(); // Recargar tickets
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error al actualizar el estado del ticket");
    }
  };

  // Función para anular pedido
  const handleAnularPedido = async () => {
    if (pedidoAAnular && motivoAnulacion.trim()) {
      try {
        await api.anularTicket(pedidoAAnular.numero);
        await cargarTickets(); // Recargar tickets
        
        // Limpiar y cerrar
        setMostrarModalAnular(false);
        setPedidoAAnular(null);
        setMotivoAnulacion("");
      } catch (error) {
        console.error("Error al anular pedido:", error);
        alert("Error al anular el pedido");
      }
    }
  };

  const handleImprimirReporte = () => {
    window.print();
  };

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Cargando...</p>
          </div>
        </div>
      );
    }

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

      case "pedidos-activos":
        const pedidosActivos = fichas.filter(f => f.estado !== "Entregado" && f.activo);
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
        const pedidosAnulables = fichas.filter(f => f.estado !== "Entregado" && f.activo);

        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Anular Pedidos</h1>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">
                Pedidos Activos Disponibles para Anular
              </h2>

              {pedidosAnulables.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg">No hay pedidos para anular</p>
                  <p className="text-slate-400 text-sm mt-2">
                    Solo se pueden anular pedidos que no estén entregados
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidosAnulables.map((ficha, index) => (
                    <div
                      key={index}
                      className="border-2 border-slate-200 rounded-xl p-6 hover:border-red-300 hover:bg-red-50 transition-all"
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
                          
                          <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                            <div>
                              <span className="font-semibold">Cantidad:</span> {ficha.cantidad}
                            </div>
                            <div>
                              <span className="font-semibold">Refresco:</span> {ficha.refresco}
                            </div>
                            <div>
                              <span className="font-semibold">Total:</span> Bs. {ficha.total}
                            </div>
                          </div>
                        </div>
                          
                        <button
                          onClick={() => {
                            setPedidoAAnular(ficha);
                            setMostrarModalAnular(true);
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-md hover:shadow-lg"
                        >
                          Anular Pedido
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal de confirmación */}
            {mostrarModalAnular && pedidoAAnular && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Confirmar Anulación
                  </h2>
            
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-sm text-red-700 font-semibold mb-2">
                      ¿Está seguro de anular este pedido?
                    </p>
                    <p className="text-sm text-slate-700">
                      Ticket #{String(pedidoAAnular.numero).padStart(3, "0")} - {pedidoAAnular.plato}
                    </p>
                  </div>
            
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Motivo de anulación *
                    </label>
                    <textarea
                      value={motivoAnulacion}
                      onChange={(e) => setMotivoAnulacion(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
                      rows={3}
                      placeholder="Ejemplo: Cliente cambió de opinión, error en el pedido, etc."
                    />
                  </div>
            
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setMostrarModalAnular(false);
                        setPedidoAAnular(null);
                        setMotivoAnulacion("");
                      }}
                      className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAnularPedido}
                      disabled={!motivoAnulacion.trim()}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                        motivoAnulacion.trim()
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Confirmar Anulación
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "reporte-diario":
        const pedidosValidos = fichas.filter(f => f.activo);
        const pedidosAnulados = fichas.filter(f => !f.activo);

        const totalVentas = pedidosValidos.reduce((sum, f) => sum + f.total, 0);
        const totalPedidos = pedidosValidos.length;

        const ventasPorMetodo = pedidosValidos.reduce((acc, f) => {
          acc[f.metodoPago] = (acc[f.metodoPago] || 0) + f.total;
          return acc;
        }, {} as Record<string, number>);

        const pedidosPorEstado = {
          "En Preparación": pedidosValidos.filter(f => f.estado === "En Preparación").length,
          "Listo": pedidosValidos.filter(f => f.estado === "Listo").length,
          "Entregado": pedidosValidos.filter(f => f.estado === "Entregado").length,
        };

        const platosMasVendidos = pedidosValidos.reduce((acc, f) => {
          const key = f.plato;
          if (!acc[key]) {
            acc[key] = { cantidad: 0, total: 0 };
          }
          acc[key].cantidad += f.cantidad;
          acc[key].total += f.total;
          return acc;
        }, {} as Record<string, { cantidad: number; total: number }>);

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-800">Reporte de Ventas Diarias</h1>
              <button
                onClick={handleImprimirReporte}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold shadow-md"
              >
                🖨️ Imprimir Reporte
              </button>
            </div>

            {/* Resumen General */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
                <p className="text-sm text-green-600 font-semibold mb-2">Total Recaudado</p>
                <p className="text-4xl font-bold text-green-700">Bs. {totalVentas.toFixed(2)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                <p className="text-sm text-blue-600 font-semibold mb-2">Pedidos Completados</p>
                <p className="text-4xl font-bold text-blue-700">{totalPedidos}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 shadow-sm">
                <p className="text-sm text-amber-600 font-semibold mb-2">Ticket Promedio</p>
                <p className="text-4xl font-bold text-amber-700">
                  Bs. {totalPedidos > 0 ? (totalVentas / totalPedidos).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>

            {/* Ventas por método de pago */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">Ventas por Método de Pago</h2>
              <div className="space-y-3">
                {Object.entries(ventasPorMetodo).map(([metodo, monto]) => (
                  <div key={metodo} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {metodo === "Efectivo" ? "💵" : metodo === "QR" || metodo.includes("QR") ? "📱" : "💳"}
                      </span>
                      <span className="font-semibold text-slate-700">{metodo}</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800">Bs. {monto.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pedidos por estado */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">Estado de Pedidos</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-sm text-blue-600 font-semibold mb-1">En Preparación</p>
                  <p className="text-3xl font-bold text-blue-700">{pedidosPorEstado["En Preparación"]}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-sm text-green-600 font-semibold mb-1">Listos</p>
                  <p className="text-3xl font-bold text-green-700">{pedidosPorEstado["Listo"]}</p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                  <p className="text-sm text-amber-600 font-semibold mb-1">Entregados</p>
                  <p className="text-3xl font-bold text-amber-700">{pedidosPorEstado["Entregado"]}</p>
                </div>
              </div>
            </div>

            {/* Platos más vendidos */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">Platos Más Vendidos</h2>
              <div className="space-y-3">
                {Object.entries(platosMasVendidos)
                  .sort((a, b) => b[1].cantidad - a[1].cantidad)
                  .map(([plato, datos]) => (
                    <div key={plato} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-slate-700">{plato}</p>
                        <p className="text-sm text-slate-500">{datos.cantidad} unidades vendidas</p>
                      </div>
                      <span className="text-lg font-bold text-slate-800">Bs. {datos.total.toFixed(2)}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Pedidos anulados */}
            {pedidosAnulados.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200 mb-6">
                <h2 className="text-xl font-semibold text-red-700 mb-4">
                  Pedidos Anulados ({pedidosAnulados.length})
                </h2>
                <div className="space-y-3">
                  {pedidosAnulados.map((ficha, index) => (
                    <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-700">
                          Ticket #{String(ficha.numero).padStart(3, "0")} - {ficha.plato}
                        </span>
                        <span className="text-sm text-slate-500">{ficha.fecha} {ficha.hora}</span>
                      </div>
                      <p className="text-sm text-red-600 font-semibold mt-1">
                        Monto no cobrado: Bs. {ficha.total}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )} 

            {/* Información del reporte */}
            <div className="bg-slate-100 rounded-xl p-6 border border-slate-300">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Fecha del reporte:</span> {new Date().toLocaleDateString('es-BO', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                <span className="font-semibold">Hora:</span> {new Date().toLocaleTimeString('es-BO')}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                <span className="font-semibold">Sistema:</span> POS Pico Dorado v1.0
              </p>
            </div>
          </div>
        );

        case "perfil":
        navigate('/perfil');
        return null;

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