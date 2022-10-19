import Image from "next/image";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div className="flex font-sora justify-between items-center text-white px-16 py-5 absolute text-lg w-full z-50">
            <Image src="/images/logo.svg" height={100} width={100} alt="logo" />
            <div className="flex justify-between gap-14 items-center cursor-pointer">
                <h3 className="cursor-pointer">Events</h3>
                <a href="#about">
                    <h3 className="cursor-pointer">About Us</h3>
                </a>
                <Link passHref href="/login">
                    <div className="flex gap-3 items-center cursor-pointer">
                        <Image
                            src="/images/person.svg"
                            height={30}
                            width={30}
                            alt="user"
                        />
                        <h3>Sign In</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
