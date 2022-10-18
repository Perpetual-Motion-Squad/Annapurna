import React from "react";

type Props = {
  name: string;
  age: number;
  occupation: string;
  tokens: number;
};

const ParticipantCard = (props: Props) => {
  return (
    <div className="bg-[#383838] text-white w-full p-5 rounded-xl grid grid-cols-4 text-2xl gap-10 cursor-pointer text-center">
      <h1>{props.name}</h1>
      <h1>{props.age}</h1>
      <h1>{props.occupation}</h1>
      <h1 className="text-[#FF5F26]">{props.tokens}</h1>
    </div>
  );
};

export default ParticipantCard;
