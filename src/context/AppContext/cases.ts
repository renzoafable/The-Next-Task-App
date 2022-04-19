import { Reducer } from 'react';
import {
  AddTaskAction,
  AppStateContext,
  DeleteTaskAction,
  FinishLoadTaskAction,
  LoadTaskAction,
  StartLoadTaskAction,
  UpdateTaskAction,
} from './types';

export const handleAddTask: Reducer<AppStateContext, AddTaskAction> = (
  state,
  action
) => {
  const { tasks } = state;
  const { incomplete, all, byId } = tasks;

  const task = action.payload;

  // Initially add task as incomplete
  const updatedIncompleteTasks = [...incomplete, task];
  // Add the task to the ID-task mapping
  const updatedByIdTasks = { ...byId, [task._id]: task };
  // Add the task to the generic task list
  const updatedAllTasks = [...all, task];

  return {
    ...state,
    tasks: {
      ...tasks,
      incomplete: updatedIncompleteTasks,
      byId: updatedByIdTasks,
      all: updatedAllTasks,
    },
  };
};

export const handleDeleteTask: Reducer<AppStateContext, DeleteTaskAction> = (
  state,
  action
) => {
  const { tasks } = state;
  const { all, incomplete, complete, byId } = tasks;

  const byIdCopy = { ...byId };
  // Remove the task from the ID-task mapping
  delete byIdCopy[action.payload];

  // Remove the task from the generic tasks list
  const updatedAllTasks = all.filter((task) => task._id !== action.payload);
  // Remove the task from the incomplete tasks list
  const updatedIncompleteTasks = incomplete.filter(
    (task) => task._id !== action.payload
  );
  // Remove the task from the complete tasks list
  const updatedCompleteTasks = complete.filter(
    (task) => task._id !== action.payload
  );

  return {
    ...state,
    tasks: {
      ...tasks,
      all: updatedAllTasks,
      incomplete: updatedIncompleteTasks,
      complete: updatedCompleteTasks,
      byId: byIdCopy,
    },
  };
};

export const handleStartLoadingTasks: Reducer<
  AppStateContext,
  StartLoadTaskAction
> = (state) => {
  return {
    ...state,
    isLoadingTasks: true,
  };
};

export const handleLoadTasks: Reducer<AppStateContext, LoadTaskAction> = (
  state,
  action
) => {
  const tasks = action.payload;

  // Derive the list of complete tasks
  const complete = tasks.filter((task) => task.completed);
  // Derive the list of incomplete tasks
  const incomplete = tasks.filter((task) => !task.completed);
  // Derive the ID-task mapping
  const byId = tasks.reduce((idMap, task) => {
    idMap[task._id] = task;
    return idMap;
  }, {} as Record<string, Task>);

  return {
    ...state,
    tasks: {
      complete,
      incomplete,
      byId,
      all: tasks,
    },
  };
};

export const handleFinishLoadingTasks: Reducer<
  AppStateContext,
  FinishLoadTaskAction
> = (state) => {
  return {
    ...state,
    isLoadingTasks: false,
  };
};

export const handleUpdateTask: Reducer<AppStateContext, UpdateTaskAction> = (
  state,
  action
) => {
  const { id, task: updatedTask } = action.payload;
  const { tasks } = state;
  const { complete, incomplete, all, byId } = tasks;

  const tasksById = { ...byId };
  let completedTasks: Task[] = [...complete];
  let incompleteTasks: Task[] = [...incomplete];

  let taskToUpdate = all.find((task) => task._id === id);
  if (taskToUpdate) {
    // Update the task in the store
    taskToUpdate = { ...taskToUpdate, ...updatedTask };

    // Currently, the only update we're expecting to tasks are their `completed` property
    // For now, it's safe to enforce a binary logic wherein a task can only be updated from incomplete to complete and vice versa.
    if (taskToUpdate.completed) {
      completedTasks.push(taskToUpdate);
      incompleteTasks = incompleteTasks.filter((task) => task._id !== id);
    } else {
      incompleteTasks.push(taskToUpdate);
      completedTasks = completedTasks.filter((task) => task._id !== id);
    }

    tasksById[id] = { ...tasksById[id], ...updatedTask };
  }

  return {
    ...state,
    tasks: {
      ...tasks,
      complete: completedTasks,
      incomplete: incompleteTasks,
    },
  };
};
