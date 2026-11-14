"use client";

import type { FormEvent } from "react";

export default function StaticContactForm({ contactEmail }: { contactEmail: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Array.from(formData.entries())
      .map(([name, value]) => `${name}: ${value}`)
      .join("\n");
    const subject = String(formData.get("subject") ?? "Website enquiry");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name
          <input name="name" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email
          <input type="email" name="email" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Phone
          <input name="phone" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Organization
          <input name="organization" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Subject
          <input name="subject" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]" />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Message
          <textarea name="message" required rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]" />
        </label>
      </div>
      <div className="mt-6">
        <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
          Open email app
        </button>
      </div>
    </form>
  );
}
