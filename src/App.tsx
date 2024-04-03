// Importaciones de React Router
import { HashRouter, Route, Routes } from "react-router-dom";

// Importación de componentes
import { Students } from "./views/students";
import Teachers from "./views/teachers";

// Función principal de la aplicación
function App() {
  // Renderiza el Router con las rutas definidas
  return (
    <HashRouter>
      <Routes>
        {/* Ruta raíz que muestra un título "Home" */}
        <Route path="/" element={<h1>Home</h1>} />
        {/* Ruta para la sección de estudiantes, renderiza el componente `Students` */}
        <Route path="/students/*" element={<Students />} />
        {/* Ruta para la sección de profesores, renderiza el componente `Teachers` */}
        <Route path="/teachers/*" element={<Teachers />} />
        {/* Ruta comodín para mostrar un mensaje de "No encontrado" */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
}

// Exporta la función App como componente principal
export default App;