import Head from "next/head"

import { useAppState } from "context/AppContext"
import Task from "components/Task"

const title = 'Completed Tasks'

export default function CompletedTodos() {
  const { tasks: { complete } } = useAppState()

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="tasks">
        <p className="text-info fs-5 mb-2">Today</p>
        {complete.map(task => {
          const { id, complete, date, title } = task

          return (
            <Task
              key={id}
              id={id}
              complete={complete}
              date={date}
              title={title}
            />
          )
        })}
      </div>
    </div>
  )
}