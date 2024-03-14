import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

import styles from './default.module.css';

export const DefaultNode = ({ data, ...props }: NodeProps<NodeData>) => {
  return (
    <BaseNode {...props} status={data.status}>
      <div className={styles.defaultNodeText}>
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
