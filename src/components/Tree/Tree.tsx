import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { DefaultNode } from 'components/Nodes/DefaultNode/DefaultNode';
import { useDecisionTree } from 'hooks';
import React, { useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow';
import { DecisionTree } from 'store';

export interface TreeProps {
  tree: DecisionTree;
}

/**
 * Tree - responsible for rendering the decision tree
 */
export const Tree = ({ tree }: TreeProps) => {
  const nodeTypes = useMemo(() => ({ BoolNode: BoolNode, default: DefaultNode }), []);
  const { nodes, edges, onClick } = useDecisionTree(tree);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }} data-testid="decision-tree">
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} onNodeClick={onClick}>
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};
