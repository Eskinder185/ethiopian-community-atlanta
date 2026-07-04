export type LanguageCode = "en" | "am";

export type CTAButton = {
  label: string;
  href: string;
  style?: string;
  external?: boolean;
  variant?: string;
};

export type PageHeroContent = {
  eyebrow?: string;
  title: string;
  description?: string;
  buttons?: CTAButton[];
  image?: string;
  imageAlt?: string;
};

export type EventItem = {
  id?: string;
  title: string;
  slug?: string;
  description?: string;
  date?: string;
  endDate?: string;
  location?: string;
  imageUrl?: string;
  posterUrl?: string;
  link?: string;
  visible?: boolean;
  featured?: boolean;
};

export type MediaItem = {
  id?: string;
  title: string;
  description?: string;
  mediaType?: "photo" | "video" | "document" | string;
  imageUrl?: string;
  videoUrl?: string;
  link?: string;
  altText?: string;
  visible?: boolean;
  featured?: boolean;
  displayOrder?: number;
};

export type LeadershipMember = {
  id?: string;
  name: string;
  role?: string;
  title?: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  visible?: boolean;
  displayOrder?: number;
};

export type ProgramItem = {
  id?: string;
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  imageUrl?: string;
  visible?: boolean;
  featured?: boolean;
  displayOrder?: number;
};

export type DocumentItem = {
  id?: string;
  title: string;
  description?: string;
  fileUrl?: string;
  link?: string;
  visible?: boolean;
};

export type SupabaseContentAm = Record<string, unknown>;

export type AdminUser = {
  id: string;
  email?: string;
  role?: string;
};

export type RouteOption = {
  label: string;
  path: string;
};
