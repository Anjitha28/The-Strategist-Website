import type { PageSeed } from "./seed-data";

export const BLOG: PageSeed = {
  slug: "blog",
  title: "Blog",
  seoTitle: "Blog | The Strategist",
  seoDescription:
    "Explore expert articles on Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Report Automation, Business Strategy, Leadership, Technology, and Professional Development.",
  seoKeywords: "Business Intelligence Blog, Technology Articles, Data Analytics, Automation, Business Strategy",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Knowledge • Insights • Innovation",
        title: "Insights That Inspire Better Business Decisions",
        description:
          "Stay informed with expert perspectives, practical guides, industry trends, and technology insights covering Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Report Automation, Data Visualization, Leadership, and Business Strategy.",
        primaryLabel: "Explore Articles", primaryHref: "#articles",
        secondaryLabel: "Subscribe to Newsletter", secondaryHref: "#newsletter",
      },
    },
    { key: "articles", type: "blog-list", title: "Articles", order: 1, data: { heading: "Recent Publications" } },
    {
      key: "newsletter", type: "newsletter", title: "Newsletter", order: 2,
      data: {
        heading: "Never Miss an Update",
        description: "Stay connected with the latest insights, industry trends, product updates, learning resources, and business strategies delivered directly to your inbox.",
      },
    },
  ],
};

export const CAREERS: PageSeed = {
  slug: "careers",
  title: "Careers",
  seoTitle: "Careers | The Strategist",
  seoDescription:
    "Explore career opportunities at The Strategist. Join our growing team in Business Intelligence, Artificial Intelligence, Data Analytics, Software Development, Consulting, Design, Marketing, and Digital Transformation.",
  seoKeywords: "Careers, Jobs, Internships, Technology Careers, The Strategist Careers",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Careers • Innovation • Growth",
        title: "Build Your Career With Purpose, Innovation & Impact",
        description:
          "At The Strategist, we believe that great organizations are built by passionate people who enjoy solving complex challenges, embracing innovation, and creating meaningful business impact.",
        primaryLabel: "View Open Positions", primaryHref: "#openings",
        secondaryLabel: "Apply Now", secondaryHref: "#openings",
      },
    },
    {
      key: "benefits", type: "features", title: "Benefits", order: 1,
      data: {
        heading: "Benefits of Working With Us",
        items: [
          { title: "Continuous Learning", icon: "book-open", description: "Access professional development opportunities, technical training, workshops, and knowledge-sharing sessions." },
          { title: "Career Growth", icon: "trending-up", description: "Structured opportunities for career advancement based on performance, skills, and leadership potential." },
          { title: "Collaborative Environment", icon: "users", description: "Work alongside experienced professionals in an open and supportive culture." },
          { title: "Real-World Projects", icon: "layers", description: "Contribute to projects that solve business challenges across multiple industries." },
          { title: "Innovation", icon: "lightbulb", description: "Work with modern technologies, business intelligence platforms, analytics, AI, automation, and digital transformation." },
          { title: "Work-Life Balance", icon: "heart-pulse", description: "A healthy work culture that values productivity, well-being, and personal growth." },
        ],
      },
    },
    { key: "departments", type: "departments", title: "Departments", order: 2, data: { heading: "Career Opportunities Across Multiple Teams" } },
    {
      key: "hiring", type: "process", title: "Hiring Process", order: 3,
      data: {
        heading: "Our Recruitment Process",
        items: [
          { step: 1, title: "Application Submission", description: "Submit your application through our Careers Portal." },
          { step: 2, title: "Application Review", description: "Our recruitment team reviews your profile based on the role requirements." },
          { step: 3, title: "Initial Discussion", description: "Selected candidates are invited for an introductory conversation." },
          { step: 4, title: "Assessment", description: "Role-specific technical or functional evaluations may be conducted where applicable." },
          { step: 5, title: "Final Interview", description: "Meet with our leadership team to discuss your experience, goals, and alignment with our culture." },
          { step: 6, title: "Offer & Onboarding", description: "Successful candidates receive an offer followed by a structured onboarding process." },
        ],
      },
    },
    { key: "openings", type: "job-list", title: "Openings", order: 4, data: { heading: "Explore Current Opportunities" } },
    {
      key: "cta", type: "cta", title: "Final CTA", order: 5,
      data: {
        heading: "Let's Build the Future Together",
        description: "Join a team that believes in innovation, continuous learning, collaboration, and creating meaningful impact through technology and strategic thinking.",
        primaryLabel: "Explore Careers", primaryHref: "#openings",
        secondaryLabel: "Apply Today", secondaryHref: "#openings",
      },
    },
  ],
};

export const CONTACT: PageSeed = {
  slug: "contact",
  title: "Contact",
  seoTitle: "Contact The Strategist | Business Enquiries & Consultation",
  seoDescription:
    "Contact The Strategist for Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Software Solutions, Corporate Training, Educational Partnerships, and Professional Consulting.",
  seoKeywords: "Contact The Strategist, Business Consultation, Technology Consulting, Business Support",
  sections: [
    {
      key: "hero", type: "hero", title: "Hero", order: 0,
      data: {
        badge: "Let's Connect • Business Consultation • Partnership",
        title: "Let's Build Something Meaningful Together",
        description:
          "Whether you're exploring Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Software Solutions, Professional Training, or strategic consulting, our team is here to help.",
        primaryLabel: "Schedule a Consultation", primaryHref: "#consultation",
        secondaryLabel: "Send an Enquiry", secondaryHref: "#contact-form",
      },
    },
    { key: "contact", type: "contact", title: "Contact & Form", order: 1, data: { heading: "Send Us a Message" } },
    {
      key: "departments", type: "contact-departments", title: "Department Contacts", order: 2,
      data: {
        heading: "Reach the Right Team",
        items: [
          { title: "Business Consulting", icon: "compass", description: "Business transformation, digital strategy, enterprise consulting." },
          { title: "Corporate Solutions", icon: "building", description: "Business Intelligence, Analytics, AI, Automation, Enterprise Solutions." },
          { title: "Educational Solutions", icon: "graduation-cap", description: "College partnerships, academic programs, institutional collaborations." },
          { title: "Training", icon: "book-open", description: "Course enquiries, certifications, learning programs, internship programs." },
          { title: "Products", icon: "boxes", description: "Software products, demonstrations, product support." },
          { title: "Technical Support", icon: "headphones", description: "Technical assistance, implementation support, product issues." },
          { title: "Careers", icon: "briefcase", description: "Recruitment, internship applications, career opportunities." },
        ],
      },
    },
    { key: "consultation", type: "consultation", title: "Consultation Form", order: 3, data: { heading: "Book a Business Consultation", description: "Request a consultation with our specialists to discuss your organization's objectives and discover how our solutions can support your business growth." } },
    { key: "faqs", type: "faqs", title: "FAQs", order: 4, data: { heading: "Frequently Asked Questions", group: "contact" } },
  ],
};

export const LEGAL_PRIVACY: PageSeed = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  seoTitle: "Privacy Policy | The Strategist",
  seoDescription: "How The Strategist collects, uses, and protects your information.",
  seoKeywords: "Privacy Policy",
  sections: [
    { key: "hero", type: "legal-hero", title: "Hero", order: 0, data: { title: "Privacy Policy", updated: "Last updated: July 2026" } },
    {
      key: "body", type: "legal", title: "Body", order: 1,
      data: {
        blocks: [
          { heading: "Introduction", body: "This Privacy Policy explains how The Strategist collects, uses, discloses, and safeguards your information when you visit our website or use our services." },
          { heading: "Information We Collect", body: "We may collect personal information you voluntarily provide, such as your name, email address, phone number, organization, and any message content submitted through our forms." },
          { heading: "How Information Is Used", body: "We use collected information to respond to enquiries, deliver services, improve our website, and communicate relevant updates where you have opted in." },
          { heading: "Cookies", body: "We use cookies and similar technologies to enhance your browsing experience and analyze site traffic. You can manage cookie preferences in your browser." },
          { heading: "Data Protection", body: "We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction." },
          { heading: "Third Party Services", body: "We may use trusted third-party services for analytics and communication. These providers process data in accordance with their own policies." },
          { heading: "Your Rights", body: "You may request access to, correction of, or deletion of your personal information by contacting us." },
          { heading: "Policy Updates", body: "We may update this policy periodically. Changes will be posted on this page with a revised date." },
          { heading: "Contact Information", body: "For privacy-related questions, please contact us through our Contact page." },
        ],
      },
    },
  ],
};

export const LEGAL_TERMS: PageSeed = {
  slug: "terms-conditions",
  title: "Terms & Conditions",
  seoTitle: "Terms & Conditions | The Strategist",
  seoDescription: "The terms governing your use of The Strategist website and services.",
  seoKeywords: "Terms and Conditions",
  sections: [
    { key: "hero", type: "legal-hero", title: "Hero", order: 0, data: { title: "Terms & Conditions", updated: "Last updated: July 2026" } },
    {
      key: "body", type: "legal", title: "Body", order: 1,
      data: {
        blocks: [
          { heading: "Acceptance", body: "By accessing or using this website, you agree to be bound by these Terms & Conditions." },
          { heading: "Services", body: "The Strategist provides consulting, technology solutions, software products, and professional learning programs as described on this website." },
          { heading: "User Responsibilities", body: "You agree to use this website lawfully and not to engage in any activity that disrupts or interferes with its operation." },
          { heading: "Intellectual Property", body: "All content on this website, including text, graphics, logos, and software, is the property of The Strategist and protected by applicable laws." },
          { heading: "Payments", body: "Where applicable, payment terms for services and products will be agreed upon separately in writing." },
          { heading: "Limitation of Liability", body: "The Strategist is not liable for any indirect or consequential damages arising from the use of this website or our services." },
          { heading: "Termination", body: "We reserve the right to suspend or terminate access to our website or services at our discretion." },
          { heading: "Applicable Law", body: "These terms are governed by the applicable laws of the jurisdiction in which The Strategist operates." },
        ],
      },
    },
  ],
};

export const LEGAL_COOKIE: PageSeed = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  seoTitle: "Cookie Policy | The Strategist",
  seoDescription: "How The Strategist uses cookies and how you can manage them.",
  seoKeywords: "Cookie Policy",
  sections: [
    { key: "hero", type: "legal-hero", title: "Hero", order: 0, data: { title: "Cookie Policy", updated: "Last updated: July 2026" } },
    {
      key: "body", type: "legal", title: "Body", order: 1,
      data: {
        blocks: [
          { heading: "Cookie Usage", body: "We use cookies to operate our website, understand how it is used, and improve your experience." },
          { heading: "Essential Cookies", body: "These cookies are necessary for the website to function and cannot be switched off in our systems." },
          { heading: "Analytics Cookies", body: "These cookies help us understand how visitors interact with our website by collecting information anonymously." },
          { heading: "Marketing Cookies", body: "These cookies may be set through our site to build a profile of your interests and show relevant content." },
          { heading: "Managing Cookies", body: "You can control and delete cookies through your browser settings at any time." },
        ],
      },
    },
  ],
};
