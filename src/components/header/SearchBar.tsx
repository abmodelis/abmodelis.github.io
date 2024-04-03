// Importar los componentes necesarios de Material-UI
import { IconButton, InputBase, Paper } from "@mui/material";
// Importar iconos de Material Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// Definir el componente SearchBar como un componente funcional React
export default function SearchBar() {
  return (
    // Renderiza el componente Paper como contenedor principal de la barra de búsqueda
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      {/* Renderiza el componente IconButton con un MenuIcon para mostrar un menú */}
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      {/* Renderiza el componente InputBase para el campo de búsqueda */}
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar curso" inputProps={{ 'roboto-label': 'buscar curso' }}/>
      {/* Renderiza el componente IconButton con un SearchIcon para realizar la búsqueda */}
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}