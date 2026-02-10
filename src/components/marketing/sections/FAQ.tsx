'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/marketing/ScrollReveal'

const faqs = [
  {
    question: "What is Pulse?",
    answer: "Pulse is a project and task management tool built for freelancers, solo creators, and small teams. It helps you organize clients, track tasks, and never miss a deadline."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes! Our free plan includes 3 projects, 50 tasks, and 1 client. It's perfect for getting started and seeing if Pulse is right for you."
  },
  {
    question: "Can I import my existing projects?",
    answer: "Not yet, but project import is on our roadmap. For now, you can quickly set up your workspace manually."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Pulse is hosted on Vercel with encrypted connections. Your data is never shared with third parties."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked."
  },
  {
    question: "Can I use Pulse with my team?",
    answer: "Team features are coming soon! Currently Pulse is optimized for individual freelancers and solo creators."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
          Questions? Answers.
        </h2>

        <ScrollReveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-muted-foreground text-sm">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
