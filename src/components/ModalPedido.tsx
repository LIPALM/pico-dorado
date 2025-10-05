import { useState } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { MdModeOfTravel } from "react-icons/md";

interface ModalPedidoProps {
  isOpen: boolean;
  onClose: () => void;
  plato: {
    nombre: string;
    precio: string;
    imagen: string;
  } | null;
  onFinalizarPedido: (pedidoData: PedidoData) => number;
}

export interface PedidoData {
  plato: string;
  categoria: string;
  cantidad: number;
  refresco: string;
  descripcion?: string;
  metodoPago: string;
  total: number;
}

function ModalPedido({ isOpen, onClose, plato, onFinalizarPedido }: ModalPedidoProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketGenerado, setTicketGenerado] = useState("");
  const [categoria, setCategoria] = useState("Economico");
  const [cantidad, setCantidad] = useState(1);
  const [refresco, setRefresco] = useState("");
  const [montoRecibido, setMontoRecibido] = useState<number>(0);
  const [showRefrescoSuggestions, setShowRefrescoSuggestions] = useState(false);
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [descripcion, setDescripcion] = useState("");

  // Opciones de refrescos con precios
  const refrescos = [
    { nombre: "Coca Cola", precio: 15 },
    { nombre: "Sprite", precio: 13 },
    { nombre: "Fanta", precio: 12 },
  ];

  if (!isOpen || !plato) return null;

  // Precio base del plato
  const precioBase = parseFloat(plato.precio.replace("Bs. ", ""));
  
  // Precios según categoría
  const preciosPorCategoria: { [key: string]: number } = {
    "Economico": precioBase,
    "Cuarto": precioBase * 2,
  };
  
  // Precio según la categoría seleccionada
  const precioPorCategoria = preciosPorCategoria[categoria] || precioBase;
  
  // Buscar precio del refresco seleccionado
  const refrescoSeleccionado = refrescos.find(r => 
    r.nombre.toLowerCase() === refresco.toLowerCase()
  );
  const precioRefresco = refrescoSeleccionado ? refrescoSeleccionado.precio : 0;
  
  // Calcular totales
  const total = (precioPorCategoria * cantidad) + precioRefresco;
  const cambio = metodoPago === "Efectivo" ? Math.max(0, montoRecibido - total) : 0;
  
  // Filtrar sugerencias de refrescos
  const sugerenciasRefrescos = refrescos.filter(r => 
    r.nombre.toLowerCase().includes(refresco.toLowerCase())
  );

  const handleFinalizar = () => {
    const pedidoData: PedidoData = {
      plato: plato.nombre,
      categoria,
      cantidad,
      refresco: refresco || "Sin refresco",
      descripcion: descripcion || undefined,
      metodoPago,
      total,
    };

    const nuevoTicket = onFinalizarPedido(pedidoData);
    setTicketGenerado(`Ticket #${String(nuevoTicket || 1).padStart(3, "0")}`);
    setShowSuccess(true);
  };

  const handleHecho = () => {
    setShowSuccess(false);
    onClose();
    // Resetear formulario
    setCategoria("Economico");
    setCantidad(1);
    setRefresco("");
    setDescripcion("");
    setMetodoPago("Efectivo");
    setMontoRecibido(0);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    onClose();
    setCategoria("Economico");
    setCantidad(1);
    setRefresco("");
    setDescripcion("");
    setMetodoPago("Efectivo");
    setMontoRecibido(0);
  };

  const handleRefrescoChange = (value: string) => {
    setRefresco(value);
    setShowRefrescoSuggestions(true);
  };

  const handleSelectRefresco = (nombreRefresco: string) => {
    setRefresco(nombreRefresco);
    setShowRefrescoSuggestions(false);
  };

  // Vista de éxito
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-white text-5xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Pedido Registrado
              </h2>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
              <p className="text-3xl font-bold text-amber-700">{ticketGenerado}</p>
            </div>

            <button
              onClick={handleHecho}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
            >
              Hecho
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista del formulario
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition z-10"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center uppercase">
            {plato.nombre}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría - SELECT */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Categoría
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none cursor-pointer"
              >
                <option value="Economico">Económico</option>
                <option value="Cuarto">Cuarto</option>
                
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  min="1"
                />
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Descripción del plato */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Descripción del plato
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                rows={3}
                placeholder="Añade detalles especiales del..."
                />
            </div>

            {/* Refresco - AUTOCOMPLETE */}
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Refresco
              </label>
              <input
                type="text"
                value={refresco}
                onChange={(e) => handleRefrescoChange(e.target.value)}
                onFocus={() => setShowRefrescoSuggestions(true)}
                onBlur={() => setTimeout(() => setShowRefrescoSuggestions(false), 200)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                placeholder="Coca Cola, Sprite, Fanta..."
              />
              
              {/* Sugerencias de refrescos */}
              {showRefrescoSuggestions && sugerenciasRefrescos.length > 0 && refresco.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  {sugerenciasRefrescos.map((r, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectRefresco(r.nombre)}
                      className="w-full px-4 py-3 text-left hover:bg-amber-50 transition flex justify-between items-center"
                    >
                      <span className="font-medium text-slate-700">{r.nombre}</span>
                      <span className="text-sm text-amber-600 font-semibold">
                        +Bs. {r.precio}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total
              </label>
              <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">
                  Plato ({categoria}): Bs. {precioPorCategoria * cantidad}
                  {precioRefresco > 0 && ` + Refresco: Bs. ${precioRefresco}`}
                </p>
                <p className="text-2xl font-bold text-amber-700">
                  Bs. {total}
                </p>
              </div>
            </div>

            {/* Método de pago - SELECT */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Método de pago
              </label>
              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none cursor-pointer"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="QR">QR - Banco Union</option>
              </select>
            </div>

            {/* Monto recibido (solo para efectivo) */}
            {metodoPago === "Efectivo" && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Monto recibido
                </label>
                <input
                  type="number"
                  value={montoRecibido || ""}
                  onChange={(e)=> setMontoRecibido(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="Ingrese el monto"
                  min="0"
                  step="0.01"
                />
              </div>
            )}
            {/* Total a cobrar */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {metodoPago === "Efectivo" && montoRecibido > 0 ? "Cambio" : "Total a cobrar"}
              </label>
              <div className={`px-4 py-3 rounded-xl border-2 ${
                metodoPago === "Efectivo" && montoRecibido >= total
                  ? "bg-green-50 border-green-300"
                  : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300"
              }`}>
                {metodoPago === "Efectivo" && montoRecibido > 0 ?(
                  <div>
                    <p className="text-sm text-slate-600">
                      Recibido: Bs. {montoRecibido.toFixed(2)} - total: Bs. {total} 
                    </p>
                    <p className={`text-2xl font-bold ${
                      cambio >= 0 ? "text-green-700" : "text-red-700"
                    }`}>
                      {cambio >= 0 ? `Bs. ${cambio.toFixed(2)}` : "Monto insuficiente"}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-amber-700">
                    Bs. {total}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botón Finalizar */}
          <button
            onClick={handleFinalizar}
            disabled={metodoPago === "Efectivo" && montoRecibido < total}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
              metodoPago === "Efectivo" && montoRecibido < total
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
            }`}
          >
            {metodoPago === "QR"
              ? "Confirmar Pago QR"
              : metodoPago === "Efectivo" && montoRecibido < total
              ? "Monto Insuficiente"
              : "Finalizar Pedido"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPedido;