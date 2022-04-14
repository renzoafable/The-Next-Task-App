import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useAddTask } from 'src/hooks/useApi';

export default function TaskInput() {
  const { execute } = useAddTask();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [task, setTask] = React.useState('');

  React.useEffect(() => {
    inputRef.current?.focus();
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    execute(task);
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
        />
      </div>
      <div className="col-2 g-0">
        <Button
          variant="info"
          className="text-white"
          type="submit"
          disabled={!task.length}
        >
          Add Task
        </Button>
      </div>
    </Form>
  );
}
