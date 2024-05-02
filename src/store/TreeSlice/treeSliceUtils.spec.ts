import '@testing-library/jest-dom';
import { DecisionTree } from 'store/DagNodeSlice/dagNodeSlice';
import {
  buildAncestorDecisions,
  getAncestorIds,
  setNodesHidden,
  setNodeVisible,
} from 'store/TreeSlice/treeSliceUtils';
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
  describe('build ancestor decisions', () => {
    const parent = 'foo';
    const child = 'bar';
    const grandparent = 'baz';
    const uncle = 'uncle';
    const data: DecisionTree = {
      [grandparent]: {
        id: grandparent,
        hidden: false,
        data: { label: grandparent, children: [parent, uncle] },
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
      [uncle]: {
        id: uncle,
        hidden: false,
        data: { label: uncle, children: [] },
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
      expect(buildAncestorDecisions(data, [parent, grandparent])).toBeInstanceOf(Array);
    });
    test('returns an array of objects with the decisions', () => {
      const decisions = buildAncestorDecisions(data, [parent, grandparent]);
      decisions.map((decision) => {
        expect(decision.nodeId).toBeDefined();
        expect(decision.selected).toBeDefined();
      });
    });
  });
});
