import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '~/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST')
        return res.status(405).send({ message: 'Only POST requests allowed' })

    const { address } = req.body as { address: string };
    const user = await Users.findOne({ address })
    if (user)
        res.status(200).json(user);
    else
        res.status(404).json({ message: "User not found" });
}