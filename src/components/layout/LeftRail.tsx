import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { icon: '⬡', label: 'Graph' },
  { icon: '🗄️', label: 'Database' },
  { icon: '📦', label: 'Packages' },
  { icon: '🌿', label: 'Env' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '▦', label: 'Grid' },
  { icon: '⊞', label: 'Layout' },
]

export function LeftRail() {
  const [active, setActive] = useState('Graph')

  return (
    <aside className="hidden md:flex w-12 border-r border-[#2a2d3a] bg-[#1a1d27] flex-col items-center py-3 gap-1 shrink-0">
      {navItems.map(({ icon, label }) => (
        <button
          key={label}
          onClick={() => setActive(label)}
          title={label}
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center text-base transition-colors',
            active === label
              ? 'bg-indigo-600 text-white'
              : 'text-slate-500 hover:text-slate-300 hover:bg-[#2a2d3a]'
          )}
        >
          {icon}
        </button>
      ))}
    </aside>
  )
}     