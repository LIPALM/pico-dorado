import { useState } from "react";
import PedidoCard from "../components/PedidoCard";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [fichas, setFichas] = useState<string[]>([]);

  const pedidos = [
    {
      imagen: "https://source.unsplash.com/400x300/?chicken",
      nombre: "Pollo Broaster",
      precio: "Bs. 14",
      estado: "Disponible" as const,
    },
    {
      imagen: "https://source.unsplash.com/400x300/?grill,chicken",
      nombre: "Pollo al Spiedo",
      precio: "Bs. 20",
      estado: "Disponible" as const,
    },
    {
      imagen: "https://source.unsplash.com/400x300/?fried,chicken",
      nombre: "Alitas de pollo",
      precio: "Bs. 24",
      estado: "Disponible" as const,
    },
  ];

  const handleSeleccionar = () => {
    const nuevaFicha = (fichas.length + 1).toString().padStart(3, "0");
    setFichas([...fichas, nuevaFicha]);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Lista de Pedidos</h1>

        <div className="grid gridd-cols-2 sm:grid0cols-3 md:grid-cols-5 gap-4 mb-8">
          {fichas.map((ficha, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center text-xl font-bold text-orange-600"
            >
              ficha #{ficha}
            </div>
          ))}
        </div>

        {/* Lista de platos */}
        <h2 className="text-2xl font-bold mb-4">Platos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pedidos.map((pedido, index) => (
            <PedidoCard
              key={index}
              imagen={pedido.imagen}   
              nombre={pedido.nombre}
              precio={pedido.precio}
              estado={pedido.estado}
              onSeleccionar={handleSeleccionar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
