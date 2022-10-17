import { useUser } from "@thirdweb-dev/react"
import { useEffect, useState } from "react";
import type { IUser } from "~/db"

export const useAuth = () => {
    const { user: currentUser } = useUser();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) {
            fetch("/api/get-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address: currentUser.address })
            }).then(async res => {
                if (res.status === 200)
                    setUser(await res.json());
                else if (res.status > 400)
                    setError((await res.json()).message);

                setLoading(false);
            })
        } else
            setLoading(false);

    }, [currentUser]);

    return { user, loading, error };
}