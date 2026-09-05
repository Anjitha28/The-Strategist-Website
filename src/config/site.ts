export interface Course {
  slug: string;
  title: string;
  overview: string;
  whoItIsFor: string;
  learningObjectives: string[];
  modules: { title: string; topics: string[] }[];
  duration: string;
  mode: string;
  prerequisites: string;
  toolsCovered: string[];
  projects: string[];
  certification: string;
  faqs: { q: string; a: string }[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  icon: string;
}

export const SITE_CONFIG = {
  brand: {
    name: "THE STRATEGIST",
    tagline: "Empowering Businesses and Institutions Through Analytics, Automation & Practical Learning.",
    email: "info@thestrategist.co.in",
    phones: ["9961813730", "0484-4059310", "7902661012"],
    whatsapp: "9961813730",
    address: `3rd Floor, Lalan Towers,
Banerji Road,
High Court Junction,
Cochin-682 031,
Ernakulam, Kerala, India`,
    mapsUrl: "https://maps.google.com/?q=Lalan+Towers+Cochin",
    socials: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    }
  },

  navigation: {
    header: [
      { label: "Home", url: "/" },
      { label: "About Us", url: "/about" },
      { label: "Corporate Solutions", url: "/solutions/corporate" },
      { label: "Educational Solutions", url: "/solutions/educational" },
      { label: "Products", url: "/products" },
      { label: "Training", url: "/training" },
      { label: "Blog", url: "/blog" },
      { label: "Contact", url: "/contact" }
    ]
  },

  home: {
    hero: {
      eyebrow: "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
      title: "Transform Data Into Business Growth",
      text: "The Strategist partners with businesses and enterprises to build intelligent analytics platforms, automate reporting workflows, modernize operations, and enable data-driven decision making.",
    },
    intro: {
      title: "Turning Complex Data into Clear Decisions",
      text1: "Modern organizations generate vast volumes of data, fragmented processes, and operational friction. The Strategist bridges that gap through intelligent analytics, report automation, technology platforms, and practical transformation frameworks.",
      text2: "We combine strategic thinking with deep technical execution to help organizations improve visibility, eliminate manual overhead, and achieve measurable business outcomes."
    },
    whyUs: {
      title: "Why The Strategist?",
      items: [
        {
          num: "01",
          title: "Business Intelligence",
          desc: "End-to-end BI architectures and interactive dashboards engineered around measurable business outcomes."
        },
        {
          num: "02",
          title: "Process & Report Automation",
          desc: "Automate repetitive reporting and operational workflows with greater speed, accuracy, and consistency."
        },
        {
          num: "03",
          title: "Enterprise Platforms",
          desc: "Custom business portals and analytics infrastructure tailored to your exact organizational requirements."
        },
        {
          num: "04",
          title: "Outcome-Driven Consulting",
          desc: "Practical frameworks, continuous refinement, and capability enablement built around real-world results."
        }
      ]
    },
    industries: {
      title: "Solutions Built For Every Industry",
      tags: [
        "Education",
        "Healthcare",
        "Manufacturing",
        "Retail",
        "Financial Services",
        "Startups",
        "SMEs",
        "Large Enterprises"
      ]
    }
  },

  about: {
    approach: {
      title: "Our Approach",
      steps: [
        {
          num: "01",
          title: "Understand",
          desc: "We first understand the organization's goals, challenges, workflows, and existing systems."
        },
        {
          num: "02",
          title: "Analyze",
          desc: "We examine data, processes, and operational gaps to identify meaningful opportunities."
        },
        {
          num: "03",
          title: "Build",
          desc: "We design and develop practical solutions around the organization's actual requirements."
        },
        {
          num: "04",
          title: "Improve",
          desc: "We continuously refine systems, reporting, automation, and workflows to create long-term value."
        }
      ]
    },
    beliefs: [
      "Good technology should simplify complexity.",
      "Data should support decisions, not create more confusion.",
      "Automation should remove repetitive work and create capacity.",
      "Technology solutions should be practical, not unnecessarily complicated.",
      "Learning should connect with real-world application."
    ],
    capabilities: [
      "Business Analytics",
      "Data Visualization",
      "Business Intelligence",
      "Report Automation",
      "Process Automation",
      "Application Development",
      "Educational Technology",
      "Institutional Analytics",
      "Training & Capability Development"
    ]
  },

  corporate: {
    solutions: [
      {
        title: "Report Automation",
        desc: "Automate MIS, financial, operational, and management reports with greater speed, accuracy, and consistency.",
        icon: "workflow"
      },
      {
        title: "Data Visualization",
        desc: "Convert complex business data into meaningful visual insights and interactive reports.",
        icon: "pie-chart"
      },
      {
        title: "Spreadsheet Consulting",
        desc: "Build advanced Excel systems, automation, validation, reporting, and optimization solutions.",
        icon: "table"
      },
      {
        title: "Dashboard Development",
        desc: "Develop interactive dashboards for KPI tracking, performance monitoring, management reporting, and business intelligence.",
        icon: "gauge"
      },
      {
        title: "Application Development",
        desc: "Create custom business applications for reporting, workflow, operational management, and organization-specific requirements.",
        icon: "cpu"
      },
      {
        title: "Process Automation",
        desc: "Reduce manual work through intelligent workflows, automation, and process redesign.",
        icon: "zap"
      },
      {
        title: "Corporate Training",
        desc: "Practical capability-development programs covering Excel, Power BI, analytics, dashboards, automation, and business intelligence.",
        icon: "presentation"
      }
    ]
  },

  educational: {
    solutions: [
      {
        title: "Training Programs",
        desc: "Practical programs in Excel, Power BI, Data Analytics, Financial Analytics, Business Intelligence, dashboards, and automation.",
        icon: "graduation-cap"
      },
      {
        title: "Certification Programs",
        desc: "Industry-oriented certification programs focused on employability, practical knowledge, and workplace-ready skills.",
        icon: "award"
      },
      {
        title: "Curriculum Development",
        desc: "Modern, analytics-driven curriculum development aligned with industry expectations and practical application.",
        icon: "book-open"
      },
      {
        title: "Academic Analytics Solutions",
        desc: "Technology platforms for reporting, evaluation, analytics, performance tracking, and institutional decision support.",
        icon: "bar-chart"
      },
      {
        title: "Skill Development Programs",
        desc: "Structured practical learning programs designed to build relevant technical and analytical capabilities.",
        icon: "target"
      }
    ]
  },

  products: [
    {
      slug: "grade-scope",
      name: "Grade Scope",
      category: "EDUCATIONAL REPORTING & ANALYTICS PLATFORM",
      description: "Grade Scope helps institutions automate student progress reports, placement reports, training reports, and institutional analytics.",
      features: [
        "Automated Reporting",
        "Student Progress Tracking",
        "Placement Analytics",
        "Performance Monitoring",
        "Centralized Data Management"
      ],
      icon: "bar-chart"
    },
    {
      slug: "proctrix",
      name: "Proctrix",
      category: "ASSIGNMENT & ASSESSMENT AUTOMATION PLATFORM",
      description: "Proctrix helps teachers generate, manage, and evaluate practical assignments while helping students practice and improve skills.",
      features: [
        "Assignment Automation",
        "Automated Evaluation",
        "Practical Skill Assessment",
        "Time-Saving Evaluation System",
        "Structured Learning Activities"
      ],
      icon: "shield-check"
    },
    {
      slug: "beintrack",
      name: "BeInTrack",
      category: "TRACKING & MANAGEMENT PLATFORM",
      description: "BeInTrack is designed to provide structured tracking and visibility across organizational or institutional processes.",
      features: [
        "Process Tracking & Progress Visibility",
        "Goal and Milestone Mapping",
        "Performance Analytics",
        "Adaptable Process Flows"
      ],
      icon: "target"
    }
  ] as Product[],

  training: {
    disciplines: [
      "Advanced Excel",
      "Power BI",
      "Data Analytics",
      "Dashboards",
      "Report Automation",
      "Business Intelligence"
    ],
    categories: [
      {
        title: "Online Courses",
        desc: "Self-paced learning programs covering practical spreadsheet, analytics, reporting, and business intelligence skills.",
        cta: "View Programs",
        href: "#courses"
      },
      {
        title: "One-to-One",
        desc: "Personalized learning sessions designed around individual learning objectives and development requirements.",
        cta: "Enquire Now",
        href: "/contact?service=Training"
      },
      {
        title: "Corporate",
        desc: "Customized programs for teams covering analytics, reporting, automation, dashboards, and business intelligence.",
        cta: "Discuss Corporate Training",
        href: "/contact?service=Corporate"
      },
      {
        title: "Colleges",
        desc: "Industry-oriented programs designed for students and academic institutions.",
        cta: "Explore College Programs",
        href: "/solutions/educational"
      },
      {
        title: "Internships",
        desc: "Practical project-based learning opportunities designed to provide hands-on exposure and workplace-oriented experience.",
        cta: "Learn More",
        href: "/contact?service=Training"
      }
    ],
    courses: [
      {
        slug: "advanced-excel",
        title: "Advanced Excel for Business & Analytics",
        overview: "Master spreadsheet logic, data manipulation, dynamic array formulas, and business dashboards. This program is designed to turn you into a spreadsheet power user capable of solving complex operational and financial data challenges.",
        whoItIsFor: "Business analysts, financial analysts, management trainees, students, and professionals working with large operational spreadsheets.",
        learningObjectives: [
          "Master dynamic arrays and modern formulas (XLOOKUP, FILTER, UNIQUE).",
          "Build interactive data models and dynamic pivot tables.",
          "Design executive-ready business dashboards inside Excel.",
          "Write basic VBA scripts and record macros to automate repetitive workflows."
        ],
        modules: [
          {
            title: "Module 1: Excel Essentials & Modern Formulas",
            topics: ["Absolute vs. Relative References", "Logical formulas (IFS, SWITCH)", "Modern lookup functions (XLOOKUP, INDEX/MATCH)", "Dynamic array formulas"]
          },
          {
            title: "Module 2: Data Cleaning & Processing",
            topics: ["Text manipulation functions", "Date & Time calculation logic", "Data validation rules", "Identifying and cleaning duplicates"]
          },
          {
            title: "Module 3: Advanced Analysis & Summarization",
            topics: ["Multi-criteria sum/average formulas", "Advanced Pivot Tables & Slicers", "Conditional formatting design", "Scenario Manager & Goal Seek"]
          },
          {
            title: "Module 4: Dashboard Construction & VBA Intro",
            topics: ["KPI Card creation", "Chart selection and alignment rules", "VBA syntax and recorded macros", "Form controls & interaction"]
          }
        ],
        duration: "30 Hours (4 Weeks)",
        mode: "Self-Paced Online or Live Instructor-Led Workshops",
        prerequisites: "Basic familiarity with using spreadsheets and simple math operators.",
        toolsCovered: ["Microsoft Excel", "Google Sheets"],
        projects: [
          "Sales Performance Dashboard: Create a dashboard for a retail team comparing product categories and region targets.",
          "Operational Report Automator: Clean and merge multiple monthly sales files using formulas and simple macros."
        ],
        certification: "The Strategist Advanced Excel Specialist Certification",
        faqs: [
          {
            q: "Do I need prior programming experience?",
            a: "No, this course starts from basic formulas and guides you through advanced dashboard building and spreadsheet logic without requiring a programming background."
          },
          {
            q: "Will I get access to files and templates?",
            a: "Yes, every module includes downloadable template files, clean dataset exercises, and solved project workbooks."
          }
        ]
      },
      {
        slug: "power-bi",
        title: "Power BI & Business Intelligence Dashboarding",
        overview: "Learn to build interactive, production-ready corporate dashboards using Power BI. Connect to multiple data sources, build clean data models, write complex DAX expressions, and design stunning visuals that answer business questions.",
        whoItIsFor: "Reporting managers, business intelligence professionals, system administrators, and anyone looking to move beyond static spreadsheet reports.",
        learningObjectives: [
          "Connect, clean, and transform data using Power Query.",
          "Model relational data and define relationships (star schema).",
          "Write DAX calculations (Calculated columns, measures, and time intelligence).",
          "Implement high-impact dashboard designs using visual hierarchy guidelines."
        ],
        modules: [
          {
            title: "Module 1: Ingestion & ETL (Power Query)",
            topics: ["Connecting to files, folders, and databases", "Merge vs. Append queries", "Unpivoting, splitting, and replacing values", "Conditional columns & data types"]
          },
          {
            title: "Module 2: Relational Data Modeling",
            topics: ["Creating relationships (1:many, many:many)", "Star vs. Snowflake schemas", "Managing active and inactive relationships", "Creating Date dimensions"]
          },
          {
            title: "Module 3: DAX Calculations (Data Analysis Expressions)",
            topics: ["Calculated columns vs. Measures", "CALCULATE modifier logic", "Time intelligence formulas (YTD, Prior Year)", "DIVIDE and logical Dax handlers"]
          },
          {
            title: "Module 4: Visual Interface Design & Publishing",
            topics: ["Choosing the right visual representation", "Configuring interactive cross-filtering", "Adding bookmarks and page navigation", "Publishing to Power BI Service"]
          }
        ],
        duration: "40 Hours (5 Weeks)",
        mode: "Online Video Course + Live Weekly Q&A Sessions",
        prerequisites: "Intermediate Excel knowledge (vlookups, pivots) is highly recommended.",
        toolsCovered: ["Microsoft Power BI Desktop", "Power Query", "DAX Studio"],
        projects: [
          "Financial KPI Dashboard: Build a dynamic dashboard tracking revenue, gross profit, and cost margins across fiscal years.",
          "Customer Cohort Analytics: Model customer signup data to track retention and lifetime purchase patterns."
        ],
        certification: "The Strategist Business Intelligence Associate Certification",
        faqs: [
          {
            q: "Is Power BI free to use?",
            a: "Yes, Power BI Desktop is completely free to download and use for learning and local dashboard development."
          },
          {
            q: "Can this course be taken on a Mac?",
            a: "Power BI Desktop is windows-only. Mac users will need a virtual machine or a dual-boot setup (e.g. Parallels) to run the software locally."
          }
        ]
      },
      {
        slug: "data-analytics",
        title: "Data Analytics & Process Automation",
        overview: "Bridge the gap between raw data sets and automated operations. Learn how to clean massive tables, extract statistically valid trends, build predictive models, and design automated pipelines that trigger reports on schedule.",
        whoItIsFor: "Operational specialists, developers, analysts, and tech-savvy managers seeking to eliminate manual pipeline processes.",
        learningObjectives: [
          "Process data using Python (Pandas) and SQL.",
          "Identify process loops that can be optimized or automated.",
          "Build predictive and descriptive models using statistical principles.",
          "Configure automated pipeline runs."
        ],
        modules: [
          {
            title: "Module 1: Core SQL for Data Manipulation",
            topics: ["Select, Group By, and Having filters", "Database Joins (Left, Right, Inner, Full)", "Subqueries and Common Table Expressions (CTEs)", "Window functions for running totals"]
          },
          {
            title: "Module 2: Python Pandas & Cleaning",
            topics: ["Loading files (CSV, JSON, SQL tables)", "Handling missing data and null cells", "Grouping, merging, and aggregating frames", "Exporting clean files"]
          },
          {
            title: "Module 3: Statistical Analysis & Modeling",
            topics: ["Correlation vs. Causation analysis", "Linear regression modeling", "Descriptive statistics (median, variance, standard deviation)", "A/B testing basics"]
          },
          {
            title: "Module 4: Process Automation & Flow Design",
            topics: ["Configuring cron jobs and triggers", "Using APIs to pull and push data", "Automated email alerts for report files", "Basic script scheduling"]
          }
        ],
        duration: "45 Hours (6 Weeks)",
        mode: "Hybrid (Online Modules + Guided Capstone Project)",
        prerequisites: "Basic understanding of algebra and variables. Some programming exposure is a plus.",
        toolsCovered: ["SQL (PostgreSQL / BigQuery)", "Python (Pandas, Numpy)", "Git", "VS Code"],
        projects: [
          "Churn Prediction Pipeline: Analyze customer usage logs to predict high-risk account closures.",
          "Automated Inventory Monitor: Write a script that checks stock quantities daily and emails orders to suppliers."
        ],
        certification: "The Strategist Certified Analytics & Automation Professional",
        faqs: [
          {
            q: "What coding languages will I learn?",
            a: "This program focuses heavily on SQL for data extraction and Python (with Pandas) for cleaning and scheduling automation."
          }
        ]
      }
    ] as Course[]
  },

  blog: {
    featured: {
      slug: "why-data-driven-organizations-consistently-outperform-their-competition",
      category: "Business Intelligence",
      title: "Why Data-Driven Organizations Consistently Outperform Their Competition",
      excerpt: "Leaders who make decisions backed by evidence rather than assumptions consistently outperform. Discover how Business Intelligence creates a single source of truth for competitive advantage.",
      content: "Leaders who make decisions backed by evidence rather than assumptions consistently outperform. Discover how Business Intelligence creates a single source of truth for competitive advantage.",
      date: "20 Jul 2026",
      readTime: "1 min read"
    } as BlogPost,

    articles: [
      {
        slug: "digital-transformation-building-smarter-businesses-for-the-future",
        category: "Digital Transformation",
        title: "Digital Transformation: Building Smarter Businesses for the Future",
        excerpt: "Digital Transformation is about improving how organisations operate, collaborate, and create value using data, processes, and technology.",
        content: "Digital Transformation is about improving how organisations operate, collaborate, and create value using data, processes, and technology.",
        date: "15 Jul 2026",
        readTime: "1 min read"
      },
      {
        slug: "how-artificial-intelligence-is-revolutionising-business-analytics",
        category: "Artificial Intelligence",
        title: "How Artificial Intelligence is Revolutionising Business Analytics",
        excerpt: "AI has evolved from a futuristic concept into a practical business tool, empowering organisations to move from reactive analytics to proactive business planning.",
        content: "AI has evolved from a futuristic concept into a practical business tool, empowering organisations to move from reactive analytics to proactive business planning.",
        date: "10 Jul 2026",
        readTime: "1 min read"
      }
    ] as BlogPost[]
  }
};
