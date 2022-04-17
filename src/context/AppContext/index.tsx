import React, { useReducer, useMemo, Reducer } from 'react';

import createCtx from 'src/helpers/context';
import { ACTIONS, ACTION_TYPES } from './dispatchActions';

type AppStateTasks = {
  complete: Task[];
  incomplete: Task[];
  all: Task[];
};

type AppStateContext = {
  isLoadingTasks: boolean;
  tasks: AppStateTasks;
};

type AppDispatchContext = {
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  startLoadingTasks: () => void;
  loadTasks: (tasks: Task[]) => void;
  finishLoadingTasks: () => void;
  updateTask: (id: number, updatedTask: Task) => void;
};

const [useAppState, AppStateProvider] = createCtx<AppStateContext>();
const [useAppDispatch, AppDispatchProvider] = createCtx<AppDispatchContext>();

const initialState: AppStateContext = {
  isLoadingTasks: false,
  tasks: {
    complete: [],
    incomplete: [],
    all: [],
  },
};

const reducer: Reducer<AppStateContext, ACTIONS> = (
  state,
  action
): AppStateContext => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK: {
      const { tasks } = state;
      const { incomplete, all } = tasks;

      const task = action.payload;

      return {
        ...state,
        tasks: {
          ...tasks,
          incomplete: [...incomplete, task],
          all: [...all, task],
        },
      };
    }

    case ACTION_TYPES.DELETE_TASK: {
      const { tasks } = state;
      const { all, incomplete, complete } = tasks;

      return {
        ...state,
        tasks: {
          ...tasks,
          all: all.filter((task) => task._id !== action.payload),
          incomplete: incomplete.filter((task) => task._id !== action.payload),
          complete: complete.filter((task) => task._id !== action.payload),
        },
      };
    }

    case ACTION_TYPES.START_LOAD_TASKS: {
      return {
        ...state,
        isLoadingTasks: true,
      };
    }

    case ACTION_TYPES.LOAD_TASKS: {
      const tasks = action.payload;
      const complete = tasks.filter((task) => task.completed);
      const incomplete = tasks.filter((task) => !task.completed);

      return {
        ...state,
        tasks: {
          complete,
          incomplete,
          all: tasks,
        },
      };
    }

    case ACTION_TYPES.FINISH_LOAD_TASKS: {
      return {
        ...state,
        isLoadingTasks: false,
      };
    }

    case ACTION_TYPES.UPDATE_TASK: {
      const { id, task: updatedTask } = action.payload;
      const { tasks } = state;
      const { complete, incomplete, all } = tasks;

      let completedTasks: Task[] = [...complete];
      let incompleteTasks: Task[] = [...incomplete];
      let taskToUpdate = all.find((task) => task._id === id);
      if (taskToUpdate) {
        taskToUpdate = { ...taskToUpdate, ...updatedTask };

        if (taskToUpdate.completed) {
          completedTasks.push(taskToUpdate);
          incompleteTasks = incompleteTasks.filter((task) => task._id !== id);
        } else {
          incompleteTasks.push(taskToUpdate);
          completedTasks = completedTasks.filter((task) => task._id !== id);
        }
      }

      return {
        ...state,
        tasks: {
          ...tasks,
          complete: completedTasks,
          incomplete: incompleteTasks,
        },
      };
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
