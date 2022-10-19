import { useSigner } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import AnnapurnaAbi from "~/blockchain/artifacts/contracts/Annapurna.sol/Annapurna.json"

const CONTRACT_ADDRESS = "0x83909bC8E895b3A39f6Fe6752E589e20c8E0583f"

export const useContract = () => {
    const signer = useSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, AnnapurnaAbi.abi, signer)
    return { contract }
}