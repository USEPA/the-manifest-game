import { useState } from 'react';

export interface UsesPathReturn {
  pathQueryParam: string;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const useUrl = () => {
  const [pathQueryParam] = useState<string | null | undefined>();

  return {
    pathQueryParam,
  } as UsesPathReturn;
};
