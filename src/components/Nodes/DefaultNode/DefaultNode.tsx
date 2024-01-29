import { Handle, NodeProps, Position } from 'reactflow';

import styles from './default.module.css';

interface BoolNodeData {
  label: string;
}

export const DefaultNode = ({ data, id, isConnectable }: NodeProps<BoolNodeData>) => {
  return (
    <div data-testid={`node-${id}`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className={styles.defaultNodeText}>
        <p>{data.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />
    </div>
  );
};
