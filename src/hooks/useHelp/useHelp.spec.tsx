import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useHelp } from 'hooks/useHelp/useHelp';
import { describe, expect, test } from 'vitest';

describe('useHelp hook', () => {
  test('helpIsOpen is initially false', () => {
    const { result } = renderHook(() => useHelp());
    expect(result.current.helpIsOpen).toBe(false);
  });
  test('showHelp returns if arg is undefined', () => {
    const { result } = renderHook(() => useHelp());
    expect(() => result.current.showHelp(undefined)).toThrowError('contentId is required');
  });
});
