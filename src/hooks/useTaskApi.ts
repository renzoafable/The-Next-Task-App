/* eslint-disable no-console */
import { useCallback, useState } from 'react';

import { useAppDispatch, useAppState } from 'src/context/AppContext';
import useAxiosPrivate from './useAxiosPrivate';

export function useAddTask() {
  type AddTaskResponse = {
    success: boolean;
    data: Task;
  };

  const { axiosPrivate } = useAxiosPrivate();
  const { addTask } = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AddTaskResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = async (task: string) => {
    setIsLoading(true);

    const taskPayload = { description: task };

    try {
      const response = await axiosPrivate.post<AddTaskResponse>(
        '/task',
        taskPayload
      );

      if (response.data.success) addTask(response.data.data);
      setData(response.data);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}

export function useUpdateTask() {
  type UpdateTaskResponse = {
    success: boolean;
    data: Task;
  };

  const { axiosPrivate } = useAxiosPrivate();
  const { updateTask } = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UpdateTaskResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = async (id: number, updates: UpdatableTaskProps) => {
    setIsLoading(true);

    try {
      const response = await axiosPrivate.put<UpdateTaskResponse>(
        `/task/${id}`,
        updates
      );

      if (response.data.success) updateTask(id, response.data.data);
      setData(response.data);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}

export function useLoadTasks() {
  type QueryParams = {
    completed?: boolean;
    limit?: number;
    skip?: number;
  };

  type GetTasksResponse = {
    count: number;
    data: Task[];
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
      setIsLoading(false);
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
      const updatedTasks = all.filter((task: Task) => task._id !== taskId);
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
      const taskIndex = tasks.findIndex((task) => task._id === taskId);
      tasks[taskIndex].completed = true;
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
      const taskIndex = tasks.findIndex((task) => task._id === taskId);
      tasks[taskIndex].completed = false;
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
