import { useState } from 'react'
import clsx from 'classnames'
import { Trash2 as TrashIcon } from 'react-feather'
import { format, isSameDay, parseISO } from 'date-fns';

import { useAppDispatch } from 'context/AppContext'

const rootClasses = [
  'task',
  'card',
  'bg-transparent',
  'border-light',
  'd-flex',
  'flex-row',
  'justify-content-center',
  'align-items-center',
]

const titleClasses = ['card-title', 'fs-6', 'text-light', 'mb-0'];

export default function Task({ id, complete, title, date }) {
  const [isComplete, setIsComplete] = useState(complete)
  const { deleteTask } = useAppDispatch()
  const parsedDate = parseISO(date)
  const isParsedDateToday = isSameDay(parsedDate, new Date())
  const dateString = isParsedDateToday ? 'Today' : format(parsedDate, 'EEE, LLL dd, yyyy')

  const onClickCheckbox = () => {
    setIsComplete(!isComplete)
  }

  const onClickDelete = () => {
    deleteTask(id)
  }

  return (
    <div className={clsx(...rootClasses)}>
      <input
        className='form-check-input mt-0 me-3'
        type='checkbox'
        checked={isComplete}
        onChange={onClickCheckbox}
      />
      <div className='card-body'>
        <p
          className={clsx(...titleClasses, {
            'text-decoration-line-through': isComplete
          })}
        >
          {title}
        </p>
        <p className='card-subtitle fs-6 text-muted mb-0'>{dateString}</p>
      </div>
      <TrashIcon className='delete-button' size={20} color='#dc3545' onClick={onClickDelete} />
    </div>
  );
}