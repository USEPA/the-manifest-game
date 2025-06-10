import '@testing-library/jest-dom';
import { useDecisions } from '@/hooks/useDecisions/useDecisions';
import { renderHook } from '@testing-library/react';
import { useTreeStore } from '@/store';
import { DecisionPath } from '@/store/TreeSlice/treeSlice';
import { expect, suite, test } from 'vitest';

suite('useDecisions hook', () => {
  test('returns the current path', () => {
    const { result } = renderHook(() => useDecisions());
    expect(result.current.path).toBeTruthy();
  });
  test('accepts an initial path', () => {
    const currentPath: DecisionPath = [{ nodeId: '1', selected: 'yes' }];
    useTreeStore.setState({ path: currentPath });
    const { result } = renderHook(() => useDecisions());
    expect(result.current.path).toBe(currentPath);
  });
  test('exposes a function to query for decision ID in path', () => {
    const currentPath: DecisionPath = [{ nodeId: '1', selected: 'yes' }];
    useTreeStore.setState({ path: currentPath });
    const { result } = renderHook(() => useDecisions());
    expect(result.current.decisionIsInPath('1')).toBe(true);
  });
  test('exposes a function to query if an ID is the current decision', () => {
    const currentPath: DecisionPath = [
      { nodeId: '1', selected: '2' },
      { nodeId: '2', selected: '3' },
    ];
    useTreeStore.setState({ path: currentPath });
    const { result } = renderHook(() => useDecisions('3'));
    expect(result.current.isCurrentDecision).toBeTruthy();
    const { result: secondDecision } = renderHook(() => useDecisions('2'));
    expect(secondDecision.current.isCurrentDecision).toBeFalsy();
  });
  test('current decision query returns false if path is empty', () => {
    const currentPath: DecisionPath = [];
    useTreeStore.setState({ path: currentPath });
    const { result } = renderHook(() => useDecisions('1'));
    expect(result.current.isCurrentDecision).toBeFalsy();
  });
  test('returns the decision for the current ID', () => {
    const firstDecision = { nodeId: '1', selected: 'yes' };
    const currentPath: DecisionPath = [
      firstDecision,
      {
        nodeId: '2',
        selected: 'no',
      },
    ];
    useTreeStore.setState({ path: currentPath });
    const { result } = renderHook(() => useDecisions(firstDecision.nodeId));
    expect(result.current.decision).toBe(firstDecision);
  });
  test('decision is undefined if a not made for the node ID', () => {
    const onlyDecision = { nodeId: '1', selected: 'yes' };
    const currentPath: DecisionPath = [onlyDecision];
    useTreeStore.setState({ path: currentPath });
    const { result } = renderHook(() => useDecisions('other-id'));
    expect(result.current.decision).toBe(undefined);
  });
});
