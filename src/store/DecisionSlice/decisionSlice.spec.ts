import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { createDecisionSlice, DecisionSlice } from 'store/DecisionSlice/decisionSlice';
import { describe, expect, suite, test } from 'vitest';
import { create } from 'zustand';

suite('Decision Slice', () => {
  describe('Initial State', () => {
    test('Path is initially empty ', () => {
      const { result } = renderHook(() => create<DecisionSlice>(createDecisionSlice));
      expect(result.current.getState().path).toEqual([]);
    });
    test('Default direction is left-to-right', () => {
      const { result } = renderHook(() => create<DecisionSlice>(createDecisionSlice));
      expect(result.current.getState().direction).toEqual('LR');
    });
  });
});
