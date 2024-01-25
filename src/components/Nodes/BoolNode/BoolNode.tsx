import { Handle, NodeProps, Position } from 'reactflow';

import 'components/Nodes/BoolNode/bool-node.css';

interface BoolNodeData {
  label: string;
  yesId: string;
  noId: string;
  children: string[];
}

export const BoolNode = ({ data, id, isConnectable }: NodeProps<BoolNodeData>) => {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="boolean-node-text">
        <p>{data.label}</p>
      </div>
      <div className="boolean-node-options">
        <button>Yes</button>
        <button>No</button>
      </div>
      <Handle type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />
    </>
  );
};
