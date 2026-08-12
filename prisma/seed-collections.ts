// Navigation, FAQs and marketing collections.

export const NAVIGATION = {
  header: [
    { label: "Home", url: "/" },
    {
      label: "About", url: "/about",
    },
    {
      label: "Solutions", url: "/solutions", megaGroup: "solutions",
      children: [
        { label: "Corporate Solutions", url: "/solutions/corporate", icon: "building", description: "Improve business performance through BI, AI, Analytics, Automation, and Digital Transformation." },
        { label: "Educational Solutions", url: "/solutions/educational", icon: "graduation-cap", description: "Industry-focused learning solutions for colleges, universities, organizations, and professionals." },
        { label: "Consulting", url: "/solutions/corporate", icon: "compass", description: "Business strategy, technology consulting, implementation planning, and transformation." },
        { label: "Digital Transformation", url: "/solutions/corporate", icon: "rocket", description: "Modernize operations using technology and automation." },
      ],
    },
    {
      label: "Products", url: "/products", megaGroup: "products",
      children: [
        { label: "Business Intelligence Platform", url: "/products", icon: "bar-chart" },
        { label: "Learning Experience Platform", url: "/products", icon: "graduation-cap" },
        { label: "Report Automation", url: "/products", icon: "file-text" },
        { label: "Analytics Dashboards", url: "/products", icon: "line-chart" },
        { label: "Workflow Automation", url: "/products", icon: "workflow" },
        { label: "Custom Software Solutions", url: "/products", icon: "boxes" },
      ],
    },
    {
      label: "Learn", url: "/learn", megaGroup: "learn",
      children: [
        { label: "Online Courses", url: "/learn", icon: "globe" },
        { label: "Corporate Training", url: "/learn", icon: "briefcase" },
        { label: "College Training", url: "/learn", icon: "graduation-cap" },
        { label: "One-to-One Training", url: "/learn", icon: "users" },
        { label: "Internship Programs", url: "/learn", icon: "rocket" },
        { label: "Certification Programs", url: "/learn", icon: "award" },
      ],
    },
    { label: "Blog", url: "/blog" },
    { label: "Careers", url: "/careers" },
    { label: "Contact", url: "/contact" },
  ],
  footer: [
    { column: "Quick Links", links: [
      { label: "Home", url: "/" }, { label: "About", url: "/about" },
      { label: "Corporate Solutions", url: "/solutions/corporate" }, { label: "Educational Solutions", url: "/solutions/educational" },
      { label: "Products", url: "/products" }, { label: "Learn", url: "/learn" },
      { label: "Blog", url: "/blog" }, { label: "Careers", url: "/careers" }, { label: "Contact", url: "/contact" },
    ]},
    { column: "Solutions", links: [
      { label: "Business Intelligence", url: "/solutions/corporate" }, { label: "Artificial Intelligence", url: "/solutions/corporate" },
      { label: "Data Analytics", url: "/solutions/corporate" }, { label: "Data Visualization", url: "/solutions/corporate" },
      { label: "Report Automation", url: "/solutions/corporate" }, { label: "Digital Transformation", url: "/solutions/corporate" },
      { label: "Technology Consulting", url: "/solutions/corporate" },
    ]},
    { column: "Products", links: [
      { label: "Business Intelligence Platform", url: "/products" }, { label: "Learning Experience Platform", url: "/products" },
      { label: "Report Automation", url: "/products" }, { label: "Business Analytics", url: "/products" },
      { label: "Workflow Automation", url: "/products" }, { label: "Custom Software", url: "/products" },
    ]},
    { column: "Support", links: [
      { label: "Contact Support", url: "/contact" }, { label: "FAQs", url: "/contact" },
      { label: "Privacy Policy", url: "/privacy-policy" }, { label: "Terms & Conditions", url: "/terms-conditions" },
      { label: "Cookie Policy", url: "/cookie-policy" },
    ]},
  ],
};

export const FAQS: Record<string, { question: string; answer: string }[]> = {
  home: [
    { question: "What industries do you work with?", answer: "We work with businesses, enterprises, educational institutions, government organizations, and growing companies across multiple sectors." },
    { question: "Do you provide customized business solutions?", answer: "Yes. Every engagement is tailored to meet the unique objectives and challenges of each organization." },
    { question: "Do you offer professional training?", answer: "Yes. We provide online courses, corporate training, college programs, internship opportunities, and certification-based learning." },
    { question: "Can you automate business reports?", answer: "Yes. We specialize in report automation, business intelligence dashboards, and workflow automation." },
    { question: "How can we start working with The Strategist?", answer: "Simply contact our team to schedule a consultation and discuss your business requirements." },
  ],
  about: [
    { question: "What makes The Strategist different?", answer: "Our approach combines business strategy, technology expertise, analytics, and professional learning into one integrated solution." },
    { question: "Which industries do you serve?", answer: "We work with businesses, educational institutions, government organizations, startups, healthcare providers, retailers, manufacturers, and enterprises." },
    { question: "Do you provide customized consulting?", answer: "Yes. Every engagement is tailored to meet the client's objectives and operational requirements." },
    { question: "Do you provide implementation support?", answer: "Yes. We support organizations from planning and implementation through optimization and continuous improvement." },
    { question: "Do you offer training programs?", answer: "Yes. We provide online courses, corporate learning, college training, internship programs, certifications, and one-to-one professional development." },
  ],
  corporate: [
    { question: "Do you work with organizations of all sizes?", answer: "Yes. We support startups, SMEs, enterprises, educational institutions, and government organizations." },
    { question: "Can solutions be customized?", answer: "Every engagement is designed around your organization's goals and operational requirements." },
    { question: "Do you provide implementation support?", answer: "Yes. We support organizations from strategy through implementation and optimization." },
    { question: "Do you provide post-implementation support?", answer: "Yes. Continuous improvement and long-term support are part of our engagement approach." },
    { question: "Can existing systems be integrated?", answer: "Yes. Our solutions are designed to integrate with existing business platforms wherever possible." },
  ],
  educational: [
    { question: "Who can join these programs?", answer: "Students, graduates, working professionals, corporate employees, and educational institutions." },
    { question: "Are courses available online?", answer: "Yes. Most learning programs are available through our online learning platform." },
    { question: "Do programs include assessments?", answer: "Yes. Every structured program includes assessments, assignments, and mock tests where applicable." },
    { question: "Will certificates be provided?", answer: "Certificates are issued upon successful completion of eligible programs." },
    { question: "Can colleges partner with The Strategist?", answer: "Yes. We collaborate with colleges and universities to provide customized academic and industry-focused learning programs." },
  ],
  products: [
    { question: "Can products be customized?", answer: "Yes. Every solution can be customized to suit your organization's specific requirements." },
    { question: "Do products support integrations?", answer: "Yes. Our solutions can integrate with existing business applications and third-party platforms wherever possible." },
    { question: "Are your products cloud-based?", answer: "Yes. Most solutions are cloud-ready and accessible from anywhere." },
    { question: "Do you provide implementation support?", answer: "Yes. We provide complete implementation, onboarding, and training services." },
    { question: "Can organizations request custom software?", answer: "Absolutely. We design and develop customized enterprise applications tailored to business needs." },
  ],
  learn: [
    { question: "Who can join these courses?", answer: "Students, professionals, organizations, educational institutions, and anyone interested in developing industry-relevant skills." },
    { question: "Are courses completely online?", answer: "Most programs are available online, while customized corporate and institutional programs may also be delivered onsite or in hybrid formats." },
    { question: "Will I receive a certificate?", answer: "Eligible programs include completion certificates after meeting assessment requirements." },
    { question: "Are practical projects included?", answer: "Yes. Most programs include practical exercises, assignments, and industry-oriented projects." },
    { question: "Can organizations request customized training?", answer: "Yes. Corporate learning programs are customized according to organizational objectives and employee skill requirements." },
  ],
  contact: [
    { question: "How soon will I receive a response?", answer: "Our team aims to respond to all enquiries as quickly as possible during business hours." },
    { question: "Can I request a business consultation?", answer: "Yes. Consultations can be requested through the consultation booking form." },
    { question: "Do you provide online consultations?", answer: "Yes. Consultations can be conducted online or in person based on your requirements." },
    { question: "Can organizations request customized solutions?", answer: "Yes. Every solution is designed according to the organization's specific objectives and operational requirements." },
    { question: "How can educational institutions collaborate with The Strategist?", answer: "Colleges, universities, and training institutions can contact our Educational Solutions team to discuss partnership opportunities." },
  ],
};

export const TESTIMONIALS = [
  { name: "Ananya Rao", company: "Meridian Retail Group", designation: "Chief Operating Officer", quote: "The Strategist rebuilt our reporting from the ground up. Our leadership now makes decisions on live dashboards instead of week-old spreadsheets.", rating: 5 },
  { name: "David Chen", company: "Northbridge Manufacturing", designation: "VP, Operations", quote: "Their team understood our business before touching any technology. The automation they delivered saved us hundreds of manual hours every month.", rating: 5 },
  { name: "Priya Menon", company: "Lakeside University", designation: "Director of Academic Programs", quote: "The industry-focused training gave our students practical, job-ready skills. The partnership has been genuinely transformative for our placements.", rating: 5 },
  { name: "Michael Osei", company: "Vertex Financial Services", designation: "Head of Analytics", quote: "Secure, accurate, and beautifully presented analytics. The Strategist has become a true long-term partner rather than just a vendor.", rating: 5 },
  { name: "Sara Khalid", company: "BrightPath Startups", designation: "Founder & CEO", quote: "As a growing company we needed a scalable data strategy. They designed something that fit us today and will still fit us at ten times the size.", rating: 5 },
];

export const CLIENT_LOGOS = [
  "Meridian", "Northbridge", "Lakeside", "Vertex", "BrightPath", "Aurora Labs", "Summit Group", "CoreLogic",
].map((name, i) => ({ name, order: i }));

export const PRODUCT_CATEGORIES = [
  { name: "Analytics", slug: "analytics", order: 0 },
  { name: "Automation", slug: "automation", order: 1 },
  { name: "Platforms", slug: "platforms", order: 2 },
  { name: "Custom", slug: "custom", order: 3 },
];

export const PRODUCTS = [
  { name: "Business Intelligence Platform", slug: "business-intelligence-platform", category: "platforms", icon: "bar-chart", shortDescription: "Interactive dashboards and reporting systems that transform raw data into actionable insights.", features: ["Executive Dashboards", "KPI Monitoring", "Data Visualization", "Real-time Reports", "Self-Service Analytics"] },
  { name: "Learning Experience Platform (LXP)", slug: "learning-experience-platform", category: "platforms", icon: "graduation-cap", shortDescription: "A modern learning experience platform for institutions, corporates, and training providers.", features: ["Course Management", "Student Dashboard", "Assessments", "Certifications", "Progress Tracking", "HTML Learning Modules"] },
  { name: "Report Automation Solutions", slug: "report-automation", category: "automation", icon: "file-text", shortDescription: "Automate repetitive reporting processes and generate business reports instantly.", features: ["Automated Reports", "Scheduled Reports", "Email Distribution", "Dashboard Integration", "Business KPIs"] },
  { name: "Business Analytics Solutions", slug: "business-analytics", category: "analytics", icon: "line-chart", shortDescription: "Advanced analytics that help organizations understand trends and improve decision-making.", features: ["Sales Analytics", "Financial Analytics", "Customer Analytics", "Operational Analytics", "Performance Reports"] },
  { name: "Digital Transformation Solutions", slug: "digital-transformation", category: "automation", icon: "rocket", shortDescription: "Enterprise applications designed to modernize organizational processes.", features: ["Workflow Automation", "Business Process Management", "Digital Forms", "Approval Workflows", "Integration Services"] },
  { name: "Custom Software Development", slug: "custom-software", category: "custom", icon: "boxes", shortDescription: "Tailor-made software solutions designed around your organization's operational requirements.", features: ["Web Applications", "Enterprise Portals", "Admin Dashboards", "API Integrations", "Cloud Applications"] },
];

export const COURSE_CATEGORIES = [
  { name: "Business Intelligence", slug: "business-intelligence", icon: "bar-chart", topics: ["Interactive Dashboards", "Executive Reporting", "Business KPIs", "Decision Support Systems"] },
  { name: "Data Analytics", slug: "data-analytics", icon: "line-chart", topics: ["Data Cleaning", "Data Analysis", "Business Insights", "Statistical Thinking"] },
  { name: "Data Visualization", slug: "data-visualization", icon: "pie-chart", topics: ["Dashboard Design", "Visual Storytelling", "Interactive Reports", "Analytics Presentation"] },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", icon: "brain", topics: ["AI Fundamentals", "Business AI", "Machine Learning Concepts", "Automation"] },
  { name: "Report Automation", slug: "report-automation", icon: "file-text", topics: ["Business Reporting", "Automated Reports", "Scheduled Reporting", "Workflow Automation"] },
  { name: "Digital Transformation", slug: "digital-transformation", icon: "rocket", topics: ["Business Modernization", "Technology Adoption", "Operational Excellence", "Innovation"] },
  { name: "Microsoft Power BI", slug: "power-bi", icon: "bar-chart", topics: ["Power BI Desktop", "Power Query", "DAX", "Interactive Dashboards", "Publishing Reports"] },
  { name: "Microsoft Excel", slug: "excel", icon: "grid", topics: ["Advanced Excel", "Business Reporting", "Dashboards", "Automation", "Data Analysis"] },
  { name: "SQL", slug: "sql", icon: "database", topics: ["SQL Fundamentals", "Data Extraction", "Reporting Queries", "Business Analytics"] },
];

export const COURSES = [
  { title: "Microsoft Power BI Masterclass", slug: "power-bi-masterclass", category: "power-bi", level: "Intermediate", duration: "6 Weeks", instructor: "The Strategist Faculty", modulesCount: 8, featured: true, shortDescription: "Build professional, interactive dashboards and reports from raw data to published insights.", objectives: ["Model data with Power Query and DAX", "Design executive dashboards", "Publish and share reports securely"] },
  { title: "Data Analytics for Business", slug: "data-analytics-for-business", category: "data-analytics", level: "Beginner", duration: "5 Weeks", instructor: "The Strategist Faculty", modulesCount: 6, featured: true, shortDescription: "Turn business data into decisions with a practical, project-based analytics workflow.", objectives: ["Clean and prepare data", "Find trends and insights", "Communicate findings to stakeholders"] },
  { title: "SQL for Data Analysis", slug: "sql-for-data-analysis", category: "sql", level: "Beginner", duration: "4 Weeks", instructor: "The Strategist Faculty", modulesCount: 6, featured: true, shortDescription: "Query, filter, and aggregate business data confidently using SQL.", objectives: ["Write reporting queries", "Join and aggregate datasets", "Support BI and analytics"] },
  { title: "Business Intelligence Foundations", slug: "business-intelligence-foundations", category: "business-intelligence", level: "Beginner", duration: "5 Weeks", instructor: "The Strategist Faculty", modulesCount: 7, featured: false, shortDescription: "Understand the end-to-end BI lifecycle and build your first decision-support dashboard.", objectives: ["Understand BI architecture", "Define meaningful KPIs", "Build interactive reports"] },
  { title: "Advanced Excel for Analytics", slug: "advanced-excel-analytics", category: "excel", level: "Intermediate", duration: "4 Weeks", instructor: "The Strategist Faculty", modulesCount: 6, featured: false, shortDescription: "Master formulas, dashboards, and automation to accelerate business reporting.", objectives: ["Advanced formulas and functions", "Interactive Excel dashboards", "Reporting automation"] },
  { title: "AI for Business Professionals", slug: "ai-for-business", category: "artificial-intelligence", level: "Beginner", duration: "5 Weeks", instructor: "The Strategist Faculty", modulesCount: 7, featured: false, shortDescription: "Apply practical AI and automation concepts to real business problems.", objectives: ["Understand AI fundamentals", "Identify automation opportunities", "Apply AI to reporting"] },
];

export const DEPARTMENTS = [
  { name: "Business Consulting", description: "Help organizations solve strategic business challenges." },
  { name: "Business Intelligence", description: "Design dashboards, reports, and analytics solutions." },
  { name: "Data Analytics", description: "Transform business data into actionable insights." },
  { name: "Artificial Intelligence", description: "Develop intelligent business solutions and automation." },
  { name: "Digital Transformation", description: "Support organizations through technology modernization." },
  { name: "Software Development", description: "Build scalable web applications and enterprise platforms." },
  { name: "UI / UX Design", description: "Design intuitive digital experiences and modern user interfaces." },
  { name: "Quality Assurance", description: "Ensure product quality through testing and continuous improvement." },
  { name: "Sales & Business Development", description: "Build relationships and help organizations discover innovative solutions." },
  { name: "Marketing & Communications", description: "Create meaningful brand experiences and marketing campaigns." },
  { name: "Customer Success", description: "Support clients throughout their transformation journey." },
  { name: "Operations & Administration", description: "Drive organizational excellence through efficient operations." },
];

export const JOBS = [
  { title: "Senior Power BI Consultant", slug: "senior-power-bi-consultant", department: "Business Intelligence", employmentType: "Full-time", experience: "4-6 years", location: "Hybrid", description: "Design and deliver executive dashboards and BI solutions for enterprise clients.", responsibilities: ["Build interactive dashboards", "Model data with DAX", "Advise clients on BI best practices"], qualifications: ["Strong Power BI expertise", "SQL proficiency", "Client-facing communication"], skills: ["Power BI", "DAX", "SQL", "Data Modeling"] },
  { title: "Data Analyst", slug: "data-analyst", department: "Data Analytics", employmentType: "Full-time", experience: "2-4 years", location: "Remote", description: "Analyze business data and deliver insights that drive client decision-making.", responsibilities: ["Clean and analyze datasets", "Create analytical reports", "Present insights to stakeholders"], qualifications: ["Analytical mindset", "SQL and Excel proficiency", "Strong communication"], skills: ["SQL", "Excel", "Analytics", "Visualization"] },
  { title: "AI/Automation Engineer", slug: "ai-automation-engineer", department: "Artificial Intelligence", employmentType: "Full-time", experience: "3-5 years", location: "Hybrid", description: "Build intelligent automation and predictive solutions for business processes.", responsibilities: ["Develop automation workflows", "Build predictive models", "Integrate AI into reporting"], qualifications: ["ML fundamentals", "Automation experience", "Programming proficiency"], skills: ["Python", "Automation", "Machine Learning"] },
  { title: "Frontend Engineer", slug: "frontend-engineer", department: "Software Development", employmentType: "Full-time", experience: "2-5 years", location: "Remote", description: "Build scalable, accessible web applications and enterprise portals.", responsibilities: ["Develop responsive interfaces", "Collaborate with designers", "Ensure accessibility and performance"], qualifications: ["Modern JavaScript/TypeScript", "React experience", "Eye for detail"], skills: ["React", "TypeScript", "Next.js", "CSS"] },
  { title: "Business Development Executive", slug: "business-development-executive", department: "Sales & Business Development", employmentType: "Full-time", experience: "1-3 years", location: "On-site", description: "Build client relationships and help organizations discover our solutions.", responsibilities: ["Generate qualified leads", "Present solutions to prospects", "Support proposals and follow-ups"], qualifications: ["Strong communication", "Consultative selling", "Self-motivated"], skills: ["Sales", "Communication", "CRM"] },
  { title: "Marketing & Content Intern", slug: "marketing-content-intern", department: "Marketing & Communications", employmentType: "Internship", experience: "Fresher", location: "Remote", description: "Support content creation and marketing campaigns across channels.", responsibilities: ["Draft blog and social content", "Support campaigns", "Assist with analytics"], qualifications: ["Strong writing", "Curiosity", "Willingness to learn"], skills: ["Writing", "Marketing", "Social Media"] },
];

export const TEAM = [
  { name: "Strategy Leadership", position: "Consulting & Advisory", bio: "Guiding client engagements with a business-first, outcomes-driven approach.", order: 0 },
  { name: "Analytics & BI", position: "Dashboards & Reporting", bio: "Designing decision-support systems that turn data into clarity.", order: 1 },
  { name: "AI & Automation", position: "Intelligent Systems", bio: "Building predictive and automated solutions for modern operations.", order: 2 },
  { name: "Learning & Development", position: "Professional Training", bio: "Delivering industry-focused programs that build job-ready skills.", order: 3 },
];

export const AUTHORS = [
  { name: "The Strategist Editorial", slug: "editorial", designation: "Insights Team", bio: "The editorial team at The Strategist shares practical perspectives on data, intelligence, and business transformation." },
];

export const BLOG_CATEGORIES = [
  { name: "Business Intelligence", slug: "business-intelligence", description: "Dashboards, KPIs, Reporting, Decision Making" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", description: "AI Strategy, Automation, Machine Learning" },
  { name: "Data Analytics", slug: "data-analytics", description: "Data Analysis, Insights, Predictive Analytics" },
  { name: "Digital Transformation", slug: "digital-transformation", description: "Technology Adoption, Innovation, Modernization" },
  { name: "Business Strategy", slug: "business-strategy", description: "Leadership, Planning, Organizational Growth" },
];

export const BLOG_TAGS = ["Business Intelligence", "Power BI", "Artificial Intelligence", "Analytics", "Automation", "Reporting", "Digital Transformation", "Leadership", "Innovation", "SQL", "Excel", "Data Visualization"];

export const BLOG_POSTS = [
  {
    title: "From Data to Decisions: Building a Business Intelligence Culture", slug: "data-to-decisions-bi-culture",
    category: "business-intelligence", featured: true, editorsPick: true, readingMinutes: 6,
    excerpt: "Business intelligence is less about tools and more about the habits, questions, and culture that turn data into decisions.",
    tags: ["Business Intelligence", "Leadership", "Reporting"],
    content: "Most organizations already have more data than they can use. The differentiator is not collecting more of it — it is building a culture where every important decision is informed by evidence.\n\nA business intelligence culture starts with clarity about the questions that matter. Before designing a single dashboard, leadership should agree on the handful of metrics that genuinely reflect business health.\n\nFrom there, the goal is to make the right numbers effortless to reach. Self-service dashboards, automated reporting, and a single source of truth remove the friction that keeps people guessing.\n\nFinally, culture is reinforced by ritual. Teams that review the same trusted dashboards in every meeting quickly stop debating whose spreadsheet is correct and start debating what to do next.",
  },
  {
    title: "Report Automation: Reclaiming Hundreds of Hours Every Month", slug: "report-automation-reclaiming-hours",
    category: "digital-transformation", featured: false, editorsPick: true, readingMinutes: 5,
    excerpt: "Manual reporting is one of the quietest and most expensive drains on a modern team. Automation changes the equation.",
    tags: ["Automation", "Reporting", "Digital Transformation"],
    content: "Manual reporting rarely appears on a budget line, yet it consumes an enormous amount of skilled time. Analysts spend their most valuable hours copying, formatting, and reconciling instead of interpreting.\n\nReport automation reverses that. By connecting data sources directly to templated, scheduled reports, organizations remove the repetitive work entirely.\n\nThe benefits compound. Reports arrive on time, errors from manual copying disappear, and analysts are freed to focus on the insights that actually move the business.\n\nThe best place to start is the report you rebuild most often. Automate that one first, measure the hours saved, and let the momentum carry you forward.",
  },
  {
    title: "Practical AI for Business: Start Small, Prove Value, Scale", slug: "practical-ai-for-business",
    category: "artificial-intelligence", featured: false, editorsPick: false, readingMinutes: 6,
    excerpt: "Artificial intelligence delivers the most value when it is applied to specific, well-understood business problems.",
    tags: ["Artificial Intelligence", "Automation", "Innovation"],
    content: "The conversation around AI is often dominated by ambition and abstraction. In practice, the organizations that succeed treat AI as a tool for solving concrete problems.\n\nStart by identifying a repetitive, rules-heavy task that consumes time and is prone to error. These are ideal first candidates for intelligent automation.\n\nProve the value on that narrow use case with clear metrics — time saved, errors reduced, decisions accelerated. A small, measurable win builds the trust and budget for the next step.\n\nOnly then should you scale. Expanding from a proven foundation is far more reliable than attempting a sweeping transformation all at once.",
  },
  {
    title: "Designing Dashboards People Actually Use", slug: "designing-dashboards-people-use",
    category: "data-analytics", featured: false, editorsPick: false, readingMinutes: 5,
    excerpt: "A dashboard is only valuable if people trust it, understand it, and return to it. Good design makes that happen.",
    tags: ["Data Visualization", "Business Intelligence", "Analytics"],
    content: "A dashboard packed with every available chart is often ignored. Clarity, not completeness, is what earns a dashboard a permanent place in someone's routine.\n\nStart with the decision the dashboard should support. Every element should help answer a specific question; anything that does not can be removed.\n\nHierarchy guides the eye. The most important numbers should be the largest and highest, with supporting detail available but never competing for attention.\n\nFinally, consistency builds trust. Predictable layouts, stable definitions, and reliable refresh schedules turn a dashboard from a novelty into an instrument people depend on.",
  },
];
