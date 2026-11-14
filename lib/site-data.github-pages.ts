import siteContent from "@/data/site-data.json";
import type { Project, Service, SiteContent } from "./site-data";

export async function getSiteData(): Promise<SiteContent> {
  return siteContent as SiteContent;
}

export async function getPublishedServices(): Promise<Service[]> {
  const data = await getSiteData();
  return data.services.filter((service) => service.published);
}

export async function getPublishedProjects(): Promise<Project[]> {
  const data = await getSiteData();
  return data.projects.filter((project) => project.published);
}
