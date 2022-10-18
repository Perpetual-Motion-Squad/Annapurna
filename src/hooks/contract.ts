import { useSigner } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import AnnapurnaAbi from "~/blockchain/artifacts/contracts/Annapurna.sol/Annapurna.json"

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const useContract = () => {
    const signer = useSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, AnnapurnaAbi.abi, signer)
    return { contract }
}