import { Placeholder } from 'react-bootstrap';

type SkeletonLoaderProps = {
  levels?: number;
};

export default function SkeletonLoader(props: SkeletonLoaderProps) {
  const { levels = 1 } = props;

  const loader = (
    <>
      {Array(levels)
        .fill(1)
        .map(() => (
          <Placeholder as="p" animation="glow" key={Date.now() * Math.random()}>
            <Placeholder xs={12} bg="light" />
          </Placeholder>
        ))}
    </>
  );

  return loader;
}
