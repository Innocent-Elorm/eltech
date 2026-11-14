"use client";

import type { FormEvent } from "react";

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100";
const labelClassName = "block text-sm font-medium text-slate-700";

export default function StaticQuoteForm({ contactEmail }: { contactEmail: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Array.from(formData.entries())
      .map(([name, value]) => `${name}: ${value}`)
      .join("\n\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent("Project quote request")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
      <label className={labelClassName}>
        Your name
        <input name="name" autoComplete="name" required className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        Company or organization
        <input name="organization" autoComplete="organization" required className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        Email address
        <input type="email" name="email" autoComplete="email" required className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        Phone number
        <input type="tel" name="phone" autoComplete="tel" required className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        Your role (optional)
        <input name="companyRole" autoComplete="organization-title" className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        Company location (optional)
        <input name="companyLocation" autoComplete="address-level2" className={fieldClassName} />
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        What kind of service do you need?
        <input name="service" required className={fieldClassName} />
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        What should this project help you achieve?
        <textarea name="description" rows={4} required className={fieldClassName} />
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        Key features or functionality
        <textarea name="features" rows={3} required className={fieldClassName} />
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        Technical requirements
        <textarea name="technicalRequirements" rows={3} className={fieldClassName} />
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        Target audience (optional)
        <textarea name="targetAudience" rows={3} className={fieldClassName} />
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        Design preferences or brand requirements (optional)
        <textarea name="designPreferences" rows={3} className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        Estimated budget or range
        <input name="budget" required className={fieldClassName} />
      </label>
      <label className={labelClassName}>
        When would you like to begin?
        <select name="timeline" required defaultValue="" className={fieldClassName}>
          <option value="" disabled>Select a preferred timeframe</option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="Within 1 month">Within 1 month</option>
          <option value="Within 1-3 months">Within 1-3 months</option>
          <option value="More than 3 months">More than 3 months</option>
          <option value="Flexible">Flexible</option>
        </select>
      </label>
      <label className={`${labelClassName} md:col-span-2`}>
        Anything else we should know? (optional)
        <textarea name="additional" rows={3} className={fieldClassName} />
      </label>
      <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8] md:col-span-2">
        Open email app
      </button>
    </form>
  );
}
