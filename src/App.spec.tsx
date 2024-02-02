import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

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

afterEach(() => cleanup());
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('App', () => {
  it('shows a spinner while waiting for config', () => {
    server.use(
      http.get('/default.json', async () => {
        await delay(1000);
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
  it('will retrieve default.json upon loading', async () => {
    const myNodeId = 'foo';
    server.use(
      http.get('/default.json', async () => {
        await delay(10);
        return HttpResponse.json([
          {
            id: myNodeId,
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
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('error')).not.toBeInTheDocument());
    expect(screen.queryByTestId(`node-${myNodeId}`)).toBeInTheDocument();
  }, 1000); // timeout in ms
});
