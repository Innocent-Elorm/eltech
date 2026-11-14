import AdminHeader from '@/components/admin/AdminHeader';
import { getSiteData } from '@/lib/site-data';

export default async function AdminUsersPage() {
  const { adminUsers } = await getSiteData();

  return (
    <>
      <AdminHeader title="Users" subtitle="Review administrator access and account status." />

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {adminUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-semibold text-[#101D35]">{user.email}</p>
                <p className="text-sm text-slate-600">{user.role}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
