import { useAuth } from "~/hooks/auth";
import React from "react";
import Form from "./form";
import Link from "next/link";

const LoginForm = (props: {}) => {
  const { error, loading, user, address } = useAuth();

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <>
          <div className="bg-[#383838] p-6 rounded-xl text-xl">
            Logged in as {user.username}
          </div>
          <Link href="/dashboard">
            <button className="text-xl bg-orange-600 py-3 px-4 rounded-xl hover:bg-[#531e0b]">
              Go to Dashboard
            </button>
          </Link>
        </>
      ) : (
        <>
          <Form address={address!} />

          {error && <div>{error}</div>}
        </>
      )}
    </>
  );
};

export default LoginForm;
