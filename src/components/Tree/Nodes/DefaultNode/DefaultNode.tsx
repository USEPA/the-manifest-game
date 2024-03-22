import { HelpIcon } from 'components/Help/HelpIcon/HelpIcon';
import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';

import styles from 'components/Tree/Nodes/DefaultNode/default.module.css';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

export const DefaultNode = ({ data, ...props }: NodeProps<NodeData>) => {
  return (
    <BaseNode {...props}>
      <div
        data-testid={`default-node-${props.id}-content`}
        className={`${styles.defaultNodeContent} ${data.status ? data.status : ''}`}
      >
        {data.help && (
          <div className={styles.helpIcon}>
            <HelpIcon onClick={() => console.log(`node help clicked ${props.id}`)} />
          </div>
        )}
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
