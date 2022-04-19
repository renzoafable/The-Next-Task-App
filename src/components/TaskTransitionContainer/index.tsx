import { useRef } from 'react';
import CSSTransition, {
  CSSTransitionProps,
} from 'react-transition-group/CSSTransition';

import TaskItem from 'src/components/TaskItem';

type TransitionContainerProps = CSSTransitionProps & {
  task: Task;
};

export default function TaskTransitionContainer({
  task,
  ...props
}: TransitionContainerProps) {
  const nodeRef = useRef(null);

  return (
    <CSSTransition nodeRef={nodeRef} {...props}>
      <div ref={nodeRef}>
        <TaskItem task={task} />
      </div>
    </CSSTransition>
  );
}
