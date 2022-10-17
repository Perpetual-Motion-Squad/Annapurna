import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '~/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { address } = req.query as { address: string };
    const user = await Users.findOne({ address })
    if (user)
        return res.status(200).json(user);
    else
        return res.status(404).json({ message: "User not found" });
}