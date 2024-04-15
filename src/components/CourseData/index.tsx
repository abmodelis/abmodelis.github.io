import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { Course } from "types";

type Props = {
  course: Course;
};

export const CourseData: React.FC<Props> = ({ course }) => {
  const visibilityStatus: Record<number, JSX.Element> = {
    0: (
      <>
        Visible <Visibility sx={{ ml: 1 }} />
      </>
    ),
    1: (
      <>
        Oculto <VisibilityOff sx={{ ml: 1 }} />
      </>
    ),
  };
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={8}>
        <Typography textAlign={"center"} variant="h4">
          {course.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography textAlign={"center"} variant="h6">
          Descripción:
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          sx={{
            maxHeight: 500,
            overflowX: "hidden",
            overflowWrap: "break-word",
            textOverflow: "ellipsis",
          }}
        >
          <br />
          {course.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box width={"100%"} display={"flex"}>
          <Typography px={3} textAlign={"start"} variant="h6">
            {course.price ? `Bs. ${course.price}` : "Gratis"}
          </Typography>
          <Typography px={3} textAlign={"start"} variant="h6" display={"flex"} alignItems={"center"}>
            {visibilityStatus[course.status]}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
        <img src={course.image_path} alt={course.title} style={{ maxHeight: "100%", maxWidth: "100%" }} />
      </Grid>
    </Grid>
  );
};
