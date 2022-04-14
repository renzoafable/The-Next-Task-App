import clsx from 'classnames';
import { Trash2 as TrashIcon } from 'react-feather';
import { format, parseISO } from 'date-fns';

import { useDeleteTask, useCheckTask, useUncheckTask } from 'src/hooks/useApi';

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

export default function Task({ id, complete, title, date }: ITask) {
  const { execute: executeDeleteTask } = useDeleteTask();
  const { execute: executeCheckTask } = useCheckTask();
  const { execute: executeUncheckTask } = useUncheckTask();

  const parsedDate = parseISO(date);
  const dateString = format(parsedDate, 'EEE, LLL dd, yyyy');

  const onClickCheckbox = () => {
    if (complete) {
      executeUncheckTask(id);
    } else {
      executeCheckTask(id);
    }
  };

  const onClickDelete = () => {
    executeDeleteTask(id);
  };

  return (
    <div className={clsx(...rootClasses)}>
      <input
        className="form-check-input mt-0 me-3"
        type="checkbox"
        checked={complete}
        onChange={onClickCheckbox}
      />
      <div className="card-body">
        <p
          className={clsx(...titleClasses, {
            'text-decoration-line-through': complete,
          })}
        >
          {title}
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
