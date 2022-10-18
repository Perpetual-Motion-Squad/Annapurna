import { FormEventHandler } from "react";
import { IUser } from "~/db";

export default function Form({ address }: { address: string }) {
  const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as IUser;
    data.address = address;
    const res = await fetch("/api/new-user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) window.location.href = "/dashboard";
  };

  return (
    <div className="w-full transition-all flex flex-col gap-6 items-center">
      <form
        className="w-full grid grid-cols-2 gap-6 items-center justify-center"
        onSubmit={submitForm}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title-input" className="block text-white text-xl">
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Your Name"
            name="username"
            className="trasition-colors bg-[#383838] appearance-none border-none rounded-xl w-full py-4 px-4 leading-tight focus:outline-none  placeholder:text-[#9B9B9B placeholder:text-lg] focus:bg-[#531e0b] focus:text-white focus:placeholder:text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title-input" className="block text-white text-xl">
            Email
          </label>
          <input
            type="text"
            required
            className="trasition-colors bg-[#383838] appearance-none border-none rounded-xl w-full py-4 px-4 leading-tight focus:outline-none placeholder:text-[#9B9B9B placeholder:text-lg] focus:bg-[#531e0b] focus:text-white focus:placeholder:text-white"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="w-full flex flex-col gap-2 col-span-2">
          <label htmlFor="title-input" className="block text-white text-xl">
            Locality
          </label>
          <input
            type="text"
            required
            className="trasition-colors bg-[#383838] appearance-none border-none rounded-xl w-full py-4 px-4 leading-tight focus:outline-none placeholder:text-[#9B9B9B placeholder:text-lg] focus:bg-[#531e0b] focus:text-white focus:placeholder:text-white"
            name="locality"
            placeholder="Enter Your locality"
          />
        </div>
      </form>
      <button
        className="hover:bg-[#531e0b] border bg-[#FF5F26] rounded-xl w-3/4 py-5 text-2xl"
        type="submit"
      >
        Create Account
      </button>
    </div>
  );
}
