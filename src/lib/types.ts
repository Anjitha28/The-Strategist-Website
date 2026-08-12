// Serializable shapes passed from server components to client components.

export type NavChild = {
  id: string;
  label: string;
  url: string;
  icon: string | null;
  description: string | null;
};

export type NavItem = {
  id: string;
  label: string;
  url: string;
  megaGroup: string | null;
  children: NavChild[];
};

export type HeaderSettings = {
  siteName: string;
  logoUrl: string;
  logoDarkUrl: string | null;
  phone: string;
  whatsapp: string;
};

export type FooterColumn = { column: string; links: { label: string; url: string }[] };
