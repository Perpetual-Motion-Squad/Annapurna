import { useMetamask } from "@thirdweb-dev/react";

const Connect = () => {
    const login = useMetamask()
    return (
        <div>
            <h3>Follow the link to Connect 👇🏼</h3>
            <button onClick={() => login()}>Connect</button>
        </div>
    );
};

export default Connect;