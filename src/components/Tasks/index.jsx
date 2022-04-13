import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import clsx from 'classnames';

import Task from 'src/components/Task';

const organizeTasksByDay = (tasks) => {
  return tasks.reduce((map, task) => {
    const dayOfTask = formatISO(parseISO(task.date), {
      representation: 'date',
    });

    if (dayOfTask in map) map[dayOfTask].push(task);
    else map[dayOfTask] = [task];

    return map;
  }, {});
};

export default function Tasks({ tasks }) {
  const tasksByDay = organizeTasksByDay(tasks);

  return (
    <>
      {Object.keys(tasksByDay)
        .sort((a, b) => parseISO(b) - parseISO(a))
        .map((day) => {
          const taskDate = parseISO(day);
          const isDateToday = isSameDay(taskDate, new Date());
          const dateString = isDateToday
            ? 'Today'
            : format(taskDate, 'EEE, LLL dd, yyyy');

          return (
            <div className="tasks" key={day}>
              <p
                className={clsx(
                  'fs-5',
                  'mb-2',
                  isDateToday ? 'text-info' : 'text-danger'
                )}
              >
                {dateString}
              </p>
              {tasksByDay[day].map(({ id, complete, title, date }) => (
                <Task
                  key={id}
                  id={id}
                  complete={complete}
                  title={title}
                  date={date}
                />
              ))}
            </div>
          );
        })}
    </>
  );
}
