'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/marketing/ScrollReveal'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For getting started.',
    features: [
      '3 projects',
      '50 tasks',
      '1 client',
      'Basic calendar'
    ],
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$9',
    description: 'For serious freelancers.',
    features: [
      'Unlimited projects',
      'Unlimited tasks',
      'Unlimited clients',
      'File attachments',
      'Priority support'
    ],
    highlighted: true
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
          Simple pricing for focused work.
        </h2>
        <p className="text-lg text-muted-foreground mt-4 text-center">
          Start free, upgrade when you&apos;re ready.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-12">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className={`${
                plan.highlighted
                  ? 'bg-card border-2 border-primary rounded-xl p-8 ring-2 ring-primary/20 relative'
                  : 'bg-card border border-border rounded-xl p-8'
              }`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-xl font-semibold">{plan.name}</div>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-base">/month</span>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-emerald-500 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={`mt-8 block rounded-lg px-6 py-3 w-full text-center font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border hover:bg-muted'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  )
}
