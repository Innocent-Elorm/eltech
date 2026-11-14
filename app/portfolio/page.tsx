import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import SectionHeading from '@/components/ui/SectionHeading';
import { getSiteData } from '@/lib/site-data';

export default async function ProjectsPage() {
  const { projects } = await getSiteData();

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work focused on practical improvements and measurable outcomes."
          description="Our project work spans digital transformation, operational systems, registration platforms, and business process automation."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-56 bg-gradient-to-br from-[#dbeafe] via-white to-[#dbeafe] p-8">
                <div className="flex h-full items-end rounded-[20px] border border-slate-200 bg-white/80 p-5 backdrop-blur-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-bold text-[#101D35]">{project.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base leading-7 text-slate-600">{project.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{tag}</span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                  View project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
