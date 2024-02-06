import { useDAG } from 'hooks/useDAG/useDAG';
import { useTreeDirection } from 'hooks/useTreeDirection/useTreeDirection';
import { Handle, NodeProps, Position } from 'reactflow';

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
  const [, , isHorizontal] = useTreeDirection();

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
        <p>{label}</p>
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
