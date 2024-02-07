import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { DefaultNode } from 'components/Nodes/DefaultNode/DefaultNode';
import { useDAG } from 'hooks';
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
  const { onNodesChange, onEdgesChange } = useDAG();

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }} data-testid="decision-tree">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodeClick={onClick}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          fitView
          fitViewOptions={{ padding: 4 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};
