import '@testing-library/jest-dom';
import { DecisionTree } from 'store/DagNodeSlice/dagNodeSlice';
import {
  buildAncestorDecisions,
  getAncestorIds,
  getParentId,
  setNodesHidden,
  setNodeVisible,
} from 'store/TreeSlice/treeSliceUtils';
import { describe, expect, suite, test } from 'vitest';

const treeFactory = (overwrites?: Partial<DecisionTree>): DecisionTree => {
  const parent = 'parent';
  const child = 'child';
  const grandparent = 'grandparent';
  const uncle = 'uncle';
  return {
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
    [child]: {
      id: child,
      hidden: false,
      data: { label: child, children: [] },
      position: {
        x: 0,
        y: 0,
      },
    },
    ...overwrites,
  };
};

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
    test('Returns an array', () => {
      expect(getAncestorIds(treeFactory(), 'parent')).toBeInstanceOf(Array);
    });
    test('Returns an empty array if the node has no ancestors', () => {
      expect(getAncestorIds(treeFactory(), 'grandparent')).toEqual([]);
    });
    test('Returns the parent and grandparent node IDs', () => {
      expect(getAncestorIds(treeFactory(), 'child')).toEqual(['parent', 'grandparent']);
    });
  });
  describe('build ancestor decisions', () => {
    test('Returns an array', () => {
      expect(buildAncestorDecisions(treeFactory(), ['parent', 'grandparent'])).toBeInstanceOf(
        Array
      );
    });
    test('returns an array of objects with the decisions', () => {
      const decisions = buildAncestorDecisions(treeFactory(), ['parent', 'grandparent']);
      decisions.map((decision) => {
        expect(decision.nodeId).toBeDefined();
        expect(decision.selected).toBeDefined();
      });
    });
  });
  describe('Get Parent ID', () => {
    test('Returns the parent ID', () => {
      const retrievedParentId = getParentId(treeFactory(), 'child');
      expect(retrievedParentId).toBe('parent');
    });
    test('Returns undefined if root node', () => {
      const retrievedParentId = getParentId(treeFactory(), 'grandparent');
      expect(retrievedParentId).toBeUndefined();
    });
  });
});
