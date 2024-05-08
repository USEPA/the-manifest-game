import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UsesPathReturn {
  pathParam: string;
  setPathParam: (pathId: string) => void;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const useUrl = () => {
  const [urlQueryParams, setUrlQueryParams] = useSearchParams();
  const [pathParam, setPathParam] = useState<string | null | undefined>(urlQueryParams.get('path'));

  const setUrlPathId = (pathId: string) => {
    urlQueryParams.set('path', pathId);
    setUrlQueryParams(urlQueryParams);
    setPathParam(pathId);
  };

  return {
    pathParam,
    setPathParam: setUrlPathId,
  } as UsesPathReturn;
};
