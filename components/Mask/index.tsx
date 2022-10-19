import React from "react";
import Image from "next/image";

type Props = {};

const Mask = (props: Props) => {
  return (
    <div
      style={{
        WebkitMaskImage: "url(/images/banner-mask.png)",
        maskImage: "url(/images/banner-mask.png)",
        width: "100%",
      }}
      className="relative top-0 left-0 h-full w-full bg-no-repeat banner__mask"
    >
      <Image
        layout="fill"
        src="/images/people-eating.png"
        alt="mask"
        className="h-full w-full object-cover z-10 bg-no-repeat"
      />
    </div>
  );
};

export default Mask;
