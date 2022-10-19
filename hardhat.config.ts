import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/blockchain/artifacts",
  },
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY!],
    }
  }
};

export default config;
