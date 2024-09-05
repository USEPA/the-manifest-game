import { ErrorBoundary, ErrorMsg } from 'components/Error';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import App from './App';
import 'reactflow/dist/style.css';
import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '*',
      element: <Navigate to={'/'} replace />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMsg />}>
      <ReactFlowProvider>
        <RouterProvider router={router} />
      </ReactFlowProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
