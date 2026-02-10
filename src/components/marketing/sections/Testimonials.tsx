'use client'

import { ScrollReveal } from '@/components/marketing/ScrollReveal'

const testimonials = [
  {
    quote: "Pulse replaced three different tools I was using. Everything I need for client work is in one place.",
    name: "Sarah Kim",
    role: "Freelance Designer",
    initials: "SK",
    accentFrom: 'from-primary',
    accentTo: 'to-violet-500',
  },
  {
    quote: "The task management is exactly what I needed. Simple, fast, and doesn't get in the way of actual work.",
    name: "Marcus Chen",
    role: "Web Developer",
    initials: "MC",
    accentFrom: 'from-amber-500',
    accentTo: 'to-orange-500',
  },
  {
    quote: "I finally have a clear picture of all my projects and deadlines. Game changer for staying organized.",
    name: "Ava Rodriguez",
    role: "Content Creator",
    initials: "AR",
    accentFrom: 'from-emerald-500',
    accentTo: 'to-teal-500',
  }
]

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0f172a] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 600">
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 50 + 25}
                cy={row * 50 + 25}
                r="1"
                fill="white"
              />
            ))
          )}
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <span className="block text-sm font-semibold tracking-widest uppercase text-[#58a6ff] text-center">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mt-3">
          Trusted by freelancers who ship.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className={`relative bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.08] transition-all duration-300 ${index === 1 ? 'md:-translate-y-2' : ''}`}>
                {/* Accent gradient line at top */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${testimonial.accentFrom} ${testimonial.accentTo}`} />

                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-amber-400"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-white/90 mt-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.accentFrom} ${testimonial.accentTo} flex items-center justify-center text-sm font-semibold text-white`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-white/50">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
