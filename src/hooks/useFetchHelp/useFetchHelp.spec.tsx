import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { useFetchHelp } from 'hooks/useFetchHelp/useFetchHelp';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
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

interface TestComponentProps {
  nodeId?: string;
}

const TestComponent = (props: TestComponentProps) => {
  const { help, error, isLoading } = useFetchHelp(props.nodeId ?? 'root');
  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>error</p>}
      {help && <p>help</p>}
    </>
  );
};

describe('useFetchHelp', async () => {
  test('error, help are initially falsy', () => {
    render(<TestComponent />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/help/i)).not.toBeInTheDocument();
  });
  test('returns an error upon network errors', async () => {
    const nodeId = 'bad-error';
    server.use(
      http.get('/help/*', () => {
        return HttpResponse.error();
      })
    );
    render(<TestComponent nodeId={nodeId} />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.queryByText(/error/i)).toBeInTheDocument();
  });
  test('returns help object on success', async () => {
    render(<TestComponent />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.queryByText(/help/i)).toBeInTheDocument();
  });
});
