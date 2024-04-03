import { HashRouter, Route, Routes } from "react-router-dom";
import { Students } from "./views/students";
import Teachers from "./views/teachers";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/students/*" element={<Students />} />
        <Route path="/teachers/*" element={<Teachers />} />
        <Route path="*" element={<h1><span>Not Found</span></h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
