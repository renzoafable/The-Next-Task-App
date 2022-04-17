export enum ACTION_TYPES {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  START_LOAD_TASKS = 'START_LOAD_TASKS',
  LOAD_TASKS = 'LOAD_TASKS',
  FINISH_LOAD_TASKS = 'FINISH_LOAD_TASKS',
  UPDATE_TASK = 'UPDATE_TASK',
}

type AddTaskAction = {
  type: ACTION_TYPES.ADD_TASK;
  payload: Task;
};

type DeleteTaskAction = {
  type: ACTION_TYPES.DELETE_TASK;
  payload: number;
};

type StartLoadTaskAction = {
  type: ACTION_TYPES.START_LOAD_TASKS;
};

type LoadTaskAction = {
  type: ACTION_TYPES.LOAD_TASKS;
  payload: Task[];
};

type FinishLoadTaskAction = {
  type: ACTION_TYPES.FINISH_LOAD_TASKS;
};

type UpdateTaskAction = {
  type: ACTION_TYPES.UPDATE_TASK;
  payload: { id: number; task: Task };
};

export type ACTIONS =
  | AddTaskAction
  | DeleteTaskAction
  | LoadTaskAction
  | StartLoadTaskAction
  | FinishLoadTaskAction
  | UpdateTaskAction;
