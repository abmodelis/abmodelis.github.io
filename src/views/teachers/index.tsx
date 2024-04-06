import { Route, Routes } from "react-router-dom";
import { LoginNavBar } from "../../components/header/logeado/LoginNavBar";
import Courses from "./courses";

const Teachers = () => {
  return (
    <>
      <LoginNavBar />
      <Routes>
        <Route path="/" element={<h1>Teacher Home</h1>} />
        <Route path="/profile" element={<h1>Teacher Profile</h1>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/mystudents" element={<h1>Teacher MyStudents</h1>} />
      </Routes>
    </>
  );
};

export default Teachers;
