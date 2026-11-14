import AdminHeader from '@/components/admin/AdminHeader';
import { deleteTestimonial, saveTestimonial } from '@/lib/actions';
import { getSiteData } from '@/lib/site-data';

export default async function AdminTestimonialsPage() {
  const { testimonials } = await getSiteData();

  return (
    <>
      <AdminHeader title="Testimonials" subtitle="Add social proof and client feedback to the public site." />

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <form action={saveTestimonial} className="grid gap-5 md:grid-cols-2">
          <input type="hidden" name="id" value="" />
          <label className="text-sm font-medium text-slate-700">Name<input name="name" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="text-sm font-medium text-slate-700">Organization<input name="organization" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="md:col-span-2 text-sm font-medium text-slate-700">Quote<textarea name="quote" rows={4} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="md:col-span-2 text-sm font-medium text-slate-700">Image URL<input name="imageUrl" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" name="published" /> Published</label>
          <div className="md:col-span-2 flex justify-end"><button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">Save testimonial</button></div>
        </form>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#101D35]">Saved testimonials</h2>
        <div className="mt-5 space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#101D35]">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.organization || 'Anonymous'}</p>
                </div>
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <button type="submit" className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">Delete</button>
                </form>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">“{testimonial.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
