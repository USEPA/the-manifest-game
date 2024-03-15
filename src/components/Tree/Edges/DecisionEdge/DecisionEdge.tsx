import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow';

export const DecisionEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <div data-testid={`tree-edge-${source}-${target}`}>
      <BaseEdge id={id} path={edgePath} />
    </div>
  );
};
