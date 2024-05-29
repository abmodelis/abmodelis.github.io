import { Card, Typography, Button, Grid, Box } from "@mui/material";

const Banner: React.FC<BannerCardProps> = ({ text }) => (
  <Box sx={{ backgroundColor: "#1976D2", color: "white", padding: "15px", borderRadius: "10px 10px 0 0" }}>
    <Typography variant="h6" textAlign="center" sx={{ letterSpacing: "0.5px", lineHeight: "0.3" }}>
      {text}
    </Typography>
  </Box>
);

type BannerCardProps = {
  text: string;
};

type PricingCardProps = {
  title: string;
  price: string;
  description?: string;
  showBanner?: boolean;
  showOverlay?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  showBanner = true,
  showOverlay = false,
}) => (
  <Card
    sx={{
      width: "80%",
      height: "100%",
      border: "0.5px solid #2196f3",
      borderRadius: "10px",
      boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.2)",
      position: "relative",
    }}
  >
    {showBanner && <Banner text="Mejor Opción" />}
    {showOverlay && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "12%",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "10px 10px 0 0",
        }}
      />
    )}
    <Typography variant="h5" textAlign="center" sx={{ marginTop: "5vh" }}>
      {title}
    </Typography>
    <Typography variant="h3" textAlign="center">
      {price}
    </Typography>
    {description && (
      <Typography variant="h6" textAlign="center" sx={{ marginTop: "2vh" }}>
        {description}
      </Typography>
    )}
    <Typography variant="h5" textAlign="center" fontWeight="bold">
      Acceso a todos los cursos
    </Typography>
    <Box display="flex" justifyContent="center" mt={2} mb={2}>
      <Button variant="contained" color="primary" sx={{ borderRadius: "30px", padding: "5px 25px", fontSize: "2rem" }}>
        Suscribirse
      </Button>
    </Box>
  </Card>
);

const PricingPlan = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PricingCard
          title="Mensual"
          price="Bs. 249.99"
          description="Precio normal"
          showBanner={true}
          showOverlay={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PricingCard
          title="Trimestral"
          price="Bs. 499.99"
          description="149.99 Bs/mes"
          showBanner={true}
          showOverlay={false}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PricingCard
          title="Anual"
          price="Bs. 1199.99"
          description="99.99 Bs/mes"
          showBanner={true}
          showOverlay={true}
        />
      </Grid>
    </Grid>
  );
};

export default PricingPlan;
