import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { createHelpSlice, HelpSlice } from 'store/HelpSlice/helpSlice';
import { expect, suite, test } from 'vitest';
import { create } from 'zustand';

suite('Help Slice', () => {
  test('store initializes with helpOpen false', () => {
    const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
    expect(result.current.getState().helpOpen).toBe(false);
  });
  test('open Help sets open to true', () => {
    const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
    result.current.getState().openHelp('foo');
    expect(result.current.getState().helpOpen).toBe(true);
  });
});
