import { Hero, LegalHero } from "./Hero";
import { HeroScroll } from "./HeroScroll";
import { HeroStratus } from "./HeroStratus";
import {
  Intro, CardsSection, FeaturesSection, ProcessSection, IndustriesSection,
  ServicesSection, ChallengesSection, VisionMission, PromoSection, CtaSection, LegalSection,
  WhatWeDoSection, PositioningSection,
} from "./ContentSections";
import {
  FaqsSection, TestimonialsSection, ClientMarquee, InsightsSection, ProductCatalog,
  CourseCategoriesSection, CourseCatalog, DepartmentsSection, TeamSection, ContactDepartments,
  FeaturedProducts, FeaturedLearning,
} from "./DataSections";
import { ContactSection, ConsultationSection, NewsletterSection } from "./FormSections";
import { BlogListSection } from "./BlogListSection";
import { JobListSection } from "./JobListSection";

type SectionInput = {
  key: string;
  type: string;
  data: Record<string, unknown>;
  visible: boolean;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const REGISTRY: Record<string, (props: { data: any }) => React.ReactNode> = {
  hero: HeroStratus,
  "legal-hero": LegalHero,
  intro: Intro,
  cards: CardsSection,
  features: FeaturesSection,
  process: ProcessSection,
  industries: IndustriesSection,
  services: ServicesSection,
  challenges: ChallengesSection,
  "vision-mission": VisionMission,
  promo: PromoSection,
  cta: CtaSection,
  legal: LegalSection,
  "what-we-do": WhatWeDoSection as never,
  positioning: PositioningSection as never,
  faqs: FaqsSection as never,
  testimonials: TestimonialsSection as never,
  insights: InsightsSection,
  "product-catalog": ProductCatalog as never,
  "featured-products": FeaturedProducts as never,
  "featured-learning": FeaturedLearning as never,
  "course-categories": CourseCategoriesSection as never,
  "course-catalog": CourseCatalog as never,
  departments: DepartmentsSection as never,
  team: TeamSection as never,
  "contact-departments": ContactDepartments,
  contact: ContactSection as never,
  consultation: ConsultationSection,
  newsletter: NewsletterSection,
  "blog-list": BlogListSection as never,
  "job-list": JobListSection as never,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Render an ordered list of CMS sections. Some section components are async server components. */
export function SectionRenderer({ sections, theme }: { sections: SectionInput[]; theme?: string }) {
  return (
    <>
      {sections
        .filter((s) => s.visible)
        .map((s) => {
          const Cmp = REGISTRY[s.type];
          if (!Cmp) return null;
          return <Cmp key={s.key} data={s.data} />;
        })}
    </>
  );
}
