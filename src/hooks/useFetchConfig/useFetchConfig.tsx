import { BoolNodeData } from 'components/Nodes/BoolNode/BoolNode';
import { useEffect, useState } from 'react';
import { TreeNode } from 'store';
import { PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';

/**
 * data needed by all TreeNodes that contains the nodes expanded state, the node's children, and the node's text
 */
export interface NodeData {
  label: string;
  children: string[];
  expanded?: boolean;
}

/**
 * data needed by the BooleanTreeNode to render decisions
 */
export interface BooleanNodeData extends NodeData {
  yesId: string;
  noId: string;
}

/**
 * An individual object to configure a node, part of the tree config
 */
export interface TreeNodeConfig {
  id: string;
  data: NodeData | BooleanNodeData;
  type?: string;
}

/**
 * A tree config is a JSON serializable array of object that contains all the position unaware
 * nodes in the decision tree, before it is loaded into the store
 */
export type TreeConfig = Array<TreeNodeConfig>;

interface UseFetchConfigError {
  message: string;
}

export interface BaseConfig {
  id: string;
  type?: 'default' | 'BoolNode';
  data: {
    label: string;
    children?: string[];
  };
}

/** Parses the config file (an array of BoolNodeConfig and DefaultNodeConfig types) and returns a DecisionTree */
const parseConfig = (config: TreeConfig): PositionUnawareDecisionTree => {
  const tree: PositionUnawareDecisionTree = {};
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
  const [tree, setTree] = useState<PositionUnawareDecisionTree>();
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
