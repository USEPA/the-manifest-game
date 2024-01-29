import { BoolNodeData } from 'components/Nodes/BoolNode/BoolNode';
import { useEffect, useState } from 'react';
import { BoolNodeConfig, DefaultNodeConfig } from 'services/config/config';
import { DecisionTree, TreeNode } from 'store';

interface UseFetchConfigError {
  message: string;
}

/** Parses the config file (an array of BoolNodeConfig and DefaultNodeConfig types) and returns a DecisionTree */
const parseConfig = (config: Array<BoolNodeConfig | DefaultNodeConfig>): DecisionTree => {
  const tree: DecisionTree = {};
  config.forEach((node, index) => {
    if (node.type === 'BoolNode') {
      const { id, data } = node;
      tree[id] = {
        id,
        data: {
          ...data,
        } as BoolNodeData,
        type: node.type,
        hidden: index !== 0,
      };
    } else {
      const { id, data } = node;
      tree[id] = {
        id,
        data,
        type: node.type,
        hidden: index !== 0,
      } as TreeNode;
    }
  });
  return tree;
};

/**
 * This hook is used to fetch the config from the server.
 */
export const useFetchConfig = (configPath: string) => {
  const [tree, setTree] = useState<DecisionTree>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UseFetchConfigError | undefined>();

  useEffect(() => {
    setIsLoading(true);
    setTree(undefined);
    setError(undefined);
    fetch(configPath)
      .then((response) => response.json())
      .then((data) => {
        setTree(parseConfig(data));
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [configPath]);

  return {
    tree,
    isLoading,
    error,
  } as const;
};
