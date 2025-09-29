type PedidoCardProps = {
  imagen: string;
  nombre: string;
  precio: string;
  estado: "Disponible" | "Agotado";
  onSeleccionar: () => void;
};

function PedidoCard({ imagen, nombre, precio, estado, onSeleccionar }: PedidoCardProps) {
  const isDisponible = estado === "Disponible";
  
  return (
    <div 
      className={`
        bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200
        transition-all duration-300 hover:shadow-lg hover:border-slate-300
        ${isDisponible ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-75'}
      `}
      onClick={isDisponible ? onSeleccionar : undefined}
    >
      {/* Imagen con overlay de estado */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={imagen} 
          alt={nombre} 
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isDisponible ? 'group-hover:scale-105' : 'grayscale'
          }`}
        />
        
        {/* Badge de estado sobre la imagen */}
        <div className="absolute top-3 right-3">
          <span
            className={`
              px-3 py-1.5 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm
              ${isDisponible
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
              }
            `}
          >
            {estado}
          </span>
        </div>

        {/* Overlay si está agotado */}
        {!isDisponible && (
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">No Disponible</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Nombre del plato */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">
          {nombre}
        </h3>

        {/* Precio */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-amber-600">{precio}</span>
          </div>
        </div>

        {/* Botón de selección */}
        <button
          onClick={isDisponible ? onSeleccionar : undefined}
          disabled={!isDisponible}
          className={`
            w-full py-3 rounded-xl font-semibold transition-all duration-200
            ${isDisponible
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 hover:shadow-md active:scale-95"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }
          `}
        >
          {isDisponible ? "Agregar al Pedido" : "No Disponible"}
        </button>
      </div>
    </div>
  );
}

export default PedidoCard;