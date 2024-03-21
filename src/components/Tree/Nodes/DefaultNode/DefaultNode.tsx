import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';

import styles from 'components/Tree/Nodes/DefaultNode/default.module.css';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

export const DefaultNode = ({ data, ...props }: NodeProps<NodeData>) => {
  return (
    <BaseNode {...props}>
      <div className={styles.defaultNodeText}>
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
