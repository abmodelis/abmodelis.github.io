import { Route, Routes } from "react-router-dom";
import { LoginNavBar } from "../../components/header/logeado/LoginNavBar";

export const Students = () => {
  return (
    <>
      <LoginNavBar />
      <Routes>
        <Route path="/" element={<h1>Student Home</h1>} />
        <Route path="/profile" element={<h1>Student Profile</h1>} />
        <Route path="/courses" element={<h1>Student Courses</h1>} />
        <Route path="/mycourse" element={<h1>Student MyCourse</h1>} />
      </Routes>
    </>
  );
};
