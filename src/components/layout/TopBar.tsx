import { useAppStore } from '@/store'
import { getSimulateError, toggleSimulateError } from '@/mocks/api'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function TopBar() {
  const { setMobilePanelOpen, isMobilePanelOpen } = useAppStore()
  const queryClient = useQueryClient()
  const [errorMode, setErrorMode] = useState(getSimulateError())

  const handleToggleError = () => {
    toggleSimulateError()
    setErrorMode(getSimulateError())
    queryClient.invalidateQueries()
  }

  return (
    <header className="h-12 border-b border-[#2a2d3a] bg-[#1a1d27] flex items-center px-4 gap-3 shrink-0 z-10">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">G</span>
        </div>
        <span className="text-sm font-semibold text-white">GraphBuilder</span>
      </div>

      <div className="h-5 w-px bg-[#2a2d3a] mx-1" />

      <div className="flex items-center gap-2 flex-1">
        <button
          onClick={handleToggleError}
          className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            errorMode
              ? 'bg-red-500/20 text-red-400 border-red-500/30'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {errorMode ? '🔴 Error On' : '🟢 Error Off'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="text-slate-400 hover:text-white text-sm transition-colors">
          ⚙️
        </button>
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
        >
          📋
        </button>
      </div>
    </header>
  )
} 