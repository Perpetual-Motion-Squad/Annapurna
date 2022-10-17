import React from "react";
import Sidebar from "../Sidebar";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const DashboardLayout = (props: Props) => {
    return (
        <div className="flex h-screen w-full bg-black overflow-auto">
            <Sidebar />
            <div className={props.className}>{props.children}</div>
        </div>
    );
};

export default DashboardLayout;
