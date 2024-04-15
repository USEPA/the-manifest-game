import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import {
  createDecisionSlice,
  Decision,
  DecisionPath,
  DecisionSlice,
} from 'store/DecisionSlice/decisionSlice';
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
  describe('Decision path', () => {
    test('setter', () => {
      const { result } = renderHook(() => create<DecisionSlice>(createDecisionSlice));
      const decision: Decision = { nodeId: 'foo', selected: 'bar' };
      const path: DecisionPath = [decision];
      result.current.getState().setPath(path);
      expect(result.current.getState().path).toContain(decision);
    });
    test('getter', () => {
      const { result } = renderHook(() => create<DecisionSlice>(createDecisionSlice));
      const decision: Decision = { nodeId: 'foo', selected: 'bar' };
      const path: DecisionPath = [decision];
      result.current.setState({ path });
      expect(result.current.getState().getPath()).toEqual(path);
    });
    test('can remove decisions from the path with the node ID', () => {
      const { result } = renderHook(() => create<DecisionSlice>(createDecisionSlice));
      const foo: Decision = { nodeId: 'foo', selected: 'bar' };
      const bar: Decision = { nodeId: 'bar', selected: 'foobar' };
      const path: DecisionPath = [foo, bar];
      result.current.setState({ path });
      result.current.getState().removeDecisionAndChildren(bar.nodeId);
      expect(result.current.getState().path).not.toContain(bar);
    });
    test('no changes if node ID not in path', () => {
      const { result } = renderHook(() => create<DecisionSlice>(createDecisionSlice));
      const foo: Decision = { nodeId: 'foo', selected: 'bar' };
      const bar: Decision = { nodeId: 'bar', selected: 'foobar' };
      const path: DecisionPath = [foo, bar];
      result.current.setState({ path });
      result.current.getState().removeDecisionAndChildren('undefinedId');
      expect(result.current.getState().path).toEqual(path);
    });
  });
});
