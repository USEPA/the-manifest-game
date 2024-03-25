import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow';

export interface DecisionEdgeData {
  decisionMade?: boolean;
}

export interface DecisionEdgeProps extends EdgeProps<DecisionEdgeData> {}

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
          stroke: props.data?.decisionMade ? '#00754e' : '',
          strokeWidth: '3px',
        }}
      />
    </>
  );
};
