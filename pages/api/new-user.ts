import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../src/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST')
        return res.status(405).send({ message: 'Only POST requests allowed' })

    const { username, address } = req.body as { username: string, address: string };

    if (!username || !address)
        return res.status(400).send({ message: 'Missing username or address' })

    await Users.insertOne({ username, address });
    return res.status(200).send({ message: 'User created' });
}