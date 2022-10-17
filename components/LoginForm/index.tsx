import React from "react";

type Props = {};

const LoginForm = (props: Props) => {
  return (
    <div className="w-full transition-all flex flex-col gap-6 items-center">
      <form className="w-full grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title-input" className="block text-white text-xl">
            Name
          </label>
          <input
            type="text"
            required
            className="trasition-colors bg-[#383838] appearance-none border-none rounded-xl w-full py-4 px-4 leading-tight focus:outline-none  placeholder:text-[#9B9B9B placeholder:text-lg] focus:bg-orange-300 focus:text-white focus:placeholder:text-white"
            // ref={valueRef}
            placeholder="Your Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title-input" className="block text-white text-xl">
            Email
          </label>
          <input
            type="text"
            required
            className="trasition-colors bg-[#383838] appearance-none border-none rounded-xl w-full py-4 px-4 leading-tight focus:outline-none placeholder:text-[#9B9B9B placeholder:text-lg] focus:bg-orange-300 focus:text-white focus:placeholder:text-white"
            // ref={valueRef}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="w-full flex flex-col gap-2 col-span-2">
          <label htmlFor="title-input" className="block text-white text-xl">
            Address
          </label>
          <input
            type="text"
            required
            className="trasition-colors bg-[#383838] appearance-none border-none rounded-xl w-full py-4 px-4 leading-tight focus:outline-none placeholder:text-[#9B9B9B placeholder:text-lg] focus:bg-orange-300 focus:text-white focus:placeholder:text-white"
            // ref={valueRef}
            placeholder="Enter Your Address"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
