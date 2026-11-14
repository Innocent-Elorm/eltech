import { promises as fs } from 'node:fs';
import path from 'node:path';
import { cacheLife, cacheTag, updateTag } from 'next/cache';

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  heroHeading: string;
  heroDescription: string;
  intro: string;
  aboutDescription: string;
  mission: string;
  vision: string;
  coreValues: string[];
  founderName: string;
  founderTitle: string;
  founderBio: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  location: string;
  footerDescription: string;
  copyrightText: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  socialLinks: SocialLink[];
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  highlights: string[];
  features: string[];
  deliverables: string[];
  approach: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  problemStatement: string;
  solution: string;
  features: string[];
  technologies: string[];
  role: string;
  completionDate?: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  published: boolean;
  image: string;
  gallery: string[];
  seoTitle: string;
  seoDescription: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type Enquiry = {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  serviceRequested?: string;
  status: 'New' | 'Reviewed' | 'In Discussion' | 'Quoted' | 'Accepted' | 'Completed' | 'Rejected';
  createdAt: string;
  notes?: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Testimonial = {
  id: string;
  name: string;
  organization?: string;
  quote: string;
  imageUrl?: string;
  published: boolean;
};

export type MediaItem = {
  id: string;
  fileName: string;
  url: string;
  mimeType: string;
  size: number;
};

export type AdminUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: 'super_admin' | 'content_admin';
};

export type SiteContent = {
  siteSettings: SiteSettings;
  services: Service[];
  projects: Project[];
  processSteps: ProcessStep[];
  enquiries: Enquiry[];
  categories: Category[];
  testimonials: Testimonial[];
  mediaAssets: MediaItem[];
  adminUsers: AdminUser[];
};

const defaultContent: SiteContent = {
  siteSettings: {
    businessName: 'ELTECH IT SOLUTIONS',
    tagline: 'Empowering Your Digital Transformation',
    heroHeading: 'Building Digital Solutions That Move Businesses Forward.',
    heroDescription:
      'ELTECH IT SOLUTIONS transforms ideas and business challenges into practical digital products through custom software development, modern web applications, and technology solutions.',
    intro:
      'ELTECH IT SOLUTIONS is a software development studio focused on building practical, reliable, and scalable digital products for businesses that need technology to work harder.',
    aboutDescription:
      'ELTECH IT SOLUTIONS helps businesses turn operational challenges into digital opportunities through custom software, web platforms, and systems that support growth.',
    mission: 'To build useful, maintainable, and business-focused digital solutions that create measurable value.',
    vision: 'To become a trusted local technology partner for organizations seeking practical and future-ready digital transformation.',
    coreValues: [
      'Business-first thinking',
      'Practical implementation',
      'Clear communication',
      'Maintainable systems',
      'Continuous improvement',
    ],
    founderName: 'Eltech Founder',
    founderTitle: 'IT Professional & Full-Stack Developer',
    founderBio:
      'An IT professional with a background in computer network management, systems administration, and software development, with interests spanning Python, Django, Next.js, database design, APIs, cloud computing, networking, and Linux operations.',
    contactEmail: 'hello@eltechsolutions.com',
    phone: '+233 24 000 0000',
    whatsapp: '+233 240000000',
    location: 'Koforidua, Ghana',
    footerDescription:
      'ELTECH IT SOLUTIONS designs and builds practical digital platforms that help businesses operate more effectively.',
    copyrightText: '© 2025 ELTECH IT SOLUTIONS. All rights reserved.',
    defaultSeoTitle: 'ELTECH IT SOLUTIONS | Digital Solutions for Modern Businesses',
    defaultSeoDescription:
      'Custom web applications, business systems, website development, API integrations, and technical consulting for growing organizations.',
    socialLinks: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'X', href: 'https://x.com' },
    ],
  },
  services: [
    {
      id: 'svc-web-apps',
      slug: 'custom-web-application-development',
      title: 'Custom Web Application Development',
      summary: 'Tailored digital products built to solve operational challenges and improve efficiency.',
      description:
        'We design and build custom web applications that align with your business goals, scale with your processes, and improve day-to-day operations.',
      icon: 'MonitorSmartphone',
      highlights: ['Business workflow automation', 'Scalable architecture', 'Team-friendly interfaces'],
      features: ['Requirements analysis', 'UX-focused design', 'Ongoing enhancements'],
      deliverables: ['Application architecture', 'Responsive UI', 'Deployment support'],
      approach: 'We begin with business workflows, map the most critical actions, and implement a practical system with room for future growth.',
      published: true,
      seoTitle: 'Custom Web Application Development | ELTECH IT SOLUTIONS',
      seoDescription: 'Custom web applications designed for business efficiency, process automation, and better digital experiences.',
    },
    {
      id: 'svc-bms',
      slug: 'business-management-systems',
      title: 'Business Management Systems',
      summary: 'Practical systems for operations, reporting, and decision-making.',
      description:
        'We build internal systems that centralize information, reduce manual work, and help teams operate with more visibility and control.',
      icon: 'FolderKanban',
      highlights: ['Operations visibility', 'Built for real teams', 'Cleaner data handling'],
      features: ['Finance workflows', 'Task management', 'Reporting dashboards'],
      deliverables: ['Business process mapping', 'Role-based access', 'Data dashboards'],
      approach: 'The solution is designed around daily business operations, ensuring users can work faster without adding complexity.',
      published: true,
      seoTitle: 'Business Management Systems | ELTECH IT SOLUTIONS',
      seoDescription: 'Business systems for improving operational visibility, reporting, and process continuity.',
    },
    {
      id: 'svc-websites',
      slug: 'website-design-and-development',
      title: 'Website Design and Development',
      summary: 'Professional websites and landing pages built to inspire trust and capture leads.',
      description:
        'Whether you need a modern business website or a conversion-focused sales funnel, we build digital experiences that communicate value clearly.',
      icon: 'Globe',
      highlights: ['Strong brand positioning', 'Responsive experiences', 'Clear conversion paths'],
      features: ['Content structure', 'SEO-ready pages', 'Lead generation flow'],
      deliverables: ['Branded design', 'Responsive pages', 'Launch support'],
      approach: 'We combine user experience, message clarity, and performance to create websites that work as business tools.',
      published: true,
      seoTitle: 'Website Design and Development | ELTECH IT SOLUTIONS',
      seoDescription: 'Professional websites and landing pages designed to improve trust, engagement, and client inquiries.',
    },
    {
      id: 'svc-api',
      slug: 'api-development-and-integration',
      title: 'API Development and Integration',
      summary: 'Connect systems, services, and data flows using reliable interfaces.',
      description:
        'We help businesses connect their software ecosystem through secure and maintainable APIs, integrations, and data exchange layers.',
      icon: 'Network',
      highlights: ['Secure integrations', 'Scalable interfaces', 'Connected systems'],
      features: ['REST API design', 'Third-party integrations', 'Data synchronization'],
      deliverables: ['API contracts', 'Integration workflows', 'Monitoring setups'],
      approach: 'We design interfaces around real business needs, prioritizing security, maintainability, and future compatibility.',
      published: true,
      seoTitle: 'API Development and Integration | ELTECH IT SOLUTIONS',
      seoDescription: 'API design and integration services that connect software tools, business workflows, and external platforms.',
    },
    {
      id: 'svc-database',
      slug: 'database-design-and-management',
      title: 'Database Design and Management',
      summary: 'Efficient and well-structured data foundations that support business growth.',
      description:
        'We build clean, secure, and scalable database structures that support reporting, application logic, and long-term system reliability.',
      icon: 'Database',
      highlights: ['Clean data architecture', 'Reliable data flow', 'Performance-aware design'],
      features: ['Schema design', 'Query optimization', 'Migration planning'],
      deliverables: ['Logical model', 'Database setup', 'Maintenance guidance'],
      approach: 'We focus on long-term maintainability, data integrity, and practical querying rather than short-term complexity.',
      published: true,
      seoTitle: 'Database Design and Management | ELTECH IT SOLUTIONS',
      seoDescription: 'Database architecture and management services built for secure, scalable, and maintainable data access.',
    },
    {
      id: 'svc-consulting',
      slug: 'it-consulting-and-technical-solutions',
      title: 'IT Consulting and Technical Solutions',
      summary: 'Strategic guidance for systems, infrastructure, and digital decisions.',
      description:
        'We advise teams on technology decisions, system improvements, and the practical steps needed to digitalize business operations effectively.',
      icon: 'Lightbulb',
      highlights: ['Practical recommendations', 'Technical guidance', 'Clear roadmap'],
      features: ['System review', 'Infrastructure recommendations', 'Digital strategy support'],
      deliverables: ['Actionable recommendations', 'Technology roadmap', 'Implementation plan'],
      approach: 'Every recommendation is grounded in the realities of the current environment, operational needs, and future expansion.',
      published: true,
      seoTitle: 'IT Consulting and Technical Solutions | ELTECH IT SOLUTIONS',
      seoDescription: 'Technology consulting and solution guidance for infrastructure, systems modernization, and digital growth.',
    },
  ],
  projects: [
    {
      id: 'proj-gesam',
      slug: 'gesam-national-congress-conference-registration',
      title: 'GESAM National Congress Conference Registration',
      shortDescription: 'Conference registration platform for a national congress event.',
      description:
        'A registration platform designed to manage event participation, submissions, and logistical coordination for the GESAM National Congress.',
      problemStatement:
        'The client needed an efficient way to manage registrations and event-related participant information in a professional, easy-to-use system.',
      solution:
        'A web-based registration solution that structured attendee data, improved process clarity, and supported event operations online.',
      features: ['Registration workflows', 'Participant records', 'Responsive event pages'],
      technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
      role: 'Full-stack implementation and technical support',
      completionDate: '2025',
      liveUrl: 'https://gesamofficial.com/',
      category: 'Event Platform',
      featured: true,
      published: true,
      image: '/images/gesam-placeholder.svg',
      gallery: ['/images/gesam-placeholder.svg'],
      seoTitle: 'GESAM National Congress Conference Registration | ELTECH IT SOLUTIONS',
      seoDescription: 'Conference registration platform for a national congress event built to simplify attendee management and event participation.',
    },
  ],
  processSteps: [
    { id: 'step-1', title: 'Discovery and Consultation', description: 'We learn about your business needs, objectives, and the practical problem to solve.' },
    { id: 'step-2', title: 'Planning and System Design', description: 'We define the structure, workflows, and system requirements needed for a sustainable solution.' },
    { id: 'step-3', title: 'Development', description: 'We build the application with attention to maintainability, usability, and performance.' },
    { id: 'step-4', title: 'Testing and Quality Assurance', description: 'We validate functionality, usability, and edge cases before final delivery.' },
    { id: 'step-5', title: 'Deployment', description: 'The project is launched in a production-ready environment with relevant support.' },
    { id: 'step-6', title: 'Support and Improvement', description: 'We stay available for updates, improvements, and technical follow-up as your needs evolve.' },
  ],
  enquiries: [],
  categories: [
    { id: 'cat-event', name: 'Event Platform', slug: 'event-platform' },
  ],
  testimonials: [],
  mediaAssets: [],
  adminUsers: [
    {
      id: 'admin-1',
      email: 'admin@eltechsolutions.com',
      passwordHash: 'change-me',
      role: 'super_admin',
    },
  ],
};

const dataFilePath = path.join(process.cwd(), 'data', 'site-data.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(defaultContent, null, 2), 'utf8');
  }
}

export async function getSiteData(): Promise<SiteContent> {
  'use cache';
  cacheLife('minutes');
  cacheTag('site-data');

  await ensureDataFile();

  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const parsed = JSON.parse(data) as Partial<SiteContent>;

    return {
      siteSettings: { ...defaultContent.siteSettings, ...(parsed.siteSettings ?? {}) },
      services: parsed.services ?? defaultContent.services,
      projects: parsed.projects ?? defaultContent.projects,
      processSteps: parsed.processSteps ?? defaultContent.processSteps,
      enquiries: parsed.enquiries ?? defaultContent.enquiries,
      categories: parsed.categories ?? defaultContent.categories,
      testimonials: parsed.testimonials ?? defaultContent.testimonials,
      mediaAssets: parsed.mediaAssets ?? defaultContent.mediaAssets,
      adminUsers: parsed.adminUsers ?? defaultContent.adminUsers,
    };
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify(defaultContent, null, 2), 'utf8');
    return defaultContent;
  }
}

export async function saveSiteData(nextData: SiteContent): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(nextData, null, 2), 'utf8');
  updateTag('site-data');
}

export async function createEnquiry(input: Omit<Enquiry, 'id' | 'reference' | 'createdAt' | 'status'> & { serviceRequested?: string }): Promise<Enquiry> {
  const current = await getSiteData();
  const ref = `ELT-${String(current.enquiries.length + 1).padStart(4, '0')}`;
  const data: Enquiry = {
    ...input,
    id: crypto.randomUUID(),
    reference: ref,
    status: 'New',
    createdAt: new Date().toISOString(),
    notes: input.notes ?? [],
  };

  current.enquiries = [data, ...current.enquiries];
  await saveSiteData(current);
  return data;
}

export async function getPublishedServices(): Promise<Service[]> {
  const data = await getSiteData();
  return data.services.filter((service) => service.published);
}

export async function getPublishedProjects(): Promise<Project[]> {
  const data = await getSiteData();
  return data.projects.filter((project) => project.published);
}
