// Importar hooks de React para state y callbacks
import { useCallback, useState } from 'react';
// Importar componentes Material-UI
import { Box, Paper, Typography, IconButton, Grid, CircularProgress } from '@mui/material';
// Importar icono de carga
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function DragDropFileUpload({ onFileUpload }: { onFileUpload: (file: File) => void }) {
  // Variables de estado para el efecto de arrastre, el estado de carga y la previsualización de la imagen
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDragOver = useCallback((event: any) => {
    // Impedir el comportamiento por defecto (como abrir el archivo)
    event.preventDefault();
    // Establecer el estado dragOver a true para el efecto visual (resaltado)
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: any) => {
    // Impedir el comportamiento por defecto (como abrir el archivo)
    event.preventDefault();
    // Restablecer el estado dragOver a false cuando el arrastre abandone el área
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: any) => {
      // Impedir el comportamiento por defecto (como abrir el archivo)
      event.preventDefault();
      // Restablecer estado dragOver
      setDragOver(false);
      // Obtener los archivos arrastrados
      const files = event.dataTransfer.files;
      // Comprueba si hay al menos un fichero
      if (files && files[0]) {
        // Llamar a la función handleFileChange con el primer fichero
        handleFileChange(files[0]);
      }
    },
    []
  );

const handleFileChange = (file: any) => {
  // Establecer el estado de carga a true
  setLoading(true);
  // Activa la función onFileUpload con el archivo cargado
  onFileUpload(file);

  // Crear un FileReader para previsualizar la imagen
  const reader = new FileReader();
  reader.onloadend = () => {
    // Establecer el estado de carga a false
    setLoading(false);
    // Establecer el estado imagePreview con la URL de datos para la vista previa
    setImagePreview(reader.result as string | null);
  };

  // Leer el archivo como una URL de datos
  reader.readAsDataURL(file);
};

  const handleChange = useCallback(
    (event: any) => {
      // Obtener archivos del evento de cambio de entrada
      const files = event.target.files;
      // Si hay al menos un fichero, llama a handleFileChange
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    },
    []
  );

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative',
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="raised-button-file">
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <CloudUploadIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Typography>Arrastre y suelte los archivos aquí o haga clic para seleccionarlos</Typography>
          </Box>
        </label>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Paper>
      {imagePreview && (
        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component="img"
              src={imagePreview}
              alt="Image Preview"
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default DragDropFileUpload;