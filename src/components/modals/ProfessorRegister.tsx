import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { ProfessorRegisterForm } from "components/forms/ProfessorRegisterForm";

import { LogoFooter } from "icons";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ProfessorRegister: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };
  const handleButtonClick = () => {};

  return (
    <div>
      {/* <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ bgcolor: "#FFFFFF", color: "#110404", "&:hover": { bgcolor: "#E6E6E6" } }}
      >
        <AddIcon />
      </Button> */}
      <Button onClick={handleOpen} variant="contained" sx={{ textTransform: "none" }}>
        <Typography sx={{ color: "white", textDecoration: "underline" }}>Enseña en UFC</Typography>
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h4"
                    sx={{ marginLeft: "51px", marginRight: "30px" }}
                  >
                    Enseña en UnFlip Code
                  </Typography>
                  <Box sx={{ marginLeft: "30px", marginRight: "51px" }}>
                    <LogoFooter />
                  </Box>
                </Box>
                <Divider sx={{ height: 1, backgroundColor: "#424242", marginY: "1em" }} />
                <ProfessorRegisterForm onFormSubmit={handleButtonClick} onCancel={() => setOpenDialog(true)} />
                <Dialog
                  open={openDialog}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => {}}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"¿Estás seguro de que deseas cancelar la acción?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Esta acción anulará todos los datos que hayas ingresado en el formulario de crear los datos para
                      un nuevo curso.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleClose} variant="contained" color="error">
                      Confirmar
                    </Button>
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
