'use client';

import { ScrollReveal } from '../ScrollReveal';

const primaryFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    title: 'Project Tracking',
    description: 'Organize projects by client, set deadlines, and track progress from start to finish.',
    color: 'primary' as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Task Management',
    description: 'Create tasks, set priorities, and check them off. Never miss a deadline again.',
    color: 'amber' as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Client Organization',
    description: 'Keep client details, project history, and communication all in one place.',
    color: 'emerald' as const,
  },
];

const colorStyles = {
  primary: {
    iconBg: 'bg-primary/10',
    iconText: 'text-primary',
    border: 'border-t-primary',
    glow: 'group-hover:shadow-primary/5',
  },
  amber: {
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-500',
    border: 'border-t-amber-500',
    glow: 'group-hover:shadow-amber-500/5',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-500',
    border: 'border-t-emerald-500',
    glow: 'group-hover:shadow-emerald-500/5',
  },
};

const secondaryFeatures = [
  {
    icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    title: 'Calendar view',
    description: 'See all deadlines at a glance',
    accent: 'bg-blue-500',
  },
  {
    icon: <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />,
    title: 'Bookmarks',
    description: 'Save important tasks and projects',
    accent: 'bg-violet-500',
  },
  {
    icon: <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    title: 'Due date alerts',
    description: 'Never miss a deadline',
    accent: 'bg-rose-500',
  },
  {
    icon: <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    title: 'Activity dashboard',
    description: 'Track your productivity',
    accent: 'bg-amber-500',
  },
  {
    icon: <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
    title: 'Dark mode',
    description: 'Easy on the eyes',
    accent: 'bg-slate-500',
  },
  {
    icon: <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />,
    title: 'File attachments',
    description: 'Keep everything organized',
    accent: 'bg-emerald-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section heading */}
        <div className="text-center">
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Everything you need, nothing you don&apos;t.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Manage your entire workflow in one place.
          </p>
        </div>

        {/* Primary feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {primaryFeatures.map((feature, index) => {
            const styles = colorStyles[feature.color];
            return (
              <ScrollReveal key={feature.title} delay={index * 150}>
                <div className={`group bg-card border border-border border-t-4 ${styles.border} rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl ${styles.glow} transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-lg ${styles.iconBg} ${styles.iconText} flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mt-5">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Secondary features */}
        <ScrollReveal delay={0}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {secondaryFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group bg-card border border-border rounded-lg p-5 flex items-start gap-3 hover:border-primary/30 hover:bg-card/80 transition-all duration-200"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${feature.accent}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium group-hover:text-primary transition-colors">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
