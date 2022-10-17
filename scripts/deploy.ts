import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const Annapurna = await ethers.getContractFactory("Annapurna");
  const annapurna = await Annapurna.deploy();

  await annapurna.deployed();

  console.log(`Annapurna with 1 ETH and unlock timestamp ${ unlockTime } deployed to ${ annapurna.address }`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
