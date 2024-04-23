// Importar los componentes necesarios de React Router
import { Route, Routes } from "react-router-dom";

// Importe el componente Cursos (suponiendo que gestione la funcionalidad de cursos)
import Courses from "./courses";

import { Layout } from "layout";
import CourseView from "./Course";

const Teachers = () => {
  // Renderizar un componente Rutas para definir rutas anidadas dentro de Teachers
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Teacher Home</h1>} />
          <Route path="/profile" element={<h1>Teacher Profile</h1>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course" element={<CourseView />} />
          <Route path="/mystudents" element={<h1>Teacher MyStudents</h1>} />
        </Routes>
      </Layout>
    </>
  );
};

// Exporte el componente Profesores como exportación por defecto para utilizarlo en otras partes de su aplicación.
export default Teachers;
