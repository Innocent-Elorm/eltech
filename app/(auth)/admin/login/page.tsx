import { redirect } from 'next/navigation';
import { loginAdmin } from '@/lib/actions';
import { isAdminAuthenticated } from '@/lib/auth';

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect('/admin');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-[30px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101D35] text-xl font-bold text-white">E</div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">ELTECH Admin</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#101D35]">Secure sign in</h1>
        </div>

        <form action={loginAdmin} className="space-y-5">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB]"
            />
          </label>

          <button type="submit" className="w-full rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
            Access dashboard
          </button>
        </form>
      </div>
    </main>
  );
}
