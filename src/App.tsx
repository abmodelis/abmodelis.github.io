import { HashRouter, Route, Routes } from "react-router-dom";

import { Students } from "./views/students";
import Teachers from "./views/teachers";
import Home from "views/Home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students/*" element={<Students />} />
        <Route path="/teachers/*" element={<Teachers />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </HashRouter>
  );
}
export default App;
