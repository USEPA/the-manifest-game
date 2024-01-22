import { Handle, NodeProps, Position } from 'reactflow';

import 'components/Nodes/DefaultNode/default-node.css';

interface BoolNodeData {
  label: string;
}

export const DefaultNode = ({ data, id }: NodeProps<BoolNodeData>) => {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div className="default-node-text">
        <p>{data.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id={id} />
    </div>
  );
};
