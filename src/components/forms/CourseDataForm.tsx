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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DragDropFileUpload } from "components/buttons/DragDropFileUpload";
import { Course, ICourseInput, Status } from "types";
import { MediaServices } from "services";

type Props = {
  course?: Course;
  onFormSubmit: (data: ICourseInput) => void;
  onCancel: () => void;
};

export const CourseForm: React.FC<Props> = ({ course, onFormSubmit, onCancel }) => {
  const form = useForm<ICourseInput>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!course) return;
    form.reset({
      title: course.title,
      description: course.description,
      status: course.status,
      price: course.price,
    });

    MediaServices.getImage(course.image_path).then((imageFile) => {
      if (!imageFile) return;
      setImageFile(imageFile);
      form.setValue("image", imageFile);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  useEffect(() => {
    if (isSubmitted) {
      // Aquí puedes realizar acciones después de que el formulario se haya enviado
      // Por ejemplo, restablecer el estado isSubmitting
      setIsSubmitting(false);
      // Restablecer el estado isSubmitted para permitir futuros envíos
      setIsSubmitted(false);
    }
  }, [isSubmitted]); // Este efecto se ejecutará cada vez que isSubmitted cambie

  const handleSubmit = async (data: ICourseInput) => {
    if (isSubmitting) return; // Prevenir múltiples envíos si ya se está procesando uno
    setIsSubmitting(true); // Deshabilitar el botón de envío

    if (!imageFile) {
      form.setError("image", { message: "Este campo es requerido" });
      setIsSubmitting(false); // Habilitar el botón si hay un error
      return;
    }

    setImageError(null);
    const fileName = course?.image_path.split("/").pop();
    if (fileName) {
      data.image_url = course?.image_path;
    }
    data.image = fileName === imageFile?.name ? null : imageFile;
    onFormSubmit(data);
    // Establecer un retraso antes de restablecer el estado isSubmitting
    setTimeout(() => {
      setIsSubmitting(true); // Establecer isSubmitted a true para indicar que el formulario se ha enviado
    }, 5000); // Esperar 5 segundos antes de permitir otro envío
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <TextField
        {...form.register("title", {
          required: "Este campo es requerido",
          minLength: { value: 12, message: "Minimo 12 caracteres" },
          maxLength: { value: 60, message: "Maximo 60 caracteres" },
          pattern: { value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se aceptan letras y numeros" },
          validate: (value) => value.trim() !== "" || "El campo no puede estar en blanco",
        })}
        label="Titulo del curso"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        error={!!form.formState.errors.title}
        helperText={form.formState.errors.title?.message}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
      <TextField
        {...form.register("description", {
          required: "Este campo es requerido",
          minLength: { value: 12, message: "Minimo 12 caracteres" },
          maxLength: { value: 130, message: "Maximo 130 caracteres" },
          pattern: { value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se aceptan letras y numeros" },
          validate: (value) => value.trim() !== "" || "El campo no puede estar en blanco",
        })}
        label="Descripcion del curso"
        multiline
        rows={2}
        fullWidth
        sx={{ mt: 1.5, mb: 1.5 }}
        error={!!form.formState.errors.description}
        helperText={form.formState.errors.description?.message}
        inputProps={{ maxLength: 130 }} // Limitar la longitud máxima a 130 caracteres
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
              inputProps={{ min: 500, step: 0.01, max: 1500.0 }}
            />
            {form.formState.errors.price && <FormHelperText>{form.formState.errors.price.message}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1.5, mb: 1.5 }}>
        <Box>
          <DragDropFileUpload imageFile={imageFile} onFileUpload={setImageFile} setError={setImageError} />
          {form.formState.errors.image && (
            <FormHelperText error={!!form.formState.errors.image}>{form.formState.errors.image.message}</FormHelperText>
          )}
          {imageError && <FormHelperText error>{imageError}</FormHelperText>}
        </Box>
      </Grid>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button onClick={onCancel}>Cancelar</Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
