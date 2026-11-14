import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import StaticQuoteForm from "@/components/public/StaticQuoteForm";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getSiteData } from "@/lib/site-data";

export default async function QuotePage() {
  const { siteSettings } = await getSiteData();

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">New project</p>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-[#101D35] sm:text-5xl">
              Let’s make your next idea practical.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Give us a clear picture of your goals, users, and constraints. We’ll use your brief to understand what a useful solution could look like.
            </p>
            <ul className="mt-8 space-y-4 text-sm leading-6 text-slate-700">
              {[
                "Share the business context before we discuss implementation.",
                "Describe the technical and design needs that matter to your team.",
                "Set expectations around budget and timing from the start.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#project-brief" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
              Begin your project brief <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div id="project-brief" className="scroll-mt-28">
            <p className="mb-4 text-sm leading-6 text-slate-600">
              Your email app will open with your brief; this static site does not store submissions.
            </p>
            <StaticQuoteForm contactEmail={siteSettings.contactEmail} />
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
