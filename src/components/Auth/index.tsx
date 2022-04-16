import { useState } from 'react';
import { Placeholder } from 'react-bootstrap';

type AuthProps = {
  children: JSX.Element;
};

export default function Auth({ children }: AuthProps) {
  const [isLoading] = useState(true);

  if (isLoading) {
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

  return children;
}
