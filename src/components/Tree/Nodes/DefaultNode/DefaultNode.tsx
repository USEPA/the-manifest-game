import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';
import { useDecisions } from 'hooks/useDecisions/useDecisions';
import { useHelp } from 'hooks/useHelp/useHelp';
import { MouseEventHandler } from 'react';
import { NodeProps } from 'reactflow';
import { VertexData } from 'store/TreeSlice/treeSlice';

export const DefaultNode = ({ data, ...props }: NodeProps<VertexData>) => {
  const { showHelp } = useHelp();
  const { isCurrentDecision } = useDecisions();

  const isCurrent = isCurrentDecision(props.id);

  const handleHelpClick: MouseEventHandler = (event) => {
    showHelp(props.id);
    event.stopPropagation();
  };

  const nodeBackgroundColor = data.status
    ? 'bg-teal-700'
    : 'bg-gradient-to-b from-sky-700 to-sky-900';

  const nodeFocusedClasses = isCurrent ? 'animate-pulse' : '';

  return (
    <BaseNode {...props}>
      <div
        data-testid={`default-node-${props.id}-content`}
        className={`flex min-w-full justify-center rounded-xl p-6 text-xl text-white ${nodeBackgroundColor} ${nodeFocusedClasses}`}
      >
        {data.help && (
          <div className="absolute right-3 top-3">
            <HelpIcon onClick={handleHelpClick} />
          </div>
        )}
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
