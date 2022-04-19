/* eslint-disable no-console */
import { useCallback, useState } from 'react';

import { isErrorWithMessage } from 'src/helpers/error';
import { useAppDispatch } from 'src/context/AppContext';
import useAxiosPrivate from './useAxiosPrivate';

type UpdatableTaskProps = {
  completed?: boolean;
  description?: string;
};

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
  const { updateTask, deleteTask } = useAppDispatch();
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
      if (
        isErrorWithMessage(err) &&
        err.response.data.message === 'No task found'
      ) {
        // This catches instances where a user is trying to delete a task that no longer exists e.g. has been deleted from another session.
        deleteTask(id);
      }

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
  const { loadTasks, startLoadingTasks, finishLoadingTasks } = useAppDispatch();
  const [data, setData] = useState<GetTasksResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = async (queryParams: QueryParams = {}) => {
    try {
      startLoadingTasks();

      const response = await axiosPrivate.get<GetTasksResponse>('/task', {
        params: queryParams,
      });

      setData(response.data);
      loadTasks(response.data.data);
      finishLoadingTasks();
    } catch (err: unknown) {
      setError(err);
      finishLoadingTasks();
    }
  };

  return { data, error, execute: useCallback(execute, []) };
}

export function useDeleteTask() {
  type DeleteTaskResponse = {
    success: boolean;
    data?: Record<string, unknown>;
  };

  const { axiosPrivate } = useAxiosPrivate();
  const { deleteTask } = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DeleteTaskResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const execute = async (taskId: number) => {
    setIsLoading(true);

    try {
      const response = await axiosPrivate.delete<DeleteTaskResponse>(
        `/task/${taskId}`
      );

      if (response.data.success) deleteTask(taskId);
      setData(response.data);
      setIsLoading(false);
    } catch (err: unknown) {
      if (
        isErrorWithMessage(err) &&
        err.response.data.message === 'No task found'
      ) {
        // This catches instances where a user is trying to delete a task that no longer exists e.g. has been deleted from another session.
        deleteTask(taskId);
      }

      setError(err);
      setIsLoading(false);
    }
  };

  return { data, error, execute: useCallback(execute, []), isLoading };
}
