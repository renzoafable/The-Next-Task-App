/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppProps } from 'next/app';

import 'src/styles/globals.scss';
import { AuthProvider } from 'src/context/AuthContext';
import { AppProvider } from 'src/context/AppContext';
import Layout from 'src/layout/Layout';

export default function TaskApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Layout requiresAuth={pageProps.requiresAuth}>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </AuthProvider>
  );
}
