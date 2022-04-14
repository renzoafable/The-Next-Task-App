interface ITask {
  id: number;
  title: string;
  date: string;
  complete: boolean;
}

enum ACTION_TYPES {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  LOAD_TASKS = 'LOAD_TASKS',
  CHECK_TASK = 'CHECK_TASK',
  UNCHECK_TASK = 'UNCHECK_TASK',
}

interface AddTaskAction {
  type: ACTION_TYPES.ADD_TASK;
  payload: ITask;
}

interface DeleteTaskAction {
  type: ACTION_TYPES.DELETE_TASK;
  payload: number;
}

interface LoadTaskAction {
  type: ACTION_TYPES.LOAD_TASKS;
  payload: ITask[];
}

interface CheckTaskAction {
  type: ACTION_TYPES.CHECK_TASK;
  payload: number;
}

interface UncheckTaskAction {
  type: ACTION_TYPES.UNCHECK_TASK;
  payload: number;
}

type ACTIONS =
  | AddTaskAction
  | DeleteTaskAction
  | LoadTaskAction
  | CheckTaskAction
  | UncheckTaskAction;

interface IAppStateTasks {
  complete: ITask[];
  incomplete: ITask[];
  all: ITask[];
}

interface IAppState {
  tasks: IAppStateTasks;
}

interface IAppDispatchContext {
  addTask: (task: ITask) => void;
  deleteTask: (taskId: number) => void;
  loadTasks: (tasks: ITask[]) => void;
  checkTask: (taskId: number) => void;
  uncheckTask: (taskId: number) => void;
}
