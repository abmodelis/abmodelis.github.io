import { NotInterested, Preview } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { StyledMuiMarkdown } from "components/Markdown/indext";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Player from "react-player";

import { Content, IContentInput } from "types";

type Props = {
  content?: Content;
  onFormSubmit: (data: IContentInput) => void;
  onCancel: () => void;
};

export const CourseClassesForm: React.FC<Props> = ({ content, onFormSubmit, onCancel }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [url, setUrl] = useState("");
  const form = useForm<IContentInput>();

  const handleUrlChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    if (content) {
      form.reset({
        unit_id: content.id,
      });
    }
  }, [content]);

  const handleSubmit = (data: IContentInput) => {
    onFormSubmit(data);
  };

  const togglePreview = () => {
    setShowPreview((prevShowPreview) => !prevShowPreview);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box sx={{ maxHeight: "600px", overflow: "auto" }}>
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
              })}
              label="Contenido del curso"
              multiline
              rows={10}
              fullWidth
              sx={{ mt: 2, mb: 1.5 }}
            />
          ) : (
            <StyledMuiMarkdown>{form.watch("html_text")}</StyledMuiMarkdown>
          )}
          <Button sx={{ mt: 2, mb: 1.5 }} variant="text" onClick={togglePreview}>
            {!showPreview ? <Preview /> : <NotInterested color="secondary" />}
          </Button>
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 1.5, px: 2 }}>
          <TextField
            {...form.register("media_path")}
            fullWidth
            label="URL del video"
            id="fullWidth"
            onChange={handleUrlChange}
          />
        </Typography>

        {url && (
          <Box px={2} style={{ borderRadius: "10px", overflow: "hidden" }}>
            <Player url={url} width="100%" height="420px" />
          </Box>
        )}
      </Box>
      <Grid container py={2} spacing={2} justifyContent="flex-end">
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
