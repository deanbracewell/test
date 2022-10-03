import address from "./contractAddresses";

import gameVersion from "./manageVersion";

export const getPresaleAddress = () => {
  return address.presale[gameVersion.chainID];
};

export const getBusdAddress = () => {
  return address.busd[gameVersion.chainID];
};