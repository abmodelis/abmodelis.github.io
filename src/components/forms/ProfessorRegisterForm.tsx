import {
  Box,
  Button,
  Divider,
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
//import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

import {
  Course,
  ICourseInput,
  //  Status
} from "types";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material/Select";
import { BirthDataPicker } from "./BirthDataPicker";

type Props = {
  course?: Course;
  onFormSubmit: () => void;
  onCancel: () => void;
};

export const ProfessorRegisterForm: React.FC<Props> = ({ course, onFormSubmit, onCancel }) => {
  const form = useForm<ICourseInput>();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   if (!course) return;
  //   form.reset({});
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [course]);

  const handleSubmit = () => {};

  const [area, setArea] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setArea(event.target.value as string);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre"
            fullWidth
            sx={{ mt: 1.5, mb: 1.5 }}
            inputProps={{ maxLength: 130 }} // Limitar la longitud máxima a 130 caracteres
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Apellidos"
            fullWidth
            sx={{ mt: 1.5, mb: 1.5 }}
            inputProps={{ maxLength: 130 }} // Limitar la longitud máxima a 130 caracteres
          />
        </Grid>
      </Grid>
      <TextField
        label="Correo electrónico"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Confirmar contraseña</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confimar contraseña"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <BirthDataPicker title="Fecha de Nacimiento"></BirthDataPicker>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }}>
            <InputLabel id="demo-simple-select-label">Área de especialización</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area}
              label="Área de especialización"
              onChange={handleChange}
            >
              <MenuItem value={"Desarrollo web"}>Desarrollo web</MenuItem>
              <MenuItem value={"Ciberseguridad"}>Ciberseguridad</MenuItem>
              <MenuItem value={"Inteligencia Artificial"}>Inteligencia Artificial</MenuItem>
              <MenuItem value={"Desarrollo mobile"}>Desarrollo mobile</MenuItem>
              <MenuItem value={"Inglés"}>Inglés</MenuItem>
              <MenuItem value={"Redes y telecomunicaciones"}>Redes y telecomunicaciones</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 1.5, mb: 1.5 }}>
        <Box></Box>
      </Grid>
      <Divider sx={{ height: 1, backgroundColor: "#424242", marginY: "1em" }} />
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={4} sx={{ display: "inline-flex", justifyContent: "center" }}>
          <Button onClick={onCancel} sx={{ width: "80%" }}>
            Cancelar
          </Button>
        </Grid>
        <Grid item xs={8} sx={{ alignItems: "center", display: "inline-flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained" color="success" sx={{ width: "80%" }}>
            Registrarme
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
