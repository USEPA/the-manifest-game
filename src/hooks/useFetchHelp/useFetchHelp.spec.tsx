import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useFetchHelp } from 'hooks/useFetchHelp/useFetchHelp';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

const handlers = [
  http.get('/help/$nodeId.json', () => {
    return HttpResponse.json({
      nodes: [
        {
          type: 'text',
          content: 'Help Text',
        },
      ],
    });
  }),
];

const server = setupServer(...handlers);

afterEach(() => cleanup());
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
  test('initially isLoading, error, and data are undefined', () => {
    render(<TestComponent />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/help/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
