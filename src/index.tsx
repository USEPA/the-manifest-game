import { ErrorBoundary, ErrorMsg } from 'components/Error';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'reactflow/dist/style.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMsg />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
