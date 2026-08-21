import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brandName = settings.siteName;
  const description = settings.defaultSeoDescription || settings.tagline;

  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: {
      default: settings.defaultSeoTitle || `${brandName} | Strategy • Analytics • Automation • Technology`,
      template: `%s | ${brandName}`,
    },
    description,
    keywords: settings.defaultKeywords,
    icons: { icon: settings.faviconUrl || "/favicon.ico" },
    openGraph: {
      type: "website",
      siteName: brandName,
      title: settings.defaultSeoTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultSeoTitle,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const defaultTheme = "light";

  // Set the theme before paint to avoid flash
  const themeScript = `(function(){try{var t=localStorage.getItem('ts-theme');var d=t||'${defaultTheme}';document.documentElement.setAttribute('data-theme',d);}catch(e){}})();`;

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} data-theme={defaultTheme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">{children}</body>
    </html>
  );
}
