import React from 'react';
import Container from 'react-bootstrap/Container';

import Auth from 'src/components/Auth';
import Header from 'src/components/Header';
import TaskInput from 'src/components/TaskInput';

type AppContainerProps = {
  children: React.ReactNode;
  requiresAuth?: boolean;
};

export default function AppContainer(props: AppContainerProps) {
  const { children, requiresAuth } = props;

  let content: React.ReactNode;

  if (!requiresAuth) {
    content = children;
  } else {
    content = (
      <Auth>
        <>
          <Header />
          <TaskInput />
          {children}
        </>
      </Auth>
    );
  }

  return (
    <Container fluid="md" className="pt-5">
      {content}
    </Container>
  );
}
