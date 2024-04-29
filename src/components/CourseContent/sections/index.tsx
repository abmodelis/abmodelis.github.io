import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassesAccordion from '../classes';
import { Box, Button, Grid, Typography } from '@mui/material';
import { CourseClassesForm } from "components/forms/CourseClassesForm";
import { Classes } from "types/Classes";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleFormSubmit = (classData: Classes) => {
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

  return (
    <div>
      <Accordion
        sx={{
          width: '100%',
          border: expanded ? '1px solid #1976D2' : 'none',
        }}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: expanded ? '#FFFFFF' : 'inherit' }} />}
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
          <Typography variant='h5' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> Sección {sectionNumber}: {title} {isHovering && (
            <>
              <EditIcon sx={{ ml: 1, visibility: 'visible' }} />
              <DeleteIcon sx={{ ml: 1, visibility: 'visible' }} />
            </>
          )}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid sx={{ width: "100%" }}>
            <Box sx={{ display: "felx", maxWidth: "1025px", pt: 1 }}>
              {classes.map((classes) => classes)}
              {
                showClassForm ? (
                  <CourseClassesForm onFormSubmit={handleFormSubmit} onCancel={handleCancel} />
                ) : (
                  <Button variant="contained" onClick={handleAddClassClick}>Agregar sección</Button>
                )
              }
            </Box>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}