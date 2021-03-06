import React, { useEffect } from 'react';
import Head from 'next/head';

import TaskList from 'src/components/TaskList';
import { useAppState } from 'src/context/AppContext';
import { useLoadTasks } from 'src/hooks/useTaskApi';
import SkeletonLoader from 'src/components/SkeletonLoader';

const title = 'Incomplete Tasks';

export default function Incomplete() {
  const { execute } = useLoadTasks();
  const { tasks, isLoadingTasks } = useAppState();
  const { incomplete } = tasks;

  useEffect(() => {
    execute();
  }, []);

  if (isLoadingTasks) {
    return <SkeletonLoader levels={4} />;
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <TaskList tasks={incomplete} />
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
