import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = RadixTabs.Root

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <RadixTabs.List className={cn('flex gap-1 bg-slate-100 p-1 rounded-lg', className)}>
      {children}
    </RadixTabs.List>
  )
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <RadixTabs.Trigger
      value={value}
      className="flex-1 px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 transition-colors data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
    >
      {children}
    </RadixTabs.Trigger>
  )
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <RadixTabs.Content value={value} className={cn('mt-3', className)}>
      {children}
    </RadixTabs.Content>
  )
} 