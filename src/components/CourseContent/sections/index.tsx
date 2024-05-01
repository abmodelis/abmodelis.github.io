import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassesAccordion from '../classes';
import { Box, Button, Grid, IconButton, Modal, Typography } from '@mui/material';
import { CourseClassesForm } from "components/forms/CourseClassesForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import { IClassesInput } from 'types';

type SectionAccordionProps = {
  sectionNumber: number;
  title: string;
};

export default function SectionAccordion({ sectionNumber, title }: SectionAccordionProps) {
  const [expanded, setExpanded] = useState(false);

  const [showClassForm, setShowClassForm] = useState(false);

  const handleAddClassClick = () => {
    setShowClassForm(true);
  };

  const handleFormSubmit = (classData: IClassesInput) => {
    // Aquí agregas la nueva sección con los datos del formulario
    setClasses(prevSections => [
      ...prevSections,
      <Box key={prevSections.length} sx={{ mb: 2 }}>
        <ClassesAccordion key={prevSections.length} classNumber={prevSections.length + 1} title={classData.title} />
      </Box>
    ]);
    setShowClassForm(false); // Oculta el formulario después de agregar la sección
  };

  const handleCancel = () => {
    setShowClassForm(false); // Oculta el formulario si se cancela
  };

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const [classes, setClasses] = useState<JSX.Element[]>([]);

  const [isHovering, setIsHovering] = useState(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        sx={{
          width: '100%',
          border: expanded ? '1px solid #1976D2' : 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!expanded)} sx={{ color: expanded ? '#FFFFFF' : 'inherit', ml: 'auto' }} onChange={handleChange} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: expanded ? '#1976D2' : 'transparent',
            '.MuiAccordionSummary-content': {
              color: expanded ? '#FFFFFF' : 'inherit',
            }
          }}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
        >
          <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
            Sección {sectionNumber}: {title}
            <Box sx={{ display: 'inline-flex', opacity: isHovering ? 1 : 0, transition: 'opacity 0.3s' }}>
              <IconButton
                onClick={() => {/*Coloca aquí la lógica para editar */}}
                sx={{ color: expanded ? '#FFFFFF' : 'inherit', ml: 1 }}>
                <EditIcon sx={{ visibility: 'visible' }} />
              </IconButton>
              <IconButton
                onClick={() => {/* Coloca aquí la lógica para eliminar */ }}
                sx={{ color: expanded ? '#FFFFFF' : 'inherit', ml: 1 }}>
                <DeleteIcon sx={{ visibility: 'visible' }} />
              </IconButton>
            </Box>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid sx={{ width: "100%" }}>
            <Box sx={{ display: "felx", flexDirection: "column", pt: 1 }}>
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
                  <Typography id="modal-title" variant="h6" component="h2">
                    Título de la clase
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
}