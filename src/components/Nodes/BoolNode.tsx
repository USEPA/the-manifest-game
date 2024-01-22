import { Handle, NodeProps, Position } from 'reactflow';

import './bool-node.css';

interface BoolNodeData {
  question: string;
  yesId: string;
  noId: string;
}

export const BoolNode = ({ data, id }: NodeProps<BoolNodeData>) => {
  return (
    <div className="boolean-node">
      <Handle type="target" position={Position.Top} />
      <div className="boolean-node-text">
        <p>{data.question}</p>
      </div>
      <div className="boolean-node-options">
        <button>Yes</button>
        <button>No</button>
      </div>
      <Handle type="source" position={Position.Bottom} id={id} />
    </div>
  );
};
