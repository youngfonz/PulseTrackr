'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '../ScrollReveal';

// Abstract geometric logomarks (original SVGs, not real brands)
function LogoMarks() {
  const marks = [
    // Hexagon
    <svg key="hex" viewBox="0 0 32 32" className="h-6 w-auto"><path d="M16 2l12 7v14l-12 7-12-7V9z" fill="currentColor" /></svg>,
    // Stacked bars
    <svg key="bars" viewBox="0 0 32 32" className="h-6 w-auto"><rect x="4" y="4" width="24" height="6" rx="1" fill="currentColor" /><rect x="8" y="14" width="16" height="6" rx="1" fill="currentColor" /><rect x="12" y="24" width="8" height="6" rx="1" fill="currentColor" /></svg>,
    // Diamond grid
    <svg key="diamond" viewBox="0 0 32 32" className="h-6 w-auto"><path d="M16 2l6 6-6 6-6-6zM26 12l6 6-6 6-6-6zM6 12l6 6-6 6-6-6zM16 22l6 6-6 6-6-6z" fill="currentColor" /></svg>,
    // Interlocking rings
    <svg key="rings" viewBox="0 0 40 32" className="h-6 w-auto"><circle cx="12" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="28" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="3" /></svg>,
    // Angular bracket
    <svg key="angle" viewBox="0 0 32 32" className="h-6 w-auto"><path d="M8 4l16 12L8 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    // Grid of dots
    <svg key="grid" viewBox="0 0 32 32" className="h-6 w-auto"><circle cx="6" cy="6" r="3" fill="currentColor" /><circle cx="16" cy="6" r="3" fill="currentColor" /><circle cx="26" cy="6" r="3" fill="currentColor" /><circle cx="6" cy="16" r="3" fill="currentColor" /><circle cx="16" cy="16" r="3" fill="currentColor" /><circle cx="26" cy="16" r="3" fill="currentColor" /><circle cx="6" cy="26" r="3" fill="currentColor" /><circle cx="16" cy="26" r="3" fill="currentColor" /><circle cx="26" cy="26" r="3" fill="currentColor" /></svg>,
  ];

  return (
    <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center">
      {marks.map((mark, i) => (
        <div key={i} className="text-foreground/20 hover:text-foreground/40 transition-colors">
          {mark}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Abstract geometric background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle grid of crosses */}
        <svg className="absolute top-20 right-0 w-[500px] h-[500px] text-primary/[0.04]" viewBox="0 0 400 400">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <g key={`${row}-${col}`} transform={`translate(${col * 50 + 25}, ${row * 50 + 25})`}>
                <line x1="-4" y1="0" x2="4" y2="0" stroke="currentColor" strokeWidth="1.5" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" />
              </g>
            ))
          )}
        </svg>

        {/* Angled line accent */}
        <svg className="absolute -bottom-10 -left-10 w-[300px] h-[300px] text-primary/[0.06]" viewBox="0 0 300 300">
          <line x1="0" y1="300" x2="300" y2="0" stroke="currentColor" strokeWidth="1" />
          <line x1="40" y1="300" x2="340" y2="0" stroke="currentColor" strokeWidth="1" />
          <line x1="80" y1="300" x2="380" y2="0" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <div>
            <ScrollReveal delay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                Stay on top of every project, every deadline.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl">
                Project & task management built for freelancers and solo
                creators. Track clients, manage tasks, and hit every deadline.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-8 flex gap-4 flex-wrap">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Start for free
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  See how it works
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column: Screenshot with geometric accent */}
          <ScrollReveal delay={400} direction="right">
            <div className="relative">
              {/* Accent shape behind the screenshot */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-xl border border-primary/10 bg-primary/[0.02]" />
              <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Browser title bar */}
                <div className="h-10 bg-muted border-b border-border flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* Content area */}
                <Image
                  src="/screenshots/dashboard.png"
                  alt="Pulse dashboard showing project overview"
                  width={1920}
                  height={1200}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Logo strip */}
        <ScrollReveal delay={500}>
          <div className="mt-20 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center mb-8 tracking-wide uppercase">
              Used by founders and creatives all over the world
            </p>
            <LogoMarks />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
