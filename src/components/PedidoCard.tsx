type PedidoCardProps = {
  imagen: string;
  nombre: string;
  precio: string;
  estado: "Disponible" | "Agotado";
  onSeleccionar: () => void;
};

function PedidoCard({ imagen, nombre, precio, estado, onSeleccionar }: PedidoCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-72 hover:shadow-2xl transition transform hover:-translate-y-1">
      {/* Imagen */}
      <img src={imagen} alt={nombre} className="w-full h-44 object-cover" />

      {/* Contenido */}
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{nombre}</h3>
        <p className="text-gray-600 font-medium mb-2">{precio}</p>

        {/* Estado */}
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            estado === "Disponible"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {estado}
        </span>

        {/* Botón */}
        <button
          onClick={onSeleccionar}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
}

export default PedidoCard;
