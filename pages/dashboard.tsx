/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLayout from "../components/DashboardLayout";
import LocationCard from "../components/LocationCard";
import { useBalance } from "@thirdweb-dev/react"
import { useAuth } from "~/hooks/auth";
import { IUser } from "~/db";
import EventModel from "components/EventModel";

type Props = { user: IUser };

const DashboardPage = (props: Props) => {
    const balance = useBalance();
    const [showModel, setShowModel] = useState(true);

    return (
        <>
            {showModel && <EventModel setShowModel={setShowModel} />}
            <DashboardLayout className="p-10 w-full">
                <DashboardHeader ether={balance.data?.displayValue} username={props.user.username} />
                <div className="mt-16 relative">
                    <h2 className="text-white font-sora text-4xl">Latest Events</h2>
                    <div className="mt-10 flex gap-5 w-full flex-wrap max-h-[420px] overflow-scroll pb-24">
                        <LocationCard />
                        <LocationCard />
                        <LocationCard />
                    </div>
                    <img
                        src="/images/map.png"
                        alt="map"
                        className="w-full h-[300px] object-cover rounded-2xl shadow__up relative -mt-10 z-10"
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

const Dashboard = () => {
    const { loading, error, user } = useAuth();

    return (
        <>
            {loading ? <div>Loading...</div>
                : error ? <div>Error {error}</div>
                    : user ? <DashboardPage user={user} />
                        : <div>Not logged in</div>}
        </>)
}

export default Dashboard;
