import '@testing-library/jest-dom';
import { PositionUnawareDecisionTree } from '@/store/DagNodeSlice/dagNodeSlice';
import { layoutTree } from '@/store/TreeSlice/layout';
import { ORIENTATION } from '@/store/TreeSlice/treeSlice';
import { describe, expect, test } from 'vitest';

describe('DAG layout', () => {
  test('accepts a position unaware tree and returns position aware tree', () => {
    const nodeId = '2';
    const positionUnawareTree: PositionUnawareDecisionTree = {
      [nodeId]: {
        id: nodeId,
        data: {
          children: [],
          label: 'node',
        },
      },
    };
    expect(typeof positionUnawareTree).toBe('object');
    const tree = layoutTree(positionUnawareTree);
    expect('position' in positionUnawareTree[nodeId]).toBe(false);
    expect(typeof tree).toBe('object');
    expect(tree[nodeId].position).toBeDefined();
  });
  test('changes rank direction based on optional argument', () => {
    const parentId = '2';
    const childId = '3';
    const positionUnawareTree: PositionUnawareDecisionTree = {
      [parentId]: {
        id: parentId,
        data: {
          children: [childId],
          label: 'parent',
        },
      },
      [childId]: {
        id: childId,
        data: {
          children: [],
          label: 'child',
        },
      },
    };
    const direction = ORIENTATION.leftToRight;
    const horizontalTree = layoutTree(positionUnawareTree, direction);
    const verticalTree = layoutTree(positionUnawareTree);
    expect(horizontalTree[parentId].position.x).toBeLessThanOrEqual(
      horizontalTree[childId].position.x
    );
    expect(verticalTree[parentId].position.y).toBeLessThanOrEqual(verticalTree[childId].position.y);
  });
});
