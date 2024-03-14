import styles from 'components/Tree/Nodes/BaseNode/baseNode.module.css';
import { DragHandle } from 'components/Tree/Nodes/BaseNode/DragHandle/DragHandle';
import { useTreeDirection } from 'hooks';
import { ReactNode, useEffect } from 'react';
import { Handle, NodeProps, Position, useUpdateNodeInternals } from 'reactflow';
import { DecisionStatus } from 'store/DecisionSlice/decisionSlice';

interface BaseNodeProps extends Omit<NodeProps, 'data'> {
  children: ReactNode;
  status?: DecisionStatus;
}

/**
 * A base node that all nodes should extend from.
 * @param props
 * @constructor
 */
export const BaseNode = ({ id, isConnectable, children, status }: BaseNodeProps) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [, , isHorizontal] = useTreeDirection();

  useEffect(() => {
    updateNodeInternals(id);
  }, [isHorizontal, updateNodeInternals, id]);

  return (
    <div data-testid={`node-${id}`} className={status ? status : ''}>
      <Handle
        data-testid={`${isHorizontal ? 'left' : 'top'}-handle`}
        type="target"
        position={isHorizontal ? Position.Left : Position.Top}
        isConnectable={isConnectable}
      />
      <div className={styles.nodeContent}>
        {children}
        <DragHandle />
      </div>
      <Handle
        data-testid={`${isHorizontal ? 'right' : 'bottom'}-handle`}
        type="source"
        position={isHorizontal ? Position.Right : Position.Bottom}
        id={id}
        isConnectable={isConnectable}
      />
    </div>
  );
};
