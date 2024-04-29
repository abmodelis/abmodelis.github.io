import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassesAccordion from '../classes';
import { Typography } from '@mui/material';

export default function SectionAccordion() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

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
          expandIcon={<ExpandMoreIcon sx={{ color: expanded ? '#FFFFFF' : 'inherit' }}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: expanded ? '#1976D2' : 'transparent',
            '.MuiAccordionSummary-content': {
                color: expanded ? '#FFFFFF' : 'inherit',
            }
          }}
        >
          <Typography variant='h5'>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClassesAccordion />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}