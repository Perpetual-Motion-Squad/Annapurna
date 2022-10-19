import { useBalance } from '@thirdweb-dev/react'
import DashboardHeader from 'components/DashboardHeader'
import DashboardLayout from 'components/DashboardLayout'
import { IEvent, IUser } from "~/db";
import React from 'react'

type Props = { user: IUser };

const Events = (props: Props) => {
    const balance = useBalance();
    const data = [{event: "abc",
        tokenID: 1234,
        imageURL: "",
        location: "xyz",
        coordinates: { lat: 28, lng: 77 },
        date: "2022-10-10",
        ticketSupply: 5},
        {event: "aisd",
        tokenID: 1234,
        imageURL: "",
        location: "xyz",
        coordinates: { lat: 28, lng: 77 },
        date: "2022-10-10",
        ticketSupply: 5}]
  return (
    <DashboardLayout className="p-10 w-full" active="add">
        <DashboardHeader
            ether={balance.data?.displayValue}
            username="abc"
        />
        <div className="mt-16 relative grid grid-cols-4 gap-5">
            {data.map((event,index) => {
                return (
                    <div className="flex flex-col gap-5 border-2 border-[#FF5F26] rounded-xl" key={index}>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-10 justify-between text-xl items-center">
                                <p className="text-white font-sora text-4xl mx-auto w-full text-center">
                                    Event : {event.event}
                                </p>
                            </div>
                            <div className="flex gap-10 justify-between text-xl items-center">
                                <p className="text-white font-sora text-4xl mx-auto w-full text-center">
                                    Location : {event.location}
                                </p>
                            </div>
                            <div className="flex gap-10 justify-between text-xl items-center">
                                <p className="text-white font-sora text-4xl mx-auto w-full text-center">
                                    Date : {event.date}
                                </p>
                            </div>
                            <div className="flex gap-10 justify-between text-xl items-center">
                                <p className="text-white font-sora text-4xl mx-auto w-full text-center">
                                    Tickets : {event.ticketSupply}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </DashboardLayout>
    )
}

export default Events