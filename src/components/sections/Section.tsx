import { Box, Divider, Grid, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { CreateSection } from "components/sections/CreateSection";
import * as React from 'react';

export const Section: React.FC<{}> = () => {

  const [showCreateSectionModal, setShowCreateSectionModal] = React.useState<boolean>(false);
  const handleOpenCreateSectionModal = () => {
    setShowCreateSectionModal(true);
  };

  const handleCloseCreateSectionModal = () => {
      setShowCreateSectionModal(false);
  };

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={8}>
        <Typography textAlign={"center"} variant="h4">
          {/* {course.title} */}
          Titulo Generico
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography textAlign={"center"} variant="h6">
          Descripción:
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          sx={{
            maxHeight: 500,
            overflowX: "hidden",
            overflowWrap: "break-word",
            textOverflow: "ellipsis",
          }}
        >
          <br />
          Descripcion generica jfias dfjiasdf idsahfo isadfuas dfuo sadfuoahu fsadufhsu dafsdaif husdhfusi ahfuiahu ifaufhauh fudshfu sfisfiua hfuiha suiof
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box width={"100%"} display={"flex"}>
          <Typography px={3} textAlign={"start"} variant="h6">
            100 Bs.
          </Typography>
          <Typography px={3} textAlign={"start"} variant="h6" display={"flex"} alignItems={"center"}>
            Visible
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
        <img src="../../../../public/ufc-LOGO.svg" alt="Título Generico" style={{ height: "240px", width: "342px" }} />
      </Grid>

      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box width={"100%"}>
          <CreateSection
            addButton={<Button onClick={handleOpenCreateSectionModal} endIcon={<AddIcon style={{ color: 'white'}}/>} sx={{color: 'white', bgcolor: '#1976D2', textTransform: 'none', fontFamily:'Roboto', fontSize:'18px', width: '257px', height: '52px', '&:hover': {bgcolor: '#1976D2',}, }}>Agregar Sección</Button>}
            title="Título de la sección"
            open={showCreateSectionModal}
            handleClose={handleCloseCreateSectionModal}
          />
            
        </Box>
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box ml={2}>
          <Button sx={{width: '141px', height: '50px', textTransform: 'none', fontFamily:'Roboto', fontSize:'18px'}}>Cancelar</Button>
        </Box>
        <Box ml={2}>
          <Button type="submit" variant="contained" color="success" sx={{width: '141px', height: '50px', textTransform: 'none', fontFamily:'Roboto', fontSize:'18px'}}>
            Guardar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
