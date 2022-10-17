/* eslint-disable @next/next/no-img-element */
import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLayout from "../components/DashboardLayout";
import LocationCard from "../components/LocationCard";

type Props = {};

const Dashboard = (props: Props) => {
    return (
        <DashboardLayout className="p-10 w-full">
            <DashboardHeader />
            <div className="mt-16 relative h-full">
                <h2 className="text-white font-sora text-4xl">Latest Events</h2>
                <div className="mt-10 flex gap-5 w-full flex-wrap">
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                    <LocationCard />
                </div>
                <img
                    src="/images/map.png"
                    alt="map"
                    className="w-full h-[300px] object-cover rounded-2xl shadow__up absolute mt-10"
                />
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
