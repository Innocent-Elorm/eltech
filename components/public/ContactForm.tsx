import { submitContact } from '@/lib/actions';

export function ContactForm() {
  return (
    <form action={submitContact} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name
          <input name="name" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email
          <input type="email" name="email" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Phone
          <input name="phone" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Organization
          <input name="organization" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#2563EB]" />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-slate-700">
          Subject
          <input name="subject" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#2563EB]" />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-slate-700">
          Message
          <textarea name="message" required rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-[#2563EB]" />
        </label>
      </div>

      <div className="mt-6">
        <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">Send enquiry</button>
      </div>
    </form>
  );
}
