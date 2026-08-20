import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-static";

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
  const brandName = SITE_CONFIG.brand.name;
  const tagline = SITE_CONFIG.brand.tagline;

  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: {
      default: `${brandName} | Strategy • Analytics • Automation • Technology`,
      template: `%s | ${brandName}`,
    },
    description: tagline,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      type: "website",
      siteName: brandName,
      title: brandName,
      description: tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: brandName,
      description: tagline,
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
