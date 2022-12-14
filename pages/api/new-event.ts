import type { NextApiRequest, NextApiResponse } from "next";

import { Events, IEvent } from "~/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).send({ message: "Only POST requests allowed" });

    const { event, location, date, ticketSupply, coordinates, tokenID, imageURL } = req.body as IEvent;

    if (!event || !location || !date)
        return res.status(400).send({ message: "Missing event or location" });

    await Events.insertOne({
        event,
        location,
        imageURL,
        date,
        ticketSupply: +ticketSupply || 0,
        coordinates,
        tokenID,
        registeredAddresses: [],
    });
    return res.status(200).send({ message: "Event created" });
}
