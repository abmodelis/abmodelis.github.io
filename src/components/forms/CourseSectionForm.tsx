import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ISectionInput } from "types";
import { Section } from "types/Section";

type Props = {
  section?: Section;
  onFormSubmit: (data: ISectionInput) => void;
  onCancel: () => void;
};

export const CourseSectionForm: React.FC<Props> = ({ section, onFormSubmit, onCancel }) => {
  const form = useForm<ISectionInput>();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { course_id } = location.state || {};

  useEffect(() => {
    if (section) {
      form.reset({
        course_id: course_id,
        title: section.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const handleSubmit = (data: ISectionInput) => {
    if (isSubmitting) return; // Prevenir múltiples envíos si ya se está procesando uno
    setIsSubmitting(true); // Deshabilitar el botón de envío

    data.course_id = course_id;
    onFormSubmit(data);

    // Establecer un retraso antes de restablecer el estado isSubmitting
    setTimeout(() => {
      setIsSubmitting(false);
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
        })}
        label="Título de la sección"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        error={!!form.formState.errors.title}
        helperText={form.formState.errors.title?.message}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
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
