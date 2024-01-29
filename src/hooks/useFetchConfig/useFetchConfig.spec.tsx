import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { useFetchConfig } from 'hooks/useFetchConfig/useFetchConfig';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach, beforeAll, describe, expect, test } from 'vitest';

const handlers = [
  http.get('/config.json', () => {
    return HttpResponse.json([{ id: '1', type: 'default', label: 'foo', children: [] }]);
  }),
];

const server = setupServer(...handlers);

afterEach(() => cleanup());
beforeAll(() => server.listen());

const TestComponent = () => {
  const { tree, error, isLoading } = useFetchConfig('/config.json');
  return (
    <>
      {isLoading && <p>loading...</p>}
      {error && <p>error</p>}
      {tree && <p>data</p>}
      <ul>
        {tree
          ? Object.values(tree).map((item) => (
              <li key={item.id}>
                data id: {item.id} - {item.hidden ? 'hidden' : 'visible'}
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

describe('useFetchConfig', async () => {
  test('initially isLoading, error, and data are undefined', () => {
    render(<TestComponent />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument();
  });
  test('parses the config into a DecisionTree', async () => {
    render(<TestComponent />);
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument();
    await waitFor(() => screen.queryByText(/data/i));
    expect(screen.queryByText(/data id: 1/i)).toBeInTheDocument();
  });
  test('sets the first node in the array to visible and the rest to hidden', async () => {
    server.use(
      http.get('/config.json', () => {
        return HttpResponse.json([
          { id: '1', type: 'default', label: 'foo', children: [] },
          { id: '2', type: 'default', label: 'bar', children: [] },
          { id: '3', type: 'BoolNode', label: 'bool', children: [] },
        ]);
      })
    );
    render(<TestComponent />);
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument();
    await waitFor(() => screen.queryByText(/data/i));
    expect(screen.queryByText('data id: 1 - visible')).toBeInTheDocument();
    expect(screen.queryByText('data id: 2 - hidden')).toBeInTheDocument();
    expect(screen.queryByText('data id: 3 - hidden')).toBeInTheDocument();
  });
});
