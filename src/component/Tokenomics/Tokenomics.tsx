import * as React from "react";
import {
  Box,
  Link,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

export default function Tokenomics() {

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box className="card-head card-padding">
        <Typography align="center" variant="h5" className="white-text bold-text">
          Tokenomics
        </Typography>
      </Box>
      <Box className="card-body card-padding">
        <TableContainer
          component={Paper}
          className="table-container"
          sx={{ marginTop: "5px" }}
        >
          <Table size="small" aria-label="">
            <TableBody>
              <TableRow>
                <TableCell scope="row">Token Name</TableCell>
                <TableCell align="right">Big Crypto Game Token</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Token Symbol</TableCell>
                <TableCell align="right">$CRYPTO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Total Supply</TableCell>
                <TableCell align="right">5,000,000 $CRYPTO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Tokens For Presale</TableCell>
                <TableCell align="right">750,000 $CRYPTO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Tokens For Liquidity</TableCell>
                <TableCell align="right">485, 212.5 $CRYPTO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Price during Presale</TableCell>
                <TableCell align="right">1 BUSD = 2.5 $CRYPTO</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Starting price at market listing</TableCell>
                <TableCell align="right">1 BUSD = 2.27 $CRYPTO</TableCell>
              </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
