import Link from 'next/link';
import { BriefcaseBusiness, FolderKanban, Images, LayoutDashboard, LockKeyhole, PencilLine, Settings, ShieldCheck, Users, MessageSquareText } from 'lucide-react';
import { logoutAdmin } from '@/lib/actions';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/services', label: 'Services', icon: BriefcaseBusiness },
  { href: '/admin/categories', label: 'Categories', icon: PencilLine },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareText },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquareText },
  { href: '/admin/media', label: 'Media', icon: Images },
  { href: '/admin/site-settings', label: 'Site settings', icon: Settings },
  { href: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminSidebar() {
  return (
    <aside className="flex min-h-screen w-full max-w-[260px] flex-col bg-[#101D35] text-slate-100">
      <div className="border-b border-slate-700 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-sm font-bold text-white">E</div>
          <div>
            <div className="text-lg font-bold">ELTECH Admin</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Protected</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white">
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400"><ShieldCheck className="h-3.5 w-3.5" /> Security</div>
        <form action={logoutAdmin}>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800">
            <LockKeyhole className="h-4 w-4" /> Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
