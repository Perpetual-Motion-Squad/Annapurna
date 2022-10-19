import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { IEvent, IRegisteredAddresses } from "~/db";

export const config = {
    runtime: "experimental-edge",
};

interface IOGImageProps extends Omit<IEvent, "imageURL"> {
    username?: string;
    userAddress?: string;
}

const EventImage = (props: IOGImageProps) => {
    return (
        <div
            style={{
                height: "600px",
                width: "1000px",
                backgroundColor: "#383838",
                display: "flex",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "30px",
                    marginTop: "14px",
                }}
            >
                {props.username && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 50,
                                fontWeight: 800,
                                color: "#FF5F26",
                            }}
                        >
                            Username:
                        </h1>
                        <h2 style={{ color: "white" }}>{props.username}</h2>
                    </div>
                )}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 50,
                            fontWeight: 600,
                            color: "#FF5F26",
                        }}
                    >
                        Location:
                    </h1>
                    <h2 style={{ color: "white" }}>{props.location}</h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h1
                        style={{
                            fontSize: 50,
                            fontWeight: 600,
                            color: "#FF5F26",
                        }}
                    >
                        Date:
                    </h1>
                    <h2 style={{ color: "white" }}>
                        {new Date(props.date).toLocaleDateString()}
                    </h2>
                </div>

                {props.userAddress && (
                    <h3 style={{ color: "#FF5F26" }}>
                        Wallet Address: {props.userAddress}
                    </h3>
                )}
            </div>
            <div style={{ display: "flex", marginLeft: "100px" }}>
                <svg
                    width="320"
                    height="435"
                    viewBox="0 0 447 612"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_806_23)">
                        <path
                            d="M180.636 598.768C124.61 532.895 0 373.24 0 283.563C0 174.759 92.2608 86.5596 206.073 86.5596C319.843 86.5596 412.147 174.759 412.147 283.563C412.147 373.24 286.571 532.895 231.511 598.768C218.309 614.466 193.838 614.466 180.636 598.768ZM206.073 349.23C243.961 349.23 274.765 319.782 274.765 283.563C274.765 247.343 243.961 217.895 206.073 217.895C168.186 217.895 137.382 247.343 137.382 283.563C137.382 319.782 168.186 349.23 206.073 349.23Z"
                            fill="#FF5F26"
                        />
                        <rect
                            x="347.944"
                            y="143.979"
                            width="173.972"
                            height="186.859"
                            rx="86.986"
                            fill="#383838"
                        />
                    </g>
                    <rect
                        x="205.221"
                        width="160.754"
                        height="153.52"
                        rx="76.7598"
                        fill="#383838"
                    />
                    <rect
                        x="285.599"
                        y="52.2627"
                        width="160.754"
                        height="154.064"
                        rx="77.0319"
                        fill="#383838"
                    />
                    <defs>
                        <clipPath id="clip0_806_23">
                            <rect
                                width="412.147"
                                height="525.342"
                                fill="white"
                                transform="translate(0 86.5596)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default async function handler(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const event: IOGImageProps = {
            event: searchParams.get("event") || "",
            date: searchParams.get("date") || "",
            location: searchParams.get("location") || "",
            ticketSupply: +searchParams.get("ticketSupply")!,
            registeredAddresses: [] as IRegisteredAddresses[],
            coordinates: {
                lat: +searchParams.get("lat")!,
                lng: +searchParams.get("lng")!,
            },
            tokenID: +(searchParams.get("tokenID") || 0),
            username: searchParams.get("username") || "",
            userAddress: searchParams.get("userAddress") || "",
        };

        return new ImageResponse(<EventImage {...event} />, {
            width: 1000,
            height: 500,
        });
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
