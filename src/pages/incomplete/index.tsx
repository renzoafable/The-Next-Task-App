import React, { useEffect } from 'react';
import Head from 'next/head';

import Tasks from 'src/components/Tasks';
import { useAppState } from 'src/context/AppContext';
import { useLoadTasks } from 'src/hooks/useTaskApi';
import SkeletonLoader from 'src/components/SkeletonLoader';

const title = 'Incomplete Tasks';

export default function Incomplete() {
  const { execute, isLoading } = useLoadTasks();
  const { tasks } = useAppState();
  const { incomplete } = tasks;

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
      <Tasks tasks={incomplete} />
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
