import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

import { LogoNavBar } from "icons";
import { SearchBar } from "../SearchBar";

import { ProfessorRegister } from "components/modals/ProfessorRegister";

export const LoginNavBarInit: React.FC = () => {
  return (
    <AppBar position="sticky">
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
            <ProfessorRegister />
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
