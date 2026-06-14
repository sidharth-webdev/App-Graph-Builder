import { useState, useEffect } from 'react'
import { ReactFlowProvider, Node } from '@xyflow/react'
import { TopBar } from '@/components/layout/TopBar'
import { LeftRail } from '@/components/layout/LeftRail'
import { AppPanel } from '@/components/layout/AppPanel'  
import { InspectorPanel } from '@/components/layout/InspectorPanel'
import { Canvas } from '@/components/canvas/Canvas'
import { useApps, useGraph } from '@/hooks/useQueries'
import { useAppStore } from '@/store'
import { GraphData } from '@/types'

function AppInner() {
  const { selectedAppId } = useAppStore()
  const { data: apps, isLoading: appsLoading, isError: appsError } = useApps()
  const { data: graphData, isLoading: graphLoading, isError: graphError } = useGraph(selectedAppId)
  const [liveNodes, setLiveNodes] = useState<Node[]>([])

  useEffect(() => {
    if (graphData) setLiveNodes((graphData as GraphData).nodes as Node[])
  }, [graphData])

  useEffect(() => {
    const handler = (e: Event) => {
      const { nodeId, data } = (e as CustomEvent).detail
      setLiveNodes((prev) =>
        prev.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n))
      )
    }
    window.addEventListener('updateNodeData', handler)
    return () => window.removeEventListener('updateNodeData', handler)
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0f1117]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftRail />
        <AppPanel
          apps={apps}
          isLoading={appsLoading}
          isError={appsError}
        />
        <main className="flex flex-1 overflow-hidden">
          <Canvas
            graphData={graphData as GraphData}
            isLoading={graphLoading}
            isError={graphError}
          />
        </main>
        <InspectorPanel
          nodes={liveNodes.map((n) => ({ id: n.id, data: n.data }))}
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ReactFlowProvider>
      <AppInner />
    </ReactFlowProvider>
  )
}  