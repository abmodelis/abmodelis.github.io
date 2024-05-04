import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

export default function ArchivedCourse() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    window.location.href = "/#/teachers/courses";
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        <ArchiveOutlinedIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h4">
          {"¿Archivar curso?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="h6">
            Al archivar un curso, se archivará para todos los participantes y ya no se dará seguimiento a tu sistema de
            información sobre alumnos.
            <br />
            <br />
            No podrás hacer modificaciones a menos que restablezcas el curso.
            <br />
            <br />
            Este curso se moverá a la sección de cursos archivados, que está en tu panel lateral izquierdo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus color="error" variant="contained">
            Archivar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
