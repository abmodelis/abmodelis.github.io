import { Card, Typography, Button, Grid, Box } from '@mui/material';

const PricingPlan = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Card sx={{ width: "60%", height: "340px", marginTop: "80px", border: "0.5px solid #2196f3", borderRadius: "10px", boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)"}}>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "8", fontSize: "1.2rem" }}>Mensual</Typography>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "0.3", fontSize: "2.5rem" }}>Bs. 249.99</Typography>
          <Typography textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "5", fontSize: "1rem"  }}>Precio normal</Typography>
          <Typography textAlign="center" fontWeight="bold" sx={{ letterSpacing: "0.5px", lineHeight: "0.8", fontSize: "1.2rem"  }}>Acceso a todos los cursos</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "10px 20px" }}>Suscribete</Button>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: "60%", height: "340px", marginTop: "80px", border: "0.5px solid #2196f3", borderRadius: "10px", boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)"}}>
        <Box sx={{ backgroundColor: '#1976D2', color: 'white', padding: '15px', borderRadius: '10px 10px 0 0' }}>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "0.3", fontSize: "1rem" }}>Mejor Opción</Typography>
        </Box>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "8", fontSize: "1.2rem", marginTop: "-33px"}}>Trimestral</Typography>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "0.3", fontSize: "2.5rem"  }}>Bs. 499.99</Typography>
          <Typography textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "5", fontSize: "1rem"  }}>149.99 Bs/mes</Typography>
          <Typography textAlign="center" fontWeight="bold" sx={{ letterSpacing: "0.5px", lineHeight: "0.8", fontSize: "1.2rem"  }}>Acceso a todos los cursos</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "10px 20px" }}>Suscribete</Button>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: "60%", height: "340px", marginTop: "80px", border: "0.5px solid #2196f3", boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)" }}>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "8", fontSize: "1.2rem"  }}>Anual</Typography>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "0.3", fontSize: "2.5rem"  }}>Bs. 1199.99</Typography>
          <Typography textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "5", fontSize: "1rem"  }}>99.99 Bs/mes</Typography>
          <Typography textAlign="center" fontWeight="bold" sx={{ letterSpacing: "0.5px", lineHeight: "0.8", fontSize: "1.2rem"  }}>Acceso a todos los cursos</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "10px 20px" }}>Suscribete</Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PricingPlan;