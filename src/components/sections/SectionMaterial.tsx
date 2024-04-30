import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from '@mui/material';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CreateSection } from 'components/sections/CreateSection';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SectionMaterials: React.FC = () => {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const handleChange = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };
    const [showIcons, setShowIcons] = React.useState<boolean>(false);

    const [showEditSectionModal, setShowEditSectionModal] = React.useState<boolean>(false);

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenEditSectionModal = () => {
        setShowEditSectionModal(true);
    };

    const handleCloseEditSectionModal = () => {
        setShowEditSectionModal(false);
    };


    const handleMouseEnter = () => {
        setShowIcons(true);
    };

    const handleMouseLeave = () => {
        setShowIcons(false);
    };


  return (
    <div>
      <Accordion 
        expanded={expanded}
        onChange={handleChange}
        sx={{
          border: "1px solid",
          borderColor: expanded ? "#1976D2" : "gray",
          borderRadius: "5px",
          marginTop: "15px", // Margen inferior para separar los acordeones
      }}
      >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: expanded ? 'white' : 'gray' }}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ 
                backgroundColor: expanded ? '#1976D2' : 'inherit',  
                color: expanded ? 'white' : 'black' 
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
          
            <div style={{ flex: 0.12 , alignSelf: 'center'}}>Accordion Actions</div>
            <div onClick={(event) => {event.stopPropagation();}} style={{ display: 'flex', alignItems: 'center' }}>
                {showIcons && (
                     <>
                        <IconButton 
                          size="small" 
                          onClick={handleOpenEditSectionModal}
                          style={{ 
                            color: expanded ? 'white' : 'gray'
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>                                
                        <IconButton 
                          size="small" 
                          onClick={() => setOpenDialog(true)}
                          style={{ 
                            color: expanded ? 'white' : 'gray'
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                )}
            </div>
        </AccordionSummary>
        <CreateSection
          title="Editar título de la clase"
          open={showEditSectionModal}
          handleClose={handleCloseEditSectionModal}
        />
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {}}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"¿Esta seguro de eliminar este curso?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Se eliminará el curso y todos los datos en él.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={() => {
              setOpenDialog(false);
            }}>Confirmar</Button>
          </DialogActions>
        </Dialog>

        <AccordionDetails>
          //
        </AccordionDetails>
        <AccordionActions>
          //Inserte Cajita para añadir contenido
        </AccordionActions>
      </Accordion>
    </div>
  );
}
