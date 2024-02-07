import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { NodeProps } from 'reactflow';

import styles from './default.module.css';

interface BoolNodeData {
  label: string;
}

export const DefaultNode = ({ data, ...props }: NodeProps<BoolNodeData>) => {
  return (
    <BaseNode {...props}>
      <div className={styles.defaultNodeText}>
        <span>{data.label}</span>
      </div>
    </BaseNode>
  );
};
