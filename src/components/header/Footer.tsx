import React from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { LogoFooter, SocialMediaFooter } from "icons";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E0E0E0",
    },
  },
});

const Footer: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" color="primary" enableColorOnDark style={{ top: "auto", bottom: 0, height: "150px" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <LogoFooter />
            <Box>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ display: "inline-block", marginBottom: "10px", marginLeft: "-50px" }}
              >
                Politica de privacidad
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ display: "inline-block", marginBottom: "5px", marginLeft: "100px" }}
              >
                Condiciones de contrato
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ display: "inline-block", marginTop: "20px", marginLeft: "100px" }}
              >
                Aviso legal
              </Typography>
              <Box>
                <Divider
                  sx={{ width: "140%", height: 1, backgroundColor: "#424242", marginLeft: "-140px", marginY: "1em" }}
                />
              </Box>
              <SocialMediaFooter />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
