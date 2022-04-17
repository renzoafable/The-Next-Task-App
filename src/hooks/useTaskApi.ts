/* eslint-disable no-console */
import { useCallback, useState } from 'react';
import formatISO from 'date-fns/formatISO';

import { useAppDispatch, useAppState } from 'src/context/AppContext';
import useAxiosPrivate from './useAxiosPrivate';

export function useAddTask() {
  const {
    tasks: { all },
  } = useAppState();
  const { addTask } = useAppDispatch();

  const execute = useCallback(
    (task: string) => {
      const taskPayload: ITask = {
        id: 100 * Math.random(),
        title: task,
        date: formatISO(new Date(), { representation: 'date' }),
        complete: false,
      };
      const updatedTasks = [...all, taskPayload];
      const stringifiedTasks = JSON.stringify(updatedTasks);

      try {
        localStorage.setItem('tasks', stringifiedTasks);
        addTask(taskPayload);
      } catch (error) {
        console.error('Unable to add task');
      }
    },
    [all]
  );

  return { execute };
}

export function useLoadTasks() {
  type QueryParams = {
    completed?: boolean;
    limit?: number;
    skip?: number;
  };

  type GetTasksResponse = {
    count: number;
    data: ITask[];
  };

  const { axiosPrivate } = useAxiosPrivate();
  const { loadTasks } = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GetTasksResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = async (queryParams: QueryParams = {}) => {
    try {
      setIsLoading(true);

      const response = await axiosPrivate.get<GetTasksResponse>('/task', {
        params: queryParams,
      });

      setData(response.data);
      loadTasks(response.data.data);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}

export function useDeleteTask() {
  const {
    tasks: { all },
  } = useAppState();
  const { deleteTask } = useAppDispatch();

  const execute = useCallback(
    (taskId: number) => {
      const updatedTasks = all.filter((task: ITask) => task.id !== taskId);
      const stringifiedTasks = JSON.stringify(updatedTasks);

      try {
        localStorage.setItem('tasks', stringifiedTasks);
        deleteTask(taskId);
      } catch (error) {
        console.error('Unable to delete task');
      }
    },
    [all]
  );

  return { execute };
}

export function useCheckTask() {
  const {
    tasks: { all },
  } = useAppState();
  const { checkTask } = useAppDispatch();

  const execute = useCallback(
    (taskId: number) => {
      const tasks = [...all];
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      tasks[taskIndex].complete = true;
      const stringifiedTasks = JSON.stringify(tasks);

      try {
        localStorage.setItem('tasks', stringifiedTasks);
        checkTask(taskId);
      } catch (error) {
        console.error('Unable to check task');
      }
    },
    [all]
  );

  return { execute };
}

export function useUncheckTask() {
  const {
    tasks: { all },
  } = useAppState();
  const { uncheckTask } = useAppDispatch();

  const execute = useCallback(
    (taskId: number) => {
      const tasks = [...all];
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      tasks[taskIndex].complete = false;
      const stringifiedTasks = JSON.stringify(tasks);

      try {
        localStorage.setItem('tasks', stringifiedTasks);
        uncheckTask(taskId);
      } catch (error) {
        console.error('Unable to uncheck task');
      }
    },
    [all]
  );

  return { execute };
}
