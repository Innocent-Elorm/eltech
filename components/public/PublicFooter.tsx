import Image from 'next/image';
import Link from 'next/link';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { getSiteData, getPublishedServices } from '@/lib/site-data';

export default async function PublicFooter() {
  const [{ siteSettings }, services] = await Promise.all([getSiteData(), getPublishedServices()]);

  return (
    <footer className="bg-[#0B1220] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <Image src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl bg-white object-contain p-1" />
            <div>
              <div className="text-lg font-bold text-white">{siteSettings.businessName}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{siteSettings.tagline}</div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">{siteSettings.footerDescription}</p>
          <div className="mt-5 flex gap-3 text-slate-300">
            <a href="https://www.linkedin.com" aria-label="LinkedIn" className="rounded-full border border-slate-700 p-2 transition hover:border-[#2563EB] hover:text-white"><Globe className="h-4 w-4" /></a>
            <a href="https://github.com" aria-label="GitHub" className="rounded-full border border-slate-700 p-2 transition hover:border-[#2563EB] hover:text-white"><Globe className="h-4 w-4" /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="rounded-full border border-slate-700 p-2 transition hover:border-[#2563EB] hover:text-white"><Globe className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Services</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4" /> <a href={`mailto:${siteSettings.contactEmail}`}>{siteSettings.contactEmail}</a></li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" /> <a href={`tel:${siteSettings.phone}`}>{siteSettings.phone}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> {siteSettings.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{siteSettings.copyrightText}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy">Privacy policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
