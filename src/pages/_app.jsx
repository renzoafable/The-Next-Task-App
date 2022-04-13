/* eslint-disable react/jsx-props-no-spreading */
import 'src/styles/globals.scss';
import { AppProvider } from 'src/context/AppContext';
import Container from 'src/layout/Container';

function TaskApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}

export default TaskApp;
