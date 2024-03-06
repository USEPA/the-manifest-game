import { useEffect } from 'react';
import useStore from 'store';
import { DagDirection } from 'store/DagSlice/dagSlice';

/**
 * Returns the current direction of the node layout and a setter. The direction can be set to
 * the values of a DagDirection.
 */
export const useTreeDirection = (initialDir?: DagDirection) => {
  const { direction, setDirection: setStoreDirection } = useStore((state) => state);

  /** set the direction of the tree layout */
  const setDirection = (direction: DagDirection) => {
    if (direction) setStoreDirection(direction);
  };

  useEffect(() => {
    if (initialDir) setStoreDirection(initialDir);
  }, [initialDir, setStoreDirection]);

  const isHorizontal: boolean = direction === 'LR';

  return [direction, setDirection, isHorizontal] as const;
};
