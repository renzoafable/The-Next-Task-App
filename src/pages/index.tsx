import React, { useEffect } from 'react';
import { useAppState } from 'src/context/AppContext';
import Head from 'next/head';

import Tasks from 'src/components/Tasks';
import { useLoadTasks } from 'src/hooks/useApi';

const title = 'Incomplete Tasks';

export default function Home() {
  const {
    tasks: { incomplete },
  } = useAppState();
  const { execute } = useLoadTasks();

  useEffect(() => {
    execute();
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Tasks tasks={incomplete} />
    </div>
  );
}
