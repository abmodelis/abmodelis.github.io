// Importar los componentes necesarios de Material-UI
import { AppBar, Avatar, Box, Container, Grid, Toolbar } from "@mui/material";

// Importación de React para crear el componente
import React from "react";

// Importa un componente personalizado para el logotipo
import { LogoNavBar } from "../LogoNavBar";

// Importa un componente personalizado para la barra de búsqueda
import SearchBar from "../SearchBar";

// Definir el componente LoginNavBar como un componente React funcional con anotación de tipo para props.
export const LoginNavBar: React.FC<{}> = () => {
  // Renderizar el contenido TSX dentro de un componente Box con estilo flexGrow
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Renderizar un componente AppBar en posición fija */}
      <AppBar position="fixed">
        {/* Renderizar un componente Toolbar dentro de la AppBar */}
        <Toolbar>
          {/* Definir un contenedor con anchura máxima para el diseño responsivo */}
          <Container maxWidth="xl">
            {/* Utilizar el diseño de cuadrícula para colocar los elementos */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              {/* Elemento de cuadrícula para el componente LogoNavBar */}
              <Grid item>
                <LogoNavBar />
              </Grid>
              {/* Elemento de cuadrícula para el componente SearchBar */}
              <Grid item>
                <SearchBar />
              </Grid>
              {/* Elemento de cuadrícula para el componente Avatar */}
              <Grid item>
                <Avatar>M</Avatar>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};