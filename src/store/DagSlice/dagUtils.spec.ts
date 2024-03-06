import '@testing-library/jest-dom';
import { Edge } from 'reactflow';
import { DecisionTree } from 'store/DagSlice/dagSlice';
import { addDagEdge, applyPositionToNodes, createDagEdge } from 'store/DagSlice/dagUtils';
import { describe, expect, it, test } from 'vitest';

describe('Dag Slice internals', () => {
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
  it('Applies tree positions to nodes', () => {
    const oldX = 0;
    const oldY = 10;
    const newX = 100;
    const newY = 156;
    const tree: DecisionTree = {
      ['1']: {
        id: '1',
        data: {
          label: 'this is a question?',
          yesId: '2',
          noId: '3',
          children: [],
        },
        position: { x: newX, y: newY, rank: 0 },
        type: 'BoolNode',
        hidden: false,
      },
    };
    const existingNodes = [
      {
        id: '1',
        data: {
          label: 'this is a question?',
          yesId: '2',
          noId: '3',
          children: [],
        },
        position: { x: oldX, y: oldY },
        type: 'BoolNode',
        hidden: false,
      },
    ];
    const nodesWithPositions = applyPositionToNodes(tree, existingNodes);
    expect(nodesWithPositions[0].position).toEqual({ x: newX, y: newY });
  });
  it('adding an edge is idempotent', () => {
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
