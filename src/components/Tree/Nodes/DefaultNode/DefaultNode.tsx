import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';
import { useDecisions } from 'hooks/useDecisions/useDecisions';
import { useHelp } from 'hooks/useHelp/useHelp';
import { MouseEventHandler } from 'react';
import { NodeProps } from 'reactflow';
import { VertexData } from 'store/TreeSlice/treeSlice';

export const DefaultNode = ({ data, ...props }: NodeProps<VertexData>) => {
  const { showHelp } = useHelp();
  const { isCurrentDecision } = useDecisions(props.id);

  const handleHelpClick: MouseEventHandler = (event) => {
    try {
      showHelp(props.id);
      event.stopPropagation();
    } catch (error) {
      console.error(error);
    }
  };

  const nodeBackgroundColor = isCurrentDecision ? 'bg-green-800' : 'bg-rcraBlue';

  return (
    <BaseNode {...props}>
      <div
        data-testid={`default-node-${props.id}-content`}
        className={`flex min-w-full justify-center rounded-xl p-6 text-xl text-white ${nodeBackgroundColor}`}
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
