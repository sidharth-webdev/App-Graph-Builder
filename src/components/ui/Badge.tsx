import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'secondary'
  className?: string
}

const variants = {
  default:   'bg-slate-900 text-white',
  success:   'bg-emerald-100 text-emerald-700 border border-emerald-200',
  warning:   'bg-amber-100 text-amber-700 border border-amber-200',
  danger:    'bg-red-100 text-red-700 border border-red-200',
  secondary: 'bg-slate-100 text-slate-600 border border-slate-200',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}  