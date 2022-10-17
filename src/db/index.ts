import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL!);

client.connect().then(() => console.log("Connected to database"));

const db = client.db('annapurna');

export type IUser = {
    username: string;
    address: string;
}

export const Users = db.collection<IUser>('Users');
