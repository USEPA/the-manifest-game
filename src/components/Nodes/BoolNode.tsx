import { Handle, NodeProps, Position } from "reactflow";

interface BoolNodeData {
  question: string;
}

export const BoolNode = (props: NodeProps<BoolNodeData>) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{props.data.question}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id={props.id} />
    </>
  );
};
