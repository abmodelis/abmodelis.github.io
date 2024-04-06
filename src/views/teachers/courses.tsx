import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PanelNav from "../../components/PanelNav";
import { CoursesService } from "../../services";
import { Course } from "../../types";

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
    <div>
      <PanelNav>
        <h1>Courses</h1>
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
      </PanelNav>
    </div>
  );
}

export default Courses;
