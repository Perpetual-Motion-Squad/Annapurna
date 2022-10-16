import { expect } from "chai";
import { ethers } from "hardhat";


describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    expect(ethers.getContractFactory).to.not.be.undefined;
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});