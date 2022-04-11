import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-800">
      <Head>
        <title>Platforms on Vercel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="m-auto w-48 text-white">
        <h1>Homepage | Loading...</h1>
      </div>
    </div>
  );
}
