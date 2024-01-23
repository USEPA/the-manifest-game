// import testJson from "/submit-manifest.json";

import { BoolNodeConfig, DefaultNodeConfig } from 'store/jsonDummyTree';
import { DecisionTree, TreeNode } from 'store/treeStore';

/** Create a decision tree with defaults applied from configs*/
export const loadTree = (configs: Array<BoolNodeConfig | DefaultNodeConfig>): DecisionTree => {
  const tree: DecisionTree = {};

  configs.forEach((config) => {
    const node: TreeNode = {
      ...config,
    };
    if (!('children' in config) && !('yesId' in config) && !('noId' in config)) {
      throw new Error(`Invalid node config ${JSON.stringify(config)}`);
    }
    tree[node.id] = node;
  });

  return tree;
};
