import clsx from 'classnames';
import { Trash2 as TrashIcon } from 'react-feather';
import { format, parseISO } from 'date-fns';

import { useDeleteTask, useUpdateTask } from 'src/hooks/useTaskApi';
import { Spinner } from 'react-bootstrap';

const rootClasses = [
  'task',
  'card',
  'bg-transparent',
  'border-light',
  'd-flex',
  'flex-row',
  'justify-content-center',
  'align-items-center',
];

const titleClasses = ['card-title', 'fs-6', 'text-light', 'mb-0'];

export default function Task({
  _id,
  completed,
  description,
  createdAt,
}: Pick<Task, '_id' | 'completed' | 'description' | 'createdAt'>) {
  const { execute: executeDeleteTask } = useDeleteTask();
  const { execute, isLoading } = useUpdateTask();

  const parsedDate = parseISO(createdAt);
  const dateString = format(parsedDate, 'EEE, LLL dd, yyyy');

  const onClickCheckbox = () => {
    if (completed) {
      execute(_id, { completed: false });
    } else {
      execute(_id, { completed: true });
    }
  };

  const onClickDelete = () => {
    executeDeleteTask(_id);
  };

  return (
    <div className={clsx(...rootClasses)}>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="light"
          size="sm"
          className="me-3"
        />
      ) : (
        <input
          className="form-check-input mt-0 me-3"
          type="checkbox"
          checked={completed}
          onChange={onClickCheckbox}
          disabled={isLoading}
        />
      )}
      <div className="card-body">
        <p
          className={clsx(...titleClasses, {
            'text-decoration-line-through': completed,
          })}
        >
          {description}
        </p>
        <p className="card-subtitle fs-6 text-muted mb-0">{dateString}</p>
      </div>
      <TrashIcon
        className="delete-button"
        size={20}
        color="#dc3545"
        onClick={onClickDelete}
      />
    </div>
  );
}
