import { useAuth } from "~/hooks/auth";
import React from "react";
import Form from "./form";


const LoginForm = (props: {}) => {

  const { error, loading, user, address } = useAuth();

  return (
    <>
      {
        loading ?
          <div>Loading...</div>
          :
          user ? <div>Logged in as {user.username}</div> : <>
            <Form address={address!} />
            {error && <div>{error}</div>}
          </>

      }
    </>
  )

};

export default LoginForm;
