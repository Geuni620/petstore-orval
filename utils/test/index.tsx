// import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as RtlRender } from '@testing-library/react';
import { ReactElement } from 'react';

const generateQueryClient = () => {
  return new QueryClient();
};

export const customRender = (ui: ReactElement, client?: QueryClient) => {
  const queryClient = client ?? generateQueryClient();

  return RtlRender(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

export * from '@testing-library/react';
export { customRender as render };
