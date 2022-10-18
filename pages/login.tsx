import Image from "next/image";
import LoginForm from "../components/LoginForm";
import { useAddress } from "@thirdweb-dev/react";
import Connect from "components/Ethereum/connect";

type Props = {};

const Loginpage = (props: Props) => {
    const address = useAddress();

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-sora overflow-x-hidden">
            <div className="w-5/6 md:w-4/6 flex flex-col md:flex md:flex-row justify-center items-center gap-24">
                <Image
                    src="/images/logo_full.svg"
                    width={400}
                    height={600}
                    alt="logo"
                />
                <div className="flex flex-col justify-center items-center gap-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-sora text-center">
                        Welcome to Annapurna
                    </h1>
                    {address ? (
                        <>
                            <LoginForm />
                        </>
                    ) : (
                        <Connect />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Loginpage;
