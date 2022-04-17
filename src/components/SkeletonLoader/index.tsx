import { Placeholder } from 'react-bootstrap';

export default function SkeletonLoader() {
  return (
    <>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} bg="light" />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} bg="light" />
      </Placeholder>
    </>
  );
}
