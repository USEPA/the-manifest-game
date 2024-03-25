import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useHelp } from 'hooks/useHelp/useHelp';
import { expect, suite, test } from 'vitest';

suite('useHelp hook', () => {
  test('helpIsOpen is initially false', () => {
    const { result } = renderHook(() => useHelp());
    expect(result.current.helpIsOpen).toBe(false);
  });
});
