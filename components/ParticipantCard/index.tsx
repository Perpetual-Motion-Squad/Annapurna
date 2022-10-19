import React from "react";
import { IEventDocument } from "~/db";

type Props = {
  username: string;
  address: string;
  tokens: number;
  event: IEventDocument;
};

const ParticipantCard = (props: Props) => {
  return (
    <a target="_blank" href={props.event.imageURL + '&' + new URLSearchParams({ username: props.username, userAddress: props.address })}>
      <div className="bg-[#383838] text-white w-full p-5 rounded-xl grid grid-cols-3 text-2xl gap-10 cursor-pointer text-center">
        <h1>{props.username}</h1>
        <h1 className="truncate">{props.address}</h1>
        <h1 className="text-[#FF5F26]">{props.tokens}</h1>
      </div>
    </a>
  );
};

export default ParticipantCard;
