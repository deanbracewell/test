import * as React from "react";
import {
  Box,
  Link,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Slide,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";

const AppBarComponent = () => {

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          "linear-gradient(0deg, hsl(0deg 0% 12%) 0%, hsl(0deg 0% 7%) 100%)",
        maxWidth: `100%`,
        py: 1,
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ flexFlow: "wrap", justifyContent: {xs: 'center', sm: 'start'} }}>
          <NavLink
            to="/"
            className="non-style"
            style={{
              color: "inherit",
              textDecoration: "none",
              minWidth: "250px",
            }}
          >
            <img
              src="/assets/images/logo_dashboard.png"
              style={{ height: "55px" }}
              alt="logo"
            />
          </NavLink>
          <Link
            href="https://cryptogames.agency"
            className="no-decoration"
            target="_blank"
          >
            <Typography variant="h6" className="hyperlink text-center">
              An Official Game by Crypto Game Agency
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarComponent;
