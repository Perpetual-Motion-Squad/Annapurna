import { MongoClient } from "mongodb";
import UserRole from "./roles";

const client = new MongoClient(process.env.DATABASE_URL!);

client.connect().then(() => console.log("Connected to database")).catch((err) => console.error(err));

const db = client.db("annapurna");

export type IUser = {
    address: string;
    username: string;
    email: string;
    locality: string;
    role: UserRole;
    myEventIDs: string[];
};

export type IRegisteredAddresses = {
    username: string;
    address: string;
    tokens: number;
}

export type IEvent = {
    event: string;
    tokenID: number;
    imageURL: string;
    location: string;
    coordinates: { lat: number, lng: number };
    date: string;
    registeredAddresses: IRegisteredAddresses[];
    ticketSupply: number;
};

export interface IEventDocument extends IEvent {
    eventId: string;
}

export const Users = db.collection<IUser>("Users");
export const Events = db.collection<IEvent>("Events");
