import { Edit } from "@mui/icons-material";
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
import { CourseForm } from "components/forms";
import React from "react";
import { CoursesService } from "services";
import { Course, ICourseInput } from "types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  course: Course;
};

export const UpdateDataCourse: React.FC<Props> = ({ course }) => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const handleButtonClick = (data: ICourseInput) => {
    CoursesService.updateCourse(course.id, data).then(() => {
      handleClose();
      window.location.reload();
    });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<Edit />}
        sx={{ bgcolor: "#FFFFFF", color: "#110404", "&:hover": { bgcolor: "#E6E6E6" } }}
      >
        Editar datos
      </Button>

      <Modal
        open={open}
        onClose={() => { }}
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
                <CourseForm course={course} onFormSubmit={handleButtonClick} onCancel={() => setOpenDialog(true)} />
                <Dialog
                  open={openDialog}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => { }}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"¿Estás seguro de que deseas cancelar la acción?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Esta acción anulará todos los datos que hayas ingresado en el formulario de editar los datos para un curso.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleClose} variant="contained" color="error">Confirmar</Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
