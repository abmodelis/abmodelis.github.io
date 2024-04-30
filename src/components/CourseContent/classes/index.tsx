import { SetStateAction, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, TextField, Typography } from '@mui/material';
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
            Clase {classNumber}: {title}
            <Box sx={{ display: 'inline-flex', opacity: isHovering ? 1 : 0, transition: 'opacity 0.3s' }}>
              <IconButton
                onClick={() => {/* Coloca aquí la lógica para editar */ }}
                sx={{ color: expanded ? '#FFFFFF' : 'inherit', ml: 1 }}>
                <EditIcon sx={{ visibility: 'visible' }} />
              </IconButton>
              <IconButton
                onClick={() => {/* Coloca aquí la lógica para eliminar */ }}
                sx={{ color: expanded ? '#FFFFFF' : 'inherit',  ml: 1 }}>
                <DeleteIcon sx={{ visibility: 'visible' }} />
              </IconButton>
            </Box>
          </Typography>
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