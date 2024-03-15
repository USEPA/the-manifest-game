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

  console.log('decision made', props.data?.decisionMade, 'source ', props.source);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: props.data?.decisionMade ? '#05b485' : '',
          strokeWidth: '3px',
        }}
      />
    </>
  );
};
