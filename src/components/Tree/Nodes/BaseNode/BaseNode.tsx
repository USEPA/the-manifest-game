import { useTreeDirection } from 'hooks';
import { ReactNode, useEffect } from 'react';
import { Handle, NodeProps, Position, useUpdateNodeInternals } from 'reactflow';

export interface BaseNodeProps extends Omit<NodeProps, 'data'> {
  children: ReactNode;
}

/**
 * A base node that all nodes should extend from. It provides the base functionality needed for nodes
 * to work within the decision tree.
 * @param props
 * @constructor
 */
export const BaseNode = ({ id, isConnectable, children }: BaseNodeProps) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [, , isHorizontal] = useTreeDirection();

  useEffect(() => {
    updateNodeInternals(id);
  }, [isHorizontal, updateNodeInternals, id]);

  return (
    <div data-testid={`node-${id}`}>
      <Handle
        data-testid={`${isHorizontal ? 'left' : 'top'}-handle`}
        type="target"
        position={isHorizontal ? Position.Left : Position.Top}
        isConnectable={isConnectable}
      />
      <div className="flex justify-evenly">{children}</div>
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
