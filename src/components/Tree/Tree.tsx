import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { DefaultNode } from 'components/Nodes/DefaultNode/DefaultNode';
import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  NodeMouseHandler,
} from 'reactflow';
import { DagNode } from 'store/DagSlice/dagSlice';

export interface TreeProps {
  nodes: DagNode[];
  edges: Edge[];
  onClick: NodeMouseHandler;
}

/**
 * Tree - responsible for rendering the decision tree
 */
export const Tree = ({ nodes, edges, onClick }: TreeProps) => {
  const nodeTypes = useMemo(() => ({ BoolNode: BoolNode, default: DefaultNode }), []);

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
