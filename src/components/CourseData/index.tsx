import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Course } from "types";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { CreateSection } from "components/sections/CreateSection";
import * as React from 'react';

import { SectionCourse } from "components/sections/SectionCourse";

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

  const [sections, setSections] = React.useState<number>(0);
  const handleAddSection = () => {
    setSections(prevSections => prevSections + 1);
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
      <Grid 
        item xs={8} 
        height="240px" 
        display="flex" 
        direction="column" 
        justifyContent="space-between" 
        sx={{ 
          borderColor: 'gray', 
          borderStyle: 'solid', 
          borderWidth: '0 0px 5px 1px',  
          borderTopLeftRadius: "5px", 
          borderBottomLeftRadius: "5px",
        }}
      >
        <Typography 
          textAlign={"left"} 
          variant="h4"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Máximo de dos líneas
          }}
        >
          {course.title}
        </Typography>
        <Typography
          textAlign={"left"}
          variant="body1"
          sx={{
            // maxHeight: 500,
            // overflowX: "hidden",
            // overflowWrap: "break-word",
            // textOverflow: "ellipsis",
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Máximo de dos líneas
            maxHeight: 500, // Altura máxima
            textOverflow: "ellipsis",
          }}
        >
          {/* <br /> */}
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
      <Grid 
        item xs={4} 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          borderColor: 'gray', 
          borderStyle: 'solid', 
          borderWidth: '0 1px 5px 0px', 
          borderTopRightRadius: "5px", 
          borderBottomRightRadius: "5px",
          position: 'relative'}}
      >
        <img src={course.image_path} alt={course.title} style={{ maxHeight: "100%", maxWidth: "100%", top: 0, left: 0}} />
      </Grid>
      
      <Grid container direction="column">
        <Grid item sx={{ width:"100%" }}>
                    {[...Array(sections)].map((_, index) => (
                        <SectionCourse addButton={<Button>Añadir clase</Button>} key={index} />
                    ))}      
        </Grid>
      </Grid>
      

      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box width={"100%"}>
        <CreateSection
          addButton={
            <Button 
              // onClick={handleOpenCreateSectionModal} 
              onClick={handleAddSection}
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
