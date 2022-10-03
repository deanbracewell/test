import * as React from "react";
import {
  Box,
  Link,
  Alert,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

export default function SecurityAlert() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box className="card">
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          icon={false}
          sx={{ mb: 2 }}
        >
          <Box className="flex" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap'}}}>
            <PrivacyTipIcon
              fontSize="inherit"
              sx={{ color: "#35bcff", width: "25px", height: "25px" }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#8af9f4",
                marginLeft: "10px",
                whiteSpace: "nowrap",
              }}
            >
              Security Recommendation!
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-center"
              sx={{
                color: "#8af9f4",
                marginLeft: "10px",
                width: "100%",
              }}
            >
              Make sure you are on our website Presalebcg.Cryptogames.Agency
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ color: "#b9babb", marginTop: "10px" }}
            >
              Never connect your wallet to unknown/non-audited websites. Our
              contracts have been audited by CertiK and you can check the
              <Link
                href="https://www.bigcrypto.game/certik/"
                className="no-decoration"
                target="_blank"
                sx={{ color: "#35bcff"}}
              >
                &nbsp;proof here.&nbsp;
              </Link>
              For security, we still recommend as a best practice to create a
              new wallet for this pre-sale, and only keep the amount used for
              this pre-sale in the wallet you connect.
              Do not send BUSD directly to the presale address, because such contributions will be disqualified. Only use the contribution button on this page.
            </Typography>
          </Box>
        </Alert>
      </Collapse>
    </Box>
  );
}
