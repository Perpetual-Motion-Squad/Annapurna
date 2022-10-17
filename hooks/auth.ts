import { useWeb3 } from "@3rdweb/hooks"
import { useEffect, useState } from "react";
import type { IUser } from "../src/db"

export const useAuth = () => {
    const { address } = useWeb3();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (address) {
            fetch("/api/get-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address })
            }).then(async res => {
                if (res.status === 200)
                    setUser(await res.json());
                else if (res.status > 400)
                    setError((await res.json()).message);

                setLoading(false);
            })
        } else
            setLoading(false);

    }, [address]);

    return { user, loading, error };
}