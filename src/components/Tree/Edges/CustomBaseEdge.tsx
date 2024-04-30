import cc from 'classcat';
import { BaseEdgeProps } from 'reactflow';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const isNumeric = (n: any): n is number => !isNaN(n) && isFinite(n);

interface MyBaseEdgeProps extends BaseEdgeProps {
  className?: string;
}

/**
 * This base edge is copied from the React Flow library version 11 and modified to include
 * a className prop that allows us to conditionally apply a class to the edge. It reflects
 * the changes to BaseEdge in the React Flow library version 12 (not released at the time of
 * writing this code). When this project migrates to React Flow version 12, this file should
 * be removed and our custom edges should be updated to use the v12 BaseEdge.
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
