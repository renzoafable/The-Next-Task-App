import Head from "next/head";

export default function Home() {
  const title = 'Incomplete Tasks'
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
    </div>
  )
}
