import Image from "next/image";
import Link from "next/link";
import { IEventDocument } from "~/db";

type Props = { event: IEventDocument; }

const LocationCard = ({ event }: Props) => {
    return (
        <Link href={'/participants?id=' + event.eventId} passHref>
            <a className="bg-[#383838] text-white max-w-[300px] p-5 rounded-xl flex flex-col gap-4 cursor-pointer">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="font-semibold text-2xl font-sora">
                            {event.location}
                        </h2>
                        <h3 className="font-sora text-xl">{event.event}</h3>
                    </div>
                    <Image
                        src="/images/pin-point2.svg"
                        height={30}
                        width={30}
                        alt="pin point"
                    />
                </div>
                <div className="flex justify-between gap-3">
                    <h4 className="font-sora text-lg text-[#d9d9d9]">
                        {event.date}
                    </h4>
                    <h4 className="font-sora text-lg text-[#FF5F26]">{event.ticketSupply}</h4>
                </div>
            </a>
        </Link>
    );
};

export default LocationCard;
