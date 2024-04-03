// Importar el componente LoginNavBar (es para usuarios registrados)
import { LoginNavBar } from "../../components/header/logeado/LoginNavBar";

// Importar el componente PanelNav (un componente de navegación)
import PanelNav from "../../components/PanelNav";

// Definir el componente Courses como un componente funcional React
function Courses() {
  // Renderiza el contenido TSX dentro de un div padre
  return (
    <div>
      {/* Renderiza el componente LoginNavBar */}
      <LoginNavBar />
      {/* Renderiza el componente PanelNav */}
      <PanelNav />
    </div>
  );
}

// Exporte el componente Courses como exportación por defecto para utilizarlo en otras partes de su aplicación
export default Courses;