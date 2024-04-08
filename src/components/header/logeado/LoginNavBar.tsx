import { AppBar, Avatar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

import { LogoNavBar } from "icons";
import { SearchBar } from "../SearchBar";

export const LoginNavBar: React.FC = () => {
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
          <Box sx={{ flexGrow: 0 }}>
            <Avatar>M</Avatar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
