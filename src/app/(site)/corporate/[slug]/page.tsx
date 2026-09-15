import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, ArrowRight, Workflow, PieChart, Table, Gauge, Smartphone, Presentation } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const dynamic = "force-dynamic";

export const CORPORATE_SERVICES = [
  {
    slug: "report-automation",
    title: "Report Automation",
    icon: "Workflow",
    shortDescription: "Automate MIS, financial, operational, and management reports with speed, precision, and accuracy.",
    details: [
      "Eliminate manual copying, pasting, and formatting across multiple spreadsheets.",
      "Consolidate multiple files, ERP outputs, and CRM pipelines with single-click automated routines.",
      "Prevent calculation errors, missing rows, and data mismatch anomalies with automated validation.",
      "Deploy robust scheduled loaders, macros, and background scripts for hands-free report distribution."
    ],
    deliverables: [
      "Automated Monthly MIS Packs",
      "Executive Dashboard Feeds",
      "Multi-Source Data Consolidation",
      "Automated Error-Audit Logs"
    ]
  },
  {
    slug: "data-visualization",
    title: "Data Visualization",
    icon: "PieChart",
    shortDescription: "Convert complex multi-layered data into meaningful visual insights, intuitive dashboards, and interactive executive reports.",
    details: [
      "Design clear visual hierarchies that spotlight high-priority operational KPIs and anomalies.",
      "Map out comparative variance trends, fiscal breakdowns, and regional performance matrices.",
      "Structure charts, gauges, and tables to align with strict corporate governance and audit standards.",
      "Incorporate company brand color palettes and typography for presentation-ready executive decks."
    ],
    deliverables: [
      "Executive KPI Summaries",
      "Interactive Trend Visualizers",
      "Cross-Filtering Data Canvas",
      "C-Suite Board Presentation Visuals"
    ]
  },
  {
    slug: "spreadsheet-consulting",
    title: "Spreadsheet Consulting",
    icon: "Table",
    shortDescription: "Advanced Excel architecture, optimization, formula audits, and macro solutions engineered for heavy enterprise workflows.",
    details: [
      "Audit legacy formulas and complex workbooks for performance bottlenecks, circular references, and calculation lag.",
      "Build robust dynamic financial models with scenario analysis, sensitivity testing, and forecasting.",
      "Implement data validation rules and protected sheets to eliminate accidental formula overwrites.",
      "Develop custom VBA macros and automation routines to extend native spreadsheet functionality."
    ],
    deliverables: [
      "Optimized Financial Workbooks",
      "Automated Macro Toolkits",
      "Audit & Validation Architecture",
      "Scenario & Sensitivity Calculators"
    ]
  },
  {
    slug: "dashboard-development",
    title: "Dashboard Development",
    icon: "Gauge",
    shortDescription: "Real-time interactive dashboards for KPI tracking, operational monitoring, and enterprise business intelligence.",
    details: [
      "Connect live enterprise databases, SQL servers, and cloud files directly into unified dashboard portals.",
      "Monitor daily operating metrics, regional sales velocity, inventory levels, and profitability in real time.",
      "Implement deep drill-down layers allowing executives to inspect summary KPIs down to individual line-item transactions.",
      "Configure role-based access permissions and secure sharing for team leaders and department heads."
    ],
    deliverables: [
      "Live Operational BI Dashboards",
      "Departmental Performance Trackers",
      "Granular Drill-Down Data Views",
      "Mobile-Ready Executive Telemetry"
    ]
  },
  {
    slug: "app-development",
    title: "App Development",
    icon: "Smartphone",
    shortDescription: "Custom business applications engineered for streamlined reporting, internal approvals, and operational process management.",
    details: [
      "Build tailored operational applications that map exactly to your organization's unique internal processes.",
      "Ensure granular data governance with encrypted databases, multi-factor authentication, and role-based permissions.",
      "Integrate custom API connectors, ERP feeds, and scheduled background workers.",
      "Deliver responsive, intuitive interfaces optimized for desktops, tablets, and mobile field personnel."
    ],
    deliverables: [
      "Custom Workflow & Approval Portals",
      "Operational Data Capture Tools",
      "Automated Notification Engines",
      "Cross-Platform Field Apps"
    ]
  },
  {
    slug: "process-automation",
    title: "Process Automation",
    icon: "Zap",
    shortDescription: "Eliminate repetitive manual tasks and latency through intelligent workflow orchestration and end-to-end process automation.",
    details: [
      "Analyze end-to-end departmental operations to identify and eliminate manual repetitive steps.",
      "Connect disparate business tools to automatically sync records across databases, spreadsheets, and emails.",
      "Deploy always-on background automation jobs that execute 24/7 with zero human intervention required.",
      "Configure automated alerting rules that immediately notify stakeholders of anomalies or critical thresholds."
    ],
    deliverables: [
      "End-to-End Workflow Automations",
      "Real-Time Exception Alerts",
      "Multi-System Data Synchronization",
      "Zero-Touch Scheduled Data Pipelines"
    ]
  },
  {
    slug: "corporate-training",
    title: "Corporate Training",
    icon: "Presentation",
    shortDescription: "Hands-on corporate training programs in Advanced Excel, Power BI, data modeling, dashboards, and automated reporting.",
    details: [
      "Deliver customized curriculum cohorts targeting the exact technical skills gaps in your team.",
      "Provide practical hands-on datasets and case studies modeled directly after real-world corporate challenges.",
      "Accelerate employee productivity with advanced formula syntax, DAX calculations, and automation shortcuts.",
      "Track learning impact with pre- and post-training skill assessments and personalized performance scorecards."
    ],
    deliverables: [
      "Customized Corporate Workshops",
      "Real-Data Case Study Workbooks",
      "Post-Training Skill Evaluations",
      "Executive Analytics Mastery Tracks"
    ]
  }
];

const ICONS: Record<string, React.ReactNode> = {
  Workflow: <Workflow className="h-7 w-7 text-[#18b8ad]" />,
  PieChart: <PieChart className="h-7 w-7 text-[#18b8ad]" />,
  Table: <Table className="h-7 w-7 text-[#18b8ad]" />,
  Gauge: <Gauge className="h-7 w-7 text-[#18b8ad]" />,
  Smartphone: <Smartphone className="h-7 w-7 text-[#18b8ad]" />,
  Zap: <Zap className="h-7 w-7 text-[#18b8ad]" />,
  Presentation: <Presentation className="h-7 w-7 text-[#18b8ad]" />,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CORPORATE_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = CORPORATE_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Corporate Solution | The Strategist" };

  return {
    title: `${service.title} | Corporate Solutions | The Strategist`,
    description: service.shortDescription,
    alternates: { canonical: `/corporate/${service.slug}` },
    openGraph: { title: `${service.title} — The Strategist`, description: service.shortDescription },
  };
}

export default async function CorporateDetailRoutePage({ params }: Props) {
  const { slug } = await params;
  const service = CORPORATE_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Solutions", url: "/solutions/corporate" },
          { name: "Corporate", url: "/solutions/corporate" },
          { name: service.title, url: `/corporate/${service.slug}` },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10">
          <Link
            href="/solutions/corporate"
            className="inline-flex items-center text-xs font-bold text-[#56666b] hover:text-[#18b8ad] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Corporate Solutions</span>
          </Link>

          <Reveal className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Corporate Solution Detail
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] font-extrabold tracking-tight leading-[1.08] mb-5">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#56666b] leading-relaxed max-w-3xl font-medium">
              {service.shortDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content Grid: Capabilities + Conversion Sidebar */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left 7 Columns: Key Capabilities & Deliverables */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#dce6ee] grid place-items-center shadow-xs">
                    {ICONS[service.icon] || <Zap className="h-6 w-6 text-[#18b8ad]" />}
                  </div>
                  <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#071820]">
                    Key Capabilities &amp; Outcomes
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {service.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-[#dce6ee] shadow-xs hover:shadow-md hover:border-[#18b8ad]/50 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#18b8ad] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-[#071820] font-semibold leading-relaxed">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Deliverables */}
              <div>
                <h3 className="font-sans text-xl font-bold text-[#071820] mb-5">
                  Core Implementation Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#dce6ee] text-xs font-bold text-[#071820] shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#18b8ad] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Consultation Sidebar Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-white rounded-3xl border border-[#dce6ee] p-8 sm:p-10 shadow-md border-l-4 border-l-[#18b8ad]">
                <div className="w-12 h-12 rounded-2xl bg-[#e7f6f4] border border-[#18b8ad]/30 grid place-items-center text-[#18b8ad] mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#071820] font-sans mb-3">
                  Smarter Systems. Zero Lag.
                </h3>
                <p className="text-sm text-[#56666b] leading-relaxed mb-6 font-medium">
                  Consult with The Strategist analytics engineers to audit your manual reporting workflows or architect an automated enterprise analytics pipeline tailored to your team.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Customized discovery session with senior analytics architects",
                    "Audit of existing data sources, files, and reporting bottlenecks",
                    "Targeted automation roadmap with fixed timelines and ROI milestones"
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#56666b] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18b8ad] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}#form`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071820] text-white py-4 px-6 text-sm font-bold shadow-md hover:bg-[#0d2f3a] transition-all"
                >
                  <span>Request Solution Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#18b8ad]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </Section>
    </>
  );
}
