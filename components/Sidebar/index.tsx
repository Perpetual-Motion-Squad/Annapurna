import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    active: string;
};

const Sidebar = (props: Props) => {
    const SIZE = 30;
    return (
        <div className="flex flex-col border-r-[1px] border-[#d9d9d972] items-center gap-8 px-3 justify-between py-5 pt-10 sticky top-0 h-screen">
            <Image
                src="/images/pin-point.svg"
                height={50}
                width={50}
                alt="logo"
            />
            <div className="flex flex-col gap-10">
                <Link href="/add-event">
                    <div
                        className={`h-[50px] w-[50px] text-white grid place-items-center rounded-full hover:bg-[#ffffff3a] hover:cursor-pointer transition-all text-5xl leading-2 ${ props.active === "add" && "dashboard__active"
                            }`}
                    >
                        +
                    </div>
                </Link>
                <Link href="/your-events">
                    <div
                        className={`h-[50px] w-[50px] grid place-items-center rounded-full hover:bg-[#ffffff3a] hover:cursor-pointer transition-all text-5xl leading-2 ${ props.active === "participants" &&
                            "dashboard__active"
                            }`}
                    >
                        <Image
                            src="/images/ticket.svg"
                            height={30}
                            width={30}
                            alt="logo"
                            style={{ filter: "invert(1)" }}
                        />
                    </div>
                </Link>
                <Link href="/dashboard">
                    <div
                        className={`h-[50px] w-[50px] grid place-items-center rounded-full hover:bg-[#ffffff3a] hover:cursor-pointer transition-all text-5xl leading-2 ${ props.active === "dashboard" && "dashboard__active"
                            }`}
                    >
                        <Image
                            src="/images/events.svg"
                            height={25}
                            width={25}
                            alt="logo"
                        />
                    </div>
                </Link>
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
