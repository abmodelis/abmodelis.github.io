import PricingPlan from "layout/PricingTable";
import Footer from "components/header/Footer";
import { Grid } from "@mui/material";
import { LoginNavBarInit } from "components/header/no_logeado/LoginNavBarMain";
function Home() {
  return (
    <>
      <Grid sx={{ width: "100%", overflowY: "auto" }}>
        <LoginNavBarInit />
        <Grid item sx={{ mt: "5vh" }}>
          <PricingPlan />
        </Grid>
        {/*<PricingPlan />*/}
        <Grid item sx={{ mt: "10vh" }}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
export default Home;
