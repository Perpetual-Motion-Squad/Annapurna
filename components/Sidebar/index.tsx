import Image from "next/image";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
    const SIZE = 30;
    return (
        <div className="flex flex-col border-r-[1px] border-[#d9d9d972] items-center gap-8 px-3 justify-between py-5 pt-10">
            <Image
                src="/images/pin-point.svg"
                height={50}
                width={50}
                alt="logo"
            />
            <div className="flex flex-col gap-10">
                <div className="h-[50px] w-[50px] grid place-items-center rounded-full hover:bg-[#ffffff3a] hover:cursor-pointer transition-all dashboard__active">
                    <Image
                        src="/images/people.svg"
                        height={25}
                        width={25}
                        alt="logo"
                    />
                </div>
                <div className="h-[50px] w-[50px] grid place-items-center rounded-full hover:bg-[#ffffff3a] hover:cursor-pointer transition-all">
                    <Image
                        src="/images/events.svg"
                        height={25}
                        width={25}
                        alt="logo"
                    />
                </div>
                <Image
                    src="/images/profile.svg"
                    height={50}
                    width={50}
                    alt="logo"
                />
            </div>
        </div>
    );
};

export default Sidebar;
