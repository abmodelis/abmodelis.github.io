import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Course } from "types";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CreateSection } from "components/sections/CreateSection";

type Props = {
  course: Course;
};

export const CourseData: React.FC<Props> = ({ course }) => {
  const [showCreateSectionModal, setShowCreateSectionModal] = React.useState<boolean>(false);
  const handleOpenCreateSectionModal = () => {
    setShowCreateSectionModal(true);
  };

  const handleCloseCreateSectionModal = () => {
    setShowCreateSectionModal(false);
  };

  // const [sections, setSections] = React.useState<number>(0);
  // const handleAddSection = () => {
  //   setSections(prevSections => prevSections + 1);
  // };

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
    <Grid container rowSpacing={2} sx={{ p: 3 }}>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              textAlign={"left"}
              variant="h4"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {course.title}
            </Typography>
            <br />
            <Typography
              textAlign={"left"}
              variant="body1"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                maxHeight: 500,
                textOverflow: "ellipsis",
              }}
            >
              {/* <br /> */}
              {course.description}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Typography px={3} textAlign={"start"} variant="h6">
              {course.price ? `Bs. ${course.price}` : "Gratis"}
            </Typography>
            <Typography px={3} textAlign={"start"} variant="h6" display={"flex"} alignItems={"center"}>
              {visibilityStatus[course.status]}
            </Typography>
          </Box>
        </Box>
        <CardMedia component="img" sx={{ width: 342, height: 240 }} image={course.image_path} alt={course.title} />
      </Card>

      <Grid container direction="column">
        <Grid item sx={{ width: "100%" }}>
          {/* {[...Array(sections)].map((_, index) => (
                          <SectionCourse addButton={<Button>Añadir clase</Button>} key={index} />
                      ))}       */}
        </Grid>
      </Grid>

      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <Box width={"100%"}>
          <CreateSection
            addButton={
              <Button
                onClick={handleOpenCreateSectionModal}
                //onClick={handleAddSection}
                endIcon={<AddIcon style={{ color: "white" }} />}
                sx={{
                  color: "white",
                  bgcolor: "#1976D2",
                  textTransform: "none",
                  width: "257px",
                  height: "52px",
                  "&:hover": { bgcolor: "#1976D2" },
                }}
              >
                <Typography variant="h6">Agregar Sección</Typography>
              </Button>
            }
            title="Título de la sección"
            open={showCreateSectionModal}
            handleClose={handleCloseCreateSectionModal}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
