import { useState } from 'react'
import { useAppStore } from '@/store'
import { App } from '@/types'
import { cn } from '@/lib/utils'

interface AppPanelProps {
  apps: App[] | undefined
  isLoading: boolean
  isError: boolean
}

export function AppPanel({ apps, isLoading, isError }: AppPanelProps) {
  const { selectedAppId, setSelectedAppId } = useAppStore()
  const [search, setSearch] = useState('')

  const filtered = apps?.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-64 flex flex-col h-full bg-[#1a1d27] border-r border-[#2a2d3a] shrink-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2a2d3a]">
        <p className="text-xs font-semibold text-white mb-3">Application</p>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-1.5">
            <span className="text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              aria-label="Search apps"
              title="Search apps"
              className="bg-transparent text-xs text-slate-300 placeholder-slate-500 outline-none w-full"
            />
          </div>
          <button
            onClick={() => window.dispatchEvent(new Event('addNode'))}
            className="w-7 h-7 bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center justify-center text-white text-sm transition-colors"
            title="Add node"
          >
            +
          </button>
        </div>
      </div>

      {/* App List */}
      <div className="flex-1 overflow-y-auto py-2">
        {isLoading && (
          <div className="space-y-2 px-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-[#2a2d3a] rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-xs text-red-400 px-4 py-2">Failed to load apps</p>
        )}

        {filtered?.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors',
              selectedAppId === app.id
                ? 'bg-[#2a2d3a] text-white'
                : 'text-slate-400 hover:bg-[#2a2d3a] hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{app.icon}</span>
              <span className="text-xs font-medium">{app.name}</span>
            </div>
            <span className="text-slate-500 text-xs">›</span>
          </button>
        ))}
      </div>
    </div>
  )
} 