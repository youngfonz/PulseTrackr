'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

export function SocialProof() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* Stat 1: Tasks tracked */}
          <StatItem target={500} suffix="+" label="tasks tracked" delay={0} />

          {/* Stat 2: Projects managed */}
          <StatItem
            target={100}
            suffix="+"
            label="projects managed"
            delay={150}
          />

          {/* Stat 3: Built for focus */}
          <FocusStat delay={300} />
        </div>
      </div>
    </section>
  );
}

function StatItem({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(target, 2000, isVisible);

  return (
    <div ref={ref}>
      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

function FocusStat({ delay }: { delay: number }) {
  const { ref } = useScrollReveal();

  return (
    <div ref={ref}>
      <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-foreground">
        <svg
          className="w-8 h-8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Built for focus</span>
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        No distractions, just work.
      </div>
    </div>
  );
}
