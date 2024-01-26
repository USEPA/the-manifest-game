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
} from 'reactflow';
import { DagNode } from 'store';

interface TreeProps {
  nodes: DagNode[];
  edges: Edge[];
  onClick: NodeMouseHandler;
}

/**
 * Tree - responsible for rendering the decision tree
 */
export const Tree = ({ nodes: rawNodes, edges: rawEdges, onClick }: TreeProps) => {
  const nodeTypes = useMemo(() => ({ BoolNode: BoolNode, default: DefaultNode }), []);

  const { nodes, edges } = getLayoutElements(rawNodes, rawEdges);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} onNodeClick={onClick}>
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};
