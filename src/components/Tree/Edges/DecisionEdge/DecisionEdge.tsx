import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow';

interface DecisionEdgeData {
  sourceDecisionMade?: boolean;
  targetDecisionMade?: boolean;
}

interface DecisionEdgeProps extends EdgeProps<DecisionEdgeData> {}

export const DecisionEdge = (props: DecisionEdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: props.data?.sourceDecisionMade ? '#05b485' : '',
          strokeWidth: '3px',
        }}
      />
    </>
  );
};
