'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface ProviderProps extends React.PropsWithChildren {
  session?: Session;
}

const Provider = ({ children, session }: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;