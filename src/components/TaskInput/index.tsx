import React from 'react';
import Form from 'react-bootstrap/Form';

import { useAppState } from 'src/context/AppContext';
import { useAddTask } from 'src/hooks/useTaskApi';
import SpinnerButton from '../SpinnerButton';

export default function TaskInput() {
  const { isLoadingTasks } = useAppState();
  const { execute, isLoading } = useAddTask();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [task, setTask] = React.useState('');

  React.useEffect(() => {
    inputRef.current?.focus();
  });

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await execute(task);
    setTask('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <Form className="row my-3" onSubmit={onSubmit} autoComplete="off">
      <div className="col-5">
        <Form.Label htmlFor="inputTodoName" className="visually-hidden">
          Task Name
        </Form.Label>
        <Form.Control
          ref={(element: HTMLInputElement) => {
            inputRef.current = element;
          }}
          id="inputTodoName"
          type="text"
          placeholder="Add a task"
          onChange={onChange}
          value={task}
          disabled={isLoadingTasks}
        />
      </div>
      <div className="col-2 g-0">
        <SpinnerButton
          variant="info"
          className="text-white"
          type="submit"
          disabled={!task.length || isLoading}
          isLoading={isLoading}
        >
          Add Task
        </SpinnerButton>
      </div>
    </Form>
  );
}
