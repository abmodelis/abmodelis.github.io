import { Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
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
    data.course_id = course_id;
    onFormSubmit(data);
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
          <Button type="submit" variant="contained" color="success">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
