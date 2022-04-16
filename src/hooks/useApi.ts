/* eslint-disable no-console */
import { useCallback, useState } from 'react';
import formatISO from 'date-fns/formatISO';

import { useAppDispatch, useAppState } from 'src/context/AppContext';
import { useAuthDispatch } from 'src/context/AuthContext';
import axios from 'src/api/axios';

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
  const {
    tasks: { all },
  } = useAppState();
  const { loadTasks } = useAppDispatch();

  const execute = useCallback(() => {
    const stringifiedTasks = localStorage.getItem('tasks') ?? '[]';
    const parsedTasks = JSON.parse(stringifiedTasks);

    loadTasks(parsedTasks);
  }, [all]);

  return { execute };
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

export function useRegisterUser() {
  type Response = {
    user: AuthUser;
    token: string;
  };
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(async (userPayload: AuthUserPayload) => {
    try {
      setIsLoading(true);

      const response = await axios.post<Response>(
        '/user/register',
        userPayload
      );

      setData(response.data);
      setUser(response.data.user);
      localStorage?.setItem('todoAuthToken', response.data.token);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
    }
  }, []);

  return { execute, data, isLoading, error };
}

export function useGetUserWithToken() {
  const { setUser } = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AuthUser | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<AuthUser>('/user/me');

      setData(response.data);
      setUser(response.data);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
    }
  }, []);

  return { execute, data, isLoading, error };
}
