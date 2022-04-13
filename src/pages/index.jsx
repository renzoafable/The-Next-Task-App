import { useEffect } from 'react';
import { useAppState, useAppDispatch } from 'src/context/AppContext';
import Head from 'next/head';
import formatISO from 'date-fns/formatISO';

import Tasks from 'src/components/Tasks';

const title = 'Incomplete Tasks';

export default function Home() {
  const {
    tasks: { incomplete },
  } = useAppState();
  const { loadTasks } = useAppDispatch();

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
        title: 'A simple task',
        date: formatISO(new Date(), { representation: 'date' }),
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
      {
        id: Math.random() * 1234,
        title: 'And another simple task',
        date: formatISO(new Date()),
        complete: false,
      },
      {
        id: Math.random() * 1234,
        title: 'And another simple task',
        date: formatISO(new Date(2021, 10, 11), { representation: 'date' }),
        complete: false,
      },
    ]);
  }, [loadTasks]);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Tasks tasks={incomplete} />
    </div>
  );
}
