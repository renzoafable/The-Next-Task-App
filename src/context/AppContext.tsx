import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
  Reducer,
} from 'react';

enum ACTION_TYPES {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  LOAD_TASKS = 'LOAD_TASKS',
  CHECK_TASK = 'CHECK_TASK',
  UNCHECK_TASK = 'UNCHECK_TASK',
}

type AddTaskAction = { type: ACTION_TYPES.ADD_TASK; payload: ITask };
type DeleteTaskAction = { type: ACTION_TYPES.DELETE_TASK; payload: number };
type LoadTaskAction = { type: ACTION_TYPES.LOAD_TASKS; payload: ITask[] };
type CheckTaskAction = { type: ACTION_TYPES.CHECK_TASK; payload: number };
type UncheckTaskAction = { type: ACTION_TYPES.UNCHECK_TASK; payload: number };
type ACTIONS =
  | AddTaskAction
  | DeleteTaskAction
  | LoadTaskAction
  | CheckTaskAction
  | UncheckTaskAction;

type AppStateTasks = {
  complete: ITask[];
  incomplete: ITask[];
  all: ITask[];
};

type AppStateContext = {
  user: AuthUser | null;
  tasks: AppStateTasks;
};

type AppDispatchContext = {
  addTask: (task: ITask) => void;
  deleteTask: (taskId: number) => void;
  loadTasks: (tasks: ITask[]) => void;
  checkTask: (taskId: number) => void;
  uncheckTask: (taskId: number) => void;
};

function createCtx<A>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) {
      throw new Error('useCtx must be used within a Provider with value');
    }
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useAppState, AppStateProvider] = createCtx<AppStateContext>();
const [useAppDispatch, AppDispatchProvider] = createCtx<AppDispatchContext>();

const initialState: AppStateContext = {
  user: null,
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
          all: all.filter((task) => task.id !== action.payload),
          incomplete: incomplete.filter((task) => task.id !== action.payload),
          complete: complete.filter((task) => task.id !== action.payload),
        },
      };
    }

    case ACTION_TYPES.LOAD_TASKS: {
      const tasks = action.payload;
      const complete = tasks.filter((task) => task.complete);
      const incomplete = tasks.filter((task) => !task.complete);

      return {
        ...state,
        tasks: {
          complete,
          incomplete,
          all: tasks,
        },
      };
    }

    case ACTION_TYPES.CHECK_TASK: {
      const taskId = action.payload;
      const { tasks } = state;
      const { complete, incomplete, all } = tasks;

      const completedTasks: ITask[] = [...complete];
      const checkedTask = all.find((task) => task.id === taskId);
      if (checkedTask) {
        checkedTask.complete = true;
        completedTasks.push(checkedTask);
      }

      return {
        ...state,
        tasks: {
          ...tasks,
          complete: completedTasks,
          incomplete: incomplete.filter((task) => task.id !== taskId),
        },
      };
    }

    case ACTION_TYPES.UNCHECK_TASK: {
      const taskId = action.payload;
      const { tasks } = state;
      const { complete, incomplete, all } = tasks;

      const incompleteTasks: ITask[] = [...incomplete];
      const uncheckedTask = all.find((task) => task.id === taskId);
      if (uncheckedTask) {
        uncheckedTask.complete = false;
        incompleteTasks.push(uncheckedTask);
      }

      return {
        ...state,
        tasks: {
          ...tasks,
          incomplete: incompleteTasks,
          complete: complete.filter((task) => task.id !== taskId),
        },
      };
    }

    default:
      return state;
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = useCallback(
    (task: ITask) => dispatch({ type: ACTION_TYPES.ADD_TASK, payload: task }),
    []
  );

  const deleteTask = useCallback(
    (taskId: number) =>
      dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: taskId }),
    []
  );

  const loadTasks = useCallback(
    (tasks: ITask[]) =>
      dispatch({ type: ACTION_TYPES.LOAD_TASKS, payload: tasks }),
    []
  );

  const checkTask = useCallback(
    (taskId: number) =>
      dispatch({ type: ACTION_TYPES.CHECK_TASK, payload: taskId }),
    []
  );

  const uncheckTask = useCallback(
    (taskId: number) =>
      dispatch({ type: ACTION_TYPES.UNCHECK_TASK, payload: taskId }),
    []
  );

  const actions = useMemo(
    () => ({ addTask, deleteTask, loadTasks, checkTask, uncheckTask }),
    []
  );

  return (
    <AppStateProvider value={state}>
      <AppDispatchProvider value={actions}>{children}</AppDispatchProvider>
    </AppStateProvider>
  );
}

export { useAppState, useAppDispatch };
