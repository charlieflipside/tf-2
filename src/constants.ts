import type { Abi } from "abitype";
import ethereumContracts from "./contractInfo";

export const WETH_CONFIG = {
  address: ethereumContracts["0x1"].WethToken.address,
  abi: ethereumContracts["0x1"].WethToken.abi as Abi,
};

export const FRETH_CONFIG = {
  address: ethereumContracts["0x1"].frToken.address,
  abi: ethereumContracts["0x1"].frToken.abi as Abi,
};

export const FRZ_CONFIG = {
  address: ethereumContracts["0x1"].FRZ.address,
  abi: ethereumContracts["0x1"].FRZ.abi as Abi,
};

export const GOV_CONFIG = {
  address: ethereumContracts["0x1"].TrueFreezeGovernor.address,
  abi: ethereumContracts["0x1"].TrueFreezeGovernor.abi as Abi,
};

export const MULTIREWARD_CONFIG = {
  address: ethereumContracts["0x1"].MultiRewards.address,
  abi: ethereumContracts["0x1"].MultiRewards.abi as Abi,
};

export const FRTOKENSTAKING_CONFIG = {
  address: ethereumContracts["0x1"].frTokenStaking.address,
  abi: ethereumContracts["0x1"].frTokenStaking.abi as Abi,
};

export const NFT_CONFIG = {
  address: ethereumContracts["0x1"].nonFungiblePositionManager.address,
  abi: ethereumContracts["0x1"].nonFungiblePositionManager.abi as Abi,
};