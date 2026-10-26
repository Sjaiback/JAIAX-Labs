export type PublicationStatus = "borrador" | "pendiente" | "publicado";
export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  cover: string;
  status: PublicationStatus;
  authorized: boolean;
  concept: boolean;
  problem: string;
  solution: string;
  results: string[];
}
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
  billing: "Pago único de desarrollo" | "Cotización personalizada";
  budget: string;
}
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  date: string;
  quote: string;
  status: PublicationStatus;
  approved: boolean;
}
export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  whatsapp: string;
  projectType: string;
  budget: string;
  description: string;
  deadline: string;
  consent: boolean;
  plan?: string;
  createdAt: string;
}
export interface Repository<T extends { id: string }> {
  list(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  remove(id: string): Promise<void>;
}
export interface LeadGateway {
  submit(
    lead: Omit<Lead, "id" | "createdAt">,
  ): Promise<{ delivered: boolean; reference?: string; message: string }>;
}
