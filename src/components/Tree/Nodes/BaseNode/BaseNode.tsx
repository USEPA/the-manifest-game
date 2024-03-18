import { HelpIcon } from 'components/HelpIcon/HelpIcon';
import styles from 'components/Tree/Nodes/BaseNode/baseNode.module.css';
import { useTreeDirection } from 'hooks';
import { ReactNode, useEffect } from 'react';
import { Handle, NodeProps, Position, useUpdateNodeInternals } from 'reactflow';
import { DecisionStatus } from 'store/DecisionSlice/decisionSlice';

export interface BaseNodeProps extends Omit<NodeProps, 'data'> {
  children: ReactNode;
  status?: DecisionStatus;
  helpIcon?: boolean;
  helpOnClick?: () => void;
}

/**
 * A base node that all nodes should extend from.
 * @param props
 * @constructor
 */
export const BaseNode = ({
  id,
  isConnectable,
  children,
  status,
  helpIcon,
  helpOnClick,
}: BaseNodeProps) => {
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
        {helpIcon && (
          <div>
            <HelpIcon onClick={helpOnClick} />
          </div>
        )}
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
