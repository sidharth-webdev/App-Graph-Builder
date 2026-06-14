import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'icon'
}

const variants = {
  default:     'bg-slate-900 text-white hover:bg-slate-800',
  ghost:       'hover:bg-slate-100 text-slate-700',
  outline:     'border border-slate-200 hover:bg-slate-50 text-slate-700',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
}

const sizes = {
  sm:   'px-3 py-1.5 text-xs',
  md:   'px-4 py-2 text-sm',
  icon: 'p-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-slate-400',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button' 