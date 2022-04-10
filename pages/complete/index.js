import Head from "next/head"

export default function CompletedTodos() {
  const title = 'Completed Tasks'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
    </>
  )
}