import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SectionAccordion from "components/CourseContent/sections";
import { CourseSectionForm } from "components/forms/CourseSectionForm";
import ArchivedCourse from "components/modals/ArchivedCourse";
import * as React from "react";
import { useState } from "react";
import { SectionService } from "services";
import { Course, ISectionInput } from "types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  course: Course;
};

export const CourseData: React.FC<Props> = ({ course }) => {
  const [sections, setSections] = useState<JSX.Element[]>([]);

  const [showSectionForm, setShowSectionForm] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  React.useEffect(() => {
    const sortedSections = [...course.units].sort((a, b) => {
      // Convertimos las fechas a objetos Date para su comparación
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      // Comparamos las fechas
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });

    setSections(() =>
      sortedSections.map((section, index) => (
        <Box key={section.id} sx={{ mb: 2 }}>
          <SectionAccordion key={section.id} sectionNumber={index + 1} section={section} />
        </Box>
      )),
    );
  }, [course]);

  const handleAddSectionClick = () => {
    setShowSectionForm(true);
  };

  const handleFormSubmit = async (sectionData: ISectionInput) => {
    // Aquí agregas la nueva sección con los datos del formulario
    const newSection = await SectionService.createSection(sectionData);
    setSections((prevSections) => [
      ...prevSections,
      <Box key={newSection.id} sx={{ mb: 2 }}>
        <SectionAccordion key={newSection.id} sectionNumber={prevSections.length + 1} section={newSection} />
      </Box>,
    ]);
    setShowSectionForm(false); // Oculta el formulario después de agregar la sección
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setShowSectionForm(false); // Oculta el formulario si se cancela
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const visibilityStatus: Record<number, JSX.Element> = {
    1: (
      <>
        Visible <Visibility sx={{ ml: 1 }} />
      </>
    ),
    0: (
      <>
        Oculto <VisibilityOff sx={{ ml: 1 }} />
      </>
    ),
  };

  return (
    <Grid container rowSpacing={2} sx={{ p: 3 }}>
      <Grid sx={{ width: "100%" }}>
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography textAlign={"left"} variant="h4">
                {course.title}
              </Typography>
              <br />
              <Typography textAlign={"left"} variant="body1" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
              <Box sx={{ display: "flex" }}>
                <Typography px={2} variant="h6">
                  {course.price ? `Bs. ${course.price}` : "Gratis"}
                </Typography>
                <Typography px={2} variant="h6" display={"flex"} alignItems={"center"}>
                  {visibilityStatus[course.status]}
                </Typography>
              </Box>
              <Box sx={{ mr: 1.5 }}>
                <ArchivedCourse course={course} />
              </Box>
            </Box>
          </Box>
          <CardMedia component="img" sx={{ width: "342px" }} image={course.image_path} alt={course.title} />
        </Card>
      </Grid>
      <Grid sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", pt: 4 }}>
          {sections.map((section) => section)}
          <Grid container justifyContent="flex-start" sx={{ pt: 2 }}>
            <Grid item>
              <Button variant="contained" onClick={handleAddSectionClick}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <Modal open={showSectionForm} onClose={handleCancel}>
            <Box sx={modalStyle}>
              <Typography id="modal-title" variant="h6" component="h2">
                Título de la sección
              </Typography>
              <CourseSectionForm onFormSubmit={handleFormSubmit} onCancel={() => setOpenDialog(true)} />
            </Box>
          </Modal>
        </Box>
      </Grid>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {}}
        aria-describedby="alert-dialog-slide-description"
        style={{ zIndex: 2000 }}
      >
        <DialogTitle>{"¿Estás seguro de que deseas cancelar la acción?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta acción anulará todos los datos que hayas ingresado en el formulario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleCancel} variant="contained" color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
