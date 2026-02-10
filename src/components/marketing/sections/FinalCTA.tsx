import Link from 'next/link'
import { ScrollReveal } from '@/components/marketing/ScrollReveal'

export function FinalCTA() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to take control of your projects?
          </h2>

          <p className="text-lg text-primary-foreground/80 mt-4">
            Start for free. No credit card required.
          </p>

          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-lg bg-background text-foreground font-medium text-lg hover:bg-background/90 transition-colors"
          >
            Get Started
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
