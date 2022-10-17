import Image from "next/image";
import React from "react";

type Props = {};

const LocationCard = (props: Props) => {
    return (
        <div className="bg-[#383838] text-white max-w-[300px] p-5 rounded-xl flex flex-col gap-4 cursor-pointer">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-semibold text-2xl font-sora">
                        Jabalpur Mall
                    </h2>
                    <h3 className="font-sora text-xl">Jabalpur</h3>
                </div>
                <Image
                    src="/images/pin-point2.svg"
                    height={30}
                    width={30}
                    alt="pin point"
                />
            </div>
            <div className="flex justify-between gap-3">
                <h4 className="font-sora text-lg text-[#d9d9d9]">
                    6:09am-4:20pm
                </h4>
                <h4 className="font-sora text-lg text-[#FF5F26]">50/199</h4>
            </div>
        </div>
    );
};

export default LocationCard;
