import PricingPlan from "layout/PricingTable";
import Footer from "components/header/Footer";
import { Grid } from "@mui/material";
import { LoginNavBarInit } from "components/header/no_logeado/LoginNavBarMain";
function Home() {
  return (
    <>
      <Grid sx={{ width: "100%", overflowY: "auto", maxHeight: "565px" }}>
        <LoginNavBarInit />
        <PricingPlan />
        <Grid item sx={{ mt: 4 }}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
export default Home;
