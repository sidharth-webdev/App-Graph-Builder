import { useAppStore } from '@/store'
import { AppsList } from '@/components/inspector/AppsList'
import { NodeInspector } from '@/components/inspector/NodeInspector'
import { App } from '@/types'
import { Node } from '@xyflow/react'

interface RightPanelProps {
  apps: App[] | undefined
  appsLoading: boolean
  appsError: boolean
  nodes: Node[]
}

export function RightPanel({ apps, appsLoading, appsError, nodes }: RightPanelProps) {
  const { isMobilePanelOpen, setMobilePanelOpen } = useAppStore()

  const PanelContent = () => (
    <div className="w-64 flex flex-col h-full bg-white border-l border-slate-200">
      <AppsList apps={apps} isLoading={appsLoading} isError={appsError} />
      <NodeInspector nodes={nodes.map((n) => ({ id: n.id, data: n.data }))} />
    </div>
  )

  return (
    <>
      {/* Desktop — always visible */}
      <div className="hidden md:flex shrink-0">
        <PanelContent />
      </div>

      {/* Mobile — slide-over drawer */}
      {isMobilePanelOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobilePanelOpen(false)}
          />
          <div className="relative w-72 flex flex-col h-full">
            <PanelContent />
            <button
              onClick={() => setMobilePanelOpen(false)}
              className="absolute top-3 left-[-36px] w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-slate-600 hover:bg-slate-50"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
} 