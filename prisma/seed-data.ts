// Structured content extracted from the 13 content documents.
// Kept separate from seed.ts for readability.

export type SectionSeed = {
  key: string;
  type: string;
  title: string;
  order: number;
  data: Record<string, unknown>;
  visible?: boolean;
};

export type PageSeed = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  sections: SectionSeed[];
};

const solutions = [
  { title: "Business Intelligence", icon: "bar-chart", description: "Transform business data into interactive dashboards and actionable insights." },
  { title: "Data Analytics", icon: "line-chart", description: "Identify trends, discover opportunities, and make informed business decisions using advanced analytics." },
  { title: "Artificial Intelligence", icon: "brain", description: "Leverage intelligent automation and predictive analytics to improve operational efficiency." },
  { title: "Report Automation", icon: "file-text", description: "Automate repetitive reporting processes and deliver accurate business reports in real time." },
  { title: "Digital Transformation", icon: "rocket", description: "Modernize business operations through innovative technologies and streamlined digital workflows." },
  { title: "Technology Consulting", icon: "compass", description: "Helping organizations choose, implement, and optimize technology solutions aligned with business objectives." },
];

const whyChoose = [
  { title: "Business-Focused Approach", icon: "target", description: "Technology is only valuable when it solves real business problems." },
  { title: "Industry Expertise", icon: "award", description: "Practical experience across industries and organizational environments." },
  { title: "Tailored Solutions", icon: "puzzle", description: "Every organization receives solutions designed around its unique business objectives." },
  { title: "Scalable Technology", icon: "trending-up", description: "Solutions that grow with your organization." },
  { title: "Long-Term Partnership", icon: "handshake", description: "We believe in building relationships, not simply delivering projects." },
  { title: "Continuous Innovation", icon: "lightbulb", description: "Helping organizations remain competitive in an evolving digital world." },
];

const process = [
  { step: 1, title: "Understand", description: "Understanding your business goals, challenges, and opportunities." },
  { step: 2, title: "Analyze", description: "Studying business processes, data sources, and operational workflows." },
  { step: 3, title: "Design", description: "Designing strategic solutions aligned with organizational objectives." },
  { step: 4, title: "Implement", description: "Deploying solutions with minimal disruption." },
  { step: 5, title: "Optimize", description: "Continuously improving systems using performance insights and analytics." },
];

const industries = [
  { name: "Corporate Enterprises", icon: "building", description: "Helping organizations optimize operations and improve decision making." },
  { name: "Educational Institutions", icon: "graduation-cap", description: "Supporting colleges and universities with analytics, automation, and professional training." },
  { name: "Government Organizations", icon: "landmark", description: "Delivering strategic digital transformation initiatives." },
  { name: "Healthcare", icon: "heart-pulse", description: "Supporting healthcare organizations with reporting and operational intelligence." },
  { name: "Manufacturing", icon: "factory", description: "Improving operational efficiency through business intelligence." },
  { name: "Retail", icon: "shopping-bag", description: "Helping retailers understand customer behavior and optimize performance." },
  { name: "Financial Services", icon: "banknote", description: "Delivering secure analytics and intelligent reporting." },
  { name: "Startups", icon: "rocket", description: "Building scalable technology strategies for growing businesses." },
];

export const HOME: PageSeed = {
  slug: "home",
  title: "Home",
  seoTitle: "The Strategist | Business Intelligence, AI & Digital Transformation",
  seoDescription:
    "The Strategist helps organizations transform data into strategic decisions through Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, Digital Transformation, Consulting, Products, and Professional Training.",
  seoKeywords:
    "Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Business Consulting, Corporate Training, Automation, Analytics, Dashboard Development, Report Automation",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Business Intelligence • Artificial Intelligence • Data Analytics • Digital Transformation",
        title: "Transforming Businesses Through Data, Intelligence & Innovation",
        description:
          "The Strategist empowers organizations to make smarter decisions through Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, and Digital Transformation. We partner with businesses, enterprises, government organizations, and educational institutions to build intelligent data ecosystems, automate business processes, and enable data-driven decision making that delivers measurable business outcomes.",
        primaryLabel: "Explore Our Solutions", primaryHref: "/solutions",
        secondaryLabel: "Schedule a Consultation", secondaryHref: "/contact",
        stats: [
          { value: "6+", label: "Core Solution Areas" },
          { value: "9", label: "Industries Served" },
          { value: "100%", label: "Tailored Engagements" },
        ],
        beats: {
          captions: [
            "Gain deep operational insights with integrated Business Intelligence dashboards.",
            "Accelerate workflows through intelligent AI processes and automated reporting pipelines.",
            "Empower your workforce with custom training to sustain the analytics systems we build."
          ],
          cards: {
            income: "$598,000",
            spending: "$270,000",
            gauge: "75%",
            userLabel: "Active User"
          }
        }
      },
    },
    {
      key: "intro", type: "intro", title: "Introduction", order: 1,
      data: {
        heading: "Transforming Data Into Strategic Decisions",
        paragraphs: [
          "Modern organizations generate enormous amounts of data every day.",
          "The real challenge is not collecting data—it is converting it into meaningful insights that drive better business decisions.",
          "The Strategist combines deep domain expertise with modern analytics technologies to help organizations transform raw information into actionable intelligence.",
          "Whether improving operational efficiency, automating reporting, building AI-powered solutions, or implementing enterprise dashboards, we help organizations create measurable business value.",
        ],
      },
    },
    {
      key: "solutions", type: "cards", title: "Our Core Solutions", order: 2,
      data: { heading: "Our Core Solutions", subtitle: "End-to-end capabilities that turn information into intelligence.", items: solutions },
    },
    {
      key: "why", type: "features", title: "Why The Strategist", order: 3,
      data: { heading: "Why Organizations Choose The Strategist", items: whyChoose },
    },
    {
      key: "process", type: "process", title: "Our Process", order: 4,
      data: { heading: "Our Process", subtitle: "A disciplined path from understanding to optimization.", items: process },
    },
    {
      key: "industries", type: "industries", title: "Industries We Serve", order: 5,
      data: { heading: "Industries We Serve", items: industries },
    },
    {
      key: "products", type: "promo", title: "Products Preview", order: 6,
      data: {
        heading: "Technology Solutions Designed for Modern Organizations",
        description:
          "Our products simplify business operations through automation, analytics, and intelligent reporting. Every product is designed to improve productivity, enhance visibility, and enable smarter decision-making.",
        ctaLabel: "Explore Products", ctaHref: "/products",
      },
    },
    {
      key: "learn", type: "promo", title: "Learning Preview", order: 7,
      data: {
        heading: "Empowering Professionals Through Industry-Focused Learning",
        description:
          "The Strategist offers professional learning programs designed for students, working professionals, organizations, and educational institutions.",
        bullets: ["Online Courses", "Corporate Training", "College Training", "One-to-One Learning", "Internship Programs", "Certification Programs", "Practical Projects"],
        ctaLabel: "Explore Programs", ctaHref: "/learn",
      },
    },
    {
      key: "insights", type: "insights", title: "Insights", order: 8,
      data: {
        heading: "Latest Articles & Industry Insights",
        subtitle: "Stay informed with expert articles covering business strategy, analytics, AI, automation, digital transformation, and emerging technologies.",
        ctaLabel: "Read Our Blog", ctaHref: "/blog",
      },
    },
    { key: "testimonials", type: "testimonials", title: "Testimonials", order: 9, data: { heading: "What Our Clients Say" } },
    { key: "faqs", type: "faqs", title: "FAQs", order: 10, data: { heading: "Frequently Asked Questions", group: "home" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 11,
      data: {
        heading: "Let's Build Smarter Businesses Together",
        description:
          "Whether you're looking to modernize operations, implement Business Intelligence, automate reporting, train your workforce, or accelerate digital transformation, we're here to help.",
        primaryLabel: "Get Started", primaryHref: "/contact",
        secondaryLabel: "Contact Us", secondaryHref: "/contact",
      },
    },
  ],
};

export const ABOUT: PageSeed = {
  slug: "about",
  title: "About",
  seoTitle: "About The Strategist | Business Consulting & Technology Solutions",
  seoDescription:
    "Learn about The Strategist, our mission, vision, values, expertise, and commitment to helping organizations succeed through Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, and Professional Learning.",
  seoKeywords: "About The Strategist, Business Consulting, Business Strategy, Innovation, Technology Consulting",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Who We Are",
        title: "Building Intelligent Organizations for a Smarter Future",
        description:
          "The Strategist is a business consulting and technology solutions company dedicated to helping organizations achieve sustainable growth through Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, Digital Transformation, and Professional Learning.",
        primaryLabel: "Explore Our Services", primaryHref: "/solutions",
        secondaryLabel: "Contact Us", secondaryHref: "/contact",
      },
    },
    {
      key: "overview", type: "intro", title: "Company Overview", order: 1,
      data: {
        heading: "Who We Are",
        paragraphs: [
          "Technology alone does not transform organizations. People, strategy, processes, and intelligent decision-making create lasting transformation.",
          "The Strategist was founded with the vision of helping organizations leverage technology in meaningful ways. We believe data should become knowledge, knowledge should become strategy, and strategy should drive measurable business success.",
          "Every engagement begins with understanding our clients' challenges before recommending the right technology, analytical approach, or business solution.",
          "Rather than delivering isolated software or reports, we build long-term partnerships focused on continuous improvement and sustainable growth.",
        ],
      },
    },
    {
      key: "vision-mission", type: "vision-mission", title: "Vision & Mission", order: 2,
      data: {
        vision: "To become a trusted global partner that empowers organizations through intelligent technologies, strategic consulting, innovative learning, and data-driven decision-making.",
        mission: "To help organizations unlock their full potential by combining Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Professional Training, and innovative technology solutions that create measurable value.",
      },
    },
    {
      key: "values", type: "features", title: "Core Values", order: 3,
      data: {
        heading: "The Values That Guide Everything We Do",
        items: [
          { title: "Integrity", icon: "shield-check", description: "We build lasting relationships through honesty, transparency, and ethical business practices." },
          { title: "Innovation", icon: "lightbulb", description: "We continuously explore new technologies and creative solutions to solve evolving business challenges." },
          { title: "Excellence", icon: "award", description: "We strive for quality in every project, every solution, and every client engagement." },
          { title: "Collaboration", icon: "users", description: "We believe the best results come from working closely with our clients as strategic partners." },
          { title: "Continuous Learning", icon: "book-open", description: "Technology evolves rapidly. We embrace lifelong learning and continuous improvement." },
          { title: "Customer Success", icon: "badge-check", description: "Our success is measured by the success of our clients." },
        ],
      },
    },
    {
      key: "journey", type: "process", title: "Our Approach", order: 4,
      data: {
        heading: "Our Approach to Business Transformation",
        items: [
          { step: 1, title: "Understand", description: "We begin by understanding business objectives, operational challenges, and organizational goals." },
          { step: 2, title: "Assess", description: "We analyze existing systems, business processes, workflows, and data environments." },
          { step: 3, title: "Design", description: "We develop strategic roadmaps and customized solutions aligned with organizational priorities." },
          { step: 4, title: "Implement", description: "Our experts deploy solutions with minimal disruption while ensuring smooth adoption." },
          { step: 5, title: "Optimize", description: "We continuously monitor, improve, and enhance solutions to maximize long-term business value." },
        ],
      },
    },
    {
      key: "expertise", type: "cards", title: "Areas of Expertise", order: 5,
      data: {
        heading: "Areas of Expertise",
        items: [
          { title: "Business Intelligence", icon: "bar-chart", description: "Designing interactive dashboards and decision-support systems." },
          { title: "Data Analytics", icon: "line-chart", description: "Transforming complex datasets into meaningful business insights." },
          { title: "Artificial Intelligence", icon: "brain", description: "Applying intelligent automation and predictive analytics to solve business challenges." },
          { title: "Report Automation", icon: "file-text", description: "Reducing manual reporting through automated reporting systems." },
          { title: "Digital Transformation", icon: "rocket", description: "Helping organizations modernize operations using technology." },
          { title: "Professional Learning", icon: "graduation-cap", description: "Delivering industry-focused learning programs for professionals, students, colleges, and organizations." },
        ],
      },
    },
    {
      key: "why", type: "features", title: "Why Choose Us", order: 6,
      data: {
        heading: "Why Organizations Trust The Strategist",
        items: [
          { title: "Business-First Mindset", icon: "target", description: "Every technology decision begins with a clear business objective." },
          { title: "Experienced Professionals", icon: "users", description: "A multidisciplinary team combining business knowledge, technology expertise, and analytical thinking." },
          { title: "Customized Engagement", icon: "puzzle", description: "Every solution is designed specifically for the client's goals, industry, and operational needs." },
          { title: "Scalable Solutions", icon: "trending-up", description: "Our solutions are designed to support organizations as they grow and evolve." },
          { title: "Innovation-Driven", icon: "lightbulb", description: "We continuously adopt emerging technologies to help clients remain competitive." },
          { title: "Long-Term Partnership", icon: "handshake", description: "We remain engaged beyond project delivery to support continuous improvement." },
        ],
      },
    },
    { key: "team", type: "team", title: "Leadership", order: 7, data: { heading: "Leadership Through Collaboration", subtitle: "We believe successful organizations are built through strong leadership, informed decision-making, continuous innovation, and collaborative partnerships." } },
    { key: "faqs", type: "faqs", title: "FAQs", order: 8, data: { heading: "Frequently Asked Questions", group: "about" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 9,
      data: {
        heading: "Let's Build the Future Together",
        description: "Whether you're beginning your digital transformation journey, improving business intelligence capabilities, implementing automation, or developing your workforce, The Strategist is ready to help.",
        primaryLabel: "Partner With Us", primaryHref: "/contact",
        secondaryLabel: "Get In Touch", secondaryHref: "/contact",
      },
    },
  ],
};
