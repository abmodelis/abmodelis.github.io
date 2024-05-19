import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

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

  /*const handleSubmit = (data: IUserInput) => {
    onFormSubmit(data);
  };*/

  const handleSubmit = async (data: IUserInput) => {
    // Iniciar el estado de carga
    setLoading(true);

    try {
      // Lógica para procesar los datos del formulario
      await onFormSubmit(data);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante el envío
      console.error("Error al enviar el formulario", error);
    }

    // Detener el estado de carga después de la operación
    setLoading(false);
  };

  const [area, setArea] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTitle = event.target.value;
    const selectedArea = specializationAreas.find((area) => area.title === selectedTitle);

    if (selectedArea) {
      console.log("Selected ID:", selectedArea.id);
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
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
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
        sx={{ mt: 2 }}
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
        inputProps={{ maxLength: 60 }} // Limitar la longitud máxima a 60 caracteres
      />
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...form.register("password", {
                required: "Este campo es requerido",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
                maxLength: { value: 32, message: "Máximo 32 caracteres" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+[\w\W]*$/,
                  message:
                    "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
                },
              })}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message} // Aquí está el helperText
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
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
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <TextField
              id="outlined-adornment-confirm-password"
              type={showPassword ? "text" : "password"}
              {...form.register("confirmPassword", {
                required: "Este campo es requerido",
                validate: (value) => value === form.watch("password") || "Las contraseñas no coinciden",
              })}
              error={!!form.formState.errors.confirmPassword}
              helperText={form.formState.errors.confirmPassword?.message} // Aquí está el helperText
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
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
          <FormControl fullWidth sx={{ mt: 1 }}>
            <BirthDataPicker title="Fecha de nacimiento"></BirthDataPicker>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 2 }}>
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

      <Divider sx={{ height: 1, backgroundColor: "#424242", marginY: "1em" }} />
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button onClick={onCancel}>Cancelar</Button>
        </Grid>
        <Grid item>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            loading={loading}
            loadingIndicator="Cargando…"
          >
            <span>Registrarme</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};
