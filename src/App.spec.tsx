import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

const handlers = [
  http.get('/default.json', async () => {
    return HttpResponse.json([
      {
        id: '1',
        type: 'default',
        data: {
          label: 'I like turtles',
          children: ['2'],
        },
      },
    ]);
  }),
];

const server = setupServer(...handlers);

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('App', () => {
  it('shows a spinner while waiting for config', () => {
    server.use(
      http.get('/default.json', async () => {
        await delay(100);
        return HttpResponse.json([
          {
            id: '1',
            type: 'default',
            data: {
              label: 'I like turtles',
              children: ['2'],
            },
          },
        ]);
      })
    );
    render(<App />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('renders a title if provided', async () => {
    const title = 'Zee bananas';
    vi.stubEnv('VITE_APP_TITLE', title);
    render(<App />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('defaults title to "The Manifest Game"', async () => {
    render(<App />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByText('The Manifest Game')).toBeInTheDocument();
  });
  it('Throws an error if there is an error fetching the config', async () => {
    // ToDo - implement this test
    expect(true).toBe(true);
  });
  it('minimap is visible by default', async () => {
    render(<App />);
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    expect(screen.getByTestId(/minimap/i)).toBeInTheDocument();
  });
});
