import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tree } from 'components/Tree/Tree';
import { useDecisionTree } from 'hooks';
import { ReactFlowProvider } from 'reactflow';
import useTreeStore, { PositionUnawareDecisionTree } from 'store';
import { beforeEach, describe, expect, test } from 'vitest';

//                     parent
//                   /        \
//            yesChild         noChild
//           /         \      /        \
// yesYesChild   yesNoChild  noYesChild  noNoChild

const PARENT_ID = '1';
const YES_CHILD_ID = '2';
const NO_CHILD_ID = '3';
const YES_YES_ID = '4';
const YES_NO_ID = '5';
const NO_YES_ID = '6';
const NO_NO_ID = '7';

interface createTestTreeOptions {
  showIds?: Array<string>;
}

const createTestPositionUnawareDecisionTree = (
  options?: createTestTreeOptions
): PositionUnawareDecisionTree => {
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
      hidden: !options?.showIds?.includes(YES_CHILD_ID),
    },
    [NO_CHILD_ID]: {
      id: NO_CHILD_ID,
      data: {
        label: 'no child',
        children: [NO_NO_ID, NO_YES_ID],
        noId: NO_NO_ID,
        yesId: NO_YES_ID,
      },
      type: 'BoolNode',
      hidden: !options?.showIds?.includes(NO_CHILD_ID),
    },
    [YES_YES_ID]: {
      id: YES_YES_ID,
      data: { label: 'yes grandchild', children: [] },
      type: 'default',
      hidden: !options?.showIds?.includes(YES_YES_ID),
    },
    [YES_NO_ID]: {
      id: YES_NO_ID,
      data: { label: 'no grandchild', children: [] },
      type: 'default',
      hidden: !options?.showIds?.includes(YES_NO_ID),
    },
    [NO_NO_ID]: {
      id: NO_NO_ID,
      data: { label: 'yes grandchild', children: [] },
      type: 'default',
      hidden: !options?.showIds?.includes(NO_NO_ID),
    },
    [NO_YES_ID]: {
      id: NO_YES_ID,
      data: { label: 'no grandchild', children: [] },
      type: 'default',
      hidden: !options?.showIds?.includes(NO_YES_ID),
    },
  };
};

const TestComponent = ({ tree }: { tree?: PositionUnawareDecisionTree }) => {
  const { nodes, edges } = useDecisionTree(tree);
  return <Tree nodes={nodes} edges={edges} />;
};

beforeEach(() => {
  useTreeStore.setState({});
  cleanup();
});

describe('Tree Component', () => {
  describe('Bool node selection', () => {
    // test('opens the options children', async () => {
    //   const user = userEvent.setup();
    //   const myTree = createTestPositionUnawareDecisionTree();
    //   render(
    //     <ReactFlowProvider>
    //       <TestComponent tree={myTree} />
    //     </ReactFlowProvider>
    //   );
    //   [YES_CHILD_ID, YES_YES_ID, YES_NO_ID].forEach((nodeId: string) => {
    //     expect(screen.queryByTestId(`node-${nodeId}`)).not.toBeInTheDocument();
    //   });
    //   await user.click(screen.queryByTestId(`${PARENT_ID}-yes-button`)!);
    //   expect(screen.queryByTestId(`node-${YES_NO_ID}`)).toBeInTheDocument();
    //   expect(screen.queryByTestId(`node-${YES_YES_ID}`)).toBeInTheDocument();
    //   // [YES_YES_ID, YES_NO_ID].forEach((nodeId: string) => {
    //   //   expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
    //   // });
    // });
    test('closes the descendants the selected options siblings', async () => {
      const user = userEvent.setup();
      const myTree = createTestPositionUnawareDecisionTree({
        showIds: [YES_CHILD_ID, NO_CHILD_ID, YES_YES_ID, YES_NO_ID],
      });
      render(
        <ReactFlowProvider>
          <TestComponent tree={myTree} />
        </ReactFlowProvider>
      );
      [YES_CHILD_ID, NO_CHILD_ID, YES_YES_ID, YES_NO_ID].forEach((nodeId: string) => {
        expect(screen.queryByTestId(`node-${nodeId}`)).toBeInTheDocument();
      });
      await user.click(screen.queryByTestId(`${NO_CHILD_ID}-yes-button`)!);
      expect(screen.queryByTestId(`node-${YES_CHILD_ID}`)).toBeInTheDocument();
      [YES_YES_ID, YES_NO_ID].forEach((nodeId: string) => {
        expect(screen.queryByTestId(`node-${nodeId}`)).not.toBeInTheDocument();
      });
    });
  });
});
