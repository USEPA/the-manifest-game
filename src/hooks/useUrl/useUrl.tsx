import { useDecisions } from '@/hooks/useDecisions/useDecisions';
import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export interface UsesPathReturn {
  pathParam: string;
  setPathParam: (pathId: string) => void;
  treeParam: string;
  setTreeParam: (treeId: string) => void;
  pathname: string;
  copyTreeUrlToClipboard: () => void;
}

/**
 * custom hook for interacting with the path taken through the decision tree
 */
export const useUrl = () => {
  const [urlQueryParams, setUrlQueryParams] = useSearchParams();
  const [pathParam, setPathParam] = useState<string | null | undefined>(urlQueryParams.get('path'));
  const [treeParam, setTreeParam] = useState<string | null | undefined>(urlQueryParams.get('tree'));
  const { pathname } = useLocation();
  const { path } = useDecisions();

  const setUrlPathId = (pathId: string) => {
    urlQueryParams.set('path', pathId);
    setUrlQueryParams(urlQueryParams);
    setPathParam(pathId);
  };

  const setUrlTreeId = (treeId: string) => {
    urlQueryParams.set('tree', treeId);
    setUrlQueryParams(urlQueryParams);
    setTreeParam(treeId);
  };

  const copyUrl = () => {
    if (path.length < 1) return;
    setUrlPathId(path[path.length - 1].selected);
    void navigator.clipboard
      .writeText(window.location.href)
      .then(() => window.alert('URL copied to clipboard'));
  };

  return {
    pathParam,
    setPathParam: setUrlPathId,
    treeParam,
    setTreeParam: setUrlTreeId,
    pathname,
    copyTreeUrlToClipboard: copyUrl,
  } as UsesPathReturn;
};
