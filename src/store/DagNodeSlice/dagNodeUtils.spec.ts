import '@testing-library/jest-dom';
import { DecisionTree } from 'store/DagNodeSlice/dagNodeSlice';
import { applyPositionToNodes } from 'store/DagNodeSlice/dagNodeUtils';
import { describe, expect, it } from 'vitest';

describe('Dag Node Slice internals', () => {
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
});
