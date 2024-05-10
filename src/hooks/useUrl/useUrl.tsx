import { useDecisions } from 'hooks/useDecisions/useDecisions';
import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export interface UsesPathReturn {
  pathParam: string;
  setPathParam: (pathId: string) => void;
  pathname: string;
  copyTreeUrlToClipboard: () => void;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const useUrl = () => {
  const [urlQueryParams, setUrlQueryParams] = useSearchParams();
  const [pathParam, setPathParam] = useState<string | null | undefined>(urlQueryParams.get('path'));
  const { pathname } = useLocation();
  const { path } = useDecisions();

  const setUrlPathId = (pathId: string) => {
    urlQueryParams.set('path', pathId);
    setUrlQueryParams(urlQueryParams);
    setPathParam(pathId);
  };

  const copyUrl = () => {
    if (path.length < 1) return;
    setUrlPathId(path[path.length - 1].selected);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => window.alert('URL copied to clipboard'));
  };

  return {
    pathParam,
    setPathParam: setUrlPathId,
    pathname,
    copyTreeUrlToClipboard: copyUrl,
  } as UsesPathReturn;
};
