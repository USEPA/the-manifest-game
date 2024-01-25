import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { DefaultNode } from 'components/Nodes/DefaultNode/DefaultNode';
import { getLayoutElements } from 'components/Tree/layout';
import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  NodeMouseHandler,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';
import { DecisionTreeNode } from 'store';

interface TreeProps {
  nodes: DecisionTreeNode[];
  edges: Edge[];
  onClick: NodeMouseHandler;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

/**
 * Tree - responsible for rendering the decision tree
 */
export const Tree = ({
  nodes: rawNodes,
  edges: rawEdges,
  onClick,
  onEdgesChange,
  onNodesChange,
  onConnect,
}: TreeProps) => {
  const nodeTypes = useMemo(() => ({ BoolNode: BoolNode, default: DefaultNode }), []);

  const { nodes, edges } = getLayoutElements(rawNodes, rawEdges);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodeClick={onClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};
