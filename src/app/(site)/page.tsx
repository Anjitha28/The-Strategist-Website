// Server Component — fetches hero data from DB, renders HeroSection + passes to client
import { HeroSection } from "@/components/site/HeroSection";
import HomePageClient from "@/components/site/HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      {/* Hero: DB-driven text overlaid on 3D visualization background */}
      <HeroSection />

      {/* Everything else: client-side animations, solutions, blog, CTA */}
      <HomePageClient />
    </>
  );
}
