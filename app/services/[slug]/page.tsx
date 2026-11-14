import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import { getSiteData } from '@/lib/site-data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { services } = await getSiteData();
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { services } = await getSiteData();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>

        <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{service.slug.replace(/-/g, ' ')}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#101D35]">{service.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{service.description}</p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-bold text-[#101D35]">What this service includes</h2>
              <ul className="mt-6 space-y-4">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[#2563EB]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Approach</p>
              <p className="mt-4 text-lg leading-8 text-slate-700">{service.approach}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[28px] bg-gradient-to-r from-[#101D35] to-[#1e3a8a] p-8 text-white shadow-xl sm:p-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Need this solution?</p>
              <h3 className="mt-3 text-3xl font-bold">Let’s design a system that matches your operational goals.</h3>
            </div>
            <Link href="/start-a-project" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#101D35]">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
