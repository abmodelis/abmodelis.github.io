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
import { CoursesService } from "../../services";
import { Course } from "../../types";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    if (!loading) return;
    CoursesService.getCourses().then((courses) => {
      setCourses(courses);
      setLoading(false);
    });
  }, [loading]);

  const handleEdit = (course_id: number) => {
    navigator(`/teachers/course`, { state: { course_id } });
  };

  return (
    <>
      <Box display="flex" sx={{ p: 3 }}>
        <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#/teachers">
            Panel
          </Link>
          <Typography color="text.primary">Cursos</Typography>
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
            <Card sx={{ maxWidth: 345}}>
              <CardMedia sx={{ height: 200 }} image={course.image_path} title={course.title} />
              <CardContent>
                <Tooltip title={course.title} placement="top">
                  <Typography
                    sx={{
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
                    maxHeight: 100,
                    overflowX: "hidden",
                    overflowWrap: "break-word",
                    textOverflow: "ellipsis",
                  }}
                >
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={handleEdit.bind(null, course.id)} variant="contained">
                  <Edit />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default Courses;