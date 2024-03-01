import { BoolNode } from 'components/Nodes/BoolNode/BoolNode';
import { DefaultNode } from 'components/Nodes/DefaultNode/DefaultNode';
import { ControlCenter } from 'components/Tree/ControlCenter';
import { useDAG, useTreeDirection } from 'hooks';
import React, { useMemo, useState } from 'react';
import ReactFlow, {
  Edge,
  MiniMap,
  NodeMouseHandler,
  useReactFlow,
  useViewport,
  XYPosition,
} from 'reactflow';
import { DagNode } from 'store/DagSlice/dagSlice';

export interface TreeProps {
  nodes: DagNode[];
  edges: Edge[];
  onClick: NodeMouseHandler;
  mapVisible?: boolean;
}

/**
 * Tree - responsible for rendering the decision tree
 */
export const Tree = ({ nodes, edges, onClick }: TreeProps) => {
  const nodeTypes = useMemo(() => ({ BoolNode: BoolNode, default: DefaultNode }), []);
  const { onNodesChange, onEdgesChange } = useDAG();
  const [mapVisible, setMapVisible] = useState(true);
  const [direction, setDirection] = useTreeDirection();
  const { setCenter } = useReactFlow();
  const { zoom } = useViewport();

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
          fitViewOptions={{ padding: 5, minZoom: 0.5, maxZoom: 5 }}
          proOptions={{ hideAttribution: true }}
        >
          {mapVisible && (
            <MiniMap
              nodeStrokeWidth={3}
              data-testid="tree-mini-map"
              nodeColor="#3E6D9BAA"
              zoomable={true}
              onClick={(_event: React.MouseEvent, position: XYPosition) =>
                setCenter(position.x, position.y, { zoom: zoom, duration: 1.5 })
              }
            />
          )}
          <ControlCenter
            mapVisible={mapVisible}
            setMapVisible={setMapVisible}
            direction={direction}
            setDirection={setDirection}
          />
        </ReactFlow>
      </div>
    </>
  );
};
