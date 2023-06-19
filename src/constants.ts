import type { Abi } from "abitype";
import daiExampleAbi from "./abis/erc20.json";
import ethereumContracts from "./contractInfo";

export const DAI_CONFIG = {
  address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  abi: daiExampleAbi as Abi,
};

export const WETH_CONFIG = {
  address: ethereumContracts["0x1"].WethToken.address,
  abi: ethereumContracts["0x1"].WethToken.abi as Abi,
};
