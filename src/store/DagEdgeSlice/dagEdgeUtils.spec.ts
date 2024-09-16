import '@testing-library/jest-dom';
import { Edge } from 'reactflow';
import { addDagEdge, createDagEdge } from '@/store/DagEdgeSlice/dagEdgeUtils';
import { describe, expect, suite, test } from 'vitest';

suite('Dag Edge Slice internals', () => {
  describe('Create Dag Edge', () => {
    test('takes 2 Id and returns an edge', () => {
      const sourceId = '2';
      const targetId = '3';
      const edge = createDagEdge(sourceId, targetId);
      expect(typeof edge).toBe('object');
      expect(edge.source).toBe(sourceId);
      expect(edge.target).toBe(targetId);
    });
  });
  describe('Add Dag Edge', () => {
    test('adding an edge is idempotent', () => {
      const id1 = '1';
      const id2 = '2';
      const id3 = '3';
      const currentEdges: Edge[] = [{ ...createDagEdge(id1, id2) }, { ...createDagEdge(id2, id3) }];
      const nonUpdatedEdges = addDagEdge(currentEdges, { source: id1, target: id2 });
      expect(nonUpdatedEdges).toEqual(currentEdges);
      const updatedEdges = addDagEdge(currentEdges, { source: id1, target: id3 });
      expect(updatedEdges.length).toBe(currentEdges.length + 1);
    });
  });
});
