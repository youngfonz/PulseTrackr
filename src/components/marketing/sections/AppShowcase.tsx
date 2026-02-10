'use client';

import { ScrollReveal } from '../ScrollReveal';

export function AppShowcase() {
  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center">
          <ScrollReveal delay={0} direction="none">
            <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden w-full">
              {/* Browser title bar */}
              <div className="h-10 bg-muted border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* Content area */}
              <div className="aspect-[16/10] bg-background flex items-center justify-center">
                <span className="text-muted-foreground">
                  Full dashboard view
                </span>
              </div>
            </div>
          </ScrollReveal>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Your workspace, organized.
          </p>
        </div>
      </div>
    </section>
  );
}
