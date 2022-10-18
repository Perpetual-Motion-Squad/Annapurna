/* eslint-disable @next/next/no-img-element */
import DashboardHeader from "../components/DashboardHeader";
import DashboardLayout from "../components/DashboardLayout";
import { useBalance } from "@thirdweb-dev/react";
import { useAuth } from "~/hooks/auth";
import { Events, IEvent, IUser } from "~/db";
import ParticipantCard from "components/ParticipantCard";
import ParticipantHeader from "components/ParticipantCard/ParticipantHeader";
import { GetServerSideProps } from "next";
import { ObjectId } from "mongodb";
import EventModel from "components/EventModel";
import { useState } from "react";

type Props = { event: IEvent | null };

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

const ParticpantsPage = (props: { user: IUser; event: IEvent }) => {
  const balance = useBalance();
  const [showModal, setShowModal] = useState(false);

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
      {showModal && <EventModel setShowModel={setShowModal} event={props.event} />}
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
            <button className="bg-[#FF5F26] text-white w-full p-5 rounded-xl text-2xl gap-10 cursor-pointer text-center shadow__up shadow-xl hover:bg-[#531e0b] transition-all" onClick={() => setShowModal(true)}>
              Buy Tickets
            </button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

const Particpants = (props: Props) => {
  const { loading, error, user } = useAuth();

  return (
    <>
      {
        props.event ?
          loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error {error}</div>
          ) : user ? (
            <ParticpantsPage user={user} event={props.event} />
          ) : (
            <div>Not logged in</div>
          ) : <div>Event not found</div>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const id = context.query.id as string;
  let event: IEvent | null = null;
  if (id)
    event = await Events.findOne({ _id: new ObjectId(id as string) });

  delete (event as unknown as any)?._id;

  return {
    props: {
      event,
    },
  };
};

export default Particpants;
