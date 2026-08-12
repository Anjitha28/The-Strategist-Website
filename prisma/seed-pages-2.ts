import type { PageSeed } from "./seed-data";

export const CORPORATE: PageSeed = {
  slug: "solutions/corporate",
  title: "Corporate Solutions",
  seoTitle: "Corporate Solutions | The Strategist",
  seoDescription:
    "Enterprise Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, Digital Transformation, Technology Consulting, and Business Strategy solutions for modern organizations.",
  seoKeywords: "Corporate Solutions, Enterprise Consulting, Executive Dashboards, Enterprise Automation",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Enterprise Solutions • Digital Transformation • Business Intelligence",
        title: "Helping Organizations Transform Through Strategy, Intelligence & Technology",
        description:
          "The Strategist partners with organizations to modernize business operations, implement intelligent technologies, automate processes, improve reporting, and build scalable digital ecosystems that support sustainable growth.",
        primaryLabel: "Schedule a Business Consultation", primaryHref: "/contact",
        secondaryLabel: "Explore Our Services", secondaryHref: "#services",
      },
    },
    {
      key: "challenges", type: "challenges", title: "Challenges", order: 1,
      data: {
        heading: "Business Challenges We Help Solve",
        subtitle: "Organizations today face increasingly complex operational and technological challenges.",
        items: [
          "Disconnected Business Systems", "Manual Reporting Processes", "Lack of Data Visibility",
          "Slow Decision Making", "Operational Inefficiencies", "Poor Business Insights",
          "Legacy Technology Limitations", "Data Silos", "Limited Business Automation", "Difficulty Scaling Operations",
        ],
      },
    },
    {
      key: "services", type: "services", title: "Services", order: 2,
      data: {
        heading: "Comprehensive Business Solutions",
        items: [
          { title: "Business Intelligence", icon: "bar-chart", description: "Design interactive dashboards and executive reporting systems that transform raw business data into actionable insights.", features: ["Executive Dashboards", "KPI Monitoring", "Interactive Reports", "Business Performance Analytics", "Self-Service Analytics"] },
          { title: "Data Analytics", icon: "line-chart", description: "Analyze business data to identify trends, opportunities, operational bottlenecks, and strategic improvements.", features: ["Business Analytics", "Predictive Analytics", "Customer Analytics", "Sales Analytics", "Operational Analytics"] },
          { title: "Artificial Intelligence", icon: "brain", description: "Implement AI-powered business solutions that automate repetitive tasks and support intelligent decision making.", features: ["AI Assistants", "Predictive Models", "Intelligent Automation", "Process Intelligence", "AI-Powered Reporting"] },
          { title: "Report Automation", icon: "file-text", description: "Reduce manual work by automating business reports and operational reporting workflows.", features: ["Automated Reports", "Scheduled Reporting", "Executive Dashboards", "KPI Notifications", "Data Distribution"] },
          { title: "Digital Transformation", icon: "rocket", description: "Modernize organizational workflows using technology, automation, analytics, and cloud platforms.", features: ["Digital Strategy", "Process Modernization", "Technology Consulting", "Automation Solutions", "Enterprise Platforms"] },
          { title: "Technology Consulting", icon: "compass", description: "Help organizations select and implement technologies aligned with long-term business objectives.", features: ["Technology Assessment", "Architecture Planning", "Platform Selection", "Digital Roadmaps", "Implementation Strategy"] },
        ],
      },
    },
    {
      key: "methodology", type: "process", title: "Methodology", order: 3,
      data: {
        heading: "Our Engagement Methodology",
        items: [
          { step: 1, title: "Business Discovery", description: "We understand your organization, business goals, operational challenges, and growth objectives." },
          { step: 2, title: "Assessment", description: "Our consultants analyze existing systems, data, workflows, reporting, and operational maturity." },
          { step: 3, title: "Strategy Development", description: "We prepare a roadmap with prioritized recommendations aligned with business objectives." },
          { step: 4, title: "Implementation", description: "Solutions are deployed using structured project methodologies while minimizing business disruption." },
          { step: 5, title: "Optimization", description: "Continuous monitoring, performance measurement, and optimization ensure long-term success." },
        ],
      },
    },
    {
      key: "industries", type: "industries", title: "Industries", order: 4,
      data: {
        heading: "Supporting Organizations Across Industries",
        items: [
          { name: "Corporate Enterprises", icon: "building", description: "Business intelligence, automation, executive dashboards, analytics." },
          { name: "Manufacturing", icon: "factory", description: "Production analytics, operational efficiency, reporting automation." },
          { name: "Retail", icon: "shopping-bag", description: "Sales analytics, customer insights, inventory intelligence." },
          { name: "Healthcare", icon: "heart-pulse", description: "Performance reporting, operational dashboards, analytics." },
          { name: "Banking & Financial Services", icon: "banknote", description: "Risk reporting, financial dashboards, business intelligence." },
          { name: "Logistics", icon: "network", description: "Operational monitoring, fleet reporting, automation." },
          { name: "Education", icon: "graduation-cap", description: "Analytics platforms, institutional reporting, learning intelligence." },
          { name: "Government", icon: "landmark", description: "Data-driven governance, reporting systems, strategic transformation." },
          { name: "Technology Companies", icon: "cpu", description: "Product analytics, operational dashboards, executive reporting." },
        ],
      },
    },
    {
      key: "engagement", type: "cards", title: "Engagement Models", order: 5,
      data: {
        heading: "Flexible Ways to Work Together",
        items: [
          { title: "Strategic Consulting", icon: "compass", description: "Business advisory and strategic planning." },
          { title: "End-to-End Project Delivery", icon: "boxes", description: "Complete solution design, implementation, and deployment." },
          { title: "Dedicated Consulting", icon: "users", description: "Long-term consulting engagement with continuous support." },
          { title: "Corporate Partnership", icon: "handshake", description: "Technology and business transformation partnership." },
        ],
      },
    },
    { key: "faqs", type: "faqs", title: "FAQs", order: 6, data: { heading: "Frequently Asked Questions", group: "corporate" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 7,
      data: {
        heading: "Transform Your Business With Confidence",
        description: "Whether you're beginning your digital transformation journey, implementing Business Intelligence, modernizing operations, or improving decision-making, The Strategist is ready to help your organization succeed.",
        primaryLabel: "Book a Consultation", primaryHref: "/contact",
        secondaryLabel: "Contact Our Team", secondaryHref: "/contact",
      },
    },
  ],
};

export const EDUCATIONAL: PageSeed = {
  slug: "solutions/educational",
  title: "Educational Solutions",
  seoTitle: "Educational Solutions | The Strategist",
  seoDescription:
    "Professional learning programs in Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Corporate Training, College Training, Internship Programs, and Industry Certifications.",
  seoKeywords: "Educational Solutions, Corporate Training, College Training, Internship Programs, Professional Certifications",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Education • Skill Development • Career Readiness",
        title: "Empowering Students, Educators & Institutions Through Industry-Focused Learning",
        description:
          "The Strategist partners with educational institutions to bridge the gap between academic learning and industry expectations through practical, technology-driven training programs.",
        primaryLabel: "Explore Learning Programs", primaryHref: "/learn",
        secondaryLabel: "Partner With Us", secondaryHref: "/contact",
      },
    },
    {
      key: "programs", type: "services", title: "Programs", order: 1,
      data: {
        heading: "Learning Programs Designed for Every Stage",
        items: [
          { title: "Individual Learning", icon: "users", description: "Flexible programs for students, graduates, and working professionals who want practical industry skills.", features: ["Self-paced Learning", "Live Mentoring", "Practical Exercises", "Assessments", "Certifications"] },
          { title: "Corporate Learning", icon: "briefcase", description: "Customized programs that help organizations upskill employees with practical business and technology skills.", features: ["Customized Curriculum", "Organization-wide Training", "Progress Tracking", "Assessments", "Completion Reports"] },
          { title: "College Training", icon: "graduation-cap", description: "Structured academic partnerships helping colleges prepare students for industry careers.", features: ["Semester Programs", "Workshops", "Faculty Support", "Student Assessments", "Placement Preparation"] },
          { title: "Online Learning", icon: "globe", description: "Flexible online courses allowing learners to study from anywhere with structured modules.", features: ["Anytime Access", "Interactive Learning", "Module Assessments", "Progress Tracking", "Certificates"] },
          { title: "Internship Programs", icon: "rocket", description: "Industry-oriented internships providing practical exposure to real-world projects.", features: ["Project Experience", "Mentorship", "Practical Assignments", "Performance Evaluation", "Internship Certificate"] },
        ],
      },
    },
    {
      key: "journey", type: "process", title: "Learning Journey", order: 2,
      data: {
        heading: "A Structured Learning Experience",
        items: [
          { step: 1, title: "Enroll", description: "Choose the learning program that matches your career goals." },
          { step: 2, title: "Learn", description: "Access professionally designed learning materials, videos, HTML lessons, and downloadable resources." },
          { step: 3, title: "Practice", description: "Complete practical exercises, assignments, and real-world projects." },
          { step: 4, title: "Assess", description: "Evaluate your understanding through quizzes, assessments, and mock tests." },
          { step: 5, title: "Achieve", description: "Complete your learning journey with certifications and practical experience." },
        ],
      },
    },
    {
      key: "benefits", type: "features", title: "Benefits", order: 3,
      data: {
        heading: "Designed for Practical Skill Development",
        items: [
          { title: "Industry-Oriented Curriculum", icon: "target", description: "Focused on real-world business scenarios rather than theory alone." },
          { title: "Practical Projects", icon: "layers", description: "Hands-on projects that simulate professional working environments." },
          { title: "Interactive Learning Materials", icon: "book-open", description: "Professionally designed HTML lessons, videos, and downloadable resources." },
          { title: "Assessments", icon: "clipboard", description: "Regular evaluations to measure learning progress." },
          { title: "Progress Tracking", icon: "gauge", description: "Monitor learning progress module by module." },
          { title: "Mentor Support", icon: "headphones", description: "Guidance from experienced professionals throughout the learning journey." },
        ],
      },
    },
    { key: "faqs", type: "faqs", title: "FAQs", order: 4, data: { heading: "Frequently Asked Questions", group: "educational" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 5,
      data: {
        heading: "Build Skills That Shape Your Future",
        description: "Whether you're a student preparing for your first career, a professional looking to upskill, or an institution seeking industry-focused learning programs, The Strategist is ready to support your learning journey.",
        primaryLabel: "Explore Courses", primaryHref: "/learn",
        secondaryLabel: "Become a Learning Partner", secondaryHref: "/contact",
      },
    },
  ],
};

export const PRODUCTS: PageSeed = {
  slug: "products",
  title: "Products",
  seoTitle: "Products | The Strategist",
  seoDescription:
    "Explore business software products from The Strategist including Business Intelligence platforms, Learning Experience Platform, Report Automation, Digital Transformation solutions, Business Analytics, and Custom Software Development.",
  seoKeywords: "Business Software, Business Intelligence Platform, Report Automation, Business Analytics, Custom Software Development",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Business Solutions • Software Products • Intelligent Platforms",
        title: "Powerful Digital Products Designed to Transform Business Operations",
        description:
          "The Strategist develops modern software products that help organizations simplify operations, automate business processes, improve reporting, and make faster, data-driven decisions.",
        primaryLabel: "Explore Products", primaryHref: "#catalog",
        secondaryLabel: "Request a Demo", secondaryHref: "/contact",
      },
    },
    {
      key: "intro", type: "intro", title: "Introduction", order: 1,
      data: {
        heading: "Technology That Solves Business Problems",
        paragraphs: [
          "Every organization has unique operational challenges.",
          "Instead of offering generic software, we build practical digital solutions that simplify workflows, improve collaboration, automate repetitive tasks, and provide meaningful business insights.",
          "Our products are designed for organizations of all sizes and can be customized to meet specific business requirements.",
        ],
      },
    },
    { key: "catalog", type: "product-catalog", title: "Product Catalog", order: 2, data: { heading: "Explore Our Product Portfolio" } },
    {
      key: "highlights", type: "features", title: "Highlights", order: 3,
      data: {
        heading: "Designed for Modern Organizations",
        items: [
          { title: "User-Friendly Interface", icon: "palette", description: "Simple, intuitive interfaces that improve productivity and reduce learning curves." },
          { title: "Secure Architecture", icon: "lock", description: "Enterprise-grade security with modern authentication and data protection." },
          { title: "Cloud Ready", icon: "cloud", description: "Accessible from anywhere with scalable cloud infrastructure." },
          { title: "Real-Time Reporting", icon: "gauge", description: "Instant visibility into organizational performance through interactive dashboards." },
          { title: "Highly Scalable", icon: "trending-up", description: "Products designed to grow alongside your organization." },
          { title: "Integration Ready", icon: "puzzle", description: "Connect seamlessly with existing business systems and third-party applications." },
        ],
      },
    },
    {
      key: "implementation", type: "process", title: "Implementation", order: 4,
      data: {
        heading: "From Planning to Deployment",
        items: [
          { step: 1, title: "Business Consultation", description: "Understanding your operational needs." },
          { step: 2, title: "Solution Recommendation", description: "Selecting the right product or customization approach." },
          { step: 3, title: "Implementation", description: "Deployment, configuration, and integration." },
          { step: 4, title: "Training", description: "Helping your team adopt the solution effectively." },
          { step: 5, title: "Ongoing Support", description: "Continuous updates, maintenance, and improvements." },
        ],
      },
    },
    { key: "faqs", type: "faqs", title: "FAQs", order: 5, data: { heading: "Frequently Asked Questions", group: "products" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 6,
      data: {
        heading: "Find the Right Solution for Your Organization",
        description: "Whether you're looking for analytics platforms, intelligent reporting, workflow automation, or enterprise applications, The Strategist can help you choose and implement the right technology solution.",
        primaryLabel: "Request a Product Demo", primaryHref: "/contact",
        secondaryLabel: "Talk to Our Experts", secondaryHref: "/contact",
      },
    },
  ],
};

export const TRAINING: PageSeed = {
  slug: "learn",
  title: "Learn",
  seoTitle: "Learn | The Strategist Learning Platform",
  seoDescription:
    "Explore professional training programs from The Strategist including Business Intelligence, Artificial Intelligence, Data Analytics, Power BI, Digital Transformation, Corporate Training, College Programs, Internship Programs, and Certification Courses.",
  seoKeywords: "Training, Online Courses, Corporate Training, College Training, Power BI Training, Certification Courses",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Professional Learning • Corporate Training • Career Development",
        title: "Build Industry-Ready Skills Through Practical Learning",
        description:
          "The Strategist Learning Platform is designed to help students, professionals, organizations, and educational institutions develop practical, job-ready skills through structured learning experiences.",
        primaryLabel: "Explore Courses", primaryHref: "#courses",
        secondaryLabel: "Talk to a Learning Advisor", secondaryHref: "/contact",
      },
    },
    { key: "categories", type: "course-categories", title: "Course Categories", order: 1, data: { heading: "Explore Learning Categories" } },
    { key: "courses", type: "course-catalog", title: "Featured Courses", order: 2, data: { heading: "Popular Learning Programs", subtitle: "Structured, project-based programs built for real-world outcomes." } },
    {
      key: "programs", type: "services", title: "Programs", order: 3,
      data: {
        heading: "Learning Programs",
        items: [
          { title: "Online Courses", icon: "globe", description: "Learn anytime through structured online programs with interactive learning materials.", features: ["Self-paced Learning", "Video Lessons", "HTML Learning Modules", "Assessments", "Certificates"] },
          { title: "Corporate Training", icon: "briefcase", description: "Customized workforce development programs designed for organizations.", features: ["Customized Curriculum", "Employee Learning Portal", "Batch Management", "Progress Reports", "Certificates"] },
          { title: "College Training", icon: "graduation-cap", description: "Industry-focused programs for universities and colleges.", features: ["Semester Programs", "Workshops", "Bootcamps", "Faculty Development", "Internship Support"] },
          { title: "One-to-One Training", icon: "users", description: "Personalized mentoring sessions designed around individual learning goals.", features: ["Dedicated Mentor", "Flexible Schedule", "Personalized Learning Path", "Practical Projects", "Assessments"] },
          { title: "Internship Programs", icon: "rocket", description: "Practical learning through real-world projects and mentor guidance.", features: ["Live Projects", "Industry Exposure", "Mentor Support", "Project Reviews", "Internship Certificate"] },
        ],
      },
    },
    {
      key: "journey", type: "process", title: "Learning Journey", order: 4,
      data: {
        heading: "Your Learning Journey",
        items: [
          { step: 1, title: "Browse Courses", description: "Explore available learning programs." },
          { step: 2, title: "Enroll", description: "Choose the course that matches your goals." },
          { step: 3, title: "Learn", description: "Complete structured modules with videos, HTML lessons, PDFs, and downloadable resources." },
          { step: 4, title: "Practice", description: "Complete assignments and practical exercises." },
          { step: 5, title: "Assess", description: "Take quizzes, assessments, and mock tests." },
          { step: 6, title: "Achieve", description: "Receive your certificate and continue learning." },
        ],
      },
    },
    { key: "faqs", type: "faqs", title: "FAQs", order: 5, data: { heading: "Frequently Asked Questions", group: "learn" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 6,
      data: {
        heading: "Start Your Learning Journey Today",
        description: "Build practical skills, gain industry knowledge, complete real-world projects, and prepare yourself for future opportunities with The Strategist Learning Platform.",
        primaryLabel: "Browse Courses", primaryHref: "#courses",
        secondaryLabel: "Contact Learning Team", secondaryHref: "/contact",
      },
    },
  ],
};
