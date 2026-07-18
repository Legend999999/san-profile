export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string | null;
  website_url: string;
  screenshot_url: string | null;
  technologies: string[];
  category: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type WebsiteSettings = {
  id: string;
  site_title: string;
  owner_name: string;
  introduction: string;
  about_text: string;
  github_url: string | null;
  telegram_url: string | null;
  email: string | null;
  footer_text: string;
  updated_at: string;
};

export type ProjectInput = {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  website_url: string;
  screenshot_url: string;
  technologies: string[];
  category: string;
  featured: boolean;
  published: boolean;
  display_order: number;
};
