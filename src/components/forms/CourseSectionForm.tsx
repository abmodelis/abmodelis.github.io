import {
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Section } from "types/Section";
import { useEffect } from 'react';

type Props = {
  section?: Section;
  onFormSubmit: (data: Section) => void;
  onCancel: () => void;
}

export const CourseSectionForm: React.FC<Props> = ({section, onFormSubmit, onCancel }) => {
  const form = useForm<Section>();

  useEffect(() => {
    if (section) {
      form.reset({
        title: section.title,
      });
    }
  }, [section]);

  const handleSubmit = (data: Section) => {
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
        label="Titulo del curso"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        error={!!form.formState.errors.title}
        helperText={form.formState.errors.title?.message}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
      <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
        Guardar
      </Button>
      <Button onClick={onCancel} sx={{ mt: 2, ml: 2 }}>
        Cancelar
      </Button>
    </form>
  );
};