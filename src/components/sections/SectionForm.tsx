import {
    Button,
    Grid,
    Box,
    TextField,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  
  import { Course, ICourseInput} from "types";
  
  type Props = {
    course?: Course;
    onFormSubmit: (data: ICourseInput) => void;
    onCancel: () => void;
    title: string;
  };
  
  export const SectionForm: React.FC<Props> = ({ course, onFormSubmit, onCancel, title }) => {
    const form = useForm<ICourseInput>();
  
    useEffect(() => {
      if (!course) return;
      form.reset({
        title: course.title,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course]);
  
    const handleSubmit = (data: ICourseInput) => {
      
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
          label={title}
          fullWidth
          sx={{ mt: 2, mb: 1.5 }}
          error={!!form.formState.errors.title}
          helperText={form.formState.errors.title?.message}
        />
        
          
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item sx={{ ml: 26 }}>
              <Button onClick={onCancel}>Cancelar</Button>
            </Grid>
            <Grid item sx={{ ml: 2 }}>
              <Button type="submit" variant="contained" color="success">
                Guardar
              </Button>
            </Grid>
          </Grid>
           
        </Grid>
      </form>
    );
  };
  