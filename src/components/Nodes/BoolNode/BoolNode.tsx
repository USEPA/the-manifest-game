import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { Handle, NodeProps, Position } from 'reactflow';

import 'components/Nodes/BoolNode/bool-node.css';

interface BoolNodeData {
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
  const { showNode, hideNode } = useTreeNodes();

  const handleYes = () => {
    showNode(yesId);
    hideNode(noId);
  };

  const handleNo = () => {
    showNode(noId);
    hideNode(yesId);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="boolean-node-text">
        <p>{label}</p>
      </div>
      <div className="boolean-node-options">
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
      <Handle type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />
    </>
  );
};
