// Importar los componentes necesarios de React Router
import { Route, Routes } from "react-router-dom";

// Importe el componente Cursos (suponiendo que gestione la funcionalidad de cursos)
import Courses from "./courses";

// Definir el componente Teachers como un componente funcional React
const Teachers = () => {
  // Renderizar un componente Rutas para definir rutas anidadas dentro de Teachers
  return (
    <Routes>
      {/* La ruta para la ruta base de "/teachers" muestra "Teacher Home" */}
      <Route path="/" element={<h1>Teacher Home</h1>} />
      {/* La ruta para "/teachers/profile" muestra "Teacher Profile". */}
      <Route path="/profile" element={<h1>Teacher Profile</h1>} />
      {/* La ruta "/teachers/courses" muestra el componente importado Courses. */}
      <Route path="/courses" element={<Courses />} />
      {/* La ruta para "/teachers/mystudents" muestra "Profesor Misalumnos". */}
      <Route path="/mystudents" element={<h1>Teacher MyStudents</h1>} />
    </Routes>
  );
};

// Exporte el componente Profesores como exportación por defecto para utilizarlo en otras partes de su aplicación.
export default Teachers;