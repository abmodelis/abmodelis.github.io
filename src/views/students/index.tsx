import { Route, Routes } from "react-router-dom";

export const Students = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Student Home</h1>} />
      <Route path="/profile" element={<h1>Student Profile</h1>} />
      <Route path="/courses" element={<h1>Student Courses</h1>} />
      <Route path="/mycourse" element={<h1>Student MyCourse</h1>} />
    </Routes>
  );
};
