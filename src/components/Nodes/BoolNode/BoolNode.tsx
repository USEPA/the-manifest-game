import { DragHandle } from 'components/Nodes/DragHandle/DragHandle';
import { useDAG } from 'hooks/useDAG/useDAG';
import { useTreeDirection } from 'hooks/useTreeDirection/useTreeDirection';
import { useEffect } from 'react';
import { Handle, NodeProps, Position, useUpdateNodeInternals } from 'reactflow';

import styles from './bool.module.css';

export interface BoolNodeData {
  label: string;
  yesId: string;
  noId: string;
  children: string[];
}

export const BoolNode = ({
  data: { yesId, noId, label },
  id,
  isConnectable,
}: NodeProps<BoolNodeData>) => {
  const { showNode, hideNode } = useDAG();
  const updateNodeInternals = useUpdateNodeInternals();
  const [, , isHorizontal] = useTreeDirection();

  useEffect(() => {
    // Since we dynamically change the handle locations, we need to update the node internals
    // or the edges will not be re-rendered by react flow.
    updateNodeInternals(id);
  }, [isHorizontal, updateNodeInternals, id]);

  const handleYes = () => {
    showNode(yesId, { parentId: id });
    hideNode(noId);
  };

  const handleNo = () => {
    showNode(noId, { parentId: id });
    hideNode(yesId);
  };

  return (
    <div data-testid={`node-${id}`}>
      <Handle
        type="target"
        position={isHorizontal ? Position.Left : Position.Top}
        isConnectable={isConnectable}
      />
      <div className={styles.boolNodeText}>
        <span>{label}</span>
        <DragHandle />
      </div>
      <div className={styles.boolNodeOptions}>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
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
