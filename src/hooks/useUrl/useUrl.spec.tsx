import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useUrl } from 'hooks/useUrl/useUrl';
import { expect, suite, test } from 'vitest';

suite('useUrl hook', () => {
  test('returns the current path', () => {
    const { result } = renderHook(() => useUrl());
    expect(result.current.pathQueryParam).toBeFalsy();
  });
});
