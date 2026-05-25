import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AppProviders } from '@/app/providers';
import { ErrorBoundary } from '@/shared/components/';

import App from './App.tsx';
import '@/shared/styles/main.css';

const basename = import.meta.env.VITE_BASE_PATH || '/';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <AppProviders>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </AppProviders>
  </ErrorBoundary>
);
