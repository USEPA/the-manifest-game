import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { ReactFlowProvider } from 'reactflow';
import { DecisionTree, PositionUnawareDecisionTree } from 'store';
import { afterEach, describe, expect, test } from 'vitest';

afterEach(() => cleanup());

const TestComponent = ({ tree }: { tree?: PositionUnawareDecisionTree }) => {
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
  const { nodes, edges, onClick } = useDecisionTree(myTree);
  return <Tree nodes={nodes} edges={edges} onClick={onClick} />;
};

describe('Tree Component', () => {
  test('renders', () => {
    render(
      <ReactFlowProvider>
        <Tree nodes={[]} edges={[]} onClick={() => undefined} />
      </ReactFlowProvider>
    );
    expect(screen.getByTestId('decision-tree')).toBeInTheDocument();
  });
  test('onClick shows children nodes of unexpanded node', () => {
    const parentId = '1';
    const childId2 = '2';
    const childId3 = '3';
    const tree: DecisionTree = {
      [parentId]: {
        id: parentId,
        data: {
          label: 'this is a question?',
          children: ['2', '3'],
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [childId2]: {
        id: childId2,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: true,
      },
      [childId3]: {
        id: childId3,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: true,
      },
    };
    render(
      <ReactFlowProvider>
        <TestComponent tree={tree} />
      </ReactFlowProvider>
    );
    const parentNode = screen.queryByTestId(`node-${parentId}`);
    expect(parentNode).toBeInTheDocument();
    expect(screen.queryByTestId(`node-${childId2}`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`node-${childId3}`)).not.toBeInTheDocument();
    fireEvent.click(parentNode!);
    expect(screen.queryByTestId(`node-${childId2}`)).toBeInTheDocument();
    expect(screen.queryByTestId(`node-${childId3}`)).toBeInTheDocument();
  });
  test('hides niblings (the descendants of children) on click', () => {
    const parentId = '1';
    const siblingWithChild2 = '2';
    const sibling3 = '3';
    const grandchildId = '4';
    const tree: DecisionTree = {
      [parentId]: {
        id: parentId,
        data: {
          label: 'this is a question?',
          children: ['2', '3'],
          expanded: true,
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [siblingWithChild2]: {
        id: siblingWithChild2,
        data: {
          label: 'this is an answer?',
          children: ['4'],
          expanded: true,
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [sibling3]: {
        id: sibling3,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [grandchildId]: {
        id: grandchildId,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
    };
    render(
      <ReactFlowProvider>
        <TestComponent tree={tree} />
      </ReactFlowProvider>
    );
    [parentId, siblingWithChild2, sibling3, grandchildId].forEach((nodeId: string) => {
      expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
    });
    fireEvent.click(screen.queryByTestId(`node-${siblingWithChild2}`)!);
    expect(screen.queryByTestId(`node-${grandchildId}`)).not.toBeInTheDocument();
  });
  test('hides all descendants of expanded nodes on click', () => {
    const parentId = '1';
    const childId = '2';
    const grandchildId = '3';
    const greatGrandchildId = '4';
    const tree: DecisionTree = {
      [parentId]: {
        id: parentId,
        data: {
          label: 'this is a question?',
          children: ['2'],
          expanded: true,
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [childId]: {
        id: childId,
        data: {
          label: 'this is an answer?',
          children: ['3'],
          expanded: true,
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [grandchildId]: {
        id: grandchildId,
        data: { label: 'this is an answer?', children: ['4'] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
      [greatGrandchildId]: {
        id: greatGrandchildId,
        data: { label: 'this is an answer?', children: [] },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
    };
    render(
      <ReactFlowProvider>
        <TestComponent tree={tree} />
      </ReactFlowProvider>
    );
    [parentId, childId, grandchildId, greatGrandchildId].forEach((nodeId: string) => {
      expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
    });
    fireEvent.click(screen.queryByTestId(`node-${childId}`)!);
    [parentId, childId].forEach((nodeId) => {
      expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
    });
    [grandchildId, greatGrandchildId].forEach((nodeId) => {
      expect(screen.queryByTestId(`node-${nodeId}`)).not.toBeInTheDocument();
    });
  });
  test('ignores yes/no clicks', () => {
    const parentId = '1';
    const childId = '2';
    const tree: DecisionTree = {
      [parentId]: {
        id: parentId,
        type: 'BoolNode',
        data: {
          label: 'this is a question?',
          children: ['2'],
          expanded: true,
        },
        position: { x: 0, y: 0 },
        hidden: false,
      },
      [childId]: {
        id: childId,
        data: {
          label: 'this is an answer?',
          children: [],
          expanded: true,
        },
        position: { x: 0, y: 0 },
        type: 'default',
        hidden: false,
      },
    };
    render(
      <ReactFlowProvider>
        <TestComponent tree={tree} />
      </ReactFlowProvider>
    );
    [parentId, childId].forEach((nodeId: string) => {
      expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
    });
    fireEvent.click(screen.queryByTestId(`node-${parentId}`)!);
    [parentId, childId].forEach((nodeId) => {
      expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
    });
  });
});
