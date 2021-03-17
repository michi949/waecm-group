import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <button className="bg-white m-2 px-4 py-2 rounded-2xl font-bold">Login</button>
    </div>
  );
}
