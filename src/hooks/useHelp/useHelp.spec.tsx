import '@testing-library/jest-dom';
import { useHelp } from '@/hooks/useHelp/useHelp';
import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

describe('useHelp hook', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  test('helpIsOpen is true on a user first visit', () => {
    const { result } = renderHook(() => useHelp());
    expect(result.current.helpIsOpen).toBeTruthy();
  });
  test('helpIsOpen is initially false', () => {
    localStorage.setItem('tmg-first-time', 'true');
    const { result } = renderHook(() => useHelp());
    expect(result.current.helpIsOpen).toBeFalsy();
  });
  test('showHelp returns if arg is undefined', () => {
    const { result } = renderHook(() => useHelp());
    expect(() => result.current.showHelp(undefined)).toThrowError('contentId is required');
  });
});
