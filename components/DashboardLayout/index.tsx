import React from "react";
import Sidebar from "../Sidebar";

type Props = {
    children: React.ReactNode;
    className?: string;
    active: string;
};

const DashboardLayout = (props: Props) => {
    return (
        <div className="flex h-screen w-full bg-black overflow-auto">
            <Sidebar active={props.active} />
            <div className={props.className}>{props.children}</div>
        </div>
    );
};

export default DashboardLayout;
