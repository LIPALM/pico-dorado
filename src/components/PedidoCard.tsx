type  PedidoCardProps = {
    imagen: string;
    nombre: string;
    precio: string;
    estado: "Disponible" | "Agotado";
    onSeleccionar: () => void; // esta funcion viene de dashboard
};

function PedidoCard({ imagen, nombre, precio, estado, onSeleccionar }: PedidoCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 hover:shadow-lg transition">
            <img src={imagen} alt={nombre} className="w-full h-40 object-cover" />

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{nombre}</h3>
                <p className="text-gray-600">{precio}</p>

                <span
                    className={`inline-block mt-2 px-3 text-sm font-medium rounden-full ${
                        estado === "Disponible"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                    }`  }
                >
                    {estado}
                </span>

                <button 
                    onClick={onSeleccionar}
                    className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                >
                    Seleccionar
                </button>
            </div>
        </div>
    );
}

export default PedidoCard;