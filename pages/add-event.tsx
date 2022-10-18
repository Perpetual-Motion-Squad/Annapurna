import { useBalance } from "@thirdweb-dev/react";
import DashboardHeader from "components/DashboardHeader";
import DashboardLayout from "components/DashboardLayout";
import React, { FormEventHandler } from "react";
import { IUser } from "~/db";
import { useAuth } from "~/hooks/auth";

type Props = { user: IUser };

const AddEventPage = (props: Props) => {
    const balance = useBalance();
    const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as unknown as IUser;
        console.log(data);
        const res = await fetch("/api/new-event", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) window.location.href = "/dashboard";
    };

    return (
        <DashboardLayout className="p-10 w-full">
            <DashboardHeader
                ether={balance.data?.displayValue}
                username={props.user.username}
            />
            <div className="mt-16 relative">
                <h2 className="text-white font-sora text-4xl mx-auto w-full text-center">
                    Add New Event
                </h2>

                <form
                    className="flex flex-col gap-5 font-sora mt-10 w-1/2 mx-auto"
                    onSubmit={submitForm}
                >
                    <label className="flex gap-10 justify-between text-xl items-center">
                        Name:
                        <input
                            className="w-60 py-2 px-4 rounded-xl"
                            name="event"
                        />
                    </label>
                    <label className="flex gap-10 justify-between text-xl items-center">
                        location:
                        <input
                            className="w-60 py-2 px-4 rounded-xl"
                            name="location"
                        />
                    </label>
                    <label className="flex gap-10 justify-between text-xl items-center">
                        Date:
                        <input
                            type={"datetime-local"}
                            className="w-60 py-2 px-4 rounded-xl"
                            name="date"
                        />
                    </label>
                    <label className="flex gap-10 justify-between text-xl items-center">
                        Total Seats:
                        <input
                            type={"number"}
                            className="w-60 py-2 px-4 rounded-xl"
                            name="ticketSupply"
                        />
                    </label>
                    <button className="text-xl bg-orange-600 py-3 rounded-xl">
                        Submit
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
};

const AddEvent = () => {
    const { loading, error, user } = useAuth();

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error {error}</div>
            ) : user ? (
                <AddEventPage user={user} />
            ) : (
                <div>Not logged in</div>
            )}
        </>
    );
};

export default AddEvent;
