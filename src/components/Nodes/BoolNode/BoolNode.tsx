import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { useTreeStore } from 'hooks';
import { useState } from 'react';
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
  const { showNode, hideNode } = useTreeStore();
  const [selected, setSelected] = useState<'yes' | 'no' | undefined>(undefined);

  const handleYes = () => {
    showNode(yesId, { parentId: id });
    hideNode(noId);
    setSelected('yes');
  };

  const handleNo = () => {
    showNode(noId, { parentId: id });
    hideNode(yesId);
    setSelected('no');
  };

  return (
    <BaseNode {...props} id={id}>
      <div className={styles.boolNodeContent}>
        <div className={styles.boolNodeText}>
          <span>{label}</span>
        </div>
        <div className={styles.boolNodeOptions}>
          <button onClick={handleYes} className={selected === 'yes' ? styles.selected : ''}>
            Yes
          </button>
          <button onClick={handleNo} className={selected === 'no' ? styles.selected : ''}>
            No
          </button>
        </div>
      </div>
    </BaseNode>
  );
};
