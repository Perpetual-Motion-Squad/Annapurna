import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Events, Users } from '~/db';

export type IBuyTicketsRequest = {
    username: string;
    address: string;
    tokens: number;
    eventID: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).send({ message: "Only POST requests allowed" });

    const { username, address, tokens, eventID } = req.body as IBuyTicketsRequest

    if (!username || !address || !tokens || !eventID)
        return res.status(400).send({ message: "Missing username or address" });

    await Events.updateOne(
        { _id: new ObjectId(eventID) },
        { $push: { registeredAddresses: { username, address, tokens } }, $inc: { ticketSupply: -tokens } }
    );

    const event = await Events.findOne({ _id: new ObjectId(eventID) });

    if (event) {
        await Users.updateOne(
            { address },
            { $push: { myEvents: { event: event.event, location: event.location, date: event.date, tickets: tokens, eventID } } }
        );
    }

    return res.status(200).send({ message: "Tickets minted" });

}