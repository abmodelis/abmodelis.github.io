// import AddIcon from "@mui/icons-material/Add";
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
import { CourseForm } from "../forms";

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// export const CreateDataCurses: React.FC = () => {
export const CreateDataCurses: React.FC<{ addButton: React.ReactNode }> = ({ addButton }) => {
// export const CreateDataCurses: React.FC<CreateDataCursesProps> = ({ onClose }) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };
  const handleButtonClick = (data: ICourseInput) => {
    CoursesService.createCourse(data).then(() => {
      handleClose();
      window.location.reload();
    });
  };

  return (
    <div>
      {/* <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ bgcolor: "#FFFFFF", color: "#110404", "&:hover": { bgcolor: "#E6E6E6" } }}
      >
        Agregar curso
      </Button> */}
      <div onClick={handleOpen}>{addButton}</div>
      

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
                  Crear datos del curso
                </Typography>
                <CourseForm onFormSubmit={handleButtonClick} onCancel={() => setOpenDialog(true)} />
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
                      Esta accion anulara todos los datos que hayas ingresado en el formulario de crear los datos para
                      un nuevo curso.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleClose}>Confirmar</Button>
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
