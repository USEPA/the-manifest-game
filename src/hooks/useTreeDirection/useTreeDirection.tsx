import { useEffect } from 'react';
import useTreeStore, { TreeDirection } from '@/store';

/**
 * Returns the current direction of the node layout and a setter. The direction can be set to
 * the values of a .
 */
export const useTreeDirection = (initialDir?: TreeDirection) => {
  const { direction, setDirection: setStoreDirection } = useTreeStore((state) => state);

  /** set the direction of the tree layout */
  const setDirection = (direction: TreeDirection) => {
    if (direction) setStoreDirection(direction);
  };

  useEffect(() => {
    if (initialDir) setStoreDirection(initialDir);
  }, [initialDir, setStoreDirection]);

  const isHorizontal: boolean = direction === 'LR';

  return [direction, setDirection, isHorizontal] as const;
};
