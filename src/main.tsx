// Importación de React y ReactDOM para la creación y renderizado de componentes
import React from "react";
import ReactDOM from "react-dom/client";
// Importación del componente principal de la aplicación
import App from "./App.tsx";

// Punto de entrada de la aplicación React
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Renderiza el componente App dentro de StrictMode
  <React.StrictMode>
    {/* Renderiza el componente principal App */}
    <App />
  </React.StrictMode>
);