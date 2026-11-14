import Link from 'next/link';
import { ArrowRight, CheckCircle2, Database, Globe, Network, ServerCog } from 'lucide-react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import SectionHeading from '@/components/ui/SectionHeading';
import { getSiteData } from '@/lib/site-data';

export default async function AboutPage() {
  const { siteSettings } = await getSiteData();

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About ELTECH" title="A focused technology studio built around practical digital solutions." description="ELTECH IT SOLUTIONS is a software development studio designed to help businesses translate operational challenges into scalable and maintainable digital tools." />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#101D35]">Mission</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">{siteSettings.mission}</p>
            <h3 className="mt-8 text-2xl font-bold text-[#101D35]">Vision</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">{siteSettings.vision}</p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-[#101D35] p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Development philosophy</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              {siteSettings.coreValues.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-[#3B82F6]" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">Founder profile</p>
            <h3 className="mt-4 text-3xl font-bold text-[#101D35]">{siteSettings.founderName}</h3>
            <p className="mt-2 text-lg font-medium text-slate-700">{siteSettings.founderTitle}</p>
            <p className="mt-5 leading-8 text-slate-600">{siteSettings.founderBio}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: ServerCog, title: 'Python and Django' },
              { icon: Globe, title: 'Next.js and modern web technologies' },
              { icon: Database, title: 'Database design' },
              { icon: Network, title: 'API development and cloud computing' },
            ].map(({ icon: Icon, title }) => (
              <div key={title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-xl font-semibold text-[#101D35]">{title}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[28px] bg-gradient-to-r from-[#101D35] to-[#1e3a8a] p-8 text-white shadow-xl sm:p-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Let’s talk</p>
              <h3 className="mt-3 text-3xl font-bold">Need a reliable digital partner for your next project?</h3>
            </div>
            <Link href="/start-a-project" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#101D35]">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
