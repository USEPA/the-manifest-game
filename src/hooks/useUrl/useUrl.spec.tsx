import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useUrl } from 'hooks/useUrl/useUrl';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect, suite, test } from 'vitest';

const wrapper = ({ children }: { children: ReactNode }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};
suite('useUrl hook', () => {
  test('pathQueryParam is falsy by default', () => {
    const { result } = renderHook(() => useUrl(), { wrapper });
    expect(result.current.pathQueryParam).toBeFalsy();
  });
  test('returns the path URL query param', () => {
    const pathQueryParam = 'foo';
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <MemoryRouter initialEntries={[`?path=${pathQueryParam}`]}>{children}</MemoryRouter>;
    };
    const { result } = renderHook(() => useUrl(), { wrapper });
    expect(result.current.pathQueryParam).toBe(pathQueryParam);
  });
});
