import { createContext, useReducer, useContext, useCallback } from 'react'
import { formatISO } from 'date-fns'

const ADD_TASK = 'ADD_TASK'
const DELETE_TASK = 'DELETE_TASK'
const LOAD_TASKS = 'LOAD_TASKS'

const AppStateContext = createContext()
const AppDispatchContext = createContext()

const initialState = {
  tasks: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }

    case LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addTask = useCallback(task => dispatch({
    type: ADD_TASK,
    payload: {
      id: 100 * (Math.random() + Math.random()),
      title: task,
      date: formatISO(new Date(), { representation: 'date' }),
      complete: false
    }
  }), [])

  const deleteTask = useCallback(taskId => dispatch({ type: DELETE_TASK, payload: taskId }), [])

  const loadTasks = useCallback(tasks => dispatch({ type: LOAD_TASKS, payload: tasks }), [])

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={{ addTask, deleteTask, loadTasks }}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider')
  }
  return context
}

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider')
  }
  return context
}
