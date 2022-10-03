import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import gameVersion from "../utils/manageVersion";

import {
  getPresaleAddress,
  getBusdAddress
} from "../utils/addressHelpers";

import presale from "../config/abis/presale.json";
import busd from "../config/abis/busd.json";

const RPC_URL = gameVersion.rpcUrl;
const RPC_WS_URL = gameVersion.rpcWsUrl;

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
});

export const useWeb3 = () => {
  const { library } = useWeb3React();
  return new Web3(library.currentProvider || httpProvider);
};

const useContract = (abi, address) => {
  const { library } = useWeb3React();
  const web3 = new Web3(library.currentProvider || httpProvider);
  return new web3.eth.Contract(abi, address);
};

export const usePresale = () => {
  const abi = presale;
  return useContract(abi, getPresaleAddress());
};

export const useBusd = () => {
  const abi = busd;
  return useContract(abi, getBusdAddress());
};