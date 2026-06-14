import { useAppStore } from '@/store'
import { App } from '@/types'
import { cn } from '@/lib/utils'

interface AppsListProps {
  apps: App[] | undefined
  isLoading: boolean
  isError: boolean
}

export function AppsList({ apps, isLoading, isError }: AppsListProps) {
  const { selectedAppId, setSelectedAppId } = useAppStore()

  return (
    <div className="border-b border-slate-100">
      <div className="px-4 py-3">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mb-2">
          Applications
        </p>

        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-xs text-red-500 py-2">Failed to load apps</p>
        )}

        {apps && (
          <div className="space-y-1">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                  selectedAppId === app.id
                    ? 'bg-slate-900 text-white'
                    : 'hover:bg-slate-50 text-slate-700'
                )}
              >
                <span className="text-xl">{app.icon}</span>
                <div className="min-w-0">
                  <p className={cn(
                    'text-xs font-semibold truncate',
                    selectedAppId === app.id ? 'text-white' : 'text-slate-800'
                  )}>
                    {app.name}
                  </p>
                  <p className={cn(
                    'text-[10px] truncate',
                    selectedAppId === app.id ? 'text-slate-300' : 'text-slate-400'
                  )}>
                    {app.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 