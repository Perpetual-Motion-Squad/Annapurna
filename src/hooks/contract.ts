import { useSigner } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import AnnapurnaAbi from "~/blockchain/artifacts/contracts/Annapurna.sol/Annapurna.json"

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

export const useContract = () => {
    const signer = useSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, AnnapurnaAbi.abi, signer)
    return { contract }
}