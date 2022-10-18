import { useBalance } from "@thirdweb-dev/react";
import DashboardHeader from "components/DashboardHeader";
import DashboardLayout from "components/DashboardLayout";
import React from "react";
import { IUser } from "~/db";
import { useAuth } from "~/hooks/auth";

type Props = { user: IUser };

const AddEventPage = (props: Props) => {
    const balance = useBalance();
    return (
        <DashboardLayout>
            <DashboardHeader
                ether={balance.data?.displayValue}
                username={props.user.username}
            />
        </DashboardLayout>
    );
};

const AddEvent = () => {
    const { loading, error, user } = useAuth();

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error {error}</div>
            ) : user ? (
                <AddEventPage user={user} />
            ) : (
                <div>Not logged in</div>
            )}
        </>
    );
};

export default AddEvent;
