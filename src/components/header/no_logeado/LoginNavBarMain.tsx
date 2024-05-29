import { Alert, AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

import { LogoNavBar } from "icons";
import { SearchBar } from "../SearchBar";

import { ProfessorRegister } from "components/modals/ProfessorRegister";

export const LoginNavBarInit: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState<"success" | "error">("success");

  const handleAlert = (message: string, type: "success" | "error") => {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <AppBar position="sticky" sx={{ alignItems: "center" }}>
      <Alert
        severity={alertType}
        sx={{ display: showAlert ? "flex" : "none", width: "300px", position: "absolute", top: "10px", zIndex: 1 }}
      >
        <Typography variant="body2">{alertMessage}</Typography>
      </Alert>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            <LogoNavBar />
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <SearchBar />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {/* <Button sx={{ textTransform: "none" }}>
              <Typography sx={{ color: "white", textDecoration: "underline" }}>Enseña en UFC</Typography>
            </Button> */}
            <ProfessorRegister handleAlert={handleAlert} />
          </Box>
          <Box sx={{ display: "flex", flexGrow: 0, gap: 5 }}>
            <Box>
              <Button sx={{ borderRadius: "5px", border: "1px solid white", textTransform: "none", paddingX: 2 }}>
                <Typography sx={{ color: "white" }}>Iniciar Sesión</Typography>
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "white",
                  paddingX: 2,
                  border: "1px solid white",
                  textTransform: "none",
                  "&:hover": {
                    border: "1px solid whitesmoke",
                    backgroundColor: "whitesmoke", // Cambiar el color de fondo en el hover
                  },
                }}
              >
                <Typography sx={{ color: "black" }}>Registrarse</Typography>
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
