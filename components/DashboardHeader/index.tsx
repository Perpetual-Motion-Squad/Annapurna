import Image from "next/image";
import React from "react";

type Props = { ether?: string; username: string };

const DashboardHeader = (props: Props) => {
    return (
        <div className="flex justify-between w-full items-center">
            <h1 className="font-lora text-white text-5xl font-medium capitalize">
                Hey, {props.username}
            </h1>
            <div className="bg-white flex gap-3 items-center py-1 rounded-xl pl-3 pr-4">
                <Image
                    src="/images/diamond.svg"
                    height={50}
                    width={50}
                    alt="diamond"
                />
                <h2 className="font-sora font-normal text-xl">
                    6, Tokens available
                </h2>
                {props.ether && (
                    <h2 className="font-sora font-normal text-xl">
                        | &nbsp; Balance {props.ether} ETH
                    </h2>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
