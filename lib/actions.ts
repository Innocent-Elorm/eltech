'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { clearAdminSession, createAdminSession, getAdminCredentials } from '@/lib/auth';
import { createEnquiry, getSiteData, saveSiteData, type Enquiry } from '@/lib/site-data';

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function lines(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  organization: z.string().optional().or(z.literal('')),
  subject: z.string().min(2),
  message: z.string().min(10),
});

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(4),
  organization: z.string().min(1),
  companyRole: z.string().optional().or(z.literal('')),
  companyLocation: z.string().optional().or(z.literal('')),
  service: z.string().min(2),
  description: z.string().min(10),
  features: z.string().min(3),
  technicalRequirements: z.string().optional().or(z.literal('')),
  targetAudience: z.string().optional().or(z.literal('')),
  designPreferences: z.string().optional().or(z.literal('')),
  budget: z.string().min(1),
  timeline: z.string().min(2),
  additional: z.string().optional().or(z.literal('')),
});

export async function submitContact(formData: FormData) {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    organization: String(formData.get('organization') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    redirect('/contact?error=invalid');
  }

  await createEnquiry({
    name: values.name,
    email: values.email,
    phone: values.phone || undefined,
    organization: values.organization || undefined,
    subject: values.subject,
    message: values.message,
    serviceRequested: 'General enquiry',
  });

  redirect('/contact?success=1');
}

export async function submitQuote(formData: FormData) {
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    organization: String(formData.get('organization') ?? ''),
    companyRole: String(formData.get('companyRole') ?? ''),
    companyLocation: String(formData.get('companyLocation') ?? ''),
    service: String(formData.get('service') ?? ''),
    description: String(formData.get('description') ?? ''),
    features: String(formData.get('features') ?? ''),
    technicalRequirements: String(formData.get('technicalRequirements') ?? ''),
    targetAudience: String(formData.get('targetAudience') ?? ''),
    designPreferences: String(formData.get('designPreferences') ?? ''),
    budget: String(formData.get('budget') ?? ''),
    timeline: String(formData.get('timeline') ?? ''),
    additional: String(formData.get('additional') ?? ''),
  };

  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    redirect('/get-a-quote?error=invalid');
  }

  await createEnquiry({
    name: values.name,
    email: values.email,
    phone: values.phone || undefined,
    organization: values.organization || undefined,
    subject: `Quote request: ${values.service}`,
    message: `${values.description}\n\nCompany details:\nRole: ${values.companyRole || 'Not provided'}\nLocation: ${values.companyLocation || 'Not provided'}\n\nKey features:\n${values.features}\n\nTechnical requirements:\n${values.technicalRequirements || 'Not provided'}\n\nDesign direction:\nTarget audience: ${values.targetAudience || 'Not provided'}\nPreferences: ${values.designPreferences || 'Not provided'}\n\nEstimated budget: ${values.budget}\nPreferred timeline: ${values.timeline}\n\nAdditional information:\n${values.additional || 'None'}`,
    serviceRequested: values.service,
  });

  redirect('/get-a-quote?success=1');
}

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const credentials = getAdminCredentials();

  if (email !== credentials.email || password !== credentials.password) {
    redirect('/admin/login?error=invalid');
  }

  await createAdminSession();
  redirect('/admin');
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function saveSiteSettings(formData: FormData) {
  const current = await getSiteData();
  current.processSteps = current.processSteps.map((step, index) => ({
    ...step,
    title: String(formData.get(`processStepTitle-${index}`) ?? step.title),
    description: String(formData.get(`processStepDescription-${index}`) ?? step.description),
  }));
  current.siteSettings = {
    ...current.siteSettings,
    businessName: String(formData.get('businessName') ?? current.siteSettings.businessName),
    tagline: String(formData.get('tagline') ?? current.siteSettings.tagline),
    heroHeading: String(formData.get('heroHeading') ?? current.siteSettings.heroHeading),
    heroDescription: String(formData.get('heroDescription') ?? current.siteSettings.heroDescription),
    intro: String(formData.get('intro') ?? current.siteSettings.intro),
    aboutDescription: String(formData.get('aboutDescription') ?? current.siteSettings.aboutDescription),
    mission: String(formData.get('mission') ?? current.siteSettings.mission),
    vision: String(formData.get('vision') ?? current.siteSettings.vision),
    founderName: String(formData.get('founderName') ?? current.siteSettings.founderName),
    founderTitle: String(formData.get('founderTitle') ?? current.siteSettings.founderTitle),
    founderBio: String(formData.get('founderBio') ?? current.siteSettings.founderBio),
    contactEmail: String(formData.get('contactEmail') ?? current.siteSettings.contactEmail),
    phone: String(formData.get('phone') ?? current.siteSettings.phone),
    whatsapp: String(formData.get('whatsapp') ?? current.siteSettings.whatsapp),
    location: String(formData.get('location') ?? current.siteSettings.location),
    footerDescription: String(formData.get('footerDescription') ?? current.siteSettings.footerDescription),
    copyrightText: String(formData.get('copyrightText') ?? current.siteSettings.copyrightText),
    defaultSeoTitle: String(formData.get('defaultSeoTitle') ?? current.siteSettings.defaultSeoTitle),
    defaultSeoDescription: String(formData.get('defaultSeoDescription') ?? current.siteSettings.defaultSeoDescription),
    socialLinks: [
      { label: 'LinkedIn', href: String(formData.get('linkedin') ?? current.siteSettings.socialLinks[0]?.href ?? '') },
      { label: 'GitHub', href: String(formData.get('github') ?? current.siteSettings.socialLinks[1]?.href ?? '') },
      { label: 'X', href: String(formData.get('x') ?? current.siteSettings.socialLinks[2]?.href ?? '') },
    ],
  };

  await saveSiteData(current);
  redirect('/admin/site-settings?success=1');
}

export async function saveProject(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? crypto.randomUUID());
  const slug = slugify(String(formData.get('slug') ?? '')) || slugify(String(formData.get('title') ?? ''));
  const existingIndex = current.projects.findIndex((project) => project.id === id);
  const newProject = {
    id,
    slug,
    title: String(formData.get('title') ?? 'Untitled project'),
    shortDescription: String(formData.get('shortDescription') ?? ''),
    description: String(formData.get('description') ?? ''),
    problemStatement: String(formData.get('problemStatement') ?? ''),
    solution: String(formData.get('solution') ?? ''),
    features: lines(String(formData.get('features') ?? '')),
    technologies: String(formData.get('technologies') ?? '').split(',').map((item) => item.trim()).filter(Boolean),
    role: String(formData.get('role') ?? ''),
    completionDate: String(formData.get('completionDate') ?? ''),
    liveUrl: String(formData.get('liveUrl') ?? ''),
    githubUrl: String(formData.get('githubUrl') ?? ''),
    category: String(formData.get('category') ?? 'General'),
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    image: String(formData.get('image') ?? '/images/placeholder.png'),
    gallery: [(String(formData.get('image') ?? '/images/placeholder.png'))],
    seoTitle: String(formData.get('seoTitle') ?? ''),
    seoDescription: String(formData.get('seoDescription') ?? ''),
  };

  if (existingIndex >= 0) current.projects[existingIndex] = { ...current.projects[existingIndex], ...newProject };
  else current.projects.unshift(newProject);

  await saveSiteData(current);
  redirect('/admin/projects?success=1');
}

export async function deleteProject(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  current.projects = current.projects.filter((project) => project.id !== id);
  await saveSiteData(current);
  redirect('/admin/projects?deleted=1');
}

export async function saveService(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? crypto.randomUUID());
  const slug = slugify(String(formData.get('slug') ?? '')) || slugify(String(formData.get('title') ?? ''));
  const existingIndex = current.services.findIndex((service) => service.id === id);
  const newService = {
    id,
    slug,
    title: String(formData.get('title') ?? 'Untitled service'),
    summary: String(formData.get('summary') ?? ''),
    description: String(formData.get('description') ?? ''),
    icon: String(formData.get('icon') ?? 'Sparkles'),
    highlights: lines(String(formData.get('highlights') ?? '')),
    features: lines(String(formData.get('features') ?? '')),
    deliverables: lines(String(formData.get('deliverables') ?? '')),
    approach: String(formData.get('approach') ?? ''),
    published: formData.get('published') === 'on',
    seoTitle: String(formData.get('seoTitle') ?? ''),
    seoDescription: String(formData.get('seoDescription') ?? ''),
  };

  if (existingIndex >= 0) current.services[existingIndex] = { ...current.services[existingIndex], ...newService };
  else current.services.unshift(newService);

  await saveSiteData(current);
  redirect('/admin/services?success=1');
}

export async function deleteService(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  current.services = current.services.filter((service) => service.id !== id);
  await saveSiteData(current);
  redirect('/admin/services?deleted=1');
}

export async function saveCategory(formData: FormData) {
  const current = await getSiteData();
  const name = String(formData.get('name') ?? '').trim();
  if (!name) redirect('/admin/categories?error=invalid');
  const slug = slugify(String(formData.get('slug') ?? name));
  current.categories = [{ id: String(formData.get('id') ?? crypto.randomUUID()), name, slug }, ...current.categories.filter((category) => category.id !== String(formData.get('id') ?? ''))];
  await saveSiteData(current);
  redirect('/admin/categories?success=1');
}

export async function deleteCategory(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  current.categories = current.categories.filter((category) => category.id !== id);
  await saveSiteData(current);
  redirect('/admin/categories?deleted=1');
}

export async function saveTestimonial(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? crypto.randomUUID());
  const testimonial = {
    id,
    name: String(formData.get('name') ?? ''),
    organization: String(formData.get('organization') ?? ''),
    quote: String(formData.get('quote') ?? ''),
    imageUrl: String(formData.get('imageUrl') ?? ''),
    published: formData.get('published') === 'on',
  };
  const index = current.testimonials.findIndex((item) => item.id === id);
  if (index >= 0) current.testimonials[index] = testimonial;
  else current.testimonials.unshift(testimonial);
  await saveSiteData(current);
  redirect('/admin/testimonials?success=1');
}

export async function deleteTestimonial(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  current.testimonials = current.testimonials.filter((item) => item.id !== id);
  await saveSiteData(current);
  redirect('/admin/testimonials?deleted=1');
}

export async function saveEnquiryStatus(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  const requestedStatus = String(formData.get('status') ?? 'New');
  const validStatus: Enquiry['status'] = ['New', 'Reviewed', 'In Discussion', 'Quoted', 'Accepted', 'Completed', 'Rejected'].includes(requestedStatus)
    ? (requestedStatus as Enquiry['status'])
    : 'New';

  current.enquiries = current.enquiries.map((enquiry) => enquiry.id === id ? { ...enquiry, status: validStatus } : enquiry);
  await saveSiteData(current);
  redirect('/admin/enquiries?updated=1');
}

export async function saveEnquiryNote(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  const note = String(formData.get('note') ?? '').trim();
  if (!note) redirect('/admin/enquiries?error=invalid');
  current.enquiries = current.enquiries.map((enquiry) => enquiry.id === id ? { ...enquiry, notes: [...(enquiry.notes ?? []), note] } : enquiry);
  await saveSiteData(current);
  redirect('/admin/enquiries?updated=1');
}

export async function saveMedia(formData: FormData) {
  const current = await getSiteData();
  const url = String(formData.get('url') ?? '').trim();
  const fileName = String(formData.get('fileName') ?? 'upload');
  if (!url) redirect('/admin/media?error=invalid');
  current.mediaAssets.unshift({ id: crypto.randomUUID(), fileName, url, mimeType: 'image/webp', size: 1024 });
  await saveSiteData(current);
  redirect('/admin/media?success=1');
}

export async function deleteMedia(formData: FormData) {
  const current = await getSiteData();
  const id = String(formData.get('id') ?? '');
  current.mediaAssets = current.mediaAssets.filter((item) => item.id !== id);
  await saveSiteData(current);
  redirect('/admin/media?deleted=1');
}
