import React from 'react';
import Container from 'react-bootstrap/Container';

import Header from 'src/components/Header';
import TaskInput from 'src/components/TaskInput';
import { useAuthState } from 'src/context/AuthContext';

type AppContainerProps = {
  children: React.ReactNode;
  requiresAuth?: boolean;
};

export default function AppContainer({
  children,
  requiresAuth = false,
}: AppContainerProps) {
  const { user } = useAuthState();
  const shouldDisplayAuthContent = requiresAuth && !!user;

  const authContent = (
    <>
      <Header />
      <TaskInput />
      {children}
    </>
  );

  const displayContent = shouldDisplayAuthContent ? authContent : children;

  return (
    <Container
      fluid="md"
      className="shadow-lg h-75 w-50 rounded-2 p-4 overflow-auto position-relative"
    >
      {displayContent}
    </Container>
  );
}
