import React, { useState } from "react";
// Importar componentes Material-UI y botones personalizados
import { Box, Button, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CancelDialog from "../buttons/CancelDialog";
// Importar el componente para arrastrar y soltar archivos
import DragDropFileUpload from "../buttons/DragDropFileUpload";

// Matriz constante para las opciones del menú desplegable del estado del curso
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

// Definición del componente de función para crear cursos que es un modal (pop-up)
export const CreateDataCurses: React.FC<{}> = () => {
    // Variable de estado para controlar la visibilidad modal
    const [open, setOpen] = React.useState(false);
    // Funciones para manejar la apertura y cierre modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Función para manejar la carga de archivos
    const handleFileUpload = (file: any) => {
        console.log(file);
    };

    // Variables de estado para los datos del curso
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseState, setCourseState] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    // Variables de estado para el seguimiento de la longitud del título y la descripción
    const [courseTitleLength, setCourseTitleLength] = useState(0);
    const [courseDescriptionLength, setCourseDescriptionLength] = useState(0);
    // Variable de estado para la gestión de errores
    const [error, setError] = useState(false);

    const handleButtonClick = (e:any) => {
        // Prevenir el comportamiento por defecto del evento (envío de formulario/recargar la pagina)
        e.preventDefault();
      
        // Validar que todos los campos estén llenos y no superen la longitud máxima
        if (
          courseTitle === "" ||
          courseDescription === "" ||
          courseState === "" ||
          coursePrice === "" ||
          courseTitleLength > 60 ||
          courseDescriptionLength > 180
        ) {
            // Mostrar un mensaje de error
          setError(true);
        } else {
            // Si no hay errores, ocultar el mensaje de error y procesar el valor
          setError(false);
          // ... Aquí se procesaría el valor de los campos para crear el curso
        }
    };

    return(
        <div>
            <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon/>} sx={{bgcolor:"#FFFFFF", color:"#110404", "&:hover": {bgcolor: "#E6E6E6"},}}>Agregar curso</Button>
            <Modal open={open} onClose={handleClose} roboto-labelledby="modal-modal-title" sx={{overflow:"scroll"}}>
                <Container maxWidth="sm">
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <Grid item>
                            <Paper sx={{padding:"1.2em", borderRadius:"0.5em"}}>
                                <Box component="form">
                                    <Typography id="modal-modal-title" variant="h6" component="h4">Crear datos del curso</Typography>
                                    <div>
                                        {!error && (<TextField id="outlined" label="Titulo del curso" fullWidth sx={{ mt: 2, mb: 1.5 }} value={courseTitle} onChange={(e) => {setCourseTitle(e.target.value); setCourseTitleLength(e.target.value.length);}}/>)}
                                        {error && (<TextField error id="outlined-error-helper-text" label="Error" helperText={courseTitleLength > 60 ? "El título no debe superar los 60 caracteres" : "El campo no debe estar vacio"} fullWidth sx={{ mt: 2, mb: 1.5 }}/>)}
                                    </div>
                                    <div>
                                        {!error && (<TextField id="outlined-multiline-static-required" label="Descripcion del curso" multiline rows={2} fullWidth sx={{mt:1.5, mb:1.5}} value={courseDescription} onChange={(e) => {setCourseDescription(e.target.value); setCourseDescriptionLength(e.target.value.length);}}/>)}
                                        {error && (<TextField error id="outlined-multiline-static-required" label="Error" helperText={courseDescriptionLength > 180 ? "La descripcion no debe superar los 180 caracteres" : "El campo no debe estar vacio"} multiline rows={2} fullWidth sx={{mt:1.5, mb:1.5}}/>)}
                                    </div>
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={6}>
                                            <div>
                                                {!error && (<TextField id="outlined-select-currency" select label="Estado del curso"  fullWidth sx={{mt:1.5, mb:1.5}} value={courseState} onChange={(e) => setCourseState(e.target.value)}>
                                                {currencies.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}</TextField>)}
                                                {error && (<TextField error id="outlined-select-currency" select label="Error" helperText="El campo no debe de estar vacio" defaultValue="" fullWidth sx={{mt:1.5, mb:1.5}}>
                                                {currencies.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}</TextField>)}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div>
                                                {!error && (<FormControl fullWidth sx={{ mt:1.5, mb:1.5}}>
                                                    <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                                    <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Precio" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)}/>
                                                    </FormControl>)}
                                                {error && (<FormControl error fullWidth sx={{ mt:1.5, mb:1.5}}>
                                                    <InputLabel htmlFor="outlined-adornment-amount">Error</InputLabel>
                                                    <OutlinedInput id="outlined-adornment-amount" startAdornment={<InputAdornment position="start">$</InputAdornment>}/>
                                                    </FormControl>)}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{ mt:1.5, mb:1.5}}>
                                        <DragDropFileUpload onFileUpload={handleFileUpload} />
                                    </Grid>
                                    <Grid container>
                                        <Grid item sx={{ml:26}}>
                                            <CancelDialog/>
                                            </Grid>
                                        <Grid item sx={{ml:2}}>
                                            <Button type="submit" variant="contained" color="success" onClick={handleButtonClick}>
                                                Guardar
                                            </Button>
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
