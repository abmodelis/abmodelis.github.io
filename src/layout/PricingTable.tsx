import { Card, Typography, Button, Grid, Box } from '@mui/material';

const PricingPlan = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center'}}>
        <Card sx={{ width: "70%", height: "360px", marginTop: "80px", border: "0.5px solid #2196f3", borderRadius: "10px", boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)"}}>
          <Typography variant="h5" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "8", marginTop: "-13px" }}>Mensual</Typography>
          <Typography variant="h3" textAlign="center" sx={{ letterSpacing: "0.5px", marginTop: "-60px" }}>Bs. 249.99</Typography>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", marginTop: "15px"  }}>Precio normal</Typography>
          <Typography variant="h5" textAlign="center" fontWeight="bold" sx={{ letterSpacing: "0.5px", lineHeight: "0.8", marginTop: "15px" }}>Acceso a todos los cursos</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "5px 25px", fontSize: "2rem" }}>Suscribete</Button>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: "70%", height: "360px", marginTop: "80px", border: "0.5px solid #2196f3", borderRadius: "10px", boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)"}}>
        <Box sx={{ backgroundColor: '#1976D2', color: 'white', padding: '15px', borderRadius: '10px 10px 0 0' }}>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "0.3" }}>Mejor Opción</Typography>
        </Box>
          <Typography variant="h5" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "8", marginTop: "-48px"}}>Trimestral</Typography>
          <Typography variant="h3" textAlign="center" sx={{ letterSpacing: "0.5px", marginTop: "-60px"}}>Bs. 499.99</Typography>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", marginTop: "15px"}}>149.99 Bs/mes</Typography>
          <Typography variant="h5" textAlign="center" fontWeight="bold" sx={{ letterSpacing: "0.5px", lineHeight: "0.8", marginTop: "15px" }}>Acceso a todos los cursos</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "5px 25px", fontSize: "2rem" }}>Suscribete</Button>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: "70%", height: "360px", marginTop: "80px", border: "0.5px solid #2196f3", boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)" }}>
          <Typography variant="h5" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "8", marginTop: "-13px" }}>Anual</Typography>
          <Typography variant="h3" textAlign="center" sx={{ letterSpacing: "0.5px", marginTop: "-60px"}}>Bs. 1199.99</Typography>
          <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", marginTop: "15px"}}>99.99 Bs/mes</Typography>
          <Typography variant="h5" textAlign="center" fontWeight="bold" sx={{ letterSpacing: "0.5px", lineHeight: "0.8", marginTop: "15px" }}>Acceso a todos los cursos</Typography>
          <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "5px 25px", fontSize: "2rem"}}>Suscribete</Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PricingPlan;