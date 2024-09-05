import '@testing-library/jest-dom';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
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
  http.get('/help/:nodeId.html', (info) => {
    const nodeId = info.params.nodeId;

    return HttpResponse.text(`<p>Help Text ${nodeId}</p>`);
  }),
];

const server = setupServer(...handlers);

afterEach(() => {
  cleanup();
  server.resetHandlers(...handlers);
});
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('useFetchHelp', () => {
  test('error, help are initially falsy, isLoading is truthy', () => {
    const { result } = renderHook(() => useFetchHelp('foo.json'));
    expect(result.current.error).toBeFalsy();
    expect(result.current.help).toBeFalsy();
    expect(result.current.isLoading).toBeTruthy();
  });
  test('returns an error upon network errors', async () => {
    const badContentFilename = 'bad-error';
    server.use(
      http.get('/help/*', () => {
        return HttpResponse.error();
      })
    );
    const { result } = renderHook(() => useFetchHelp(badContentFilename));
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.error).toBeTruthy();
  });
  test('returns help object on success', async () => {
    const { result } = renderHook(() => useFetchHelp('foo.json'));
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.help).toBeTruthy();
  });
  test('returns object with type === "html" if html file', async () => {
    const { result } = renderHook(() => useFetchHelp('bar.html'));
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.help?.type).toBe('html');
  });
  test('returns object with type === "text" if json file is passed', async () => {
    const { result } = renderHook(() => useFetchHelp('blah.json'));
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.help?.type).toBe('text');
  });
});
