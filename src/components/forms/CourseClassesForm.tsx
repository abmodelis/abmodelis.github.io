import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Classes } from "types/Classes";
import { useEffect } from 'react';
import { IClassesInput } from "types";
import { useLocation } from "react-router-dom";

type Props = {
  classes?: Classes;
  onFormSubmit: (data: IClassesInput) => void;
  onCancel: () => void;
}

export const CourseClassesForm: React.FC<Props> = ({classes, onFormSubmit, onCancel }) => {
  const form = useForm<IClassesInput>();
  const location = useLocation();

  const { unit_Id } = location.state || {};

  useEffect(() => {
    if (classes) {
      form.reset({
        unit_Id: unit_Id,
        title: classes.title,
      });
    }
  }, [classes]);

  const handleSubmit = (data: IClassesInput) => {
    data.unit_Id = unit_Id;
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
        label="Titulo de la clase"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        error={!!form.formState.errors.title}
        helperText={form.formState.errors.title?.message}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button onClick={onCancel}>
            Cancelar
          </Button>
        </Grid>
        <Grid item >
          <Button type="submit" variant="contained" color="success">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};