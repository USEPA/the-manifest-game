import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { ReactFlowProvider } from 'reactflow';
import { DecisionTree, PositionUnawareDecisionTree } from 'store';
import { afterEach, describe, expect, test } from 'vitest';

//                     parent
//                   /        \
//            yesChild         noChild
//           /         \      /        \
// yesYesChild   yesNoChild  noYesChild  noNoChild

const PARENT_ID = '1';
const YES_CHILD_ID = '2';
const NO_CHILD_ID = '5';
const YES_YES_ID = '3';
const YES_NO_ID = '4';

const createTestPositionUnawareDecisionTree = (): PositionUnawareDecisionTree => {
  return {
    [PARENT_ID]: {
      id: PARENT_ID,
      data: {
        label: 'parent',
        yesId: YES_CHILD_ID,
        noId: NO_CHILD_ID,
        children: [],
      },
      type: 'BoolNode',
      hidden: false,
    },
    [YES_CHILD_ID]: {
      id: YES_CHILD_ID,
      data: {
        label: 'yes child',
        children: [YES_YES_ID, YES_NO_ID],
        yesId: YES_YES_ID,
        noId: YES_NO_ID,
      },
      type: 'BoolNode',
      hidden: true,
    },
    [NO_CHILD_ID]: {
      id: NO_CHILD_ID,
      data: { label: 'no child', children: [] },
      type: 'default',
      hidden: true,
    },
    [YES_YES_ID]: {
      id: YES_YES_ID,
      data: { label: 'yes grandchild', children: [] },
      type: 'default',
      hidden: true,
    },
    [YES_NO_ID]: {
      id: YES_NO_ID,
      data: { label: 'no grandchild', children: [] },
      type: 'default',
      hidden: true,
    },
  };
};

afterEach(() => cleanup());

const TestComponent = ({ tree }: { tree?: PositionUnawareDecisionTree }) => {
  const { nodes, edges, onClick } = useDecisionTree(tree);
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
  describe('Bool node selection', () => {
    test('opens the options children', () => {
      const myTree = createTestPositionUnawareDecisionTree();
      render(
        <ReactFlowProvider>
          <TestComponent tree={myTree} />
        </ReactFlowProvider>
      );
      [YES_CHILD_ID, YES_YES_ID, YES_NO_ID].forEach((nodeId: string) => {
        expect(screen.queryByTestId(`node-${nodeId}`)).not.toBeInTheDocument();
      });
      fireEvent.click(screen.queryByTestId(`${PARENT_ID}-yes-button`)!);
      [YES_CHILD_ID, YES_YES_ID, YES_NO_ID].forEach((nodeId: string) => {
        expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
      });
    });
  });
});
