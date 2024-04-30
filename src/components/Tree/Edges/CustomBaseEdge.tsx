import cc from 'classcat';
import { BaseEdgeProps } from 'reactflow';

interface MyBaseEdgeProps extends BaseEdgeProps {
  className?: string;
}

/**
 * This component is copied from the React Flow library paired down/modified to include
 * a className prop that allows us to apply a class to the edge. It reflects
 * the changes to BaseEdge in the React Flow library version 12 (not released at the time of
 * writing this code). When this project migrates to React Flow version 12, this file should
 * be removed and our custom edges should be updated to use the v12 BaseEdge.
 * https://github.com/xyflow/xyflow/blob/c318288703292d9faf03e3f6e31bfba82c540b2c/packages/react/src/components/Edges/BaseEdge.tsx#L7
 */
export function CustomBaseEdge({
  id,
  path,
  style,
  markerEnd,
  markerStart,
  className,
}: MyBaseEdgeProps) {
  return (
    <>
      <path
        id={id}
        style={style}
        d={path}
        fill="none"
        className={cc(['react-flow__edge-path', className])}
        markerEnd={markerEnd}
        markerStart={markerStart}
        data-testid="edgePath"
      />
    </>
  );
}
