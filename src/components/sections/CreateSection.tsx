import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Modal,
    Paper,
    Slide,
    Typography,
  } from "@mui/material";
  import { TransitionProps } from "@mui/material/transitions";
  import React from "react";
  import { CoursesService } from "../../services";
  import { ICourseInput } from "../../types";
  import { SectionForm } from "components/sections/SectionForm";
// import { title } from "process";
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  interface CreateSectionProps {
    addButton: React.ReactNode;
    title: string;
    open: boolean;
    handleClose: () => void;
}

  // export const CreateSection: React.FC<{ addButton: React.ReactNode; title: string }> = ({ addButton }) => {
  export const CreateSection: React.FC<CreateSectionProps> = ({ addButton, title, open, handleClose }) => {
    // const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleOpen = () => setOpenDialog(true);
    
    // const handleClose = () => {
    //   setOpenDialog(false);
    //   setOpen(false);
    // };
    
    const handleButtonClick = (data: ICourseInput) => {
      CoursesService.createCourse(data).then(() => {
        handleClose();
        window.location.reload();
      });
    };
  
    return (
      <div>
        <div 
          // onClick={handleOpen}
        >{addButton}</div>
        
  
        <Modal
          open={open}
          onClose={() => {}}
          roboto-labelledby="modal-modal-title"
          sx={{ overflow: "scroll" }}
          disableEscapeKeyDown
        >
          <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item>
                <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                  <Typography id="modal-modal-title" variant="h6" component="h4">
                    {title}
                  </Typography>
                  <SectionForm onFormSubmit={handleButtonClick} onCancel={() => setOpenDialog(true)} title={title}/>
                  <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => {}}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Estas seguro que deseas cancelar la accion?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Esta accion anulara todos los datos que hayas ingresado en el formulario de {title.toLowerCase()}.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                      <Button onClick={() => {
                          handleClose();
                          setOpenDialog(false);
                      }}>Confirmar</Button>
                    </DialogActions>
                  </Dialog>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  };
  