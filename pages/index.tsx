import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen">
      <Head>
        <title>Annapurna</title>
        <meta name="description" content="Food for all" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </div>
  );
};

export default Home;
