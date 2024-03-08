import '@testing-library/jest-dom';
import { DecisionTree } from 'store/DagNodeSlice/dagNodeSlice';
import {
  getDescendantIds,
  getSiblingIds,
  setCollapsed,
  setExpanded,
  setNodesHidden,
  setNodeVisible,
} from 'store/DecisionSlice/decisionUtils';
import { describe, expect, suite, test } from 'vitest';

suite('Tree Slice internals', () => {
  describe('Get Descendants ID', () => {
    test('returns an array', () => {
      const ids = getDescendantIds({}, '1');
      expect(ids).toBeInstanceOf(Array);
    });
  });
  describe('Get Siblings IDs', () => {
    test('Find all sibling node IDs', () => {
      const rootId = '1';
      const siblingId2 = '2';
      const siblingId3 = '3';
      const siblingId4 = '4';
      const tree: DecisionTree = {
        [rootId]: {
          id: '1',
          data: {
            children: [siblingId2, siblingId3, siblingId4],
            label: 'Root',
          },
          position: { x: 0, y: 0, rank: 0 },
        },
        [siblingId2]: {
          id: '2',
          data: {
            children: [],
            label: 'Sibling 2',
          },
          position: { x: 0, y: 0, rank: 2 },
        },
        [siblingId3]: {
          id: '3',
          data: {
            children: [],
            label: 'Sibling 3',
          },
          position: { x: 0, y: 0, rank: 2 },
        },
        [siblingId4]: {
          id: '4',
          data: {
            children: [],
            label: 'Sibling 4',
          },
          position: { x: 0, y: 0, rank: 2 },
        },
      };
      expect(getSiblingIds(tree, siblingId2)).toEqual([siblingId3, siblingId4]);
      expect(getSiblingIds(tree, siblingId3)).toEqual([siblingId2, siblingId4]);
      expect(getSiblingIds(tree, siblingId4)).toEqual([siblingId2, siblingId3]);
    });
  });
  describe('Set Node Visible', () => {
    test('Set hidden to false (idempotent)', () => {
      const tree: DecisionTree = {
        // @ts-expect-error - use a minimal tree for testing
        '1': { id: '1', hidden: true, data: { label: 'foo' } },
      };
      const updatedTree = setNodeVisible(tree, ['1']);
      expect(updatedTree['1'].hidden).toBe(false);
      const idempotentTree = setNodeVisible(updatedTree, ['1']);
      expect(idempotentTree['1'].hidden).toBe(false);
    });
  });
  describe('Set Node Hidden', () => {
    test('Set hidden to true (idempotent)', () => {
      const tree: DecisionTree = {
        // @ts-expect-error - use a minimal tree for testing
        '1': { id: '1', hidden: false, data: { label: 'foo' } },
      };
      const updatedTree = setNodesHidden(tree, ['1']);
      expect(updatedTree['1'].hidden).toBe(true);
      const idempotentTree = setNodesHidden(updatedTree, ['1']);
      expect(idempotentTree['1'].hidden).toBe(true);
    });
  });
  describe('Set Node Expanded', () => {
    test('Set expanded to true (idempotent)', () => {
      const tree: DecisionTree = {
        // @ts-expect-error - use a minimal tree for testing
        '1': { id: '1', hidden: false, data: { label: 'foo', expanded: false } },
      };
      const updatedTree = setExpanded(tree, ['1']);
      expect(updatedTree['1'].data.expanded).toBe(true);
      const idempotentTree = setExpanded(updatedTree, ['1']);
      expect(idempotentTree['1'].data.expanded).toBe(true);
    });
  });
  describe('Set Node Collapsed', () => {
    test('Set expanded to false (idempotent)', () => {
      const tree: DecisionTree = {
        // @ts-expect-error - use a minimal tree for testing
        '1': { id: '1', hidden: false, data: { label: 'foo', expanded: true } },
      };
      const updatedTree = setCollapsed(tree, ['1']);
      expect(updatedTree['1'].data.expanded).toBe(false);
      const idempotentTree = setCollapsed(updatedTree, ['1']);
      expect(idempotentTree['1'].data.expanded).toBe(false);
    });
  });
});
