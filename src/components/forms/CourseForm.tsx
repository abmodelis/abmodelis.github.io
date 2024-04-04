import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ICourseInput, Status } from "../../types";
import DragDropFileUpload from "../buttons/DragDropFileUpload";
import { useState } from "react";

type Props = {
  onFormSubmit: (data: ICourseInput) => void;
  onCancel: () => void;
};

export const CourseForm: React.FC<Props> = ({ onFormSubmit, onCancel }) => {
  const form = useForm<ICourseInput>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (data: ICourseInput) => {
    if (!imageFile) {
      form.setError("image", { message: "Este campo es requerido" });
      return;
    }
    data.image = imageFile;
    onFormSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <TextField
        {...form.register("title", {
          required: "Este campo es requerido",
          minLength: { value: 5, message: "Minimo 5 caracteres" },
          maxLength: { value: 100, message: "Maximo 100 caracteres" },
          pattern: { value: /^[A-Za-z0-9\s]+$/, message: "Solo se aceptan letras y numeros" },
        })}
        label="Titulo del curso"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        error={!!form.formState.errors.title}
        helperText={form.formState.errors.title?.message}
      />
      <TextField
        {...form.register("description", {
          required: "Este campo es requerido",
        })}
        label="Descripcion del curso"
        multiline
        rows={2}
        fullWidth
        sx={{ mt: 1.5, mb: 1.5 }}
        error={!!form.formState.errors.description}
        helperText={form.formState.errors.description?.message}
      />
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} error={!!form.formState.errors.status}>
            <InputLabel htmlFor="course-status">Estado del curso</InputLabel>
            <Select
              {...form.register("status", { required: "Este campo es requerido", valueAsNumber: true })}
              id="course-status"
              label="Estado del curso"
              defaultValue={Status.NO_VISIBLE}
            >
              <MenuItem value={Status.VISIBLE}>Visible</MenuItem>
              <MenuItem value={Status.NO_VISIBLE}>No Visible</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} error={!!form.formState.errors.price}>
            <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
            <OutlinedInput
              {...form.register("price", { required: "Este campo es requerido", valueAsNumber: true })}
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
              label="Precio"
              defaultValue={0}
              type="number"
              inputProps={{ min: 0, step: 0.01, max: 99999999.99 }}
            />
            {form.formState.errors.price && <FormHelperText>{form.formState.errors.price.message}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1.5, mb: 1.5 }}>
        <Box {...form.register("image", { required: "Debe subir una imagen" })}>
          <DragDropFileUpload onFileUpload={setImageFile} />
          {form.formState.errors.image && (
            <FormHelperText error={!!form.formState.errors.image}>{form.formState.errors.image.message}</FormHelperText>
          )}
        </Box>
      </Grid>
      <Grid container>
        <Grid item sx={{ ml: 26 }}>
          <Button onClick={onCancel}>Cancelar</Button>
        </Grid>
        <Grid item sx={{ ml: 2 }}>
          <Button type="submit" variant="contained" color="success">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
