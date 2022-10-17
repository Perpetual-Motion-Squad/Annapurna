import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Annapurna</title>
                <meta name="description" content="Food for all" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-5xl font-nanum">
                This is a sample text in reckless
            </div>
        </div>
    );
};

export default Home;
