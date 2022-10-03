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
  Button,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ReactPlayer from "react-player/youtube";

export default function Introduction() {
  return (
    <Box className="card card-padding">
      <TableContainer
        component={Paper}
        className="table-container"
        sx={{ marginTop: "10px" }}
      >
        <Table size="small" aria-label="">
          <TableBody>
            <TableRow>
              <TableCell scope="row">Soft Cap</TableCell>
              <TableCell align="right">220,000 BUSD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Hard Cap</TableCell>
              <TableCell align="right">280,000 BUSD</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Presale Start Time</TableCell>
              <TableCell align="right">2022.10.04 at 3:00pm (UTC)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">
                Tier 1 Round (Guaranteed whitelist for approx 310 wallets, 750
                BUSD max each, around 234,000 BUSD max in total)
              </TableCell>
              <TableCell align="right">30 minutes duration from start</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">
                Tier 2 Round (Guaranteed whitelist for approx 900 wallets, 50
                BUSD max each, 45,000 BUSD max in total)
              </TableCell>
              <TableCell align="right">30 minutes duration from start</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">
                Tier 3 &amp; Tier 4 Round (Non-Guaranteed whitelist for approx 300 wallets, some 750 BUSD, some 50 BUSD max each, 70,000 max in total)
              </TableCell>
              <TableCell align="right">15 minutes duration after T1 &amp; T2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Presale End Time</TableCell>
              <TableCell align="right">2022.10.04 at 4:00pm (UTC)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Listing On</TableCell>
              <TableCell align="right">
                <Link href="https://pancakeswap.finance/swap?outputCurrency=0xF0997486D784C0EC4aD2ee5B413bD318813dd518&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" target="_blank" sx={{ color: "#35bcff"}}>
                  Pancakeswap
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Liquidity Percent</TableCell>
              <TableCell align="right">70%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Liquidity Lock</TableCell>
              <TableCell align="right">
                6 months
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Whitelisted Wallets</TableCell>
              <TableCell align="right">
                <Link href="https://www.bigcrypto.game/whitelistv1" target="_blank" sx={{ color: "#35bcff"}}>
                  Show list of wallets
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
