import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, Lightbulb, Sparkles } from 'lucide-react';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import SectionHeading from '@/components/ui/SectionHeading';
import { getPublishedProjects, getPublishedServices, getSiteData } from '@/lib/site-data';

export default async function HomePage() {
  const [{ siteSettings, processSteps }, services, projects] = await Promise.all([
    getSiteData(),
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <PublicHeader />
      <main>
        <section className="hero-section relative isolate overflow-hidden bg-[#0B1220] text-white">
          <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
          <div aria-hidden="true" className="hero-orb hero-orb-one pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl" />
          <div aria-hidden="true" className="hero-orb hero-orb-two pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
          <div aria-hidden="true" className="hero-orbit pointer-events-none absolute right-[8%] top-16 hidden h-[30rem] w-[30rem] rounded-full border border-blue-300/10 lg:block">
            <span className="hero-orbit-dot absolute left-[14%] top-[20%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_8px_rgba(103,232,249,0.35)]" />
            <span className="hero-orbit-dot hero-orbit-dot-delay absolute bottom-[14%] right-[22%] h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_20px_6px_rgba(147,197,253,0.35)]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <p className="motion-enter mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5" /> Digital solutions studio
              </p>
              <h1 className="motion-enter motion-delay-1 max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {siteSettings.heroHeading}
              </h1>
              <p className="motion-enter motion-delay-2 mt-6 max-w-xl text-lg leading-8 text-slate-300">{siteSettings.heroDescription}</p>
              <div className="motion-enter motion-delay-3 mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/start-a-project" className="hero-cta inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
                  Start a Project <ArrowRight className="hero-arrow h-4 w-4" />
                </Link>
                <Link href="/projects" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Explore Our Projects
                </Link>
              </div>
            </div>

            <div className="hero-visual relative flex items-center justify-center">
              <div aria-hidden="true" className="hero-float-chip absolute -left-2 top-5 z-10 rounded-2xl border border-cyan-200/20 bg-[#10243b]/90 px-4 py-3 shadow-xl backdrop-blur sm:left-0 lg:-left-10 lg:top-16">
                <span className="flex items-center gap-2 text-xs font-medium text-cyan-100"><span className="h-2 w-2 rounded-full bg-cyan-300" /> Ideas in motion</span>
              </div>
              <div aria-hidden="true" className="hero-float-chip hero-float-chip-delay absolute -right-1 bottom-2 z-10 rounded-2xl border border-blue-200/20 bg-[#10243b]/90 px-4 py-3 shadow-xl backdrop-blur sm:right-0 lg:-right-5 lg:bottom-14">
                <span className="text-xs font-medium text-blue-100">Design <span className="mx-1 text-cyan-300">→</span> Build <span className="mx-1 text-cyan-300">→</span> Grow</span>
              </div>
              <div className="hero-panel relative w-full max-w-lg rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-[#101D35] p-6 shadow-2xl shadow-blue-950/30">
                <div aria-hidden="true" className="hero-panel-glow absolute -right-4 -top-4 h-28 w-28 rounded-full bg-[#3B82F6]/30 blur-2xl" />
                <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">System overview</p>
                      <h2 className="mt-2 text-2xl font-bold text-white">ELTECH Studio</h2>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"><span className="hero-status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" /> Available</div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Website and web apps', value: 'Custom builds' },
                      { label: 'Business automation', value: 'Workflow systems' },
                      { label: 'Technical consulting', value: 'Architecture & strategy' },
                    ].map((item) => (
                      <div key={item.label} className="hero-service-row rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <span>{item.label}</span>
                          <span className="font-medium text-white">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center text-white">
                    <div className="rounded-2xl bg-white/5 p-3">
                      <div className="text-xl font-bold text-[#3B82F6]">01</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">Discovery</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <div className="text-xl font-bold text-[#3B82F6]">02</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">Build</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <div className="text-xl font-bold text-[#3B82F6]">03</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-300">Launch</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading eyebrow="Who we are" title="Practical technology for businesses that need results." description={siteSettings.aboutDescription} />
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { icon: Cpu, title: 'Solutions built around real business needs', text: 'We start from workflow and business objectives before designing the technical solution.' },
                { icon: Lightbulb, title: 'Practical and maintainable software', text: 'Clean architecture and careful implementation help reduce long-term technical debt.' },
                { icon: CheckCircle2, title: 'User-focused interfaces', text: 'Interfaces are designed to be intuitive, efficient, and easy for teams to use.' },
                { icon: Sparkles, title: 'Direct communication throughout development', text: 'You stay informed at every stage, with a straightforward process and practical updates.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#101D35]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Services" title="Focused digital services for growing businesses." description="From custom applications to technical consulting, we build practical systems that support operations and long-term growth." align="center" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`} className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#101D35] text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#101D35]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                    Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Featured project" title="Selected project" description="Explore published projects that demonstrate practical outcomes for the businesses we support." />
            <Link href="/projects" className="hidden rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#101D35] transition hover:border-blue-200 hover:text-[#2563EB] sm:inline-flex">View all projects</Link>
          </div>

          {featuredProject ? (
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 p-4">
                  <div className="flex aspect-[16/10] items-center justify-center rounded-[18px] bg-gradient-to-br from-slate-200 to-slate-100 text-xl font-bold text-slate-500">
                    {featuredProject.title}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">Featured project</p>
                  <h3 className="mt-4 text-3xl font-bold text-[#101D35]">{featuredProject.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{featuredProject.shortDescription}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {featuredProject.technologies.slice(0, 3).map((technology) => (
                      <span key={technology} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{technology}</span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/projects/${featuredProject.slug}`} className="inline-flex items-center justify-center rounded-full bg-[#101D35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B1220]">View case study</Link>
                    <a href={featuredProject.liveUrl ?? '#'} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#101D35] transition hover:border-blue-200 hover:text-[#2563EB]">Visit website</a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section id="process" className="scroll-mt-24 bg-[#0B1220] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Our process" title="A clear, dependable delivery process." description="Every project is structured to balance business needs, technical quality, and operational sustainability." align="center" onDarkBackground />
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {processSteps.map((step, index) => (
                <div key={step.id} className="motion-enter rounded-3xl border border-white/10 bg-white/5 p-6" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB]/20 text-sm font-bold text-[#3B82F6]">0{index + 1}</div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-gradient-to-r from-[#101D35] to-[#1e3a8a] p-8 text-white shadow-xl sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Let’s build something useful</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Need a digital solution that supports your next growth step?</h2>
              </div>
              <Link href="/start-a-project" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#101D35] transition hover:bg-slate-100">Discuss your project</Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
