import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { CourseData } from "components";
import { useEffect, useState } from "react";
import { CoursesService } from "services";
import { Course } from "types";

const CourseView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course>();
  const location = useLocation();

  const { course_id } = location.state || {};

  useEffect(() => {
    if (!loading) return;
    if (!course_id) return;
    if (course) return;
    CoursesService.getCourse(course_id).then((course) => {
      setCourse(course);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course_id]);

  return (
    <>
      <Box display="flex" sx={{ p: 3 }}>
        <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#/teachers">
            Panel
          </Link>
          <Link underline="hover" color="inherit" href="#/teachers/courses">
            Cursos
          </Link>
          <Typography color="text.primary">{course?.title || "..."}</Typography>
        </Breadcrumbs>
<<<<<<< HEAD
        
=======
>>>>>>> 79b12ee080b1ef8374457438ed105ba9d96abfd4
      </Box>
      {(course && <CourseData course={course} />) || <Typography variant="body2">Cargando...</Typography>}
    </>
  );
};
export default CourseView;
