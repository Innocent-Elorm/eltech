import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import { getSiteData } from '@/lib/site-data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { projects } = await getSiteData();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getSiteData();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{project.category}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#101D35]">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{project.shortDescription}</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-[#101D35]">Project scope</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">{project.description}</p>
            </div>
            <div className="rounded-[24px] bg-[#101D35] p-6 text-white">
              <h2 className="text-xl font-bold">Highlights</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#60A5FA]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">{tech}</span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Link href="/start-a-project" className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">
              Discuss a similar project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
