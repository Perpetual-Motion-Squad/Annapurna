import { useSigner } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import AnnapurnaAbi from "~/blockchain/artifacts/contracts/Annapurna.sol/Annapurna.json"

const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

export const useContract = () => {
    const signer = useSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, AnnapurnaAbi.abi, signer)
    return { contract }
}