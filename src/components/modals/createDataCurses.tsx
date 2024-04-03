import React from "react";
import { Box, Button, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
//import InputFileUpload from "../buttons/InputFileUpload";
import SaveButton from "../buttons/SaveButton";
import AddIcon from '@mui/icons-material/Add';
import CancelButton from "../buttons/CancelButton";

const currencies = [
    {
      value: '',
      label: '',
    },
    {
      value: 'Visible',
      label: 'Visible',
    },
    {
      value: 'No visible',
      label: 'No visible',
    }
];


export const CreateDataCurses: React.FC<{}> = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div>
            <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon/>} sx={{bgcolor:"#FFFFFF", color:"#110404", "&:hover": {bgcolor: "#E6E6E6"},}}>Agregar curso</Button>
            <Modal open={open} onClose={handleClose} roboto-labelledby="modal-modal-title">
                <Container maxWidth="sm">
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item>
                            <Paper sx={{padding:"1.2em", borderRadius:"0.5em"}}>
                                <Box component="form">
                                    <Typography id="modal-modal-title" variant="h6" component="h4">Crear datos del curso</Typography>
                                    <TextField required id="outlined-required" label="Titulo del curso" fullWidth sx={{mt:2, mb:1.5}}/>
                                    <TextField id="outlined-multiline-static-required" label="Descripcion del curso" multiline rows={2} fullWidth sx={{mt:1.5, mb:1.5}}/>
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField id="outlined-select-currency" select label="Estado del curso" defaultValue="" fullWidth sx={{mt:1.5, mb:1.5}}>
                                                {currencies.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth sx={{ mt:1.5, mb:1.5}}>
                                                <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                                <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Precio"/>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{ mt:1.5, mb:1.5}}>
                                        
                                    </Grid>
                                    <Grid container>
                                        <Grid item sx={{ml:26}}>
                                            <CancelButton/>
                                            </Grid>
                                        <Grid item sx={{ml:2}}>
                                            <SaveButton/>
                                            </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Modal>
        </div>
    );
}