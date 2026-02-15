import { ScrollReveal } from '@/components/marketing/ScrollReveal';

export function SocialProof() {
  return (
    <section className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <p className="text-sm text-muted-foreground text-center">
            Trusted by freelancers, consultants, and small teams managing client work.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
