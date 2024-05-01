import '@testing-library/jest-dom';
import { DecisionTree } from 'store/DagNodeSlice/dagNodeSlice';
import { getAncestorIds, setNodesHidden, setNodeVisible } from 'store/TreeSlice/treeSliceUtils';
import { describe, expect, suite, test } from 'vitest';

suite('Tree Slice internals', () => {
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
  describe('Get Ancestor IDs', () => {
    const parent = 'foo';
    const child = 'bar';
    const grandparent = 'baz';
    const data: DecisionTree = {
      [grandparent]: {
        id: grandparent,
        hidden: false,
        data: { label: grandparent, children: [parent] },
        position: {
          x: 0,
          y: 0,
        },
      },
      [parent]: {
        id: parent,
        hidden: false,
        data: { label: parent, children: [child] },
        position: {
          x: 0,
          y: 0,
        },
      },
      child: {
        id: child,
        hidden: false,
        data: { label: child, children: [] },
        position: {
          x: 0,
          y: 0,
        },
      },
    };
    test('Returns an array', () => {
      expect(getAncestorIds(data, parent)).toBeInstanceOf(Array);
    });
    test('Returns an empty array if the node has no ancestors', () => {
      expect(getAncestorIds(data, grandparent)).toEqual([]);
    });
    test('Returns the parent and grandparent node IDs', () => {
      expect(getAncestorIds(data, child)).toEqual([parent, grandparent]);
    });
  });
});
