import AdminHeader from '@/components/admin/AdminHeader';
import { getSiteData } from '@/lib/site-data';

export default async function AdminDashboardPage() {
  const { siteSettings, services, projects, enquiries, categories, testimonials, mediaAssets } = await getSiteData();

  const summaryCards = [
    { label: 'Services', value: services.length, tone: 'bg-blue-50 text-blue-700' },
    { label: 'Projects', value: projects.length, tone: 'bg-violet-50 text-violet-700' },
    { label: 'Enquiries', value: enquiries.length, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Media', value: mediaAssets.length, tone: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" subtitle={`Welcome back. ${siteSettings.businessName} is ready for the next update.`} />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${card.tone}`}>{card.label}</div>
            <div className="mt-6 text-3xl font-bold text-[#101D35]">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#101D35]">Quick overview</h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span>Categories</span><strong className="text-[#101D35]">{categories.length}</strong></li>
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span>Testimonials</span><strong className="text-[#101D35]">{testimonials.length}</strong></li>
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span>Published services</span><strong className="text-[#101D35]">{services.filter((service) => service.published).length}</strong></li>
            <li className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span>Published projects</span><strong className="text-[#101D35]">{projects.filter((project) => project.published).length}</strong></li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-[#101D35] p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Business status</p>
          <h2 className="mt-4 text-2xl font-bold">Operational overview</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            {siteSettings.tagline} This dashboard gives your team a quick view of live content, enquiry volume, and media records.
          </p>
        </div>
      </div>
    </>
  );
}
