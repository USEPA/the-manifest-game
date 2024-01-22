import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { DefaultNode } from 'components/Nodes/DefaultNode/DefaultNode';
import { getLayoutElements } from 'components/Tree/layout';
import { useDecisionTree } from 'hooks';
import React, { useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow';
import { dummyManifestTree } from './nodes';

export const Tree = () => {
  const { nodes: rawNodes, edges: rawEdges, onClick } = useDecisionTree(dummyManifestTree);

  const { nodes, edges } = getLayoutElements(rawNodes, rawEdges);

  const nodeTypes = useMemo(() => ({ BoolNode: BoolNode, default: DefaultNode }), []);

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
