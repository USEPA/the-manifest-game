import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UsesPathReturn {
  pathQueryParam: string;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const useUrl = () => {
  const [urlQueryParams, setUrlQueryParams] = useSearchParams();
  const [pathQueryParam] = useState<string | null | undefined>(urlQueryParams.get('path'));

  return {
    pathQueryParam,
  } as UsesPathReturn;
};
