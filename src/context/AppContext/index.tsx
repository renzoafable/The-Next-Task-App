import React, { useReducer, useMemo, Reducer } from 'react';

import createCtx from 'src/helpers/context';
import {
  handleAddTask,
  handleDeleteTask,
  handleFinishLoadingTasks,
  handleLoadTasks,
  handleStartLoadingTasks,
  handleUpdateTask,
} from './cases';
import {
  AppDispatchContext,
  AppStateContext,
  Actions,
  ACTION_TYPES,
} from './types';

const [useAppState, AppStateProvider] = createCtx<AppStateContext>();
const [useAppDispatch, AppDispatchProvider] = createCtx<AppDispatchContext>();

const initialState: AppStateContext = {
  isLoadingTasks: false,
  tasks: {
    complete: [],
    incomplete: [],
    all: [],
    byId: {},
  },
};

const reducer: Reducer<AppStateContext, Actions> = (
  state,
  action
): AppStateContext => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK: {
      return handleAddTask(state, action);
    }

    case ACTION_TYPES.DELETE_TASK: {
      return handleDeleteTask(state, action);
    }

    case ACTION_TYPES.START_LOAD_TASKS: {
      return handleStartLoadingTasks(state, action);
    }

    case ACTION_TYPES.LOAD_TASKS: {
      return handleLoadTasks(state, action);
    }

    case ACTION_TYPES.FINISH_LOAD_TASKS: {
      return handleFinishLoadingTasks(state, action);
    }

    case ACTION_TYPES.UPDATE_TASK: {
      return handleUpdateTask(state, action);
    }

    default:
      return state;
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = (task: Task) => {
    dispatch({ type: ACTION_TYPES.ADD_TASK, payload: task });
  };

  const deleteTask = (taskId: number) => {
    dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: taskId });
  };

  const startLoadingTasks = () => {
    dispatch({ type: ACTION_TYPES.START_LOAD_TASKS });
  };

  const loadTasks = (tasks: Task[]) => {
    dispatch({ type: ACTION_TYPES.LOAD_TASKS, payload: tasks });
  };

  const finishLoadingTasks = () => {
    dispatch({ type: ACTION_TYPES.FINISH_LOAD_TASKS });
  };

  const updateTask = (id: number, updatedTask: Task) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK,
      payload: { id, task: updatedTask },
    });
  };

  const actions = useMemo(
    () => ({
      addTask,
      deleteTask,
      startLoadingTasks,
      loadTasks,
      finishLoadingTasks,
      updateTask,
    }),
    []
  );

  return (
    <AppStateProvider value={state}>
      <AppDispatchProvider value={actions}>{children}</AppDispatchProvider>
    </AppStateProvider>
  );
}

export { useAppState, useAppDispatch };
