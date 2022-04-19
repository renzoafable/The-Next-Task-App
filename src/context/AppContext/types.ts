export type AppStateContext = {
  isLoadingTasks: boolean;
  tasks: {
    complete: Task[];
    incomplete: Task[];
    all: Task[];
    byId: Record<string, Task>;
  };
};

export type AppDispatchContext = {
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  startLoadingTasks: () => void;
  loadTasks: (tasks: Task[]) => void;
  finishLoadingTasks: () => void;
  updateTask: (id: number, updatedTask: Task) => void;
};

export enum ACTION_TYPES {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  START_LOAD_TASKS = 'START_LOAD_TASKS',
  LOAD_TASKS = 'LOAD_TASKS',
  FINISH_LOAD_TASKS = 'FINISH_LOAD_TASKS',
  UPDATE_TASK = 'UPDATE_TASK',
}

export type AddTaskAction = {
  type: ACTION_TYPES.ADD_TASK;
  payload: Task;
};

export type DeleteTaskAction = {
  type: ACTION_TYPES.DELETE_TASK;
  payload: number;
};

export type StartLoadTaskAction = {
  type: ACTION_TYPES.START_LOAD_TASKS;
};

export type LoadTaskAction = {
  type: ACTION_TYPES.LOAD_TASKS;
  payload: Task[];
};

export type FinishLoadTaskAction = {
  type: ACTION_TYPES.FINISH_LOAD_TASKS;
};

export type UpdateTaskAction = {
  type: ACTION_TYPES.UPDATE_TASK;
  payload: { id: number; task: Task };
};

export type Actions =
  | AddTaskAction
  | DeleteTaskAction
  | LoadTaskAction
  | StartLoadTaskAction
  | FinishLoadTaskAction
  | UpdateTaskAction;
