import { Handle, NodeProps, Position } from "reactflow";

import "./bool-node.css";

interface BoolNodeData {
  question: string;
}

export const BoolNode = (props: NodeProps<BoolNodeData>) => {
  return (
    <div className="boolean-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{props.data.question}</p>
      </div>
      <div className="boolean-node-options">
        <button>Yes</button>
        <button>No</button>
      </div>
      <Handle type="source" position={Position.Bottom} id={props.id} />
    </div>
  );
};
