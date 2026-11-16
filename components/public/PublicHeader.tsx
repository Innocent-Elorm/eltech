import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { getSiteData } from '@/lib/site-data';
import ThemeToggle from '@/components/public/ThemeToggle';

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: '/projects', label: 'Projects' },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function PublicHeader() {
  const { siteSettings } = await getSiteData();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl object-contain" />
          <div>
            <div className="text-lg font-bold tracking-tight text-[#101D35]">{siteSettings.businessName}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-[#2563EB]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/start-a-project" className="rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]">
            Start a Project
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
