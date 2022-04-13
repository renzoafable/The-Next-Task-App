import { useEffect } from "react";
import { useAppState, useAppDispatch } from 'context/AppContext'
import Head from "next/head";
import formatISO from 'date-fns/formatISO'

import Task from 'components/Task'

const title = 'Incomplete Tasks'

export default function Home() {
  const { tasks: { incomplete } } = useAppState()
  const { loadTasks } = useAppDispatch()

  useEffect(() => {
    loadTasks([
      {
        id: Math.random() * 1234,
        title: 'A simple task',
        date: formatISO(new Date(2022, 2, 1, 0, 0, 0, 0), {
          representation: 'date',
        }),
        complete: true,
      },
      {
        id: Math.random() * 1234,
        title: 'Another simple task',
        date: formatISO(new Date(2021, 11, 25), { representation: 'date' }),
        complete: false,
      },
      {
        id: Math.random() * 1234,
        title: 'And another simple task',
        date: formatISO(new Date()),
        complete: false,
      },
    ]);
  }, [loadTasks])

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="tasks">
        <p className="text-info fs-5 mb-2">Today</p>
        {incomplete.map(task => {
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
