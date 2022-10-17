import { useAddress } from "@thirdweb-dev/react"
import { useEffect, useState } from "react";
import type { IUser } from "~/db";

export const getUser = async (address: string): Promise<IUser> => {
    const resp = await fetch('/api/get-user?' + new URLSearchParams({ address }));
    if (resp.status === 200) return await resp.json()
    throw new Error((await resp.json()).message)
}

export const useAuth = () => {
    const address = useAddress();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        if (address) {
            setLoading(true);
            getUser(address)
                .then((user) => setUser(user))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false))
        }

    }, [address]);

    return { loading, error, user, address };
}