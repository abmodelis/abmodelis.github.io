//import { HashRouter, Route, Routes } from "react-router-dom";
//mport { Students } from "./views/students";
//import Teachers from "./views/teachers";
import Courses from "./views/teachers/courses";
/*
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/students/*" element={<Students />} />
        <Route path="/teachers/*" element={<Teachers />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
}*/
// Muestra o renderiza lo que vaya a visualizar el docente
function App() {
  return (
    <Courses/>
  );
}

export default App;