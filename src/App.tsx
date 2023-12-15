import {useCallback} from 'react';
import ReactFlow, {useNodesState, useEdgesState, addEdge, Node, MiniMap, Controls, Edge, Connection} from 'reactflow';

import 'reactflow/dist/style.css';

interface ManifestNode extends Node {
}

const initialNodes: Array<ManifestNode> = [
    {id: '1', connectable: false, draggable: false, position: {x: 100, y: 100}, data: {label: 'foo'}},
    {id: '2', hidden: true, connectable: false, draggable: false, position: {x: 100, y: 200}, data: {label: 'bar'}},
    {id: '3', hidden: true, connectable: false, draggable: false, position: {x: 300, y: 200}, data: {label: 'xxx'}},
];
const initialEdges: Array<Edge> = [{id: 'e1-2', source: '1', target: '2'}, {id: 'e1-3', source: '1', target: '3'}];

const getNodeTargets = ({edges, source}: { edges: Array<Edge>, source: string }): Array<string> => {
    const targets = edges.filter(edge => edge.source === source).map(edge => edge.target)
    console.log(targets)
    return targets
}

const setHiddenFalse = ({targets, nodes}: { targets: Array<string>, nodes: Array<Node> }): Array<Node> => {
    return nodes.map(node => {
        if (targets.includes(node.id)) {
            return {...node, hidden: false}
        }
        return node
    })

}

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onClick = (event: any, node: any) => {
        const targets = getNodeTargets({edges, source: node.id})
        const newNodes = setHiddenFalse({nodes, targets})
        setNodes(newNodes)
    }

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onClick}
            >
                <MiniMap nodeStrokeWidth={3}/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}

