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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CoursesService } from "../../services";
import { Course } from "../../types";
import { CreateDataCurses } from "components/modals/CreateDataCourses";

function Courses() {
  const [loading, setLoading] = useState(true);
  const [corses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!loading) return;
    CoursesService.getCourses().then((courses) => {
      setCourses(courses);
      setLoading(false);
    });
  }, [loading]);

  return (
    <>
      <Box display="flex" sx={{ p: 3 }}>
        <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Panel
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
        <CreateDataCurses />
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {corses.map((course) => (
          <Grid item xs={2} sm={4} md={4} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 140 }} image={course.image_path} title={course.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Courses;
