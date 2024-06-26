import { NotInterested, Preview } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { StyledMuiMarkdown } from "components/Markdown/indext";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Player from "react-player";

import { Content, IContentInput } from "types";

type Props = {
  content?: Content;
  onFormSubmit: (data: IContentInput) => Promise<void>;
  onCancel: () => void;
};

export const CourseClassesForm: React.FC<Props> = ({ content, onFormSubmit, onCancel }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [url, setUrl] = useState("");
  const form = useForm<IContentInput>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUrlChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    if (content) {
      form.reset({
        unit_id: content.unit_id,
        title: content.title,
        html_text: content.html_text,
        media_path: content.media_path,
      });
    }
  }, [content]);

  const handleSubmit = (data: IContentInput) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    onFormSubmit(data);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);
  };

  const togglePreview = () => {
    setShowPreview((prevShowPreview) => !prevShowPreview);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
        <TextField
          {...form.register("title", {
            required: "Este campo es requerido",
            minLength: { value: 12, message: "Minimo 12 caracteres" },
            maxLength: { value: 60, message: "Maximo 60 caracteres" },
            pattern: { value: /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se aceptan letras y numeros" },
          })}
          label="Título de la clase"
          fullWidth
          sx={{ mt: 2, mb: 1.5 }}
          error={!!form.formState.errors.title}
          helperText={form.formState.errors.title?.message}
          inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
        />
        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 1.5, overflow: "auto", maxHeight: "100%" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          {!showPreview ? (
            <TextField
              {...form.register("html_text", {
                required: "Este campo es requerido",
                minLength: { value: 12, message: "Minimo 12 caracteres" },
                maxLength: { value: 5000, message: "Maximo 5000 caracteres" },
              })}
              label="Contenido de la clase | Formato HTML"
              multiline
              rows={10}
              fullWidth
              sx={{ mt: 2, mb: 1.5 }}
              error={!!form.formState.errors.html_text}
              helperText={form.formState.errors.html_text?.message}
              inputProps={{ maxLength: 5000 }} // Limitar la longitud máxima a 255 caracteres
            />
          ) : (
            <StyledMuiMarkdown>{form.watch("html_text")}</StyledMuiMarkdown>
          )}
          <Button sx={{ mt: 2, mb: 1.5 }} variant="text" onClick={togglePreview}>
            {!showPreview ? <Preview /> : <NotInterested color="secondary" />}
          </Button>
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 1.5 }}>
          <TextField
            {...form.register("media_path")}
            fullWidth
            label="URL del video"
            id="fullWidth"
            onChange={handleUrlChange}
          />
        </Typography>

        {url && (
          <Box style={{ overflow: "hidden" }}>
            <Player url={url} width="100%" height="420px" />
          </Box>
        )}
      </Box>
      <Grid container py={2} spacing={2} justifyContent="flex-end">
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
