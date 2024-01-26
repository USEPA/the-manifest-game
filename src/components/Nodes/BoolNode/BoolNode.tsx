import { useTreeNodes } from 'hooks/useTreeNodes/useTreeNodes';
import { Handle, NodeProps, Position } from 'reactflow';

import 'components/Nodes/BoolNode/bool-node.css';

interface BoolNodeData {
  label: string;
  yesId: string;
  noId: string;
  children: string[];
}

export const BoolNode = ({ data, id, isConnectable }: NodeProps<BoolNodeData>) => {
  const { showNode, hideNode } = useTreeNodes();

  const handleYes = () => {
    showNode({ nodeId: data.yesId, hide: false });
    hideNode(data.noId);
  };

  const handleNo = () => {
    showNode({ nodeId: data.noId, hide: false });
    hideNode(data.yesId);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="boolean-node-text">
        <p>{data.label}</p>
      </div>
      <div className="boolean-node-options">
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
      <Handle type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />
    </>
  );
};
