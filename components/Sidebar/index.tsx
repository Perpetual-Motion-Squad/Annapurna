import Image from "next/image";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
    const SIZE = 30;
    return (
        <div className="flex flex-col border-r-[1px] border-[#d9d9d9] items-center gap-5 px-3">
            <Image
                src="/images/pin-point.svg"
                height={30}
                width={30}
                alt="logo"
            />
            <Image
                src="/images/profile.svg"
                height={30}
                width={30}
                alt="logo"
            />
            <Image src="/images/events.svg" height={30} width={30} alt="logo" />
            <Image src="/images/people.svg" height={30} width={30} alt="logo" />
        </div>
    );
};

export default Sidebar;
