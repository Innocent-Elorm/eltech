import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { isAdminAuthenticated } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">Restricted access</p>
          <h1 className="mt-3 text-3xl font-bold text-[#101D35]">Admin sign in required</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Please sign in to access the ELTECH admin dashboard.</p>
          <Link href="/admin/login" className="mt-6 inline-flex rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
