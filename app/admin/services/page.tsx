import AdminHeader from '@/components/admin/AdminHeader';
import { deleteService, saveService } from '@/lib/actions';
import { getSiteData } from '@/lib/site-data';

export default async function AdminServicesPage() {
  const { services } = await getSiteData();

  return (
    <>
      <AdminHeader title="Services" subtitle="Create and maintain the services offered to clients." />

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <form action={saveService} className="grid gap-5 md:grid-cols-2">
          <input type="hidden" name="id" value="" />
          <label className="text-sm font-medium text-slate-700">Title<input name="title" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">Slug<input name="slug" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="md:col-span-2 text-sm font-medium text-slate-700">Summary<textarea name="summary" rows={2} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="md:col-span-2 text-sm font-medium text-slate-700">Description<textarea name="description" rows={4} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">Icon<input name="icon" defaultValue="Sparkles" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">Highlights<textarea name="highlights" rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">Features<textarea name="features" rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">Deliverables<textarea name="deliverables" rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="md:col-span-2 text-sm font-medium text-slate-700">Approach<textarea name="approach" rows={3} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" name="published" /> Published</label>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">Save service</button>
          </div>
        </form>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#101D35]">Existing services</h2>
        <div className="mt-5 space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-[#101D35]">{service.title}</p>
                <p className="text-sm text-slate-600">{service.slug} · {service.published ? 'Published' : 'Draft'}</p>
              </div>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
                <button type="submit" className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
