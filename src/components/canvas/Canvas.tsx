import { useCallback, useEffect, useRef } from 'react'
import {
  ReactFlow, Background, BackgroundVariant, Controls, MiniMap,
  addEdge, useNodesState, useEdgesState,
  type OnConnect, type Node, type Edge, type ReactFlowInstance,
} from '@xyflow/react'
//@ts-ignore
import '@xyflow/react/dist/style.css'
import { ServiceNode } from './ServiceNode'
import { useAppStore } from '@/store'
import { GraphData, ServiceNodeData } from '@/types'

const nodeTypes = { serviceNode: ServiceNode }

interface CanvasProps {
  graphData: GraphData | undefined
  isLoading: boolean
  isError: boolean
}

export function Canvas({ graphData, isLoading, isError }: CanvasProps) {
  const { selectedNodeId, setSelectedNodeId } = useAppStore()
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const rfRef = useRef<ReactFlowInstance | null>(null)

  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes as unknown as Node[])
      setEdges(graphData.edges as Edge[])
      setTimeout(() => rfRef.current?.fitView({ padding: 0.2 }), 100)
    }
  }, [graphData, setNodes, setEdges])

  const onConnect: OnConnect = useCallback(
    (conn) => setEdges((eds) => addEdge({ ...conn, animated: true }, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => setSelectedNodeId(node.id),
    [setSelectedNodeId]
  )

  const onPaneClick = useCallback(
    () => setSelectedNodeId(null),
    [setSelectedNodeId]
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId))
        setEdges((eds) => eds.filter(
          (ed) => ed.source !== selectedNodeId && ed.target !== selectedNodeId
        ))
        setSelectedNodeId(null)
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNodeId]
  )

  useEffect(() => {
    const handler = () => {
      const newNode: Node = {
        id: `n${Date.now()}`,
        type: 'serviceNode',
        position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
        data: {
          label: 'New Service',
          description: 'New node',
          status: 'Healthy',
          type: 'service',
          sliderValue: 50,
        } as unknown as Record<string, unknown>,
      }
      setNodes((nds) => [...nds, newNode])
    }
    window.addEventListener('addNode', handler)
    return () => window.removeEventListener('addNode', handler)
  }, [setNodes])

  useEffect(() => {
    const handler = (e: Event) => {
      const { nodeId, data } = (e as CustomEvent<{
        nodeId: string
        data: Partial<ServiceNodeData>
      }>).detail
      setNodes((nds) =>
        nds.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n)
      )
    }
    window.addEventListener('updateNodeData', handler)
    return () => window.removeEventListener('updateNodeData', handler)
  }, [setNodes])

  if (isLoading) return (
    <div className="flex-1 flex items-center justify-center bg-[#0f1117]">
      <div className="flex flex-col items-center gap-3 text-slate-500">
        <div className="w-8 h-8 border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm">Loading graph…</span>
      </div>
    </div>
  )

  if (isError) return (
    <div className="flex-1 flex items-center justify-center bg-[#0f1117]">
      <div className="flex flex-col items-center gap-2 text-slate-500">
        <span className="text-3xl">⚠️</span>
        <p className="text-sm font-medium text-slate-300">Failed to load graph</p>
        <p className="text-xs">Toggle error mode in the top bar</p>
      </div>
    </div>
  )

  return (
    <div className="flex-1 relative outline-none bg-[#0f1117]" tabIndex={0} onKeyDown={onKeyDown}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        onInit={(inst) => { rfRef.current = inst }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={null}
        style={{ background: '#0f1117' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#2a2d3a"
        />
        <Controls
          showInteractive={false}
          style={{ background: '#1a1d27', border: '1px solid #2a2d3a' }}
        />
        <MiniMap
          style={{ background: '#1a1d27', border: '1px solid #2a2d3a' }}
          nodeColor={() => '#6366f1'}
        />
      </ReactFlow>

      <button
        onClick={() => rfRef.current?.fitView({ padding: 0.2 })}
        className="absolute top-3 right-3 z-10 bg-[#1a1d27] border border-[#2a2d3a] rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
      >
        ⊡ Fit View
      </button>
    </div>
  )
} 