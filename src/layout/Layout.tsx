import React from 'react';
import Container from 'react-bootstrap/Container';

import Header from 'src/components/Header';
import TaskInput from 'src/components/TaskInput';
import { useAppState } from 'src/context/AppContext';

type AppContainerProps = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  const { user } = useAppState();

  const authenticatedContent = user ? (
    <>
      <Header />
      <TaskInput />
    </>
  ) : null;

  return (
    <Container
      fluid="md"
      className="shadow-lg h-75 w-50 rounded-2 p-4 overflow-auto position-relative"
    >
      {authenticatedContent}
      {children}
    </Container>
  );
}
