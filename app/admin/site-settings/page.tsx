import AdminHeader from '@/components/admin/AdminHeader';
import { getSiteData } from '@/lib/site-data';
import { saveSiteSettings } from '@/lib/actions';

export default async function SiteSettingsPage() {
  const { siteSettings, processSteps } = await getSiteData();

  return (
    <>
      <AdminHeader title="Site settings" subtitle="Update public brand details, contact information, and homepage content." />

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <form action={saveSiteSettings} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">Business name<input name="businessName" defaultValue={siteSettings.businessName} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">Tagline<input name="tagline" defaultValue={siteSettings.tagline} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Hero heading<input name="heroHeading" defaultValue={siteSettings.heroHeading} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Hero description<textarea name="heroDescription" defaultValue={siteSettings.heroDescription} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">About description<textarea name="aboutDescription" defaultValue={siteSettings.aboutDescription} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Mission<textarea name="mission" defaultValue={siteSettings.mission} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Vision<textarea name="vision" defaultValue={siteSettings.vision} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">Founder name<input name="founderName" defaultValue={siteSettings.founderName} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">Founder title<input name="founderTitle" defaultValue={siteSettings.founderTitle} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Founder bio<textarea name="founderBio" defaultValue={siteSettings.founderBio} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">Contact email<input name="contactEmail" defaultValue={siteSettings.contactEmail} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">Phone<input name="phone" defaultValue={siteSettings.phone} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">WhatsApp<input name="whatsapp" defaultValue={siteSettings.whatsapp} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">Location<input name="location" defaultValue={siteSettings.location} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Footer description<textarea name="footerDescription" defaultValue={siteSettings.footerDescription} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="md:col-span-2 text-sm font-medium text-slate-700">Copyright<input name="copyrightText" defaultValue={siteSettings.copyrightText} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">SEO title<input name="defaultSeoTitle" defaultValue={siteSettings.defaultSeoTitle} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
            <label className="text-sm font-medium text-slate-700">SEO description<input name="defaultSeoDescription" defaultValue={siteSettings.defaultSeoDescription} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          </div>

          <section className="border-t border-slate-200 pt-6">
            <h2 className="text-lg font-semibold text-[#101D35]">Homepage process</h2>
            <p className="mt-1 text-sm text-slate-500">Edit the steps and descriptions shown in the homepage process section.</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <div key={step.id} className="space-y-3 rounded-2xl border border-slate-200 p-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Step {index + 1} title
                    <input name={`processStepTitle-${index}`} defaultValue={step.title} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Description
                    <textarea name={`processStepDescription-${index}`} defaultValue={step.description} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-end">
            <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">Save settings</button>
          </div>
        </form>
      </div>
    </>
  );
}
