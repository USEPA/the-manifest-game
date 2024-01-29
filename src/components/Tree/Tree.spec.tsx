import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tree } from 'components/Tree/Tree';
import { ReactFlowProvider } from 'reactflow';
import { DecisionTree } from 'store';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {});

const TestComponent = ({ tree }: { tree?: DecisionTree }) => {
  const myTree = tree || {
    ['1']: {
      id: '1',
      data: {
        label: 'this is a question?',
        yesId: '2',
        noId: '3',
        children: [],
      },
      position: { x: 0, y: 0 },
      type: 'BoolNode',
      hidden: false,
    },
    ['2']: {
      id: '2',
      data: { label: 'this is an answer?', children: [] },
      position: { x: 0, y: 0 },
      type: 'default',
      hidden: false,
    },
    ['3']: {
      id: '3',
      data: { label: 'this is an answer?', children: [] },
      position: { x: 0, y: 0 },
      type: 'default',
      hidden: false,
    },
  };
  return <Tree tree={myTree} />;
};

describe('Tree UI', () => {
  it('renders', () => {
    render(
      <ReactFlowProvider>
        <TestComponent />
      </ReactFlowProvider>
    );
    expect(screen.getByTestId('decision-tree')).toBeInTheDocument();
  });
});
