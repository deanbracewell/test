import * as React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Navigation from "../../component/Navigation/Navigation";
import { whitelistConstant } from "../../constant";

export default function Whitelist() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handlePage = (value: any) => {
    setCurrentPage(value);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-whitelist"
        >
          <Typography variant="h6" className="main-text">
            Whitelisted Wallets
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} className="table-whitelist">
            <Table size="small" aria-label="">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>
                    Address ({whitelistConstant.content.length})
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {whitelistConstant.content
                  .slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
                  .map((item: string, index: number) => (
                    <TableRow key={index}>
                      <TableCell scope="row">{10 * (currentPage - 1) + index + 1}</TableCell>
                      <TableCell>
                        {item}
                        <CopyToClipboard
                          text={item}
                          onCopy={() => setCopied(true)}
                        >
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                          >
                            <ContentCopyIcon
                              sx={{
                                color: "#ff9800",
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </IconButton>
                        </CopyToClipboard>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {whitelistConstant.content.length > 0 && (
                      <Navigation
                        totalCount={whitelistConstant.content.length}
                        cPage={currentPage}
                        handlePage={handlePage}
                        perPage={10}
                      />
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
