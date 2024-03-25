import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { createHelpSlice, HelpSlice } from 'store/HelpSlice/helpSlice';
import { expect, suite, test } from 'vitest';
import { create } from 'zustand';

suite('Help Slice', () => {
  test('help content ID is initially undefined', () => {
    const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
    expect(result.current.getState().helpContentId).toBeFalsy();
  });
  test('isOpen is initially false', () => {
    const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
    expect(result.current.getState().isOpen).toBe(false);
  });
  test('showing help sets open to true', () => {
    const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
    result.current.getState().showHelp('foo');
    expect(result.current.getState().isOpen).toBe(true);
  });
  test('showing help sets open to true', () => {
    const helpContentId = 'foo';
    const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
    result.current.getState().showHelp(helpContentId);
    expect(result.current.getState().helpContentId).toBe(helpContentId);
  });
});
