import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { useDAG } from 'hooks/useDAG/useDAG';
import { NodeProps } from 'reactflow';

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
  ...props
}: NodeProps<BoolNodeData>) => {
  const { showNode, hideNode } = useDAG();

  const handleYes = () => {
    showNode(yesId, { parentId: id });
    hideNode(noId);
  };

  const handleNo = () => {
    showNode(noId, { parentId: id });
    hideNode(yesId);
  };

  return (
    <BaseNode {...props} id={id}>
      <div className={styles.boolNodeContent}>
        <div className={styles.boolNodeText}>
          <span>{label}</span>
        </div>
        <div className={styles.boolNodeOptions}>
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNo}>No</button>
        </div>
      </div>
    </BaseNode>
  );
};
