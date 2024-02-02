import '@testing-library/jest-dom';
import { createDagEdge } from 'store/DagSlice/dagUtils';
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
});
