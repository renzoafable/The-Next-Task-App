import format from 'date-fns/format';

import { useAppState } from 'context/AppContext';
import parseISO from 'date-fns/parseISO';
import isSameDay from 'date-fns/isSameDay';

export default function DateStats() {
  const {
    tasks: { incomplete },
  } = useAppState();
  const currentDate = new Date();
  const tasksTodayCount = incomplete.reduce((count, task) => {
    const taskDate = parseISO(task.date);
    const areDatesEqual = isSameDay(currentDate, taskDate);
    return areDatesEqual ? count + 1 : count;
  }, 0);
  const tasksOverdueCount = incomplete.length - tasksTodayCount;

  return (
    <div>
      <p className="text-white mb-0 fw-bolder">
        {format(currentDate, 'EEE, LLL dd, yyyy')}
      </p>
      <span className="text-info mb-0 fs-6">{`${tasksTodayCount} Tasks Today`}</span>
      <span className="text-white mb-0 fs-6"> / </span>
      <span className="text-danger mb-0 fs-6">{`${tasksOverdueCount} Tasks Overdue`}</span>
    </div>
  );
}
