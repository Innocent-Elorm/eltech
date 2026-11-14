import AdminHeader from '@/components/admin/AdminHeader';
import { deleteCategory, saveCategory } from '@/lib/actions';
import { getSiteData } from '@/lib/site-data';

export default async function AdminCategoriesPage() {
  const { categories } = await getSiteData();

  return (
    <>
      <AdminHeader title="Categories" subtitle="Group projects and content entries with clear taxonomy." />

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <form action={saveCategory} className="flex flex-col gap-4 md:flex-row md:items-end">
          <label className="flex-1 text-sm font-medium text-slate-700">Category name<input name="name" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <label className="flex-1 text-sm font-medium text-slate-700">Slug<input name="slug" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5" /></label>
          <button type="submit" className="rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white">Save category</button>
        </form>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#101D35]">Current categories</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => (
            <form key={category.id} action={deleteCategory} className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
              <input type="hidden" name="id" value={category.id} />
              <span className="text-sm font-medium text-slate-700">{category.name}</span>
              <button type="submit" className="text-xs font-semibold text-red-700">Delete</button>
            </form>
          ))}
        </div>
      </div>
    </>
  );
}
