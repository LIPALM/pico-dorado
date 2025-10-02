import { FaTimes, FaPrint } from "react-icons/fa";

interface TicketDetailProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
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
  } | null;
}

function TicketDetail({ isOpen, onClose, ticket }: TicketDetailProps) {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition z-10"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Detalles del Ticket #{String(ticket.numero).padStart(3, "0")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FICHA PARA CLIENTE */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-block bg-amber-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-3">
                  FICHA CLIENTE
                </div>
                <h3 className="text-4xl font-bold text-amber-700">
                  #{String(ticket.numero).padStart(3, "0")}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {ticket.fecha} - {ticket.hora}
                </p>
              </div>

              <div className="space-y-4 bg-white rounded-xl p-4">
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-xs text-slate-500 uppercase mb-1">Plato</p>
                  <p className="font-bold text-slate-800 text-lg">{ticket.plato}</p>
                  <p className="text-sm text-slate-600">{ticket.categoria}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Cantidad</p>
                    <p className="font-semibold text-slate-800">{ticket.cantidad}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Refresco</p>
                    <p className="font-semibold text-slate-800">{ticket.refresco}</p>
                  </div>
                </div>

                <div className="border-b border-slate-200 pb-3">
                  <p className="text-xs text-slate-500 uppercase mb-1">Método de Pago</p>
                  <p className="font-semibold text-slate-800">{ticket.metodoPago}</p>
                </div>

                <div className="bg-amber-100 rounded-lg p-4">
                  <p className="text-xs text-amber-700 uppercase mb-1">Total Pagado</p>
                  <p className="text-3xl font-bold text-amber-700">Bs. {ticket.total}</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">¡Gracias por su compra!</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Pico Dorado</p>
              </div>
            </div>

            {/* FICHA PARA COCINA */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-3">
                  ORDEN COCINA
                </div>
                <h3 className="text-4xl font-bold text-blue-700">
                  #{String(ticket.numero).padStart(3, "0")}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {ticket.fecha} - {ticket.hora}
                </p>
              </div>

              <div className="space-y-4 bg-white rounded-xl p-4">
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-xs text-slate-500 uppercase mb-1">Preparar</p>
                  <p className="font-bold text-slate-800 text-2xl">{ticket.plato}</p>
                  <p className="text-lg text-slate-700 font-semibold mt-1">{ticket.categoria}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Cantidad</p>
                    <p className="text-2xl font-bold text-blue-700">{ticket.cantidad}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Refresco</p>
                    <p className="font-semibold text-slate-800">{ticket.refresco}</p>
                  </div>
                </div>

                {ticket.descripcion && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-xs text-yellow-700 uppercase font-semibold mb-2">
                      ⚠️ Notas Especiales
                    </p>
                    <p className="text-sm text-slate-700">{ticket.descripcion}</p>
                  </div>
                )}

                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-700 font-semibold uppercase">Estado</p>
                  <p className="text-2xl font-bold text-blue-700 mt-1">En Preparación</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500 font-semibold">Sistema POS - Pico Dorado</p>
              </div>
            </div>
          </div>

          {/* Botón de Imprimir (opcional) */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all duration-200"
            >
              <FaPrint />
              <span>Imprimir Fichas</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;