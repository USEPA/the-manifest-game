import { useReactFlow, useViewport } from 'reactflow';

/**
 * Returns the current position and a setter
 */
export const useTreeViewport = () => {
  const { x, y, zoom } = useViewport();
  const { setCenter: setFlowCenter, getZoom } = useReactFlow();

  const setCenter = (
    xInput: number,
    yInput: number,
    options?: {
      duration?: number;
      zoom?: number;
    }
  ) => {
    setFlowCenter(xInput, yInput, options);
  };

  return { x, y, zoom, setCenter, getZoom } as const;
};
