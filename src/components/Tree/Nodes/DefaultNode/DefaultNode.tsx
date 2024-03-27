import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';

import styles from 'components/Tree/Nodes/DefaultNode/default.module.css';
import { useHelp } from 'hooks/useHelp/useHelp';
import { MouseEventHandler } from 'react';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

export const DefaultNode = ({ data, ...props }: NodeProps<NodeData>) => {
  const { showHelp } = useHelp();

  const handleHelpClick: MouseEventHandler = (event) => {
    showHelp(props.id);
    event.stopPropagation();
  };

  return (
    <BaseNode {...props}>
      <div
        data-testid={`default-node-${props.id}-content`}
        // className={`${styles.defaultNodeContent}  rounded-xl ${data.status ? 'bg-teal-700' : ''}`}
        className={`flex min-w-80 flex-col items-center justify-center rounded-xl p-6 text-xl text-white ${data.status ? 'bg-teal-700' : 'bg-gradient-to-b from-sky-700 to-sky-900'} ${data.status === 'focused' ? 'animate-pulse' : ''}`}
      >
        {data.help && (
          <div className={styles.helpIcon}>
            <HelpIcon onClick={handleHelpClick} />
          </div>
        )}
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
