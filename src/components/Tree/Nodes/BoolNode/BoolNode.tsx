import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';
import { BoolButton } from 'components/Tree/Nodes/BoolNode/BoolButton/BoolButton';
import { useDecisionTree, useHelp } from 'hooks';
import { usePath } from 'hooks/usePath/usePath';
import React, { MouseEventHandler } from 'react';
import { NodeProps } from 'reactflow';
import { VertexData } from 'store/TreeSlice/treeSlice';

export interface BoolNodeData extends VertexData {
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
  const { retractDecision, makeDecision } = useDecisionTree();
  const { decisionIsInPath, getDecision } = usePath();

  const decision = getDecision(id);

  const handleHelpClick: MouseEventHandler = (event) => {
    showHelp(help);
    event.stopPropagation();
  };

  const handleAnswer = (answer: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
    retractDecision(answer ? noId : yesId);
    makeDecision(id, answer ? yesId : noId);
    event.stopPropagation();
  };

  return (
    <BaseNode {...props} id={id}>
      <div
        data-testid={`bool-node-${id}-content`}
        className={`flex min-w-80 flex-col items-center justify-center rounded-xl
          p-6 text-xl text-white
          ${decisionIsInPath(id) ? 'bg-gradient-to-b from-teal-700 to-teal-800' : 'bg-gradient-to-b from-sky-700 to-sky-900'}
          ${status === 'focused' ? 'animate-pulse' : ''}`}
      >
        {help && (
          <div className="absolute right-3 top-3">
            <HelpIcon onClick={handleHelpClick} />
          </div>
        )}
        <div>
          <h2 className="pb-4 pt-2 text-2xl">{label}</h2>
        </div>
        <div className="mt-1 flex items-center justify-center space-x-3">
          <BoolButton
            id={id}
            selected={decision?.selected === yesId}
            response={true}
            onClick={handleAnswer(true)}
          />
          <BoolButton
            id={id}
            selected={decision?.selected === noId}
            response={false}
            onClick={handleAnswer(false)}
          />
        </div>
      </div>
    </BaseNode>
  );
};
