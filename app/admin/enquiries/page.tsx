import AdminHeader from '@/components/admin/AdminHeader';
import { saveEnquiryNote, saveEnquiryStatus } from '@/lib/actions';
import { getSiteData } from '@/lib/site-data';

export default async function AdminEnquiriesPage() {
  const { enquiries } = await getSiteData();

  return (
    <>
      <AdminHeader title="Enquiries" subtitle="Review submissions and update their status." />

      <div className="space-y-6">
        {enquiries.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No enquiries yet.</div>
        ) : (
          enquiries.map((enquiry) => (
            <div key={enquiry.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">{enquiry.reference}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#101D35]">{enquiry.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{enquiry.email} · {enquiry.organization || 'Independent enquiry'}</p>
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{enquiry.status}</div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-700">Subject: {enquiry.subject}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{enquiry.message}</p>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <form action={saveEnquiryStatus} className="space-y-3">
                  <input type="hidden" name="id" value={enquiry.id} />
                  <label className="block text-sm font-medium text-slate-700">Status
                    <select name="status" defaultValue={enquiry.status} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                      {['New', 'Reviewed', 'In Discussion', 'Quoted', 'Accepted', 'Completed', 'Rejected'].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white">Update status</button>
                </form>

                <form action={saveEnquiryNote} className="space-y-3">
                  <input type="hidden" name="id" value={enquiry.id} />
                  <label className="block text-sm font-medium text-slate-700">Add note
                    <textarea name="note" rows={4} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" placeholder="Add internal follow-up notes" />
                  </label>
                  <button type="submit" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">Save note</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
