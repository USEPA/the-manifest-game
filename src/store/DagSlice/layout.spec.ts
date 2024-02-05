import '@testing-library/jest-dom';
import { PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';
import { buildPositionedTree } from 'store/DagSlice/layout';
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
    const tree = buildPositionedTree(positionUnawareTree);
    expect('position' in positionUnawareTree[nodeId]).toBe(false);
    expect(typeof tree).toBe('object');
    expect(tree[nodeId].position).toBeDefined();
  });
});
