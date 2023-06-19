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

