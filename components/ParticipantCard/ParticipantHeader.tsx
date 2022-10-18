import React from "react";

type Props = {};

const ParticipantHeader = (props: Props) => {
  return (
    <div className="text-white  w-full p-5 rounded-xl grid grid-cols-4 text-2xl gap-10 font-bold text-center">
      <h1>Name</h1>
      <h1>Age</h1>
      <h1>Occupation</h1>
      <h1 className="">Tokens</h1>
    </div>
  );
};

export default ParticipantHeader;
