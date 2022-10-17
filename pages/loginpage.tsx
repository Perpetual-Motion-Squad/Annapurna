// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React from "react";
import LoginForm from "../components/LoginForm";

type Props = {};

const loginpage = (props: Props) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-sora overflow-x-hidden">
      <div className="w-5/6 md:w-4/6 flex flex-col md:flex md:flex-row justify-center items-center gap-24">
        <Image src="/images/logo_full.svg" width={400} height={600} />
        <div className="flex flex-col justify-center items-center gap-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sora text-center">
            Welcome to Annapurna
          </h1>
          {/* <Image src="/images/metamask.svg" width={300} height={300} /> */}
          <LoginForm />
          <button className="bg-[#FF5F26] rounded-xl w-3/4 py-5 text-2xl ">
            Create Account
          </button>
          {/* <ConnectButton /> // This is the button that connects to the wallet */}
        </div>
      </div>
    </div>
  );
};

export default loginpage;
