/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import 'src/styles/globals.scss';
import { AppProvider } from 'src/context/AppContext';
import Container from 'src/layout/Layout';
import { AppProps } from 'next/app';

export default function TaskApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}
