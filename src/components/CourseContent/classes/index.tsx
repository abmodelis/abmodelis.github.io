import { SetStateAction, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Typography } from '@mui/material';
import Player from 'react-player';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ClassAccordionProps = {
  classNumber: number;
  title: string;
};

export default function ClassesAccordion({ classNumber, title }: ClassAccordionProps) {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setUrl(event.target.value);
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      <Accordion sx={{
        width: '100%',
        border: expanded ? '1px solid #1976D2' : 'none',
      }}
        onChange={handleChange}>
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
          <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> Clase {classNumber}: {title} {isHovering && (
            <>
              <EditIcon sx={{ ml: 1, visibility: 'visible' }} />
              <DeleteIcon sx={{ ml: 1, visibility: 'visible' }} />
            </>
          )}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField fullWidth label="URL del video" id="fullWidth" onChange={handleUrlChange} sx={{ mb: 1, mt: 1 }} />
          {url && (
            <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <Player url={url} width="100%" height="420px" />
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}