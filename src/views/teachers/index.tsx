import { Route, Routes } from "react-router-dom";

import { Layout } from "layout";
import CourseView from "./Course";
import Courses from "./courses";

const Teachers = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Teacher Home</h1>} />
        <Route path="/profile" element={<h1>Teacher Profile</h1>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course" element={<CourseView />} />
        <Route path="/mystudents" element={<h1>Teacher MyStudents</h1>} />
      </Routes>
    </Layout>
  );
};

export default Teachers;
