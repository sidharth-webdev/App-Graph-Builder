import { useAppStore } from '@/store'
import { NodeInspector } from '@/components/inspector/NodeInspector'

interface InspectorPanelProps {
  nodes: Array<{ id: string; data: unknown }>
}

export function InspectorPanel({ nodes }: InspectorPanelProps) {
  const { selectedNodeId } = useAppStore()

  if (!selectedNodeId) return null

  return (
    <div className="w-72 flex flex-col h-full bg-[#1a1d27] border-l border-[#2a2d3a] shrink-0">
      <div className="px-4 py-3 border-b border-[#2a2d3a]">
        <p className="text-xs font-semibold text-white">Node Inspector</p>
      </div>
      <NodeInspector nodes={nodes} />
    </div>
  )
} 