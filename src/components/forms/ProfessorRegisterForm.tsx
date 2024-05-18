import {
  Box,
  Button,
  Divider,
  //FilledTextFieldProps,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  //OutlinedTextFieldProps,
  Select,
  //StandardTextFieldProps,
  TextField,
  //TextFieldVariants,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { User } from "types/User";
import { IUserInput } from "types/IUserInput";
import { specializationAreas } from "types/User";
import React from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material/Select";
import { BirthDataPicker } from "./BirthDataPicker";

type Props = {
  user?: User;
  onFormSubmit: (data: IUserInput) => void;
  onCancel: () => void;
};

export const ProfessorRegisterForm: React.FC<Props> = ({ user, onFormSubmit, onCancel }) => {
  const form = useForm<IUserInput>();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
        specializationAreaId: user.specializationArea.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (data: IUserInput) => {
    onFormSubmit(data);
  };

  const [area, setArea] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTitle = event.target.value;
    const selectedArea = specializationAreas.find(area => area.title === selectedTitle);

    if (selectedArea) {
      console.log('Selected ID:', selectedArea.id);
      setArea(selectedTitle);
    }
  };


  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <TextField
            {...form.register("name", {
              required: "Este campo es requerido",
              minLength: { value: 3, message: "Minimo 3 caracteres" },
              maxLength: { value: 30, message: "Maximo 30 caracteres" },
              pattern: { value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se acepta letras" },
            })}
            label="Nombre"
            fullWidth
            sx={{ mt: 1.5, mb: 1.5 }}
            error={!!form.formState.errors.name}
            helperText={form.formState.errors.name?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...form.register("lastname", {
              required: "Este campo es requerido",
              minLength: { value: 4, message: "Minimo 4 caracteres" },
              maxLength: { value: 40, message: "Maximo 40 caracteres" },
              pattern: { value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se acepta letras" },
            })}
            label="Apellidos"
            fullWidth
            sx={{ mt: 1.5, mb: 1.5 }}
            error={!!form.formState.errors.lastname}
            helperText={form.formState.errors.lastname?.message}
          />
        </Grid>
      </Grid>
      <TextField
        {...form.register("email", {
          required: "Este campo es requerido",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
            message: "Formato de correo electrónico inválido",
          },
        })}
        label="Correo electrónico"
        fullWidth
        sx={{ mt: 2, mb: 1.5 }}
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...form.register("password", {
                required: "Este campo es requerido",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
                maxLength: { value: 32, message: "Máximo 32 caracteres" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+[\w\W]*$/,
                  message: "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
                },
              })}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message} // Aquí está el helperText
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Contraseña"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirmar contraseña</InputLabel>
            <TextField
              id="outlined-adornment-confirm-password"
              type={showPassword ? "text" : "password"}
              {...form.register("confirmPassword", {
                required: "Este campo es requerido",
                validate: (value) =>
                  value === form.watch("password") || "Las contraseñas no coinciden",
              })}
              error={!!form.formState.errors.confirmPassword}
              helperText={form.formState.errors.confirmPassword?.message} // Aquí está el helperText
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Confirmar contraseña"
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
              {specializationAreas.map((area) => (
                <MenuItem key={area.id} value={area.title}>
                  {area.title}
                </MenuItem>
              ))}
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
