import { useBalance } from '@thirdweb-dev/react'
import DashboardHeader from 'components/DashboardHeader'
import DashboardLayout from 'components/DashboardLayout'
import { IUser } from "~/db";
import React from 'react'
import { useAuth } from '~/hooks/auth';
import Loading from 'components/Loading';

type Props = { user: IUser };

const EventsPage = (props: Props) => {
    const balance = useBalance();

    return (
        <DashboardLayout className="p-10 w-full" active="add">
            <DashboardHeader
                ether={balance.data?.displayValue}
                username="abc"
            />
            <div className="mt-16 relative grid grid-cols-4 gap-5">
                {props?.user?.myEvents?.map((event, index) => {
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
                                        Tickets : {event.tickets}
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

const Events = () => {
    const { loading, error, user } = useAuth();

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error {error}</div>
            ) : user ? (
                <EventsPage user={user} />
            ) : (
                <div className="bg-black text-white flex items-center justify-center h-screen w-screen font-sora">Not logged in</div>
            )}
        </>
    );
};

export default Events