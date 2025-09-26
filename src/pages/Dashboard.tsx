import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PedidoCard from "../components/PedidoCard";


function Dashboard() {
  // Lista de platos disponibles
  const pedidos = [
    {
      id: 1,
      imagen: "/platos/Pollo-Broaster.png",
      nombre: "Pollo Broaster",
      precio: "Bs. 14",
      estado: "Disponible" as const,
    },
    {
      id: 2,
      imagen: "/platos/Pollo-Broaster.png",
      nombre: "Pollo al Spiedo",
      precio: "Bs. 18",
      estado: "Disponible" as const,
    },
    {
      id: 3,
      imagen: "/Platos/pipocas.png",
      nombre: "Pipocas",
      precio: "Bs. 24",
      estado: "Agotado" as const,
    },
    {
      id: 4,
      imagen: "/Platos/alitas-de-pollo.png",
      nombre: "Alitas de Pollo",
      precio: "Bs. 24",
      estado: "Agotado" as const,
    },

    {
      id: 5,
      imagen: "/Platos/salchipapa.png",
      nombre: "Alitas de Pollo",
      precio: "Bs. 24",
      estado: "Agotado" as const,
    },
  ];

  // Estado de fichas registradas
  const [fichas, setFichas] = useState<number[]>([]);
  const [contador, setContador] = useState(1); // empieza en ficha 1

  // Función al seleccionar un plato
  const handleSeleccionar = () => {
    setFichas((prev) => [...prev, contador]); // agrega nueva ficha
    setContador((prev) => prev + 1); // aumenta el contador
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Registro de Fichas</h1>

        {/* Barra de fichas registradas */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6">
          {fichas.length === 0 ? (
            <p className="text-gray-500">No hay fichas registradas</p>
          ) : (
            fichas.map((ficha, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-md shadow-sm"
              >
                {String(ficha).padStart(3, "0")}
              </div>
            ))
          )}
        </div>

        {/* Cards de platos */}
        <h2 className="text-2xl font-bold mb-4">Platos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pedidos.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              imagen={pedido.imagen}
              nombre={pedido.nombre}
              precio={pedido.precio}
              estado={pedido.estado}
              onSeleccionar={handleSeleccionar} // 👈 ahora cada selección genera nueva ficha
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
