import { expect } from "chai";
import { ethers } from "hardhat";
import { Annapurna } from "../typechain-types";

describe("Annapurna", function () {

    let annapurna: Annapurna;
    let annapurnaAddress: string;
    const recipient = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

    before(async () => {
        expect(ethers.getContractFactory).to.not.be.undefined;
        const Annapurna = await ethers.getContractFactory("Annapurna");
        annapurna = await Annapurna.deploy();
        annapurnaAddress = annapurna.address;
    });

    it("Should create token with limited supply", async function () {
        const tokenId = 0
        const tokenSupply: number = 1
        const transaction = await annapurna.setTokenSupply(tokenId, tokenSupply, "https://gist.github.com/KorigamiK/13c27ac6f0fc0260b9694ecc99e0dee9/raw/2a08c55cc5445f85261b81af2574612478f36a3d/0.json")
        expect(await transaction.wait()).to.not.throw;
    })

    it("Should mint token", async function () {
        const tokenId = 0
        const tokenSupply: number = 1
        const rate = await annapurna.MINT_PRICE()
        console.log(rate)
        const transaction = await annapurna.mint(recipient, tokenId, tokenSupply, { value: rate });
        await transaction.wait();

        expect(await annapurna.balanceOf(recipient, tokenId)).to.equal(1);
    })
})