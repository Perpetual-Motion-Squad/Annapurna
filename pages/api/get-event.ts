import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import { Events, IEventDocument } from '~/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query as { id: string };
    const event = await Events.findOne({ _id: new ObjectId(id) }) as IEventDocument | null


    if (event) {
        event.eventId = (event as unknown as any)._id.toString();
        delete (event as unknown as any)._id;
        delete (event as unknown as any).registeredAddresses;
        return res.status(200).json(event);
    }
    else
        return res.status(404).json({ message: "Event not found" });
}