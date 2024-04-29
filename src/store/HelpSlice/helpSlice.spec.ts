import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { createHelpSlice, HelpSlice } from 'store/HelpSlice/helpSlice';
import { describe, expect, suite, test } from 'vitest';
import { create } from 'zustand';

suite('Help Slice', () => {
  describe('Initial State', () => {
    test('help content ID is initially undefined', () => {
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      expect(result.current.getState().helpContentId).toBeFalsy();
    });
    test('initially help is not open', () => {
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      expect(result.current.getState().helpIsOpen).toBe(false);
    });
  });
  describe('Show Help', () => {
    test('showing help sets open to true', () => {
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().showHelp('foo');
      expect(result.current.getState().helpIsOpen).toBe(true);
    });
    test('showing help sets open to true', () => {
      const helpContentId = 'foo';
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().showHelp(helpContentId);
      expect(result.current.getState().helpContentId).toBe(helpContentId);
    });
  });
  describe('hideHelp', () => {
    test('hiding help sets open to false', () => {
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().hideHelp();
      expect(result.current.getState().helpIsOpen).toBe(false);
    });
    test('hiding help sets content ID to undefined', () => {
      const { result } = renderHook(() => create<HelpSlice>(createHelpSlice));
      result.current.getState().hideHelp();
      expect(result.current.getState().helpContentId).toBeFalsy();
    });
  });
});
