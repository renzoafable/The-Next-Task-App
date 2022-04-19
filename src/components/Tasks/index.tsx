import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import clsx from 'classnames';

import Task from 'src/components/Task';
import { TransitionGroup } from 'react-transition-group';
import TaskTransitionContainer from '../TaskTransitionContainer';

type TasksByDay = {
  [key: string]: Task[];
};

const organizeTasksByDay = (tasks: Task[]): TasksByDay => {
  return tasks.reduce((map: TasksByDay, task) => {
    const dayOfTask = formatISO(parseISO(task.createdAt), {
      representation: 'date',
    });

    if (dayOfTask in map) map[dayOfTask].push(task);
    else map[dayOfTask] = [task];

    return map;
  }, {});
};

type TasksProps = {
  tasks: Task[];
};

export default function Tasks({ tasks }: TasksProps) {
  const tasksByDay = organizeTasksByDay(tasks);

  const content =
    Object.keys(tasksByDay).length > 0 ? (
      <>
        {Object.keys(tasksByDay)
          .sort((a, b) => parseISO(b).valueOf() - parseISO(a).valueOf())
          .map((day) => {
            const taskDate = parseISO(day);
            const isDateToday = isSameDay(taskDate, new Date());
            const dateString = isDateToday
              ? 'Today'
              : format(taskDate, 'EEE, LLL dd, yyyy');

            return (
              <div className="task-list" key={day}>
                <p
                  className={clsx(
                    'fs-5',
                    'mb-2',
                    isDateToday ? 'text-info' : 'text-danger'
                  )}
                >
                  {dateString}
                </p>
                <TransitionGroup
                  className="task-list-transition-group"
                  component={null}
                >
                  {tasksByDay[day].map((task: Task) => (
                    <TaskTransitionContainer
                      key={task._id}
                      timeout={1000}
                      classNames="task-item-transition"
                      task={task}
                    />
                  ))}
                </TransitionGroup>
              </div>
            );
          })}
      </>
    ) : (
      <p className="text-muted text-center">No tasks to display.</p>
    );

  return content;
}
