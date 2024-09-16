import '@testing-library/jest-dom';
import { DagNode, DecisionTree } from '@/store/DagNodeSlice/dagNodeSlice';
import { applyPositionToNodes, filterNodesById } from '@/store/DagNodeSlice/dagNodeUtils';
import { describe, expect, suite, test } from 'vitest';

suite('Dag Node Slice internals', () => {
  describe('applyPositionToNodes', () => {
    test('Applies tree positions to nodes', () => {
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
  });
  describe('filterNodesById', () => {
    test('returns an array', () => {
      const nodeId = '1';
      const nodes: DagNode[] = [
        {
          id: nodeId,
          data: {
            label: 'this is a question?',
          },
          position: { x: 0, y: 10 },
        },
      ];
      const filteredNodes = filterNodesById(nodes, [nodeId]);
      expect(filteredNodes).toBeInstanceOf(Array);
    });
    test('filters nodes with the given ID', () => {
      const nodeId = '1';
      const nodes: DagNode[] = [
        {
          id: nodeId,
          data: {
            label: 'this is a question?',
          },
          position: { x: 0, y: 10 },
        },
        {
          id: '2',
          data: {
            label: 'this is a question?',
          },
          position: { x: 0, y: 10 },
        },
      ];
      const filteredNodes = filterNodesById(nodes, [nodeId]);
      expect(filteredNodes.length).toBe(nodes.length - 1);
      expect(filteredNodes.map((node) => node.id)).not.toContain(nodeId);
    });
  });
});
