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

// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from "@mui/icons-material/Add";



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

  //
  // const handleOpenModal = () => {
  //   setOpen(true);
  // };


  return (
    <>
      <Box display="flex" sx={{ p: 3 }}>
        <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Panel
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
        <CreateDataCurses 
          addButton={
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              sx={{ bgcolor: "#FFFFFF", color: "#110404", "&:hover": { bgcolor: "#E6E6E6" } }}
            >
              Agregar curso
            </Button>
          }
        />
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
              {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}

              <CardActions sx={{ justifyContent: 'space-between' }}>
                <div>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </div>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Courses;
