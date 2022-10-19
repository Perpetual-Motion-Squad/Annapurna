import { useBalance } from "@thirdweb-dev/react";
import DashboardHeader from "components/DashboardHeader";
import DashboardLayout from "components/DashboardLayout";
import { FormEventHandler, useEffect, useState } from "react";
import { IEvent, IUser } from "~/db";
import { useAuth } from "~/hooks/auth";
import { useContract } from "~/hooks/contract";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import Loading from "components/Loading";

type Props = { user: IUser };

const pinata_api_key = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
const pinata_secret_api_key = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!;

const center = {
    lat: 28.641307,
    lng: 77.111225,
};

const getAddress = async (lat: number, lng: number) => {
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
    Geocode.setLanguage("en");
    Geocode.setRegion("in");
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
    const response = await Geocode.fromLatLng(lat.toString(), lng.toString());
    const address = response.results[0].formatted_address;
    return address;
};


const LocationModel = ({ mapCoords, setMapsCoords, setShowlocationModel }: { mapCoords: any, setMapsCoords: any, setShowlocationModel: any }) => {
    return (
        <div
            className="fixed bg-[#000000a1] h-full w-screen z-50 grid place-items-center"
            onClick={() => setShowlocationModel(false)}
        >
            <div
                className="w-full text-center text-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-sora">Select a location on the map</div>
                <GoogleMap
                    mapContainerStyle={{
                        width: "70%",
                        height: "400px",
                        borderRadius: "20px",
                        margin: "0 auto",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                        marginTop: "10px",
                        zIndex: 10,
                    }}
                    zoom={14}
                    center={{ lat: 28.641307, lng: 77.111225 }}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onClick={(ev) =>
                        setMapsCoords({
                            lat: ev.latLng!.lat(),
                            lng: ev.latLng!.lng(),
                        })
                    }
                >
                    <MarkerF position={mapCoords} />
                </GoogleMap>
                <button
                    className="bg-orange-400 px-5 py-2 mt-5 rounded-xl font-sora"
                    onClick={() => setShowlocationModel(false)}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

const AddEventPage = (props: Props) => {
    const balance = useBalance();
    const { contract } = useContract();
    const [success, setSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [mapCoords, setMapsCoords] = useState(center);
    const [showLocationModel, setShowlocationModel] = useState(false);

    const [currentLocation, setCurrentLocation] = useState("");

    useEffect(() => {
        const address = getAddress(mapCoords.lat, mapCoords.lng).then(
            (res: string) => setCurrentLocation(res)
        );
    }, [mapCoords.lat, mapCoords.lng]);

    const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as IEvent;
        try {
            setLoading(true);
            const imgEndpoint =
                "/api/event-image?" +
                new URLSearchParams({
                    event: data.event,
                    date: data.date,
                    location: data.location,
                    ticketSupply: data.ticketSupply.toString(),
                }).toString();
            data.coordinates = mapCoords;
            const img = await fetch(imgEndpoint);
            const imgBlob = await img.blob();
            const imgFormData = new FormData();
            imgFormData.append("file", imgBlob, "event-image.png");
            const imgRes = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        pinata_api_key,
                        pinata_secret_api_key,
                    },
                    body: imgFormData,
                }
            );
            const imgJson = await imgRes.json();

            const imgHash = imgJson.IpfsHash;
            const imgURL = `https://gateway.pinata.cloud/ipfs/${ imgHash }`;

            const NFTMetadata = {
                description: `Enjoying the food at ${ data.location } on ${ data.date }`,
                external_url: "https://annapurnaa.vercel.app" + imgEndpoint,
                image: imgURL,
                name: data.event
            }

            // upload metadata to pinata
            const metadataFormData = new FormData();
            metadataFormData.append("file", new Blob([JSON.stringify(NFTMetadata)], { type: "application/json" }), "metadata.json");

            const metadataRes = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        pinata_api_key,
                        pinata_secret_api_key,
                    },
                    body: metadataFormData,
                }
            );

            const metadataJson = await metadataRes.json();
            const metadataHash = metadataJson.IpfsHash;
            const metadataURL = `https://gateway.pinata.cloud/ipfs/${ metadataHash }`;

            console.log(metadataURL);

            const tokenID = await contract.NEXT_TOKEN_ID();
            data.tokenID = tokenID.toNumber();
            data.imageURL = imgEndpoint;
            const res = await contract?.setTokenSupply(
                tokenID,
                data.ticketSupply,
                metadataURL
            );
            await res.wait();
            const resp = await fetch("/api/new-event", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (resp.status === 200) setSuccess(true);
            else setSuccess(false);
        } catch (e) {
            setSuccess(false);
            console.log(e);
        }

        setLoading(false);
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {showLocationModel && (
                <LocationModel
                    mapCoords={mapCoords}
                    setMapsCoords={setMapsCoords}
                    setShowlocationModel={setShowlocationModel}
                />
            )}
            <DashboardLayout className="p-10 w-full" active="add">
                <DashboardHeader
                    ether={balance.data?.displayValue}
                    username={props.user.username}
                />
                <div className="mt-16 relative">
                    <h2 className="text-white font-sora text-4xl mx-auto w-full text-center">
                        Add New Event
                    </h2>

                    <form
                        className="flex flex-col gap-5 font-sora mt-10 w-1/2 mx-auto text-white"
                        onSubmit={submitForm}
                    >
                        <label className="flex gap-10 justify-between text-xl items-center">
                            Name:
                            <input
                                className="w-60 py-2 px-4 rounded-xl text-black"
                                name="event"
                            />
                        </label>
                        <label className="flex gap-10 justify-between text-xl items-center">
                            Location:
                            <input
                                className="w-60 py-2 px-4 rounded-xl text-black truncate"
                                name="location"
                                onClick={() => setShowlocationModel(true)}
                                value={currentLocation}
                            />
                        </label>
                        <label className="flex gap-10 justify-between text-xl items-center">
                            Date:
                            <input
                                type={"datetime-local"}
                                className="w-60 py-2 px-4 rounded-xl text-black"
                                name="date"
                            />
                        </label>
                        <label className="flex gap-10 justify-between text-xl items-center">
                            Total Seats:
                            <input
                                type={"number"}
                                className="w-60 py-2 px-4 rounded-xl text-black"
                                name="ticketSupply"
                            />
                        </label>
                        <button className="text-xl bg-orange-600 py-3 rounded-xl hover:bg-[#531e0b]">
                            Submit
                        </button>
                        {loading && <div className="text-xl">Loading...</div>}
                        {success === true && (
                            <div className="text-xl">Success!</div>
                        )}
                        {success === false && (
                            <div className="text-xl">Error!</div>
                        )}
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
};

const AddEvent = () => {
    const { loading, error, user } = useAuth();

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error {error}</div>
            ) : user ? (
                <AddEventPage user={user} />
            ) : (
                <div className="bg-black text-white flex items-center justify-center h-screen w-screen font-sora">Not logged in</div>
            )}
        </>
    );
};

export default AddEvent;
