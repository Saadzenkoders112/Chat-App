'use client';

import React from 'react';
import ReactQueryProvider from './react-query-provider';
import { ToasterProvider } from './toaster-provider';
import { SocketProvider } from './socket-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <SocketProvider>
        {/* <ReduxProvider> */}
        {/* <HigherOrderComponent> */}
        <ToasterProvider />
        {children}
        {/* </HigherOrderComponent> */}
        {/* </ReduxProvider> */}
      </SocketProvider>
    </ReactQueryProvider>
  );
};
