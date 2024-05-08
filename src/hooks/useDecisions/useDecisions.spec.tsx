import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useDecisions } from 'hooks/useDecisions/useDecisions';
import { DecisionPath } from 'store/TreeSlice/treeSlice';
import { expect, suite, test } from 'vitest';

suite('useDecisions hook', () => {
  test('returns the current path', () => {
    const { result } = renderHook(() => useDecisions());
    expect(result.current.path).toBeTruthy();
  });
  test('accepts an initial path', () => {
    const currentPath: DecisionPath = [{ nodeId: '1', selected: 'yes' }];
    const { result } = renderHook(() => useDecisions(currentPath));
    expect(result.current.path).toBe(currentPath);
  });
  test('exposes a function to query for decision ID in path', () => {
    const currentPath: DecisionPath = [{ nodeId: '1', selected: 'yes' }];
    const { result } = renderHook(() => useDecisions(currentPath));
    expect(result.current.decisionIsInPath('1')).toBe(true);
  });
  test('exposes a function to query if an ID is the current decision', () => {
    const currentPath: DecisionPath = [
      { nodeId: '1', selected: '2' },
      { nodeId: '2', selected: '3' },
    ];
    const { result } = renderHook(() => useDecisions(currentPath));
    expect(result.current.isCurrentDecision('1')).toBeFalsy();
    expect(result.current.isCurrentDecision('2')).toBeFalsy();
    expect(result.current.isCurrentDecision('3')).toBeTruthy();
  });
  test('current decision query returns false if path is empty', () => {
    const currentPath: DecisionPath = [];
    const { result } = renderHook(() => useDecisions(currentPath));
    expect(result.current.isCurrentDecision('1')).toBeFalsy();
  });
  test('exposes a function to query for a decision in path by ID', () => {
    const firstDecision = { nodeId: '1', selected: 'yes' };
    const currentPath: DecisionPath = [
      firstDecision,
      {
        nodeId: '2',
        selected: 'no',
      },
    ];
    const { result } = renderHook(() => useDecisions(currentPath));
    expect(result.current.getDecision('1')).toBe(firstDecision);
  });
});
