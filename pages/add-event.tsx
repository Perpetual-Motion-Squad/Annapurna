import { useBalance } from "@thirdweb-dev/react";
import DashboardHeader from "components/DashboardHeader";
import DashboardLayout from "components/DashboardLayout";
import { FormEventHandler, useState } from "react";
import { IEvent, IUser } from "~/db";
import { useAuth } from "~/hooks/auth";
import { useContract } from "~/hooks/contract";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";

type Props = { user: IUser };

const pinata_api_key = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
const pinata_secret_api_key = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!;

const center = {
  lat: 28.641307,
  lng: 77.111225,
};

const AddEventPage = (props: Props) => {
  const balance = useBalance();
  const { contract } = useContract();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [mapCoords, setMapsCoords] = useState(center);

  const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as IEvent;
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
      const imgURL = `https://gateway.pinata.cloud/ipfs/${imgHash}`;
      const tokenID = await contract.NEXT_TOKEN_ID();
      data.tokenID = tokenID.toNumber();
      data.imageURL = window.location.origin + imgEndpoint;
      const res = await contract?.setTokenSupply(
        tokenID,
        data.ticketSupply,
        imgURL
      );
      console.log(imgURL, res);
    } catch (e) {
      setSuccess(false);
      console.log(e);
    }

    data.coordinates = mapCoords;
    console.log(data);

    const res = await fetch("/api/new-event", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) setSuccess(true);
    else setSuccess(false);
    setLoading(false);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
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
              className="w-60 py-2 px-4 rounded-xl text-black"
              name="location"
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
          {success === true && <div className="text-xl">Success!</div>}
          {success === false && <div className="text-xl">Error!</div>}
        </form>
        <div className="py-0 shadow__up">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "500px",
              borderRadius: "20px",
              margin: "0 auto 0 0",
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
              setMapsCoords({ lat: ev.latLng!.lat(), lng: ev.latLng!.lng() })
            }
          >
            <MarkerF position={mapCoords} />
          </GoogleMap>
        </div>
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
