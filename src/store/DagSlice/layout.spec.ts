import '@testing-library/jest-dom';
import { PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';
import { layoutTree } from 'store/DagSlice/layout';
import { describe, expect, it } from 'vitest';

describe('DAG layout', () => {
  it('accepts a position unaware tree and returns position aware tree', () => {
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
  it('changes rank direction based on optional argument', () => {
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
    const direction = 'LR';
    const horizontalTree = layoutTree(positionUnawareTree, direction);
    const verticalTree = layoutTree(positionUnawareTree);
    expect(horizontalTree[parentId].position.x).toBeLessThanOrEqual(
      horizontalTree[childId].position.x
    );
    expect(verticalTree[parentId].position.y).toBeLessThanOrEqual(verticalTree[childId].position.y);
  });
});
