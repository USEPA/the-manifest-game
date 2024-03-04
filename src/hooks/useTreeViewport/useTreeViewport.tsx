import { useReactFlow, useViewport } from 'reactflow';

/**
 * Returns the current position and a setter
 */
export const useTreeViewport = () => {
  const { x, y, zoom } = useViewport();
  const { setCenter } = useReactFlow();

  return { x, y, zoom, setCenter } as const;
};
