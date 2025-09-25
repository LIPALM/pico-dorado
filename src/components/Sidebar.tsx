import { FaHome, FaBox, FaSignOutAlt, FaEnvelope } from "react-icons/fa";

function Sidebar() {
    return (
        <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
            {/* Parte superior */}
            <div>
                <div className="flex items-center gap-3 p-14">
                    <h2 className="text-2xl font-bold text-orange-500">Dashboard</h2>
                </div>
                
                <nav className="mt-4 flex flex-col gap-2">
                    <a 
                        href="#"
                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-orange-100 rounded-lg transition text-lg"
                    >
                        <FaHome className="text-orange-500 text-xl"/>
                        <span>Caja</span>
                    </a>

                    <a 
                        href="#"
                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-orange-100 rounded-lg transition text-lg"
                    >
                        <FaEnvelope className="text-orange-500 text-xl"/>
                        <span>Proximante...</span>
                    </a>
                    
                    <a
                        href="#"
                        className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-orange-100 rounded-lg transition text-lg"
                    >
                        <FaBox className="text-orange-500 text-xl"/>
                        <span>Proximante...</span>
                    </a>
                </nav>
            </div>

            {/* Parte inferior */}
            <div className="p-6">
                <button
                    onClick={() => {
                        localStorage.removeItem("auth");
                        window.location.href = "/login";
                    }}
                    className="flex items-center gap-3 w-full px-6 py-3 text-gray-700 hover:bg-red-100 rounded-lg transition text-lg"
                >
                    <FaSignOutAlt className="text-red-500 text-xl"/>
                    <span>Salir</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
