export interface CommandItemData {
  id: string;
  icon: string;
  label: string;
  description?: string;
  shortcut?: string;
  action?: string;
  href: string;
  keywords: string;
}

export interface ReviewData {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  stats?: string;
  href: string;
  keywords: string;
}
