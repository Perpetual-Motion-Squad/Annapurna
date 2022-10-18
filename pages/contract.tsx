import { useAddress } from "@thirdweb-dev/react"
import { useContract } from "~/hooks/contract"


const Contract = () => {
    const { contract } = useContract()
    const address = useAddress()
    return (
        <>
            <button onClick={async () => {
                console.log(await contract.balanceOf(address, 0))
            }}>Get Balance</button>
        </>
    )
}

export default Contract;