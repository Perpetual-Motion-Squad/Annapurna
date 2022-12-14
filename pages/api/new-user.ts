import type { NextApiRequest, NextApiResponse } from "next";
import { IMyEvent, IUser, Users } from "~/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST")
        return res.status(405).send({ message: "Only POST requests allowed" });

    const { username, address, email, locality, role } = req.body as IUser;

    if (!username || !address || !email || !locality)
        return res.status(400).send({ message: "Missing username or address" });

    await Users.insertOne({ username, address, email, locality, role: +role, myEvents: [] as IMyEvent[] });
    return res.status(200).send({ message: "User created" });
}
