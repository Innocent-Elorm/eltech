import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import SectionHeading from '@/components/ui/SectionHeading';
import { getSiteData } from '@/lib/site-data';

export default async function ServicesPage() {
  const { services } = await getSiteData();

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our services"
          title="Technology services tailored to operational efficiency and growth."
          description="We help businesses modernize systems, digitalize manual processes, and build resilient tools that scale with the organisation."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.slug} className="group flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{service.slug.replace(/-/g, ' ')}</p>
              <h3 className="mt-4 text-2xl font-bold text-[#101D35]">{service.title}</h3>
              <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{service.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {service.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#2563EB]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
