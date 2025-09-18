import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 bg-yellow-600 p-4 text-white">
        <Link to="/">Inicio</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;