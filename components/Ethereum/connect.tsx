import { useMetamask } from "@thirdweb-dev/react";

const Connect = () => {
  const login = useMetamask();
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h3 className="text-3xl">Follow the link to Connect</h3>
      <button
        type="button"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-4 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        onClick={() => login()}
      >
        <img src="metamask.svg" alt="MetaMask" width={30} />
        &nbsp;Connect with MetaMask
      </button>
    </div>
  );
};

export default Connect;
