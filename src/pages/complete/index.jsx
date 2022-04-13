import { useEffect } from 'react';
import Head from 'next/head';

import { useAppState } from 'src/context/AppContext';
import { useLoadTasks } from 'src/hooks/useApi';
import Tasks from 'src/components/Tasks';

const title = 'Completed Tasks';

export default function CompletedTodos() {
  const {
    tasks: { complete },
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
      <Tasks tasks={complete} />
    </div>
  );
}
