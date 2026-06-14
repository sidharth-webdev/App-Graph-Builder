import { Handle, Position, NodeProps } from '@xyflow/react'
import { ServiceNodeData, NodeStatus } from '@/types'
import { cn } from '@/lib/utils'

const statusConfig: Record<NodeStatus, { color: string; bg: string; icon: string }> = {
  Healthy:  { color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30', icon: '✓' },
  Degraded: { color: 'text-amber-400',   bg: 'bg-amber-500/20 border-amber-500/30',     icon: '⚠' },
  Down:     { color: 'text-red-400',     bg: 'bg-red-500/20 border-red-500/30',         icon: '⚠' },
}

const tabs = ['CPU', 'Memory', 'Disk', 'Region']

export function ServiceNode({ data, selected }: NodeProps) {
  const d = data as unknown as ServiceNodeData

  return (
    <div className={cn(
      'bg-[#1a1d27] border rounded-xl shadow-lg w-[260px] transition-all duration-150',
      selected ? 'border-indigo-500 shadow-indigo-500/20' : 'border-[#2a2d3a]'
    )}>
      <Handle type="target" position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-indigo-500 !border-[#1a1d27] !border-2" />

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#2a2d3a]">
        <div className="flex items-center gap-2">
          <span className="text-base">{d.type === 'database' ? '🗄️' : '⚙️'}</span>
          <span className="text-sm font-semibold text-white">{d.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            $0.03/HR
          </span>
          <button className="text-slate-400 hover:text-white text-xs">⚙</button>
        </div>
      </div>

      {/* Metrics row */}
      <div className="flex items-center justify-between px-3 py-2 text-[10px] text-slate-400">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-3 pb-2">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border transition-colors',
              i === 0
                ? 'bg-white text-slate-900 border-white'
                : 'text-slate-400 border-[#2a2d3a] hover:border-slate-500'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="px-3 pb-2">
        <div className="relative w-full h-1.5 bg-[#2a2d3a] rounded-full">
          <div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            style={{ width: `${d.sliderValue}%` }}
          />
          <div
            className="absolute w-3 h-3 bg-white rounded-full border-2 border-indigo-500 -top-[3px] shadow"
            style={{ left: `calc(${d.sliderValue}% - 6px)` }}
          />
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-[10px] text-slate-400">{d.sliderValue / 100}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-[#2a2d3a]">
        <span className={cn(
          'text-[10px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1',
          statusConfig[d.status].bg,
          statusConfig[d.status].color
        )}>
          {statusConfig[d.status].icon} {d.status === 'Healthy' ? 'Success' : d.status}
        </span>
        <span className="text-[10px] font-bold text-slate-400 tracking-wider">aws</span>
      </div>

      <Handle type="source" position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-indigo-500 !border-[#1a1d27] !border-2" />
    </div>
  )
} 