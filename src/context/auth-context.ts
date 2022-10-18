import { createContext } from "react";
import { IUser } from "~/db";

interface IAuthContext {
    loading: boolean;
    error: string | undefined;
    user: IUser | undefined;
    address: string | undefined;
}

const AuthContext = createContext<IAuthContext>({
    loading: false,
    error: undefined,
    user: undefined,
    address: undefined,
});

export default AuthContext;