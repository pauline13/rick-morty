import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

import { queryClient } from '@/shared/lib';

type QueryProviderProps = {
  children: ReactNode;
};

const isDevMode = import.meta.env.DEV;  

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {isDevMode && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>
);
