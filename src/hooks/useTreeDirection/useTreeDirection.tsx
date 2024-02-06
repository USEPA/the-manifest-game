import { useEffect } from 'react';
import useStore from 'store';
import { DagDirection } from 'store/DagSlice/dagSlice';

/**
 * Returns the current direction of the node layout and a setter. The direction can be set to
 * the values of a DagDirection.
 */
export const useTreeDirection = (initialDir: DagDirection) => {
  const { dagDirection: direction, setDagDirection } = useStore((state) => state);

  /** set the direction of the tree layout */
  const setDirection = (direction: DagDirection) => {
    if (direction) setDagDirection(direction);
  };

  useEffect(() => {
    if (initialDir) setDagDirection(initialDir);
  }, [initialDir, setDagDirection]);

  return [direction, setDirection] as const;
};
