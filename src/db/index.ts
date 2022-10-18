import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);

client.connect().then(() => console.log("Connected to database"));

const db = client.db('annapurna');

export type IUser = {
    address: string;
    username: string;
    email: string;
    locality: string;
}

export type IEvent = {
    event: string;
    location: string;
    date: string;
}

export const Users = db.collection<IUser>('Users');
export const Events = db.collection<IEvent>('Events');