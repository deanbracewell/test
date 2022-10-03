import * as React from "react";
import AskMetaLogin from "./component/AskMetaLogin/AskMetaLogin";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet";
import View from "./View";
import "./App.css";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  Container,
  Grid
} from "@mui/material";
import TimeContent from "./component/Status/TimeContent";
import Instructions from "./component/Tokenomics/Instructions";
import Footer from "./component/Footer/Footer";
import ContributeContent from "./component/Status/ContributeContent";
import Tokenomics from "./component/Tokenomics/Tokenomics";

function ResponsiveDrawer(props: any) {
  const [loaded, setLoaded] = React.useState(false);
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();

  React.useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);

  if (loaded) {
    return networkActive ? <View /> : <AskMetaLogin />;
  }
  return <></>;
}

export default ResponsiveDrawer;
