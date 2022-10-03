import {
  getPresaleAddress
} from "../utils/addressHelpers";

export const getSellAmount = async (contract, account) => {
  const response = await contract.methods.sellAmount().call();
  return parseInt(response.toString());
};

export const getStatus = async (contract) => {
  const response = await contract.methods.openIdo().call();
  return response;
};

export const getTimeForClaim = async (contract) => {
  const response = await contract.methods.getTimeForClaim().call();
  return parseInt(response.toString());
};

export const isWhitelisted = async (contract, account) => {
  const response = await contract.methods.whitelisted(account).call();
  return response;
};

export const isExtraWhitelisted = async (contract, account) => {
  const response = await contract.methods.extraWhitelisted(account).call();
  return response;
};

export const getPurchasable = async (contract, account) => {
  const isWhitelisted = await contract.methods.whitelisted(account).call();
  const isExtraWhitelisted = await contract.methods.extraWhitelisted(account).call();
  const isPublic = await contract.methods.openPublic().call();
  const maxAmount = parseInt(await contract.methods.maxPurchaseAmount().call());
  const maxExtraAmount = parseInt(await contract.methods.maxExtraPurchaseAmount().call());
  let currentAmount = parseInt(await contract.methods.purchasedAmount(account).call());
  if (isWhitelisted === true){
    if (currentAmount >= maxAmount)
      return false;
  } else if (isExtraWhitelisted === true || isPublic === true){
    if (currentAmount >= maxExtraAmount)
      return false;
  } else {
    return false;
  }
  return true;
};

export const getBusdBalance = async (web3, contract, account) => {
  const response = await contract.methods.balanceOf(account).call();
  return web3.utils.fromWei(response, "ether").toString();
};

export const getBusdAllowance = async (web3, contract, account) => {
  const response = await contract.methods
    .allowance(account, getPresaleAddress())
    .call();
  return web3.utils.fromWei(response, "ether").toString();
};

export const setBusdApprove = async (web3, contract, account) => {
  const response = await contract.methods
    .approve(getPresaleAddress(), web3.utils.toWei("1000", "ether").toString())
    .send({ from: account });
  return response;
};

export const setPurchase = async (contract, account, amount) => {
  const response = await contract.methods
    .purchase(parseInt(amount))
    .send({ from: account });
  return response;
};

export const getClaimable = async (contract, account) => {
  const response = await contract.methods.getClaimable(account).call();
  return response;
};

export const setClaim = async (contract, account) => {
  const response = await contract.methods
    .claim()
    .send({ from: account });
  return response;
};

export const getPurchasedAmount = async (contract, account) => {
  const response = await contract.methods.purchasedAmount(account).call();
  return response;
};

export const getTotalContributors = async (contract) => {
  const response = await contract.methods.totalContributors().call();
  return response;
};

export const getPublicable = async (contract) => {
  const response = await contract.methods.openPublic().call();
  return response;
};