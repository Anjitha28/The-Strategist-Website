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
    tagline: "Turning complex business and institutional challenges into smarter systems, clearer insights, and practical solutions.",
    email: "info@kvjanalytics.in",
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
      eyebrow: "STRATEGY • ANALYTICS • AUTOMATION • TECHNOLOGY",
      title: "Smarter Strategies. Better Systems. Stronger Decisions.",
      text: "The Strategist helps businesses and institutions turn complex challenges into smarter systems, actionable insights, and practical technology solutions.",
    },
    intro: {
      title: "Turning Complexity Into Clarity",
      text1: "Modern organizations generate more data, processes, and operational challenges than ever before. The Strategist helps simplify that complexity through analytics, automation, technology, and practical transformation solutions.",
      text2: "We combine strategic thinking with practical implementation to help organizations improve visibility, reduce manual effort, and make better decisions."
    },
    whyUs: {
      title: "Why The Strategist?",
      items: [
        {
          num: "01",
          title: "Practical Thinking",
          desc: "We focus on solutions that address real operational and organizational challenges."
        },
        {
          num: "02",
          title: "Data-Driven Decisions",
          desc: "We transform information into insights that support better decisions."
        },
        {
          num: "03",
          title: "Automation First",
          desc: "We identify opportunities to eliminate repetitive manual processes."
        },
        {
          num: "04",
          title: "Built Around Your Needs",
          desc: "Every solution is designed around the organization's objectives, workflows, and requirements."
        }
      ]
    },
    industries: {
      title: "Solutions Across Organizations",
      tags: [
        "Businesses",
        "Corporate Teams",
        "Educational Institutions",
        "Colleges & Universities",
        "Training Organizations",
        "Management Teams"
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
      slug: "smarter-reporting-systems",
      category: "Analytics",
      title: "From Data to Decisions: Building Smarter Reporting Systems",
      excerpt: "How organizations can transform fragmented reporting processes into structured, automated, decision-ready information systems.",
      content: `In modern business environments, information is rarely the bottleneck; formatting is. Most organizations produce dozens of spreadsheets, slide decks, and reports every week. Yet, managers still struggle to answer simple operational questions in real time. 

Here is why: most reporting is done manually. It relies on a pipeline of extracting CSVs from separate software packages, copy-pasting them into a workbook, applying custom calculations, and styling charts before emailing them to stakeholders. 

This process creates three key problems:
1. **Time Lag**: By the time a weekly operational report is finished on Tuesday, it represents data from the prior week. Decisions are always backward-looking.
2. **Operational Errors**: A single copy-paste mismatch or formula error can throw off totals, leading to incorrect calculations and flawed decisions.
3. **Wasted Talent**: Analysts spend 80% of their working hours compiling reports and only 20% analyzing them.

### Moving to Smarter Systems

Building a smarter reporting system requires shifting from *compilation* to *consumption*. This transition is built on three pillars:

#### 1. Ingestion Automation
Modern data structures allow connecting directly to database schemas, CRM APIs, or transactional software. Instead of exporting CSVs manually, reports should pull data automatically via scripts or connectors. Even simple spreadsheet tools like Excel now support Power Query, which can read from folders and databases in one click.

#### 2. Relational Modeling
Data should be stored in structured formats rather than flat, wide sheets. By implementing star schema designs (separating fact tables like Sales from dimension tables like Customers), metrics can be calculated dynamically across any timeframe or category without breakable lookup formulas.

#### 3. Interactive Visualization
Instead of mailing static PDFs or workbooks, organizations should deploy interactive dashboards. Visual tools (like Power BI or web-based dashboards) allow users to filter by region, drill down into transactions, and toggle timelines themselves.

### The Business Impact

When reporting is automated:
* Decisions are made using data that is refreshed hourly or daily.
* Human error in calculations is eliminated.
* Analysts are freed to investigate trends, find cost savings, and explore new growth vectors.

*Is your team spending too much time compiling and too little time analyzing? Start a conversation with The Strategist today to automate your reporting systems.*`,
      date: "August 15, 2026",
      readTime: "6 min read"
    } as BlogPost,

    articles: [
      {
        slug: "reduce-reporting-work",
        category: "Automation",
        title: "How Automation Can Reduce Repetitive Reporting Work",
        excerpt: "Learn how modern workflow tools and automation scripts can free up valuable time by taking over manual report compilation.",
        content: `Manual reporting is a silent productivity killer. Every week, skilled professionals spend hours downloading files, aligning tables, copying rows, and building charts. This is work that computers excel at.

By designing automated workflows, organizations can reduce repetitive tasks to a single script execution or a background schedule.

### Key Automation Targets

* **ETL (Extract, Transform, Load)**: Use scripts to pull records from APIs or database views, clean up headers, drop nulls, and write to a destination.
* **Scheduling**: Run jobs on cron schedules (e.g., at 6:00 AM every Monday) so files are ready when teams log in.
* **Alerts**: Trigger slack notifications or emails only when key thresholds are crossed, reducing info overload.

Automating these workflows increases speed and eliminates human copy-paste errors. Start small by recording simple spreadsheet macros or writing short scripts to merge daily logs. Over time, build connected pipelines that link your database to your dashboard.`,
        date: "August 12, 2026",
        readTime: "4 min read"
      },
      {
        slug: "actionable-insights",
        category: "Analytics",
        title: "Turning Business Data Into Actionable Insights",
        excerpt: "A practical guide to sorting through raw business data and highlighting the key metrics that drive growth.",
        content: `Having data is not the same as having insight. Most databases contain millions of rows of data, but without a clear framework, this data is just noise.

To turn data into action, you must follow three rules:

1. **Focus on KPIs**: Identify the 3-5 core metrics that determine whether your business is succeeding. Everything else is secondary.
2. **Contextualize with Baselines**: A sales number of $50,000 is meaningless without comparing it to last month's numbers or this month's targets. Always show progress indicators.
3. **Drive Decisions, Not Just Reports**: Ask yourself: 'What action will we take if this number goes up by 10%? What will we do if it drops by 10%?' If the answer is 'nothing,' you don't need to track it.

Align your analytics pipelines with clear business questions to unlock real growth potential.`,
        date: "August 08, 2026",
        readTime: "5 min read"
      },
      {
        slug: "dashboards-decision-making",
        category: "Business Intelligence",
        title: "Why Interactive Dashboards Improve Decision-Making",
        excerpt: "Discover the visual principles and layout strategies that make real-time dashboards effective for management teams.",
        content: `A well-designed dashboard does more than display data; it tells a story. When executives look at a report, they need to know three things instantly: what is happening, why is it happening, and what should we do?

Interactive dashboards allow users to answer these questions by drilling down into the metrics. Instead of requesting a new report, a manager can click on a lagging product category to see which regions are driving the decline.

### Visual Design Rules for Dashboards

* **Put Important Info on Top**: Keep high-level KPIs in large text at the top left.
* **Use Color Sparingly**: Use grey for normal states and green/red only to indicate significant positive or negative deviations.
* **Keep it Clean**: Avoid dense tables. Use charts to show trends and keep spacing open.

A clean, interactive dashboard aligns teams around a single source of truth, speeding up operational response.`,
        date: "August 02, 2026",
        readTime: "5 min read"
      },
      {
        slug: "smarter-business-systems",
        category: "Technology",
        title: "From Spreadsheets to Smarter Business Systems",
        excerpt: "When is a spreadsheet no longer enough? How to upgrade your operations to custom web apps and databases.",
        content: `Spreadsheets are the world's most popular business tools. They are flexible, quick, and understood by everyone. But as organizations grow, spreadsheets start to break.

Signs you have outgrown spreadsheets:
* Different team members have different versions of the 'same' file.
* Workbooks take minutes to open or crash frequently.
* Multiple people need to edit data simultaneously.
* Sensitive information is sent over email without tracking.

Transitioning to custom databases (like PostgreSQL) and custom web portals ensures data integrity, scales user access, and provides a foundation for automation.`,
        date: "July 28, 2026",
        readTime: "6 min read"
      },
      {
        slug: "analytics-culture",
        category: "Digital Transformation",
        title: "Building an Analytics Culture in Organizations",
        excerpt: "How to encourage team members at every level to rely on data rather than intuition for daily decisions.",
        content: `Buying data tools is easy; changing culture is hard. A dashboard is useless if managers still rely on gut feel.

To build an analytics culture:
* **Make Data Accessible**: Ensure team members can log in and view metrics easily without submitting tickets to IT.
* **Promote Data Literacy**: Run training workshops to teach teams how to read charts and write basic queries.
* **Lead by Example**: Leaders should start meetings by reviewing dashboard indicators rather than reading bullet-point lists.

When data becomes the common language of your company, operational efficiency follows naturally.`,
        date: "July 20, 2026",
        readTime: "7 min read"
      },
      {
        slug: "educational-data-analytics",
        category: "Education Technology",
        title: "How Educational Institutions Can Use Data More Effectively",
        excerpt: "Exploring academic and administrative data analytics to improve student outcomes and optimize institutional resources.",
        content: `Universities and colleges are sitting on massive data reserves: student grades, placement logs, course attendance, and feedback surveys. However, this data is often siloed in registrar databases.

Academic analytics bridges these gaps by:
* **Early Warning Systems**: Identifying students whose early test scores or attendance drop suggest a high risk of course failure.
* **Placement Analytics**: Tracking which student profiles and skills match best with incoming campus recruiting partners.
* **Resource Optimization**: Modeling course enrollment trends to assign classrooms and instructors more efficiently.

By converting educational records into institutional insights, administrators can improve graduation and employment rates.`,
        date: "July 15, 2026",
        readTime: "5 min read"
      }
    ] as BlogPost[]
  }
};
