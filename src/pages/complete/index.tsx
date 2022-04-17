import { useEffect } from 'react';
import Head from 'next/head';

import { useAppState } from 'src/context/AppContext';
import { useLoadTasks } from 'src/hooks/useTaskApi';
import Tasks from 'src/components/Tasks';
import SkeletonLoader from 'src/components/SkeletonLoader';

const title = 'Completed Tasks';

export default function CompletedTodos() {
  const { execute, isLoading } = useLoadTasks();
  const { tasks } = useAppState();
  const { complete } = tasks;

  useEffect(() => {
    execute();
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Tasks tasks={complete} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
