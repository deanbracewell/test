// Change date and countdown timer on line 77 and 217
import * as React from "react";
import {
  Box,
  FormControl,
  OutlinedInput,
  CircularProgress,
  Button,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useWeb3React } from "@web3-react/core";
import {
  getSellAmount,
  getStatus,
  getTimeForClaim,
  isWhitelisted,
  isExtraWhitelisted,
  getPurchasable,
  getBusdAllowance,
  setBusdApprove,
  setPurchase,
  getClaimable,
  setClaim,
  getPurchasedAmount,
  getBusdBalance,
  getTotalContributors,
  getPublicable
} from "../../hooks/contractFunction";
import { useWeb3, usePresale, useBusd } from "../../hooks/useContract";
import { formatNumber } from "../../utils/common";

export default function ContributeContent() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const web3 = useWeb3();
  const { account } = useWeb3React();

  const presaleContract = usePresale();
  const busdContract = useBusd();

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(0);
  const [leftTime, setLeftTime] = React.useState("");
  const [sellAmount, setSellAmount] = React.useState(0);
  const [whitelisted, setWhitelisted] = React.useState(false);
  const [extraWhitelisted, setExtraWhitelisted] = React.useState(false);
  const [purchasable, setPurchasable] = React.useState(false);
  const [publicable, setPublicable] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [claimable, setClaimable] = React.useState(false);
  const [progressing, setProgressing] = React.useState(false);
  const [purchasedAmount, setPurchasedAmount] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [totalContributors, setTotalContributors] = React.useState(0);

  const startDate = new Date(2022, 9, 2, 10, 0, 0, 0);
  // 9 means October

  function UTC_DateTime(date: any) {
    if (date === undefined) {
      date = new Date();
    }

    function pad2(n: any) {
      return (n < 10) ? ('0' + n) : n;
    }

    return new Date(date.getUTCFullYear(), pad2(date.getUTCMonth()), pad2(date.getUTCDate()), pad2(date.getUTCHours()), pad2(date.getUTCMinutes()), pad2(date.getUTCSeconds()));
  }

  const setTime = () => {
    let currentTime = UTC_DateTime(new Date());
    let betweenTime = (startDate.getTime() - currentTime.getTime()) / 1000;
    if (currentTime.getTime() > startDate.getTime()) {
      setLeftTime("0 days 0 hours 0 minutes 0 seconds");
    } else {
      let days = Math.floor(betweenTime / 86400);
      betweenTime -= days * 86400;
      let hours = Math.floor(betweenTime / 3600) % 24;
      betweenTime -= hours * 3600;
      let minutes = Math.floor(betweenTime / 60) % 60;
      betweenTime -= minutes * 60;
      let seconds = Math.floor(betweenTime % 60);
      setLeftTime(
        days +
        " days " +
        hours +
        " hours " +
        minutes +
        " minutes " +
        seconds +
        " seconds"
      );
    }
  };

  const getInfo = async () => {
    setLoading(false);
    setBasicInfo();
    setInterval(() => {
      setBasicInfo();
    }, 5000);
    const timeStatus = await getTimeForClaim(presaleContract);
    const presaleStatus = await getStatus(presaleContract);
    if (presaleStatus === false) {
      setInterval(() => {
        setTime();
      }, 1000);
    } else if (timeStatus > 0 && presaleStatus === true) {
      setPresaleLeftTime();
    }
  };

  const setBasicInfo = async () => {
    const amount = await getSellAmount(presaleContract, account);
    setSellAmount(amount);
    setBalance(await getBusdBalance(web3, busdContract, account));
    setTotalContributors(await getTotalContributors(presaleContract));
    const openIdo = await getStatus(presaleContract);
    const timeStatus = await getTimeForClaim(presaleContract);
    if (openIdo === false) {
      setStatus(0);
    } else {
      setStatus(timeStatus === 0 ? 2 : 1);
      if (timeStatus === 0) {
        setClaimable(await getClaimable(presaleContract, account));
      }
    }
    setPurchasable(await getPurchasable(presaleContract, account));
    if ((await isWhitelisted(presaleContract, account)) === true)
      setWhitelisted(true);
    if ((await isExtraWhitelisted(presaleContract, account)) === true)
      setExtraWhitelisted(true);
    const purchased = await getPurchasedAmount(presaleContract, account);
    setPurchasedAmount(parseInt(purchased));
    setPublicable(await getPublicable(presaleContract));
    setLoading(true);
  };

  const setPresaleLeftTime = async () => {
    let presaleLeftTime = await getTimeForClaim(presaleContract);
    var presaleLeftTimeinterval = setInterval(() => {
      if (presaleLeftTime >= 0) {
        let minutes = Math.floor(presaleLeftTime / 60) % 60;
        let seconds = Math.floor((presaleLeftTime - minutes * 60) % 60);
        setLeftTime(minutes + " minutes " + seconds + " seconds");
        presaleLeftTime -= 1;
      } else {
        clearInterval(presaleLeftTimeinterval);
        setBasicInfo();
      }
    }, 1000);
  };

  const handleButton = async () => {
    setProgressing(true);
    try {
      if (status === 1) {
        if (amount === "" || parseInt(amount) < 10) {
          setProgressing(false);
          return;
        }
        const allowance = await getBusdAllowance(web3, busdContract, account);
        if (parseInt(allowance) < parseInt(amount)) {
          await setBusdApprove(web3, busdContract, account);
        }
        await setPurchase(presaleContract, account, amount);
      } else if (status === 2) {
        await setClaim(presaleContract, account);
      }
    } catch (e) {
      console.log(e);
      setProgressing(false);
    }
    setProgressing(false);
    setBasicInfo();
  };

  const handleAmount = (value: string) => {
    if ((parseInt(value) > 750 && whitelisted === true) || (parseInt(value) > 50 && extraWhitelisted === true) || (parseInt(value) > 50 && publicable === true && extraWhitelisted === false && whitelisted === false)) {
      return;
    } else {
      setAmount(value);
      return;
    }
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <Box>
      <Box className="card card-padding">
        <Typography variant="subtitle1" className="text-center main-text">
          Presale ends on 4 Oct 2022 at 4:00pm UTC on first come first serve basis
        </Typography>
        <TableContainer
          component={Paper}
          className="table-container"
          sx={{ marginTop: "10px" }}
        >
          <Table size="small" aria-label="">
            <TableBody>
              <TableRow>
                <TableCell scope="row">Your BUSD Balance</TableCell>
                <TableCell align="right">
                  {formatNumber(parseFloat(balance.toString()).toFixed(3))} BUSD
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                  Min Contribution
                </TableCell>
                <TableCell align="right">10 BUSD</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                  Max Contribution for T1 &amp; T3
                </TableCell>
                <TableCell align="right">750 BUSD</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                  Max Contribution for T2 &amp; T4 &amp; Public round
                </TableCell>
                <TableCell align="right">50 BUSD</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Total Contributors</TableCell>
                <TableCell align="right">{totalContributors}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Total Contributed So Far</TableCell>
                <TableCell align="right">
                  {formatNumber(sellAmount)} BUSD
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Your Contribution</TableCell>
                <TableCell align="right">
                  {formatNumber(purchasedAmount)} BUSD
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
