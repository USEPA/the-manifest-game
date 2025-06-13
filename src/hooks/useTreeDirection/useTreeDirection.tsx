import { TreeDirection, useTreeStore } from '@/store';
import { ORIENTATION } from '@/store/TreeSlice/treeSlice';
import { useEffect } from 'react';

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

  const isHorizontal: boolean = direction === ORIENTATION.leftToRight;

  return [direction, setDirection, isHorizontal] as const;
};
