import { Edit, Restore } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { CreateDataCurses } from "components/modals/CreateDataCourses";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CoursesService } from "../../services";
import { Course } from "../../types";

function Courses() {
  const navigator = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    setArchived(params.get("archived") === "true");
  }, [search]);

  const handleLoadCourses = () => {
    CoursesService.getCourses({ archived }).then((courses) => {
      setCourses(courses);
      setLoading(false);
    });
  };

  useEffect(handleLoadCourses, [loading, archived]);

  const handleEdit = (course_id: number) => {
    navigator(`/teachers/course`, { state: { course_id } });
  };

  const handleRestore = (course: Course) => {
    CoursesService.restoreCourse(course).then(() => {
      handleLoadCourses();
    });
  };

  return (
    <>
      <Box display="flex" sx={{ p: 3 }}>
        <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#/teachers">
            Panel
          </Link>
          <Typography color="text.primary">{!archived ? "Cursos" : "Cursos Archivados"}</Typography>
        </Breadcrumbs>
        <CreateDataCurses />
      </Box>
      <Typography
        visibility={courses.length === 0 ? "visible" : "hidden"}
        variant="body2"
        color="text.secondary"
        style={{ textAlign: "center" }}
      >
        No existen cursos
      </Typography>
      <Grid
        visibility={loading || courses.length === 0 ? "hidden" : "visible"}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
      >
        {courses.map((course) => (
          <Grid item xs={2} sm={4} md={4} lg={3} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ minHeight: 200 }} image={course.image_path} title={course.title} />
              <CardContent>
                <Tooltip title={course.title} placement="top">
                  <Typography
                    sx={{
                      minHeight: 99.99,
                      maxHeight: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {course.title}
                  </Typography>
                </Tooltip>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    minHeight: 99.99,
                    maxHeight: 100,
                    overflowX: "hidden",
                    overflowWrap: "break-word",
                    textOverflow: "ellipsis",
                  }}
                >
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                {archived ? (
                  <Button onClick={handleRestore.bind(null, course)} variant="outlined">
                    <Restore />
                  </Button>
                ) : (
                  <Button onClick={handleEdit.bind(null, course.id)} variant="contained">
                    <Edit />
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default Courses;
