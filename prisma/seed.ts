import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DEFAULT_ROLES } from "../src/lib/permissions";
import { HOME, ABOUT, type PageSeed } from "./seed-data";
import { CORPORATE, EDUCATIONAL, PRODUCTS as PRODUCTS_PAGE, TRAINING } from "./seed-pages-2";
import { BLOG, CAREERS, CONTACT, LEGAL_PRIVACY, LEGAL_TERMS, LEGAL_COOKIE } from "./seed-pages-3";
import {
  NAVIGATION, FAQS, TESTIMONIALS, CLIENT_LOGOS, PRODUCT_CATEGORIES, PRODUCTS,
  COURSE_CATEGORIES, COURSES, DEPARTMENTS, JOBS, TEAM, AUTHORS, BLOG_CATEGORIES,
  BLOG_TAGS, BLOG_POSTS,
} from "./seed-collections";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@thestrategist.com";
const ADMIN_PASSWORD = "Strategist@2026";

const PAGES: PageSeed[] = [
  HOME, ABOUT, CORPORATE, EDUCATIONAL, PRODUCTS_PAGE, TRAINING, BLOG, CAREERS, CONTACT,
  LEGAL_PRIVACY, LEGAL_TERMS, LEGAL_COOKIE,
];

async function seedRolesAndUser() {
  const roleByName = new Map<string, string>();
  for (const r of DEFAULT_ROLES) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description, isSystem: r.isSystem, permissions: JSON.stringify(r.permissions) },
      create: { name: r.name, description: r.description, isSystem: r.isSystem, permissions: JSON.stringify(r.permissions) },
    });
    roleByName.set(r.name, role.id);
  }

  const superRoleId = roleByName.get("Super Administrator")!;
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { name: "Site Administrator", roleId: superRoleId, isActive: true },
    create: {
      email: ADMIN_EMAIL, name: "Site Administrator", designation: "Super Administrator",
      passwordHash, roleId: superRoleId, isActive: true,
    },
  });
}

async function seedSettings() {
  const businessHours = JSON.stringify([
    { day: "Monday – Friday", hours: "09:00 AM – 06:00 PM" },
    { day: "Saturday", hours: "09:00 AM – 01:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]);

  const data = {
    siteName: "The Strategist",
    tagline: "Gain the competitive edge",
    logoUrl: "/brand/strategist-logo.png",
    companyDescription:
      "The Strategist helps organizations transform business operations through Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, Digital Transformation, Software Products, Professional Learning, and Strategic Consulting.",
    businessEmail: "hello@thestrategist.com",
    supportEmail: "support@thestrategist.com",
    salesEmail: "sales@thestrategist.com",
    phone: "+1 (555) 010-2030",
    whatsapp: "15550102030",
    address: "One Analytics Way, Suite 400, Innovation District",
    mapsUrl: "https://maps.google.com/?q=Innovation+District",
    businessHours,
    linkedin: "https://linkedin.com/company/the-strategist",
    facebook: "https://facebook.com/thestrategist",
    instagram: "https://instagram.com/thestrategist",
    youtube: "https://youtube.com/@thestrategist",
    twitter: "https://x.com/thestrategist",
    defaultSeoTitle: "The Strategist | Business Intelligence, AI, Digital Transformation & Professional Learning",
    defaultSeoDescription:
      "The Strategist empowers organizations through Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, Digital Transformation, Software Products, Strategic Consulting, and Professional Learning.",
    defaultKeywords:
      "Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Report Automation, Technology Consulting, Corporate Training, Analytics, Enterprise Solutions",
    ogTitle: "The Strategist",
    ogDescription: "Helping organizations transform through intelligence, technology, innovation, and learning.",
    announcement: JSON.stringify({ enabled: true, text: "The Strategist — turning data into strategic decisions.", url: "/contact", label: "Book a consultation" }),
    theme: "aurora",
  };

  await prisma.siteSetting.upsert({ where: { id: "singleton" }, update: data, create: { id: "singleton", ...data } });
}

async function seedNavigation() {
  await prisma.navigationItem.deleteMany({});
  let order = 0;
  for (const item of NAVIGATION.header) {
    const parent = await prisma.navigationItem.create({
      data: { label: item.label, url: item.url, location: "header", megaGroup: (item as { megaGroup?: string }).megaGroup ?? null, order: order++ },
    });
    const children = (item as { children?: { label: string; url: string; icon?: string; description?: string }[] }).children;
    if (children) {
      let cOrder = 0;
      for (const child of children) {
        await prisma.navigationItem.create({
          data: { label: child.label, url: child.url, icon: child.icon ?? null, description: child.description ?? null, location: "header", parentId: parent.id, order: cOrder++ },
        });
      }
    }
  }
  let fOrder = 0;
  for (const col of NAVIGATION.footer) {
    for (const link of col.links) {
      await prisma.navigationItem.create({
        data: { label: link.label, url: link.url, location: "footer", footerColumn: col.column, order: fOrder++ },
      });
    }
  }
}

async function seedFaqs() {
  await prisma.faq.deleteMany({});
  for (const [group, items] of Object.entries(FAQS)) {
    let order = 0;
    for (const qa of items) {
      await prisma.faq.create({ data: { group, question: qa.question, answer: qa.answer, order: order++ } });
    }
  }
}

async function seedCollections() {
  await prisma.testimonial.deleteMany({});
  let tOrder = 0;
  for (const t of TESTIMONIALS) await prisma.testimonial.create({ data: { ...t, order: tOrder++ } });

  await prisma.clientLogo.deleteMany({});
  for (const c of CLIENT_LOGOS) await prisma.clientLogo.create({ data: { name: c.name, logoUrl: "", order: c.order } });

  await prisma.product.deleteMany({});
  await prisma.productCategory.deleteMany({});
  const prodCat = new Map<string, string>();
  for (const c of PRODUCT_CATEGORIES) {
    const row = await prisma.productCategory.create({ data: c });
    prodCat.set(c.slug, row.id);
  }
  let pOrder = 0;
  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        name: p.name, slug: p.slug, categoryId: prodCat.get(p.category) ?? null, icon: p.icon,
        shortDescription: p.shortDescription, description: p.shortDescription,
        features: JSON.stringify(p.features), ctaLabel: "Learn More", order: pOrder++,
      },
    });
  }

  await prisma.course.deleteMany({});
  await prisma.courseCategory.deleteMany({});
  const courseCat = new Map<string, string>();
  let ccOrder = 0;
  for (const c of COURSE_CATEGORIES) {
    const row = await prisma.courseCategory.create({
      data: { name: c.name, slug: c.slug, icon: c.icon, topics: JSON.stringify(c.topics), order: ccOrder++ },
    });
    courseCat.set(c.slug, row.id);
  }
  let coOrder = 0;
  for (const c of COURSES) {
    await prisma.course.create({
      data: {
        title: c.title, slug: c.slug, categoryId: courseCat.get(c.category) ?? null, level: c.level,
        duration: c.duration, instructor: c.instructor, modulesCount: c.modulesCount,
        shortDescription: c.shortDescription, description: c.shortDescription,
        objectives: JSON.stringify(c.objectives), featured: c.featured, order: coOrder++,
      },
    });
  }

  await prisma.jobOpening.deleteMany({});
  await prisma.department.deleteMany({});
  const deptByName = new Map<string, string>();
  let dOrder = 0;
  for (const d of DEPARTMENTS) {
    const row = await prisma.department.create({ data: { ...d, order: dOrder++ } });
    deptByName.set(d.name, row.id);
  }
  for (const j of JOBS) {
    await prisma.jobOpening.create({
      data: {
        title: j.title, slug: j.slug, departmentId: deptByName.get(j.department) ?? null,
        employmentType: j.employmentType, experience: j.experience, location: j.location,
        description: j.description, responsibilities: JSON.stringify(j.responsibilities),
        qualifications: JSON.stringify(j.qualifications), skills: JSON.stringify(j.skills), status: "open",
      },
    });
  }

  await prisma.teamMember.deleteMany({});
  for (const m of TEAM) await prisma.teamMember.create({ data: m });
}

async function seedBlog() {
  await prisma.blogPostTag.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.blogTag.deleteMany({});
  await prisma.blogCategory.deleteMany({});
  await prisma.author.deleteMany({});

  const author = await prisma.author.create({ data: { ...AUTHORS[0], social: "{}" } });

  const catBySlug = new Map<string, string>();
  let cOrder = 0;
  for (const c of BLOG_CATEGORIES) {
    const row = await prisma.blogCategory.create({ data: { ...c, order: cOrder++ } });
    catBySlug.set(c.slug, row.id);
  }

  const tagBySlug = new Map<string, string>();
  for (const name of BLOG_TAGS) {
    const slug = slugify(name);
    const row = await prisma.blogTag.create({ data: { name, slug } });
    tagBySlug.set(name, row.id);
  }

  const now = Date.now();
  let i = 0;
  for (const post of BLOG_POSTS) {
    const created = await prisma.blogPost.create({
      data: {
        title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content,
        categoryId: catBySlug.get(post.category) ?? null, authorId: author.id,
        status: "published", featured: post.featured, editorsPick: post.editorsPick,
        readingMinutes: post.readingMinutes, views: 120 + i * 37,
        publishedAt: new Date(now - i * 3 * 24 * 60 * 60 * 1000),
      },
    });
    for (const tagName of post.tags) {
      const tagId = tagBySlug.get(tagName);
      if (tagId) await prisma.blogPostTag.create({ data: { postId: created.id, tagId } });
    }
    i++;
  }
}

async function seedPages() {
  for (const p of PAGES) {
    const page = await prisma.page.upsert({
      where: { slug: p.slug },
      update: { title: p.title, seoTitle: p.seoTitle, seoDescription: p.seoDescription, seoKeywords: p.seoKeywords, status: "published" },
      create: { slug: p.slug, title: p.title, seoTitle: p.seoTitle, seoDescription: p.seoDescription, seoKeywords: p.seoKeywords, status: "published" },
    });
    await prisma.pageSection.deleteMany({ where: { pageId: page.id } });
    for (const s of p.sections) {
      await prisma.pageSection.create({
        data: {
          pageId: page.id, key: s.key, type: s.type, title: s.title, order: s.order,
          visible: s.visible ?? true, data: JSON.stringify(s.data),
        },
      });
    }
  }
}

async function seedOffices() {
  await prisma.officeLocation.deleteMany({});
  await prisma.officeLocation.create({
    data: {
      name: "Head Office", address: "One Analytics Way, Suite 400, Innovation District",
      mapsUrl: "https://maps.google.com/?q=Innovation+District", phone: "+1 (555) 010-2030",
      email: "hello@thestrategist.com",
      workingHours: JSON.stringify([{ day: "Mon – Fri", hours: "09:00 – 18:00" }, { day: "Sat", hours: "09:00 – 13:00" }]),
    },
  });
}

async function seedServices() {
  await prisma.service.deleteMany({});
  await prisma.serviceCategory.deleteMany({});

  const corporateCategory = await prisma.serviceCategory.create({
    data: {
      name: "Corporate Solutions",
      slug: "corporate",
      description: "Enterprise Business Intelligence, AI, Analytics, and Digital Transformation.",
      order: 0,
    }
  });

  const servicesData = [
    { name: "Corporate Analytics", slug: "corporate-analytics", icon: "bar-chart", shortDescription: "Transform business data into interactive dashboards and actionable insights.", features: JSON.stringify(["Executive Reporting", "KPI Monitoring", "Self-Service Dashboards"]), featured: true },
    { name: "Digital Transformation", slug: "digital-transformation", icon: "rocket", shortDescription: "Modernize business operations, digitize workflows, and automate approval pipelines.", features: JSON.stringify(["Process Automation", "Cloud Platforms", "Workflow Streamlining"]), featured: true },
    { name: "Enterprise Technology", slug: "enterprise-technology", icon: "cpu", shortDescription: "Scale your business with custom software development, secure architectures, and API integrations.", features: JSON.stringify(["API Integration", "Secure Architecture", "Enterprise Portals"]), featured: true },
    { name: "Strategic Consulting", slug: "strategic-consulting", icon: "compass", shortDescription: "Work with business advisory and digital roadmap planning experts to manage change.", features: JSON.stringify(["Advisory Services", "Digital Roadmap", "Implementation Support"]), featured: true },
    { name: "Business Intelligence", slug: "business-intelligence", icon: "line-chart", shortDescription: "Transform raw data into interactive dashboards and reporting systems.", features: JSON.stringify(["KPI Tracking", "Visual Analytics", "Interactive Dashboards"]), featured: false },
    { name: "Data Analytics", slug: "data-analytics", icon: "activity", shortDescription: "Identify trends, discover opportunities, and make evidence-based decisions.", features: JSON.stringify(["Business Analytics", "Sales Analytics", "Operational Analytics"]), featured: false },
    { name: "Artificial Intelligence", slug: "artificial-intelligence", icon: "brain", shortDescription: "Leverage machine learning and automated process intelligence.", features: JSON.stringify(["AI Assistants", "Predictive Modeling", "Process Intelligence"]), featured: false },
    { name: "Report Automation", slug: "report-automation", icon: "file-text", shortDescription: "Automate repetitive business reporting and dashboard updates.", features: JSON.stringify(["Automated Delivery", "Scheduled Reports", "Email Distribution"]), featured: false },
    { name: "Technology Consulting", slug: "technology-consulting", icon: "shield-check", shortDescription: "Select and implement technologies aligned with business objectives.", features: JSON.stringify(["Platform Assessment", "Architecture Planning", "Vendor Selection"]), featured: false }
  ];

  let order = 0;
  for (const s of servicesData) {
    await prisma.service.create({
      data: {
        ...s,
        categoryId: corporateCategory.id,
        description: s.shortDescription + "\n\nWe provide end-to-end design, implementation, and long-term support for this capability.",
        status: "published",
        order: order++,
      }
    });
  }
}

async function seedApproachStages() {
  await prisma.strategistApproachStage.deleteMany({});
  const stages = [
    { step: 1, title: "Discover", description: "Understanding your business goals, challenges, and opportunities." },
    { step: 2, title: "Analyze", description: "Studying business processes, data sources, and operational workflows." },
    { step: 3, title: "Design", description: "Designing strategic solutions aligned with organizational objectives." },
    { step: 4, title: "Deliver", description: "Deploying solutions with minimal disruption." },
    { step: 5, title: "Evolve", description: "Continuously improving systems using performance insights and analytics." }
  ];

  for (const s of stages) {
    await prisma.strategistApproachStage.create({
      data: {
        step: s.step,
        title: s.title,
        description: s.description,
        visible: true
      }
    });
  }
}

async function seedIndustries() {
  await prisma.strategistIndustry.deleteMany({});
  const inds = [
    { name: "Corporate Enterprises", slug: "corporate-enterprises", icon: "building", description: "Helping organizations optimize operations and improve decision making." },
    { name: "Educational Institutions", slug: "educational-institutions", icon: "graduation-cap", description: "Supporting colleges and universities with analytics, automation, and professional training." },
    { name: "Government Organizations", slug: "government-organizations", icon: "landmark", description: "Delivering strategic digital transformation initiatives." },
    { name: "Healthcare", slug: "healthcare", icon: "heart-pulse", description: "Supporting healthcare organizations with reporting and operational intelligence." },
    { name: "Manufacturing", slug: "manufacturing", icon: "factory", description: "Improving operational efficiency through business intelligence." },
    { name: "Retail", slug: "retail", icon: "shopping-bag", description: "Helping retailers understand customer behavior and optimize performance." },
    { name: "Financial Services", slug: "financial-services", icon: "banknote", description: "Delivering secure analytics and intelligent reporting." },
    { name: "Startups", slug: "startups", icon: "rocket", description: "Building scalable technology strategies for growing businesses." }
  ];

  let order = 0;
  for (const ind of inds) {
    await prisma.strategistIndustry.create({
      data: {
        name: ind.name,
        slug: ind.slug,
        icon: ind.icon,
        description: ind.description,
        order: order++,
        visible: true
      }
    });
  }
}

async function main() {
  console.log("🌱 Seeding The Strategist…");
  await seedRolesAndUser();
  console.log("  ✓ roles & admin user");
  await seedSettings();
  console.log("  ✓ site settings");
  await seedNavigation();
  console.log("  ✓ navigation");
  await seedFaqs();
  console.log("  ✓ FAQs");
  await seedCollections();
  console.log("  ✓ collections (testimonials, products, courses, jobs, team)");
  await seedBlog();
  console.log("  ✓ blog");
  await seedServices();
  console.log("  ✓ services");
  await seedApproachStages();
  console.log("  ✓ approach stages");
  await seedIndustries();
  console.log("  ✓ industries");
  await seedPages();
  console.log("  ✓ pages & sections");
  await seedOffices();
  console.log("  ✓ offices");
  console.log(`\n✅ Done. Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
