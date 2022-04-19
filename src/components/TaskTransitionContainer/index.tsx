import { useRef } from 'react';
import CSSTransition, {
  CSSTransitionProps,
} from 'react-transition-group/CSSTransition';

import TaskCard from 'src/components/Task';

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
        <TaskCard task={task} />
      </div>
    </CSSTransition>
  );
}
