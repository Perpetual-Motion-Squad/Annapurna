import React from "react";

type Props = {
  username: string;
  address: string;
  tokens: number;
};

const ParticipantCard = (props: Props) => {
  return (
    <div className="bg-[#383838] text-white w-full p-5 rounded-xl grid grid-cols-3 text-2xl gap-10 cursor-pointer text-center">
      <h1>{props.username}</h1>
      <h1 className="truncate">{props.address}</h1>
      <h1 className="text-[#FF5F26]">{props.tokens}</h1>
    </div>
  );
};

export default ParticipantCard;
