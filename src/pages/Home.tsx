import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    useEffect(()=> {
        const timer = setTimeout(()=>{
            navigate("/Login");
        }, 5000);
        
        // Limpieza por si el usuario cambia de pagina antes
        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
            <h1 className="text-4xl font-bold text-yellow-700 mb-4">Bienvenido a pico dorado</h1>
            <p className="text-lg text-gray-700">El mejor pollo broaster y spiedo!</p>
        </div>
    );
}

export default Home;
