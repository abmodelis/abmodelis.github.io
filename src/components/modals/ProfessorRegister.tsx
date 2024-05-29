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
import { ProfessorRegisterForm } from "components/forms/ProfessorRegisterForm";
import React from "react";

import { LogoFooter } from "icons";
import { AuthService } from "services";
import { IUserInput } from "types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handleAlert: (message: string, type: "success" | "error") => void;
};

export const ProfessorRegister: React.FC<Props> = ({ handleAlert }) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };
  const handleButtonClick = async (data: IUserInput) => {
    setLoading(true);
    return AuthService.signUp(data)
      .then(() => {
        setLoading(false);
        setOpen(false);
        handleAlert("Registrado con exito!", "success");
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="text" sx={{ textTransform: "none" }}>
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
                  <Typography id="modal-modal-title" variant="h4">
                    Enseña en UnFlip Code
                  </Typography>
                  <Box>
                    <LogoFooter />
                  </Box>
                </Box>
                <Divider sx={{ height: 1, backgroundColor: "#424242", marginY: "1em" }} />
                <ProfessorRegisterForm
                  loading={loading}
                  onFormSubmit={handleButtonClick}
                  onCancel={() => setOpenDialog(true)}
                />
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
                      Esta acción anulará todos los datos que hayas ingresado en el formulario para formar parte del
                      equipo docente de UnFlip Code.
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
    </>
  );
};
