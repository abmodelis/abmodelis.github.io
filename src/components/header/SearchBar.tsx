import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Obtener la longitud del valor sin contar los espacios en blanco
    const valueLengthWithoutSpaces = value.replace(/\s/g, '').length;
    // Limitar el valor del campo a 60 caracteres sin contar los espacios en blanco
    if (valueLengthWithoutSpaces <= 60) {
      setSearchValue(value);
    }
  };

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para realizar la búsqueda
    console.log('Buscar:', searchValue);
  };
  return (
    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar curso" inputProps={{ "roboto-label": "buscar curso" }} 
      value={searchValue} onChange={handleInputChange}/>
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}