import Head from "next/head"

import { useAppState } from "context/AppContext"
import Task from "components/Task"
import Tasks from "components/Tasks"

const title = 'Completed Tasks'

export default function CompletedTodos() {
  const { tasks: { complete } } = useAppState()

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Tasks tasks={complete} />
    </div>
  )
}