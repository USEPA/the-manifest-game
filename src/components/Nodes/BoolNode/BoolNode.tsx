import { BaseNode } from 'components/Nodes/BaseNode/BaseNode';
import { useDecisionTree } from 'hooks';
import { useState } from 'react';
import { NodeProps } from 'reactflow';
import { NodeData } from 'store/DecisionSlice/decisionSlice';

import styles from './bool.module.css';

export interface BoolNodeData extends NodeData {
  label: string;
  yesId: string;
  noId: string;
  children: string[];
}

export const BoolNode = ({
  data: { yesId, noId, label, chosen, status },
  id,
  ...props
}: NodeProps<BoolNodeData>) => {
  const { showNode, showChildren, hideNiblings, hideDescendants, markDecisionMade } =
    useDecisionTree();
  const [selected, setSelected] = useState<'yes' | 'no' | undefined>(undefined);

  const handleYes = () => {
    showNode(yesId, { parentId: id });
    showChildren(yesId);
    hideNiblings(id);
    hideDescendants(noId);
    markDecisionMade(yesId);
    markDecisionMade(id);
    setSelected('yes');
  };

  const handleNo = () => {
    showNode(noId, { parentId: id });
    showChildren(noId);
    hideNiblings(id);
    hideDescendants(yesId);
    markDecisionMade(noId);
    markDecisionMade(id);
    setSelected('no');
  };

  return (
    <BaseNode {...props} id={id} chosen={chosen} status={status}>
      <div className={styles.boolNodeContent}>
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
