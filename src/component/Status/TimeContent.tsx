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

export default function TimeContent() {
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
  // const [status, setStatus] = React.useState(0);
  const [leftTime, setLeftTime] = React.useState("");
  const [sellAmount, setSellAmount] = React.useState(0);
  // const [whitelisted, setWhitelisted] = React.useState(false);
  // const [extraWhitelisted, setExtraWhitelisted] = React.useState(false);
  // const [purchasable, setPurchasable] = React.useState(false);
  // const [publicable, setPublicable] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  // const [claimable, setClaimable] = React.useState(false);
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

    // setPurchasable(await getPurchasable(presaleContract, account));
    // if ((await isWhitelisted(presaleContract, account)) === true)
    //   setWhitelisted(true);
    // if ((await isExtraWhitelisted(presaleContract, account)) === true)
    //   setExtraWhitelisted(true);
    const purchased = await getPurchasedAmount(presaleContract, account);
    setPurchasedAmount(parseInt(purchased));
    // setPublicable(await getPublicable(presaleContract));
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
      if (amount === "") {
        setProgressing(false);
        return;
      }
      const allowance = await getBusdAllowance(web3, busdContract, account);
      if (parseInt(allowance) < parseInt(amount)) {
        await setBusdApprove(web3, busdContract, account);
      }
      await setPurchase(presaleContract, account, amount);
    } catch (e) {
      console.log(e);
      setProgressing(false);
    }
    setProgressing(false);
    setBasicInfo();
  };

  const handleAmount = (value: string) => {
    setAmount(value);
    return;
  };

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <Box>
      <Box className="card card-padding">
        <Typography variant="h5" className="main-text text-center fa">
          Starting on 2 October 2022 at 11:00am UTC
        </Typography>
        <Typography variant="subtitle1" className="main-text text-center mt-10">
          Time until end :
        </Typography>
        <Typography variant="subtitle2" className="main-text text-center">
          {leftTime}
        </Typography>
        <BorderLinearProgress
          className="mt-30"
          variant="determinate"
          value={(sellAmount / 280000) * 100}
        />
        <Box className="flex mt-10">
          <Typography
            variant="subtitle2"
            className="main-text is-flex-grow-1 text-small"
          >
            Status now: {formatNumber(sellAmount)} BUSD
          </Typography>
          <Typography
            variant="subtitle2"
            className="main-text is-flex-grow-1 text-right text-small"
          >
            Max: 280,000 BUSD
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          className="main-text text-smallest mt-10"
        >
          The status bar might take up to 30 seconds to update contributions.
        </Typography>
        <Box className="mt-10">
          <Typography variant="subtitle1" className="main-text text-bold">
            Amount you want to contribute:
          </Typography>
          <FormControl className="full-width">
            <OutlinedInput
              placeholder="0"
              className="mt-10 input"
              type="number"
              inputProps={{ step: "1" }}
              value={amount}
              onChange={(e) => handleAmount(e.target.value)}
              onKeyDown={(evt) => {
                (evt.key === "e" ||
                  evt.key === "E" ||
                  evt.key === "+" ||
                  evt.key === "." ||
                  evt.key === "-") &&
                  evt.preventDefault();
              }}
            />
          </FormControl>
        </Box>

        <Box className="flex justify-center">
          <Button
            variant="contained"
            className="mt-30"
            onClick={handleButton}
            sx={{
              backgroundColor: "#003ab4", "&:hover": {
                backgroundColor: '#195ab4'
              }
            }}
          >
            Contribute BUSD
          </Button>
        </Box>
        <Typography
          variant="subtitle2"
          className="main-text text-center mt-10"
        >
          {purchasedAmount > 0 &&
            "You contributed " + purchasedAmount + " BUSD"}
        </Typography>
      </Box>
    </Box>
  );
}
