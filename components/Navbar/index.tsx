import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div className="flex font-sora justify-between items-center text-white px-16 py-5 absolute text-lg w-full">
            <Image src="/images/logo.svg" height={70} width={70} alt="logo" />
            <div className="flex justify-between gap-14 items-center">
                <h3 className="cursor-pointer">Events</h3>
                <h3 className="cursor-pointer">About Us</h3>
                <div className="flex gap-3 items-center cursor-pointer">
                    <Image
                        src="/images/person.svg"
                        height={30}
                        width={30}
                        alt="user"
                    />
                    <h3>Sign Up</h3>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
