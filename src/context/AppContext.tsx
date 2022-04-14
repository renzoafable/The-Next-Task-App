import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
  Reducer,
} from 'react';

const AppStateContext = createContext<IAppState>(null!);
const AppDispatchContext = createContext<IAppDispatchContext>(null!);

const initialState: IAppState = {
  tasks: {
    complete: [],
    incomplete: [],
    all: [],
  },
};

const reducer: Reducer<IAppState, ACTIONS> = (state, action): IAppState => {
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
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={actions}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
};
