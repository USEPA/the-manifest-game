import { DragHandle } from 'components/Nodes/DragHandle/DragHandle';
import { useTreeDirection } from 'hooks/useTreeDirection/useTreeDirection';
import { useEffect } from 'react';
import { Handle, NodeProps, Position, useUpdateNodeInternals } from 'reactflow';

import styles from './default.module.css';

interface BoolNodeData {
  label: string;
}

export const DefaultNode = ({ data, id, isConnectable }: NodeProps<BoolNodeData>) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [, , isHorizontal] = useTreeDirection();

  useEffect(() => {
    updateNodeInternals(id);
  }, [isHorizontal, updateNodeInternals, id]);

  return (
    <div data-testid={`node-${id}`}>
      <Handle
        type="target"
        position={isHorizontal ? Position.Left : Position.Top}
        isConnectable={isConnectable}
      />
      <div className={styles.defaultNodeText}>
        <span>{data.label}</span>
        <DragHandle />
      </div>
      <Handle
        type="source"
        position={isHorizontal ? Position.Right : Position.Bottom}
        id={id}
        isConnectable={isConnectable}
      />
    </div>
  );
};
