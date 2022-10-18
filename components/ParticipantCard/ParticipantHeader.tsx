import React from "react";

type Props = {};

const ParticipantHeader = (props: Props) => {
  return (
    <div className="text-white  w-full p-5 rounded-xl grid grid-cols-3 text-2xl gap-10 font-bold text-center">
      <h1>Name</h1>
      <h1>Wallet Address</h1>
      <h1 className="">Tokens</h1>
    </div>
  );
};

export default ParticipantHeader;
