import { CustomBaseEdge } from 'components/Tree/Edges/CustomBaseEdge';
import { FaCheck } from 'react-icons/fa';
import { EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from 'reactflow';

export interface DecisionEdgeData {
  decisionMade?: boolean;
}

export interface DecisionEdgeProps extends EdgeProps<DecisionEdgeData> {}

export const DecisionEdge = (props: DecisionEdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
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
        className={`${props.data?.decisionMade ? 'stroke-green-600' : ''} stroke-2`}
        // style={{
        //   stroke: props.data?.decisionMade ? '#0D766E' : '',
        //   strokeWidth: '3px',
        // }}
      />
      <EdgeLabelRenderer>
        <div
          className="rounded-full bg-green-600 p-2"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <FaCheck className="text-white" size={20} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
