import React from "react";
import Sidebar from "../Sidebar";

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = (props: Props) => {
    return (
        <div className="flex min-h-screen w-full bg-black">
            <Sidebar />
            <div>{props.children}</div>
        </div>
    );
};

export default DashboardLayout;
