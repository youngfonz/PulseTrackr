'use client'

import { ScrollReveal } from '@/components/marketing/ScrollReveal'

const testimonials = [
  {
    quote: "Pulse replaced three different tools I was using. Everything I need for client work is in one place.",
    name: "Sarah Kim",
    role: "Freelance Designer",
    initials: "SK"
  },
  {
    quote: "The task management is exactly what I needed. Simple, fast, and doesn't get in the way of actual work.",
    name: "Marcus Chen",
    role: "Web Developer",
    initials: "MC"
  },
  {
    quote: "I finally have a clear picture of all my projects and deadlines. Game changer for staying organized.",
    name: "Ava Rodriguez",
    role: "Content Creator",
    initials: "AR"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
          Trusted by freelancers who ship.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className={`bg-card border border-border rounded-xl p-6 ${index === 1 ? 'ring-2 ring-primary/20 scale-[1.02]' : ''}`}>
                <div className="flex gap-0.5">
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

                <p className="text-foreground mt-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
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
