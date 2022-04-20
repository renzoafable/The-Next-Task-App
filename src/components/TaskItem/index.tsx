import clsx from 'classnames';
import { Trash2 as TrashIcon } from 'react-feather';
import { format, parseISO } from 'date-fns';
import { Spinner } from 'react-bootstrap';

import { useDeleteTask, useUpdateTask } from 'src/hooks/useTaskApi';

const rootClasses = [
  'task-item',
  'card',
  'bg-transparent',
  'border-light',
  'd-flex',
  'flex-row',
  'justify-content-center',
  'align-items-center',
];

const titleClasses = ['card-title', 'text-light', 'mb-0'];

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { createdAt, completed, _id, description } = task;

  const { execute: executeDeleteTask, isLoading: isDeleting } = useDeleteTask();
  const { execute: executeUpdateTask, isLoading: isUpdating } = useUpdateTask();

  const parsedDate = parseISO(createdAt);
  const dateString = format(parsedDate, 'EEE, LLL dd, yyyy');

  const onClickCheckbox = () => {
    if (completed) {
      executeUpdateTask(_id, { completed: false });
    } else {
      executeUpdateTask(_id, { completed: true });
    }
  };

  const onClickDelete = () => {
    executeDeleteTask(_id);
  };

  return (
    <div className={clsx(...rootClasses)}>
      {isUpdating ? (
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
          disabled={isUpdating || isDeleting}
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
        <p className="card-subtitle text-muted mb-0">{dateString}</p>
      </div>
      {isDeleting ? (
        <Spinner animation="border" variant="light" size="sm" />
      ) : (
        <TrashIcon
          className="delete-button"
          size={20}
          color="#dc3545"
          onClick={onClickDelete}
        />
      )}
    </div>
  );
}
