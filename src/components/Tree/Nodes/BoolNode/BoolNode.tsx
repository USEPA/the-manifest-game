import { BaseNode } from 'components/Tree/Nodes/BaseNode/BaseNode';

import styles from 'components/Tree/Nodes/BoolNode/bool.module.css';
import { useDecisionTree } from 'hooks';
import { useState } from 'react';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

export interface BoolNodeData extends NodeData {
  label: string;
  yesId: string;
  noId: string;
  children: string[];
}

export const BoolNode = ({
  data: { yesId, noId, label, status },
  id,
  ...props
}: NodeProps<BoolNodeData>) => {
  const {
    showNode,
    showChildren,
    hideNiblings,
    hideDescendants,
    markDecisionMade,
    markDecisionFocused,
    addToPath,
  } = useDecisionTree();
  const [selected, setSelected] = useState<'yes' | 'no' | undefined>(undefined);

  const handleYes = () => {
    showNode(yesId, { parentId: id });
    showChildren(yesId);
    hideNiblings(id);
    hideDescendants(noId);
    markDecisionMade(id);
    markDecisionFocused(yesId);
    addToPath(id, yesId);
    setSelected('yes');
  };

  const handleNo = () => {
    showNode(noId, { parentId: id });
    showChildren(noId);
    hideNiblings(id);
    hideDescendants(yesId);
    markDecisionMade(id);
    markDecisionFocused(noId);
    addToPath(id, noId);
    setSelected('no');
  };

  return (
    <BaseNode {...props} id={id}>
      <div className={`${styles.boolNodeContent} ${status ?? status}`}>
        <div className={styles.boolNodeText}>
          <span>{label}</span>
        </div>
        <div className={styles.boolNodeOptions}>
          <button
            onClick={handleYes}
            className={selected === 'yes' ? styles.selected : ''}
            data-testid={`${id}-yes-button`}
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className={selected === 'no' ? styles.selected : ''}
            data-testid={`${id}-no-button`}
          >
            No
          </button>
        </div>
      </div>
    </BaseNode>
  );
};
