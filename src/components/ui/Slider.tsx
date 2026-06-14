import * as RadixSlider from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function Slider({ value, onChange, min = 0, max = 100, className }: SliderProps) {
  return (
    <RadixSlider.Root
      className={cn(
        'relative flex items-center select-none touch-none w-full h-5',
        className
      )}
      value={[value]}
      min={min}
      max={max}
      onValueChange={([v]) => onChange(v)}
    >
      <RadixSlider.Track className="bg-slate-200 relative grow rounded-full h-1.5">
        <RadixSlider.Range className="absolute bg-slate-800 rounded-full h-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block w-4 h-4 bg-white border-2 border-slate-800 rounded-full hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors" />
    </RadixSlider.Root>
  )
}   