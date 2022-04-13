import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import formatISO from 'date-fns/formatISO';

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const LOAD_TASKS = 'LOAD_TASKS';
const CHECK_TASK = 'CHECK_TASK';
const UNCHECK_TASK = 'UNCHECK_TASK';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  tasks: {
    complete: [],
    incomplete: [],
    all: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK: {
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

    case DELETE_TASK: {
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

    case LOAD_TASKS: {
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

    case CHECK_TASK: {
      const checkedTask = action.payload;
      const { tasks } = state;
      const { complete, incomplete } = tasks;

      return {
        ...state,
        tasks: {
          ...tasks,
          complete: [...complete, checkedTask],
          incomplete: incomplete.filter((task) => task.id !== checkedTask.id),
        },
      };
    }

    case UNCHECK_TASK: {
      const uncheckedTask = action.payload;
      const { tasks } = state;
      const { complete, incomplete } = tasks;

      return {
        ...state,
        tasks: {
          ...tasks,
          incomplete: [...incomplete, uncheckedTask],
          complete: complete.filter((task) => task.id !== uncheckedTask.id),
        },
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = useCallback(
    (task) =>
      dispatch({
        type: ADD_TASK,
        payload: {
          id: 100 * (Math.random() + Math.random()),
          title: task,
          date: formatISO(new Date(), { representation: 'date' }),
          complete: false,
        },
      }),
    []
  );

  const deleteTask = useCallback(
    (taskId) => dispatch({ type: DELETE_TASK, payload: taskId }),
    []
  );

  const loadTasks = useCallback(
    (tasks) => dispatch({ type: LOAD_TASKS, payload: tasks }),
    []
  );

  const checkTask = useCallback(
    (task) => dispatch({ type: CHECK_TASK, payload: task }),
    []
  );

  const uncheckTask = useCallback(
    (task) => dispatch({ type: UNCHECK_TASK, payload: task }),
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
