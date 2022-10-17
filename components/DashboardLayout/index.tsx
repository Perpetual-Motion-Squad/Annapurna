import React from "react";
import Sidebar from "../Sidebar";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const DashboardLayout = (props: Props) => {
    return (
        <div className="flex min-h-screen w-full bg-black">
            <Sidebar />
            <div className={props.className}>{props.children}</div>
        </div>
    );
};

export default DashboardLayout;
