// Importar React para crear el componente
import React from 'react';
// Importar componentes de estilo MUI y proveedor de temas
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
// Importar componentes MUI para diseño y navegación
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// Importar iconos MUI para menús y cajones
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// Importar componentes MUI para elementos de lista
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Importar iconos para los elementos de la lista
import AppsIcon from '@mui/icons-material/Apps';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
// Importación probable de un componente modal (no se muestra aquí)
import { CreateDataCurses } from './modals/createDataCurses';

// Define la anchura del cajón
const drawerWidth = 240;

// Estilos para estados de cajón abierto con transiciones
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  top:70.5,
});

// Estilos para un estado de cajón cerrado con transiciones
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  top:70.5,
});

// Estilos para replicar una barra de herramientas
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Funcion que por ahora solo hace conteos de los click al boton "Todos"
const handleTodoClick = () => {
    // Your logic for handling the "Todos" button click
    console.log("Todos button clicked!");
    // You could navigate to a different page, fetch data, etc.
};

// Funcion que por ahora solo hace conteos de los click al boton "Archivados"
const handleArchivedClick = () => {
    // Your logic for handling the "Archivados" button click
    console.log("Archivados button clicked!");
    // You could navigate to a different page, fetch data, etc.
};
//La interfaz AppBarProps define una propiedad adicional open de tipo booleano a la ya existente MuiAppBarProps.
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

/* Hereda la mayoría de las funcionalidades de MuiAppBar 
pero permite controlar su apariencia basándose en un prop abierto.
Cuando está abierta, la barra de aplicaciones se desliza desde la izquierda con una transición*/
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/* Hereda la mayoría de las funcionalidades de MuiDrawer 
pero permite controlar su apariencia basándose en un prop abierto. 
Utiliza el openedMixin y closedMixin previamente definidos 
para aplicar estilos para los estados abierto y cerrado, respectivamente. */
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Gestiona el estado de apertura/cierre del cajón mediante el hook useState de React.
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{mt:8.82}} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box position="fixed" sx={{ml:"10%"}}>
            <CreateDataCurses />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Todos', 'Archivados'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={index === 0 ? handleTodoClick : handleArchivedClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? <AppsIcon/> : <ArchiveOutlinedIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
