import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isSameDay from 'date-fns/isSameDay';
import clsx, { Argument, Mapping, Value } from 'classnames';

import { useAppState } from 'src/context/AppContext';
import SkeletonLoader from 'src/components/SkeletonLoader';

type DateStatsProps = {
  className?: Value | Mapping | Argument[];
};

export default function DateStats({ className }: DateStatsProps) {
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
    <SkeletonLoader />
  ) : (
    <>
      <span className="text-info mb-0">{`${tasksTodayCount} Tasks Today`}</span>
      <span className="text-white mb-0"> / </span>
      <span className="text-danger mb-0">{`${tasksOverdueCount} Tasks Overdue`}</span>
    </>
  );

  return (
    <div className={clsx(className)}>
      <p className="text-white text-center text-md-start mb-0 fw-bolder">
        {format(currentDate, 'EEE, LLL dd, yyyy')}
      </p>
      {stats}
    </div>
  );
}
