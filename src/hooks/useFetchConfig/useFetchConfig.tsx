import { BoolNodeData } from 'components/Nodes/BoolNode/BoolNode';
import { useEffect, useState } from 'react';
import { TreeNode } from 'store';
import { PositionUnawareDecisionTree } from 'store/DagSlice/dagSlice';

/**
 * Data needed by all TreeNodes that contains the nodes expanded state,
 * the node's children, and the node's text
 */
export interface NodeData {
  label: string;
  children: string[];
  expanded?: boolean;
}

/** data needed by the BooleanTreeNode to render decisions*/
export interface BooleanNodeData extends NodeData {
  yesId: string;
  noId: string;
}

/** Configuration for an individual node, part of the larger config*/
export interface NodeConfig {
  id: string;
  data: NodeData | BooleanNodeData;
  type?: string;
}

/**
 * A JSON serializable array of object that contains all the position unaware
 * nodes in the decision tree, before it is loaded into the store
 */
export type ConfigFile = {
  name: string;
  nodes?: Array<NodeConfig>;
};

interface UseFetchConfigError {
  message: string;
}

/** Parses the config file (an array of BoolNodeConfig and DefaultNodeConfig types) and returns a DecisionTree */
const parseConfig = (config: ConfigFile): PositionUnawareDecisionTree => {
  const tree: PositionUnawareDecisionTree = {};
  if (config.nodes === undefined || config.nodes.length === 0) {
    throw new Error('Error Parsing Config');
  }
  config.nodes.forEach((node, index) => {
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
  const [config, setConfig] = useState<PositionUnawareDecisionTree>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UseFetchConfigError | undefined>();

  useEffect(() => {
    setIsLoading(true);
    setConfig(undefined);
    setError(undefined);
    fetch(configPath)
      .then((response) => response.json())
      .then((data) => {
        try {
          const config = parseConfig(data);
          setConfig(config);
        } catch {
          setError({ message: 'Error Parsing Config' });
        }
      })
      .catch((error) => {
        setError({ message: `Network error: ${error}` });
      })
      .finally(() => setIsLoading(false));
  }, [configPath]);

  return {
    config,
    isLoading,
    error,
  } as const;
};
