import '@testing-library/jest-dom';
import { createHelpSlice, HelpSlice } from '@/store/HelpSlice/helpSlice';
import { renderHook } from '@testing-library/react';
import { describe, expect, suite, test } from 'vitest';
import { create } from 'zustand';

suite('Help Slice', () => {
  describe('Initial State', () => {
    test('help content ID is initially undefined', () => {
      // @ts-expect-error -- relaxing types for testing
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      expect(result.current.getState().contentFilename).toBeFalsy();
    });
    test('initially help is not open', () => {
      // @ts-expect-error -- relaxing types for testing
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      expect(result.current.getState().helpIsOpen).toBe(false);
    });
  });
  describe('Show Help', () => {
    test('showing help sets open to true', () => {
      // @ts-expect-error -- relaxing types for testing
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().showHelp('foo');
      expect(result.current.getState().helpIsOpen).toBe(true);
    });
    test('showing help sets open to true', () => {
      const helpContentId = 'foo';
      // @ts-expect-error -- relaxing types for testing
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().showHelp(helpContentId);
      expect(result.current.getState().contentFilename).toBe(helpContentId);
    });
  });
  describe('hideHelp', () => {
    test('hiding help sets open to false', () => {
      // @ts-expect-error -- relaxing types for testing
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().hideHelp();
      expect(result.current.getState().helpIsOpen).toBe(false);
    });
    test('hiding help sets content ID to undefined', () => {
      // @ts-expect-error -- relaxing types for testing
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().hideHelp();
      expect(result.current.getState().contentFilename).toBeFalsy();
    });
  });
});
