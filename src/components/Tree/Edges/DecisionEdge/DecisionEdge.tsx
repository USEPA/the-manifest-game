import { CustomBaseEdge } from '@/components/Tree/Edges/CustomBaseEdge';
import { FaCheck } from 'react-icons/fa';
import { EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from 'reactflow';

export interface DecisionEdgeData {
  decisionMade?: boolean;
}

export type DecisionEdgeProps = EdgeProps<DecisionEdgeData>;

export const DecisionEdge = (props: DecisionEdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data } = props;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <CustomBaseEdge
        id={id}
        path={edgePath}
        className={`${data?.decisionMade ? 'stroke-green-600' : ''} stroke-2`}
      />
      {data?.decisionMade && (
        <EdgeLabelRenderer>
          <div
            className="rounded-full bg-green-600 p-2"
            style={{
              // see ReactFlow's documentation on labels for custom edges
              // https://reactflow.dev/learn/customization/custom-edges#adding-an-edge-label
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            <FaCheck className="text-white" size={20} aria-label="selected decision" />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
