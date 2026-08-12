import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/cms";

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
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: {
      default: s.defaultSeoTitle,
      template: `%s | ${s.siteName}`,
    },
    description: s.defaultSeoDescription,
    keywords: s.defaultKeywords,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      type: "website",
      siteName: s.siteName,
      title: s.ogTitle,
      description: s.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: s.ogTitle,
      description: s.ogDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const s = await getSiteSettings();
  const defaultTheme = s.theme || "aurora";

  // Set the theme before paint to avoid flash, prioritizing localStorage and falling back to DB setting
  const themeScript = `(function(){try{var t=localStorage.getItem('ts-theme');var d=t||'${defaultTheme}';document.documentElement.setAttribute('data-theme',d);}catch(e){}})();`;

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} data-theme={defaultTheme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
