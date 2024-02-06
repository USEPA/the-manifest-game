import '@testing-library/jest-dom';
import { PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';
import { buildPositionedTree } from 'store/DagSlice/layout';
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
    const tree = buildPositionedTree(positionUnawareTree);
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
    const horizontalTree = buildPositionedTree(positionUnawareTree, direction);
    const verticalTree = buildPositionedTree(positionUnawareTree);
    expect(horizontalTree[parentId].position.x).toBeLessThan(horizontalTree[childId].position.x);
    expect(verticalTree[parentId].position.y).toBeLessThan(verticalTree[childId].position.y);
  });
});
