import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, CircularProgress, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export function DragDropFileUpload({ onFileUpload }: { onFileUpload: (file: File) => void }) {
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

  const handleDrop = useCallback((event: any) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  }, []);

  const handleFileChange = (file: any) => {
    setLoading(true);
    onFileUpload(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setImagePreview(reader.result as string | null);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = useCallback((event: any) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  }, []);

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
          padding: 20,
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "#eee" : "#fafafa",
          position: "relative",
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
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
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Paper>
      {imagePreview && (
        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box component="img" src={imagePreview} alt="Image Preview" sx={{ width: "100%", height: "auto" }} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
