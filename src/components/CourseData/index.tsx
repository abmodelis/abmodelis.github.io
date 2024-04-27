import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Course } from "types";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { CreateSection } from "components/sections/CreateSection";
import * as React from 'react';

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
      <Grid item xs={8} height="240px" display="flex" direction="column" justifyContent="space-between" >
        <Typography textAlign={"left"} variant="h4">
          {course.title}
        </Typography>
        <Typography
          textAlign={"left"}
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
        <img src={course.image_path} alt={course.title} style={{ maxHeight: "240px", maxWidth: "342px" }} />
      </Grid>

      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box width={"100%"}>
        <CreateSection
          addButton={
            <Button 
              onClick={handleOpenCreateSectionModal} 
              endIcon={<AddIcon style={{ color: 'white'}}/>} 
              sx={{color: 'white', bgcolor: '#1976D2', textTransform: 'none', width: '257px', height: '52px', '&:hover': {bgcolor: '#1976D2',}, }}
            >
              <Typography variant="h6">
                Agregar Sección
              </Typography>
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
