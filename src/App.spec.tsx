import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

const TestComponent = () => {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
};

const handlers = [
  http.get('/default.json', async () => {
    return HttpResponse.json({
      nodes: [
        {
          id: '1',
          type: 'default',
          data: {
            label: 'I like turtles',
            children: ['2'],
          },
        },
      ],
    });
  }),
];

const server = setupServer(...handlers);

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});
beforeAll(() => server.listen());
afterAll(() => {
  server.close();
  server.resetHandlers();
});

describe('App', () => {
  it('shows a spinner while waiting for config', () => {
    server.use(
      http.get('/default.json', async () => {
        await delay(100);
        return HttpResponse.json({
          nodes: [
            {
              id: '1',
              type: 'default',
              data: {
                label: 'I like turtles',
                children: ['2'],
              },
            },
          ],
        });
      })
    );
    render(<TestComponent />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('renders a title if provided', async () => {
    const title = 'Zee bananas';
    vi.stubEnv('VITE_APP_TITLE', title);
    render(<TestComponent />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('defaults title to "The Manifest Game"', async () => {
    render(<TestComponent />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByText('The Manifest Game')).toBeInTheDocument();
  });
  it('minimap is visible by default', async () => {
    render(<TestComponent />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByTestId(/minimap/i)).toBeInTheDocument();
  });
  it('Throws an error if there is an error fetching the config', async () => {
    server.use(http.get('/default.json', async () => HttpResponse.error()));
    render(<TestComponent />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});
