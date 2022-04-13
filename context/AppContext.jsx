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

  const actions = useMemo(() => ({ addTask, deleteTask, loadTasks }), []);

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
