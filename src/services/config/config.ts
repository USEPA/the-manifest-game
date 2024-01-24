// import testJson from "/submit-manifest.json";

import { DecisionTree, TreeNode } from 'store/treeStore';

export interface BaseConfig {
  id: string;
  type?: 'default' | 'BoolNode';
  data: {
    label: string;
    children?: string[];
  };
}

export interface DefaultNodeConfig extends BaseConfig {
  type?: 'default';
}

export interface BoolNodeConfig extends BaseConfig {
  type: 'BoolNode';
  data: {
    label: string;
    yesId: string;
    noId: string;
  };
}

/** Create a decision tree with defaults applied from configs*/
export const loadTree = (configs: Array<BoolNodeConfig | DefaultNodeConfig>): DecisionTree => {
  const tree: DecisionTree = {};

  configs.forEach((config) => {
    const children =
      config.type === 'BoolNode' ? [config.data.yesId, config.data.noId] : config.data.children;
    const node: TreeNode = {
      ...config,
      type: config.type ? config.type : 'default',
      data: {
        ...config.data,
        children: children || [],
      },
    };
    tree[node.id] = node;
  });

  return tree;
};
