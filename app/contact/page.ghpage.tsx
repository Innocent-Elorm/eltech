import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import SectionHeading from "@/components/ui/SectionHeading";
import StaticContactForm from "@/components/public/StaticContactForm";
import { getSiteData } from "@/lib/site-data";

export default async function ContactPage() {
  const { siteSettings } = await getSiteData();

  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact us"
          title="Tell us about your project, challenge, or idea."
          description="Whether you need a new system, an upgrade, or a trusted technical partner, ELTECH can help shape the next step."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-[#101D35] p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Reach out</p>
            <h3 className="mt-4 text-3xl font-bold">We respond quickly.</h3>
            <div className="mt-8 space-y-5 text-slate-200">
              <p>Email: {siteSettings.contactEmail}</p>
              <p>Phone: {siteSettings.phone}</p>
              <p>Location: {siteSettings.location}</p>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm leading-6 text-slate-600">
              This static site opens your email app to send your message; it does not store submissions.
            </p>
            <StaticContactForm contactEmail={siteSettings.contactEmail} />
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
