'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  {
    target: 500,
    suffix: '+',
    label: 'tasks tracked',
    accent: 'text-primary',
    bg: 'bg-primary/10',
    icon: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    target: 100,
    suffix: '+',
    label: 'projects managed',
    accent: 'text-amber-500',
    bg: 'bg-amber-500/10',
    icon: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    target: 50,
    suffix: '+',
    label: 'happy creators',
    accent: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    icon: (
      <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function SocialProof() {
  return (
    <section className="border-y border-border bg-muted py-14 md:py-18">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  target,
  suffix,
  label,
  accent,
  bg,
  icon,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  accent: string;
  bg: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(target, 2000, isVisible);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${bg} ${accent} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
          {count}{suffix}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
