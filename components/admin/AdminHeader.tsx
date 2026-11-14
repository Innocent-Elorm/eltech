import { Search } from 'lucide-react';

type Props = {
  title: string;
  subtitle?: string;
};

export default function AdminHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563EB]">Administration</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#101D35]">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
      </div>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-[#2563EB]" placeholder="Search records" />
      </div>
    </div>
  );
}
