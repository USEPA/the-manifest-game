import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';

import styles from 'components/Tree/Nodes/DefaultNode/default.module.css';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

export const DefaultNode = ({ data, ...props }: NodeProps<NodeData>) => {
  return (
    <BaseNode {...props}>
      <div
        data-testid={`default-node-${props.id}-content`}
        className={`${styles.defaultNodeText} ${data.status ? data.status : ''}`}
      >
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
