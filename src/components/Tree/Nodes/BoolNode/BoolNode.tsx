import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';
import { BoolButton } from 'components/Tree/Nodes/BoolNode/BoolButton/BoolButton';
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
          <BoolButton id={id} response={true} onClick={handleYes} />
          <BoolButton id={id} response={false} onClick={handleNo} />
        </div>
      </div>
    </BaseNode>
  );
};
