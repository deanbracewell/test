import * as React from "react";
import { Box, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box className="flex justify-between" sx={{ padding: "30px 0" }}>
      <Box>
        <Link
          className="agency-link"
          href="https://cryptogames.agency"
          target="_blank"
        >
          © Crypto Games Agency
        </Link>
      </Box>
      <Box className="flex justify-end">
        <Link
          className="footer-link"
          href="https://cryptogames.agency/privacy-policy/"
          target="_blank"
        >
          Privacy Policy
        </Link>
        <Link
          className="footer-link"
          href="https://cryptogames.agency/terms-and-conditions/"
          target="_blank"
        >
          Terms and Conditions
        </Link>
      </Box>
    </Box>
  );
}
