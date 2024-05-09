import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { CourseClassesForm } from "components/forms/CourseClassesForm";
import { useEffect, useState } from "react";
import { IContentInput, Section, ISectionInput } from "types";
import ClassesAccordion from "../classes";
import { ContentService } from "services";

import { CourseSectionForm } from "components/forms/CourseSectionForm";
import { TransitionProps } from "@mui/material/transitions";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import React from "react";

type SectionAccordionProps = {
  sectionNumber: number;
  section: Section;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SectionAccordion: React.FC<SectionAccordionProps> = ({ sectionNumber, section }) => {
  const [expanded, setExpanded] = useState(false);
  const [classes, setClasses] = useState<JSX.Element[]>([]);

  const [isHovering, setIsHovering] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);

  useEffect(() => {
    if (section) {
      //setClasses(section.contents.map((content) => <ClassesAccordion key={content.id} content={content} />));
    }
  }, [section]);

  const handleAddClassClick = () => {
    setShowClassForm(true);
  };

  const handleFormSubmit = async (classData: IContentInput) => {
    // classData.unit_id = section.id;
    // // Aquí agregas la nueva sección con los datos del formulario
    // const newContent = await ContentService.createContent(classData);
    // setClasses((prevSections) => [
    //   ...prevSections,
    //   <Box key={prevSections.length} sx={{ mb: 2 }}>
    //     <ClassesAccordion key={newContent.id} content={newContent} />
    //   </Box>,
    // ]);
    // setShowClassForm(false); // Oculta el formulario después de agregar la sección
  };

  const handleCancel = () => {
    setShowClassForm(false); // Oculta el formulario si se cancela
  };

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const [showEditSectionForm, setShowEditSectionForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleEditsectionClick = () => {
    setShowEditSectionForm(true);
  };
  const handleEditFormSubmit = async (sectionData: ISectionInput) => {
    //Logica para guardar los datos cambiados(Tarea #35)
    setShowEditSectionForm(false);
  };
  const handleEditCancel = () => {
    setOpenDialog(false);
    setShowEditSectionForm(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: {
      xs: "90%",
      sm: "400px",
      md: "800px",
      lg: "1000px",
      xl: "1200px",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        sx={{
          width: "100%",
          border: expanded ? "1px solid #1976D2" : "none",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              onClick={() => setExpanded(!expanded)}
              sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: "auto", px: 1, "&:hover": { cursor: "pointer" } }}
              onChange={handleChange}
            />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: expanded ? "#1976D2" : "transparent",
            ".MuiAccordionSummary-content": {
              color: expanded ? "#FFFFFF" : "inherit",
            },
            "&:hover": {
              cursor: "default !important",
            },
          }}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
        >
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            Sección {sectionNumber}: {section.title}
            <Box sx={{ display: "inline-flex", opacity: isHovering ? 1 : 0, transition: "opacity 0.3s" }}>
              <IconButton
                onClick={() => {
                  handleEditsectionClick();
                }}
                sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: 1 }}
              >
                <EditIcon sx={{ visibility: "visible" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  /* Coloca aquí la lógica para eliminar */
                }}
                sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: 1 }}
              >
                <DeleteIcon sx={{ visibility: "visible" }} />
              </IconButton>
            </Box>
          </Typography>
        </AccordionSummary>

        <Modal open={showEditSectionForm} onClose={handleEditCancel}>
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Título de la sección
            </Typography>
            <CourseSectionForm
              section={section}
              onFormSubmit={handleEditFormSubmit}
              onCancel={() => setOpenDialog(true)}
            />
          </Box>
        </Modal>
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
            <Button onClick={handleEditCancel} variant="contained" color="error">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <AccordionDetails>
          <Grid sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
              {classes.map((classes) => classes)}
              <Grid container justifyContent="flex-start" sx={{ pt: 2 }}>
                <Grid item>
                  <Button variant="contained" onClick={handleAddClassClick}>
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
              <Modal open={showClassForm} onClose={handleCancel}>
                <Box sx={modalStyle}>
                  <Typography id="modal-title" variant="h4" component="h2" textAlign={"center"}>
                    Nueva Clase
                  </Typography>
                  <CourseClassesForm onFormSubmit={handleFormSubmit} onCancel={handleCancel} />
                </Box>
              </Modal>
            </Box>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SectionAccordion;
