import * as React from "react";
import Box from "@mui/material/Box";

import {
  Container,
  Grid
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateStore } from "./actions/contractActions";
import { useTheme, useMediaQuery } from "@mui/material";

import AppBar from "./component/AppBar/AppBar";
import SecurityAlert from "./component/SecurityAlert/SecurityAlert";
import Introduction from "./component/Introduction/Introduction";
import Tokenomics from "./component/Tokenomics/Tokenomics";
import TimeContent from "./component/Status/TimeContent";
import Instructions from "./component/Tokenomics/Instructions";
import Footer from "./component/Footer/Footer";
import ContributeContent from "./component/Status/ContributeContent";

const View = () => {
  const theme = useTheme();
  const isSmallerThanMD = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isSmallerThanMD) {
      dispatch(updateStore({ isSmallerThanMD: isSmallerThanMD }));
    }
  }, [isSmallerThanMD]);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Container maxWidth="lg" sx={{ marginTop: { xs: '30px', sm: '10px' } }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={1} sx={{ flexBasis: { xs: '100%', md: '10%' }, maxWidth: { xs: '100%', md: '10%' } }}></Grid>
            <Grid item xs={10} sx={{ flexBasis: { xs: '100%', md: '80%' }, maxWidth: { xs: '100%', md: '80%' } }}>
              <Instructions />
              <TimeContent />
            </Grid>
            <Grid item xs={1} sx={{ flexBasis: { xs: '100%', md: '10%' }, maxWidth: { xs: '100%', md: '10%' } }}></Grid>
          </Grid>

        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export default View;
