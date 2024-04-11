import EditIcon from "@mui/icons-material/Edit";
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditDataCurses: React.FC = () => {
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
      <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<EditIcon />}
        sx={{ bgcolor: "#FFFFFF", color: "#110404", "&:hover": { bgcolor: "#E6E6E6" } }}
      >
        Editar datos del curso
      </Button>

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
                  Editar datos del curso
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
                      Esta accion anulara todos los cambios que hayas realizado en el formulario de editar los datos para
                      un curso.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleClose}>Confirmar cambios</Button>
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
