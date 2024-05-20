import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IUserInput } from "types/IUserInput";
import { User, specializationAreas } from "types/User";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  user?: User;
  onFormSubmit: (data: IUserInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export const ProfessorRegisterForm: React.FC<Props> = ({ user, onFormSubmit, onCancel, loading = false }) => {
  const form = useForm<IUserInput>({
    defaultValues: {
      birth_date: dayjs("2005-01-01"),
    },
  });
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "",
        birth_date: user.birth_date,
        specialization_area_id: user.specialization_area.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (data: IUserInput) => {
    onFormSubmit(data)
      .catch((error: Error) => {
        setShowAlert(true);
        setAlertMessage(String(error?.message));
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch(() => {
        setShowAlert(true);
        setAlertMessage("Error al registrar");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Alert sx={{ display: showAlert ? "flex" : "none", mb: 2 }} severity="error">
        <Typography variant="body2">{alertMessage}</Typography>
      </Alert>
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <TextField
            {...form.register("first_name", {
              required: "Este campo es requerido",
              maxLength: { value: 30, message: "Maximo 30 caracteres" },
              pattern: { value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se acepta letras" },
            })}
            label="Nombre"
            fullWidth
            sx={{ mt: 1.5, mb: 1.5 }}
            error={!!form.formState.errors.first_name}
            helperText={form.formState.errors.first_name?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...form.register("last_name", {
              required: "Este campo es requerido",
              maxLength: { value: 40, message: "Maximo 40 caracteres" },
              pattern: { value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\-:;,.-]+$/, message: "Solo se acepta letras" },
            })}
            label="Apellidos"
            fullWidth
            sx={{ mt: 1.5, mb: 1.5 }}
            error={!!form.formState.errors.last_name}
            helperText={form.formState.errors.last_name?.message}
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
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} variant="outlined">
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
          <FormControl fullWidth sx={{ mt: 1.5, mb: 1.5 }} variant="outlined">
            <TextField
              id="outlined-adornment-confirm-password"
              label="Confirmar contraseña"
              type={showPassword ? "text" : "password"}
              {...form.register("confirm_password", {
                required: "Este campo es requerido",
                validate: (value) => value === form.watch("password") || "Las contraseñas no coinciden",
              })}
              error={!!form.formState.errors.confirm_password}
              helperText={form.formState.errors.confirm_password?.message} // Aquí está el helperText
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* TODO: convertirlo en un componente parametrizable */}
            <Controller
              {...form.register("birth_date", {
                required: "Este campo es requerido",
                validate: (value) => dayjs().diff(value, "years") >= 18 || "Debes ser mayor de 18 años",
              })}
              control={form.control}
              defaultValue={dayjs("2005-01-01")}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    {...field}
                    label="Fecha de nacimiento"
                    format="DD/MM/YYYY"
                    minDate={dayjs("1950-01-01")}
                    value={field.value}
                    onChange={field.onChange}
                    sx={{ width: "100%", mt: 1.5, mb: 1.5 }}
                  />
                  <FormHelperText error={!!fieldState.error}>{fieldState.error?.message}</FormHelperText>
                </>
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Área de especialización</InputLabel>
            <Select
              {...form.register("specialization_area_id")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={1}
              label="Área de especialización"
            >
              {specializationAreas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
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
        <Grid item xs={8} sx={{ alignItems: "center", display: "inline-flex", justifyContent: "center" }}>
          <Button disabled={loading} type="submit" variant="contained" color="success" sx={{ width: "80%" }}>
            Registrarme
            {loading && <CircularProgress sx={{ marginLeft: "1em", height: "100%", width: "100%" }} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
