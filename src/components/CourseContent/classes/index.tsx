import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Slide,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { TransitionProps } from "@mui/material/transitions";
import { CourseClassesForm } from "components/forms/CourseClassesForm";
import { StyledMuiMarkdown } from "components/Markdown/indext";
import React from "react";
import { useState } from "react";
import Player from "react-player";
import { ContentService } from "services";
import { Content, IContentInput } from "types";

type ClassAccordionProps = {
  classNumber: number;
  content: Content;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ClassesAccordion: React.FC<ClassAccordionProps> = ({ classNumber, content }: ClassAccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const [isHovering, setIsHovering] = useState(false);

  const [showEditClassForm, setShowEditClassForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditclassClick = () => {
    setShowEditClassForm(true);
  };
  const handleEditFormSubmit = async (contentData: IContentInput) => {
    //Logica para guardar los datos cambiados(Tarea #77)
    ContentService.updateContent(content.id, contentData).then(() => {
      setShowEditClassForm(false);
      window.location.reload();
    });
  };
  const handleEditCancel = () => {
    setOpenDialog(false);
    setShowEditClassForm(false);
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
              sx={{ color: expanded ? "#FFFFFF" : "inherit", ml: "auto" }}
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
          }}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
        >
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            Clase {classNumber}: {content.title}
            <Box sx={{ display: "inline-flex", opacity: isHovering ? 1 : 0, transition: "opacity 0.3s" }}>
              <IconButton
                onClick={() => {
                  handleEditclassClick();
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

        <Modal open={showEditClassForm} onClose={handleEditCancel}>
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Editar el contenido de la clase
            </Typography>
            <CourseClassesForm
              content={content}
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
          <StyledMuiMarkdown>{content.html_text}</StyledMuiMarkdown>
          <Box py={2}>
            <Player url={content.media_path} width="100%" height="420px" />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ClassesAccordion;
