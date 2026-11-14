import AdminHeader from '@/components/admin/AdminHeader';
import { deleteMedia, saveMedia } from '@/lib/actions';
import { getSiteData } from '@/lib/site-data';

export default async function AdminMediaPage() {
  const { mediaAssets } = await getSiteData();

  return (
    <>
      <AdminHeader title="Media" subtitle="Review uploaded media and link public assets." />

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <form action={saveMedia} className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">File name<input name="fileName" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">URL<input name="url" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <div className="md:col-span-2 flex justify-end"><button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">Save media</button></div>
        </form>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#101D35]">Asset library</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mediaAssets.map((asset) => (
            <div key={asset.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img src={asset.url} alt={asset.fileName} className="h-36 w-full object-cover" />
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-medium text-[#101D35]">{asset.fileName}</p>
                  <p className="text-xs text-slate-500">{asset.mimeType}</p>
                </div>
                <form action={deleteMedia}>
                  <input type="hidden" name="id" value={asset.id} />
                  <button type="submit" className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
