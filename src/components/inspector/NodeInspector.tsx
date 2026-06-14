import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import { NodeStatus, ServiceNodeData } from '@/types'
import { cn } from '@/lib/utils'

interface InspectorProps {
  nodes: Array<{ id: string; data: unknown }>
}

const statusOptions: NodeStatus[] = ['Healthy', 'Degraded', 'Down']

const statusStyle: Record<NodeStatus, string> = {
  Healthy:  'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
  Degraded: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
  Down:     'text-red-400 bg-red-500/20 border-red-500/30',
}

export function NodeInspector({ nodes }: InspectorProps) {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useAppStore()

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)
  const nodeData = selectedNode?.data as ServiceNodeData | undefined

  const [label,       setLabel]       = useState('')
  const [description, setDescription] = useState('')
  const [sliderValue, setSliderValue] = useState(50)
  const [inputValue,  setInputValue]  = useState('50')
  const [status,      setStatus]      = useState<NodeStatus>('Healthy')

  useEffect(() => {
    if (nodeData) {
      setLabel(nodeData.label ?? '')
      setDescription(nodeData.description ?? '')
      setSliderValue(nodeData.sliderValue ?? 50)
      setInputValue(String(nodeData.sliderValue ?? 50))
      setStatus(nodeData.status ?? 'Healthy')
    }
  }, [selectedNodeId, nodeData])

  const dispatch = (patch: Partial<ServiceNodeData>) => {
    if (!selectedNodeId) return
    window.dispatchEvent(new CustomEvent('updateNodeData', {
      detail: { nodeId: selectedNodeId, data: patch }
    }))
  }

  const handleSlider = (val: number) => {
    setSliderValue(val)
    setInputValue(String(val))
    dispatch({ sliderValue: val })
  }

  const handleInput = (raw: string) => {
    setInputValue(raw)
    const num = parseInt(raw, 10)
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setSliderValue(num)
      dispatch({ sliderValue: num })
    }
  }

  const handleStatus = (s: NodeStatus) => {
    setStatus(s)
    dispatch({ status: s })
  }

  if (!selectedNodeId || !nodeData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
        <div className="text-4xl mb-3">🖱️</div>
        <p className="text-sm font-medium text-slate-400">No node selected</p>
        <p className="text-xs mt-1">Click a node on the canvas</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
            Service Node
          </p>
          <h3 className="text-sm font-semibold text-white truncate max-w-[180px]">
            {nodeData.label}
          </h3>
        </div>
        <span className={cn(
          'text-[10px] font-medium px-2 py-0.5 rounded-full border',
          statusStyle[status]
        )}>
          {status}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0f1117] p-1 rounded-lg mb-4">
        {['config', 'runtime'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveInspectorTab(tab)}
            className={cn(
              'flex-1 py-1.5 text-xs font-medium rounded-md transition-colors capitalize',
              activeInspectorTab === tab
                ? 'bg-[#1a1d27] text-white'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Config Tab */}
      {activeInspectorTab === 'config' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Node Name
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={() => dispatch({ label })}
              placeholder="Enter node name"
              aria-label="Node Name"
              title="Node Name"
              className="w-full text-sm bg-[#0f1117] border border-[#2a2d3a] text-white rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => dispatch({ description })}
              rows={3}
              placeholder="Enter description"
              aria-label="Description"
              title="Description"
              className="w-full text-sm bg-[#0f1117] border border-[#2a2d3a] text-white rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 resize-none placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  className={cn(
                    'flex-1 py-1 rounded-full text-[10px] font-medium border transition-colors',
                    status === s ? statusStyle[s] : 'text-slate-500 border-[#2a2d3a] hover:border-slate-500'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Runtime Tab */}
      {activeInspectorTab === 'runtime' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-slate-400">CPU Usage</label>
              <span className="text-xs text-indigo-400">{sliderValue}%</span>
            </div>

            {/* Slider */}
            <div className="relative w-full h-1.5 bg-[#2a2d3a] rounded-full mb-3">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: `${sliderValue}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={(e) => handleSlider(Number(e.target.value))}
                aria-label="CPU Usage slider"
                title="CPU Usage"
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => handleInput(e.target.value)}
                min={0}
                max={100}
                placeholder="0"
                aria-label="CPU Usage value"
                title="CPU Usage value"
                className="w-20 text-sm bg-[#0f1117] border border-[#2a2d3a] text-white rounded-md px-2 py-1.5 text-center focus:outline-none focus:border-indigo-500"
              />
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#2a2d3a]">
            <p className="text-xs font-medium text-slate-400 mb-2">Runtime Info</p>
            {[
              { label: 'Node ID', value: selectedNodeId },
              { label: 'Type',    value: nodeData.type === 'database' ? '🗄️ Database' : '⚙️ Service' },
              { label: 'Uptime',  value: status === 'Down' ? '0s' : '3d 14h 22m' },
              { label: 'Memory',  value: `${Math.round(sliderValue * 0.8 + 10)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-300 font-medium font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 