import { cn } from '@/lib/utils'

interface PulseLogoProps {
  size?: number
  className?: string
}

export function PulseLogo({ size = 28, className }: PulseLogoProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-primary to-accent flex items-center justify-center',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        className="text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{ width: size * 0.57, height: size * 0.57 }}
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
