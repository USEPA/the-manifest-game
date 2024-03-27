import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';
import { useDecisionTree } from 'hooks';
import { useHelp } from 'hooks/useHelp/useHelp';
import { MouseEventHandler } from 'react';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

export interface BoolNodeData extends NodeData {
  label: string;
  yesId: string;
  noId: string;
  children: string[];
}

export const BoolNode = ({
  data: { yesId, noId, label, status, help },
  id,
  ...props
}: NodeProps<BoolNodeData>) => {
  const { showHelp } = useHelp();

  const handleHelpClick: MouseEventHandler = (event) => {
    showHelp(id);
    event.stopPropagation();
  };

  const {
    showNode,
    showChildren,
    hideNiblings,
    hideDescendants,
    markDecisionMade,
    markDecisionFocused,
    addToPath,
  } = useDecisionTree();

  const handleYes = () => {
    showNode(yesId, { parentId: id });
    showChildren(yesId);
    hideNiblings(id);
    hideDescendants(noId);
    markDecisionMade(id);
    markDecisionFocused(yesId);
    addToPath(id, yesId);
  };

  const handleNo = () => {
    showNode(noId, { parentId: id });
    showChildren(noId);
    hideNiblings(id);
    hideDescendants(yesId);
    markDecisionMade(id);
    markDecisionFocused(noId);
    addToPath(id, noId);
  };

  return (
    <BaseNode {...props} id={id}>
      <div
        data-testid={`bool-node-${id}-content`}
        className={`flex min-w-80 flex-col items-center justify-center rounded-xl
          p-6 text-xl text-white
          ${status ? 'bg-gradient-to-b from-teal-700 to-teal-800' : 'bg-gradient-to-b from-sky-700 to-sky-900'}
          ${status === 'focused' ? 'animate-pulse' : ''}`}
      >
        {help && (
          <div className="absolute right-3 top-3">
            <HelpIcon onClick={handleHelpClick} />
          </div>
        )}
        <div>
          <p className="pb-4 pt-2 text-2xl">{label}</p>
        </div>
        <div className="mt-1 flex items-center justify-center space-x-3">
          <button
            onClick={handleYes}
            data-testid={`${id}-yes-button`}
            className="mb-1 rounded-xl bg-slate-600 px-2 py-1 text-2xl font-semibold
            text-white transition-colors duration-200 ease-in-out hover:bg-slate-700
            focus:outline-none focus:ring-2 focus:ring-slate-50 active:bg-slate-800"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            data-testid={`${id}-no-button`}
            className="mb-1 rounded-xl bg-slate-600 px-2 py-1 text-2xl font-semibold
            text-white transition-colors duration-200 ease-in-out hover:bg-slate-700
            focus:outline-none focus:ring-2 focus:ring-slate-50 active:bg-slate-800"
          >
            No
          </button>
        </div>
      </div>
    </BaseNode>
  );
};
