import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/blockchain/artifacts",
  }
};

export default config;
