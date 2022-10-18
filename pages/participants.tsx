/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardLayout from "../components/DashboardLayout";
import LocationCard from "../components/LocationCard";
import { useBalance } from "@thirdweb-dev/react";
import { useAuth } from "~/hooks/auth";
import { IUser } from "~/db";
import EventModel from "components/EventModel";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import ParticipantCard from "components/ParticipantCard";
import ParticipantHeader from "components/ParticipantCard/ParticipantHeader";

type Props = { user: IUser };

const ParticpantsPage = (props: Props) => {
  const balance = useBalance();

  const participantDetailsArray = [
    {
      username: "Dhruv Bakshi",
      address: "0x1234567890",
      tokens: 6,
    },
    {
      username: "Dhruv Bakshi",
      address: "0x1234567890",
      tokens: 6,
    },
    {
      username: "Dhruv Bakshi",
      address: "0x1234567890",
      tokens: 6,
    },
  ];

  const participantDetails = participantDetailsArray.map(
    (participant, index) => {
      return (
        <ParticipantCard
          username={participant.username}
          address={participant.address}
          tokens={participant.tokens}
          key={index}
        />
      );
    }
  );

  return (
    <>
      <DashboardLayout className="p-10 w-full">
        <DashboardHeader
          ether={balance.data?.displayValue}
          username={props.user.username}
        />
        <div className="mt-16 relative">
          <h2 className="text-white font-sora text-4xl">All Participants</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 w-full flex-wrap overflow-y-scroll justify-center sm:justify-start items-center pr-4">
              <ParticipantHeader />
              {participantDetails}
            </div>
            <button className="bg-[#FF5F26] text-white w-full p-5 rounded-xl text-2xl gap-10 cursor-pointer text-center shadow__up shadow-xl hover:bg-[#531e0b] transition-all">
              Add Participants
            </button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

const Particpants = () => {
  const { loading, error, user } = useAuth();

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error {error}</div>
      ) : user ? (
        <ParticpantsPage user={user} />
      ) : (
        <div>Not logged in</div>
      )}
    </>
  );
};

export default Particpants;
