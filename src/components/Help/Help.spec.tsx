import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Help } from 'components/Help/Help';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import useTreeStore from 'store';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

const handlers = [
  http.get('/help/:nodeId.json', (info) => {
    const nodeId = info.params.nodeId;

    return HttpResponse.json({
      nodes: [
        {
          type: 'text',
          content: `Help Text ${nodeId}`,
        },
      ],
    });
  }),
];

const server = setupServer(...handlers);

afterEach(() => {
  cleanup();
  server.resetHandlers(...handlers);
});
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Help', () => {
  test('renders error message when help content ID is undefined', () => {
    render(<Help />);
    expect(screen.getByText(/problem/i)).toBeInTheDocument();
  });
  test('renders loader while fetching content', () => {
    server.use(
      http.get('/help/:nodeId.json', async (info) => {
        const nodeId = info.params.nodeId;
        await delay(1000);

        return HttpResponse.json({
          nodes: [
            {
              type: 'text',
              content: `Help Text ${nodeId}`,
            },
          ],
        });
      })
    );
    const helpContentId = 'root';
    useTreeStore.setState({ isOpen: true, helpContentId });
    render(<Help />);
    expect(screen.getByTestId(/helpSpinner/i)).toBeInTheDocument();
  });
  test('renders loader while fetching content', () => {
    server.use(
      http.get('/help/:nodeId.json', async (info) => {
        const nodeId = info.params.nodeId;
        await delay(1000);

        return HttpResponse.json({
          nodes: [
            {
              type: 'text',
              content: `Help Text ${nodeId}`,
            },
          ],
        });
      })
    );
    const helpContentId = 'root';
    useTreeStore.setState({ isOpen: true, helpContentId });
    render(<Help />);
    expect(screen.getByTestId(/helpSpinner/i)).toBeInTheDocument();
  });
});
