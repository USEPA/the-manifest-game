import '@testing-library/jest-dom';
import { DecisionTree } from 'store/DagSlice/dagSlice';
import { createDagEdge, getSiblingIds } from 'store/DagSlice/dagUtils';
import { describe, expect, test } from 'vitest';

describe('Dag Slice internal functions', () => {
  test('takes 2 Id and returns an edge', () => {
    const sourceId = '2';
    const targetId = '3';
    const edge = createDagEdge(sourceId, targetId);
    expect(typeof edge).toBe('object');
    expect(edge.source).toBe(sourceId);
    expect(edge.target).toBe(targetId);
  });
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
