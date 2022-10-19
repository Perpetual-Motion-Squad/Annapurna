/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLayout from "../components/DashboardLayout";
import LocationCard from "../components/LocationCard";
import { useBalance } from "@thirdweb-dev/react";
import { useAuth } from "~/hooks/auth";
import { Events, IEventDocument, IUser } from "~/db";
import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    MarkerClusterer,
} from "@react-google-maps/api";
import { GetServerSideProps } from "next";

type Props = { user: IUser; events: IEventDocument[] };

const DashboardPage = (props: Props) => {
    const balance = useBalance();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <DashboardLayout className="p-10 w-full" active="dashboard">
                <DashboardHeader
                    ether={balance.data?.displayValue}
                    username={props.user.username}
                />
                <div className="mt-16 relative">
                    <h2 className="text-white font-sora text-4xl">
                        Latest Events
                    </h2>
                    <div className="mt-10 flex gap-5 w-full flex-wrap max-h-[420px] overflow-y-scroll pb-24 justify-center sm:justify-start items-center">
                        {props.events.map((event) => {
                            if (event.ticketSupply > 0)
                                return (
                                    <LocationCard
                                        event={event}
                                        key={event.tokenID}
                                    />
                                );
                        })}
                    </div>
                    <div className="py-0 shadow__up">
                        <GoogleMap
                            mapContainerStyle={{
                                width: "100%",
                                height: "500px",
                                borderRadius: "20px",
                                margin: "0 auto 0 0",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                                marginTop: "10px",
                                zIndex: 10,
                            }}
                            zoom={14}
                            center={{ lat: 28.641307, lng: 77.111225 }}
                            options={{
                                disableDefaultUI: true,
                                zoomControl: false,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                            }}
                        >
                            {props.events.map((event, idx) => {
                                if (event.ticketSupply > 0)
                                    return (
                                        <MarkerF
                                            position={{
                                                lat: event.coordinates.lat,
                                                lng: event.coordinates.lng,
                                            }}
                                            key={idx}
                                        />
                                    );
                            })}
                        </GoogleMap>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

type ServerProps = { events: IEventDocument[] };

const Dashboard = (props: ServerProps) => {
    const { loading, error, user } = useAuth();

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error {error}</div>
            ) : user ? (
                <DashboardPage user={user} events={props.events} />
            ) : (
                <div>Not logged in</div>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async () => {
    const res = await Events.find({})
        .project({ registeredAddresses: 0 })
        .toArray();
    for (const event of res) {
        event.eventId = event._id.toString();
        delete event._id;
    }
    return { props: { events: res as IEventDocument[] } };
};

export default Dashboard;
