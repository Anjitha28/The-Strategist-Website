import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Award, GraduationCap, BookOpen, BarChart3, ArrowRight, School } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const dynamic = "force-dynamic";

export const EDUCATION_SERVICES = [
  {
    slug: "training-programs",
    title: "Training Programs",
    icon: "GraduationCap",
    shortDescription: "Practical institutional training programs in Advanced Excel, Power BI, Data Analytics, Financial Modeling, and Business Intelligence.",
    details: [
      "Hands-on analytics labs where students solve structured business cases using real corporate datasets.",
      "Comprehensive project assignments covering live KPI dashboard layout, data wrangling, and DAX calculations.",
      "Direct mentorship and instruction by senior industry specialists with 12+ years of field exposure.",
      "Placement-focused job readiness programs designed for immediate entry-level corporate analytical competence."
    ],
    deliverables: [
      "Campus Lab Modules & Workbooks",
      "Real-World Corporate Datasets",
      "Continuous Practical Evaluation",
      "Placement-Oriented Portfolio Projects"
    ]
  },
  {
    slug: "certification-programs",
    title: "Certification Programs",
    icon: "Award",
    shortDescription: "Industry-recognized credentials and certifications focused on practical technical employability and verified analytical mastery.",
    details: [
      "Deliver verified digital credentials validating Advanced Excel, Power BI, and Data Engineering capabilities.",
      "Significantly boost college placement ratios by demonstrating proven, project-validated analytics skills.",
      "Structured tiered curriculum pathways with milestone capstone reviews and rigorous assessment standards.",
      "Direct industry validation via practical automated testing engines and simulation scorecards."
    ],
    deliverables: [
      "Verifiable Digital Certificate Credentials",
      "Graded Capstone Projects",
      "Granular Skill Performance Scorecards",
      "Corporate Recruitment Benchmark Alignment"
    ]
  },
  {
    slug: "curriculum-development",
    title: "Curriculum Development",
    icon: "BookOpen",
    shortDescription: "Modern, analytics-driven academic curriculum aligned with evolving industry hiring expectations and corporate software suites.",
    details: [
      "Collaborate directly with institutional boards of studies to integrate credit-based practical data analytics courses.",
      "Align syllabus modules with the exact tools and technologies currently utilized by hiring global enterprises.",
      "Provide comprehensive faculty training guides, slide decks, practical exercise workbooks, and rubric manuals.",
      "Ongoing curriculum auditing and updates to incorporate emerging AI, business intelligence, and cloud tooling."
    ],
    deliverables: [
      "Credit-Aligned Academic Syllabus",
      "Faculty Instruction Manuals & Labs",
      "Standardized Grading & Rubric Frameworks",
      "Annual Industry Relevance Curriculum Audit"
    ]
  },
  {
    slug: "academic-analytics-solutions",
    title: "Academic Analytics Solutions",
    icon: "BarChart3",
    shortDescription: "Institutional software platforms and automated reporting architectures for accreditation compliance, evaluations, and progress tracking.",
    details: [
      "Integrate unified reporting dashboards to consolidate student progress cards, attendance records, and internal marks.",
      "Monitor cohort enrollment trends, faculty evaluations, and historical examination performance distributions.",
      "Streamline accreditation cycles (NAAC, NBA, NIRF) with automated one-click compliance exports and audit logs.",
      "Track department-wise alumni career progression and placement trajectories with automated telemetry."
    ],
    deliverables: [
      "Institutional Compliance Dashboards",
      "Automated Accreditation Export Engines",
      "Student Performance & Attendance Portals",
      "Departmental Outcome Analytics"
    ]
  }
];

const ICONS: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-7 w-7 text-[#18b8ad]" />,
  Award: <Award className="h-7 w-7 text-[#18b8ad]" />,
  BookOpen: <BookOpen className="h-7 w-7 text-[#18b8ad]" />,
  BarChart3: <BarChart3 className="h-7 w-7 text-[#18b8ad]" />,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return EDUCATION_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = EDUCATION_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Educational Solution | The Strategist" };

  return {
    title: `${service.title} | Educational Solutions | The Strategist`,
    description: service.shortDescription,
    alternates: { canonical: `/education/${service.slug}` },
    openGraph: { title: `${service.title} — The Strategist`, description: service.shortDescription },
  };
}

export default async function EducationalDetailRoutePage({ params }: Props) {
  const { slug } = await params;
  const service = EDUCATION_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Solutions", url: "/solutions/educational" },
          { name: "Educational", url: "/solutions/educational" },
          { name: service.title, url: `/education/${service.slug}` },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10">
          <Link
            href="/solutions/educational"
            className="inline-flex items-center text-xs font-bold text-[#56666b] hover:text-[#18b8ad] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Educational Solutions</span>
          </Link>

          <Reveal className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Academic Solution Detail
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
                    {ICONS[service.icon] || <GraduationCap className="h-6 w-6 text-[#18b8ad]" />}
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
                  Academic Framework Deliverables
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

            {/* Right 5 Columns: Institutional Partnership Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative overflow-hidden bg-white rounded-3xl border border-[#dce6ee] p-8 sm:p-10 shadow-md border-l-4 border-l-[#18b8ad]">
                <div className="w-12 h-12 rounded-2xl bg-[#e7f6f4] border border-[#18b8ad]/30 grid place-items-center text-[#18b8ad] mb-6">
                  <School className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#071820] font-sans mb-3">
                  Partner With The Strategist
                </h3>
                <p className="text-sm text-[#56666b] leading-relaxed mb-6 font-medium">
                  Collaborate with our educational team to bring industry-grade analytics labs, accreditation support, and placement certification programs directly to your campus.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Practical, industry-aligned analytics labs for students",
                    "College credit course integrations & board-of-studies advisory",
                    "Continuous practical evaluation, LMS, and testing engine support"
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-[#56666b] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18b8ad] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent("Educational Solutions - " + service.title)}#form`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#071820] text-white py-4 px-6 text-sm font-bold shadow-md hover:bg-[#0d2f3a] transition-all"
                >
                  <span>Request Institutional Proposal</span>
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
