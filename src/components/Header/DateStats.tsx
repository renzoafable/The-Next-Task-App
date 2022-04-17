import format from 'date-fns/format';

import { useAppState } from 'src/context/AppContext';
import parseISO from 'date-fns/parseISO';
import isSameDay from 'date-fns/isSameDay';
import { Placeholder } from 'react-bootstrap';

export default function DateStats() {
  const { tasks, isLoadingTasks } = useAppState();
  const { incomplete } = tasks;
  const currentDate = new Date();
  const tasksTodayCount = incomplete.reduce((count: number, task: Task) => {
    const taskDate = parseISO(task.createdAt);
    const areDatesEqual = isSameDay(currentDate, taskDate);
    return areDatesEqual ? count + 1 : count;
  }, 0);
  const tasksOverdueCount = incomplete.length - tasksTodayCount;

  const stats = isLoadingTasks ? (
    <Placeholder as="p" animation="glow" classNa>
      <Placeholder xs={12} bg="light" />
    </Placeholder>
  ) : (
    <>
      <span className="text-info mb-0 fs-6">{`${tasksTodayCount} Tasks Today`}</span>
      <span className="text-white mb-0 fs-6"> / </span>
      <span className="text-danger mb-0 fs-6">{`${tasksOverdueCount} Tasks Overdue`}</span>
    </>
  );

  return (
    <div>
      <p className="text-white mb-0 fw-bolder">
        {format(currentDate, 'EEE, LLL dd, yyyy')}
      </p>
      {stats}
    </div>
  );
}
