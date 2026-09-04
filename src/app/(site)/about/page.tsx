import type { Metadata } from "next";
import { CheckCircle2, Workflow, Gauge, PieChart, Table, Zap, LineChart, Network, Cpu, Presentation, GraduationCap, ArrowRight, MapPin, Building, Users, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | The Strategist",
  description: "The Strategist is an analytics, automation, technology and learning organization focused on helping businesses and institutions make smarter decisions.",
};

const SPEC_ICONS: Record<string, React.ReactNode> = {
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Spreadsheet / Excel Consulting": <Table className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Business Intelligence": <LineChart className="h-6 w-6 text-[#18b8ad]" />,
  "Digital Transformation": <Network className="h-6 w-6 text-[#18b8ad]" />,
  "Enterprise Technology": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate Training": <Presentation className="h-6 w-6 text-[#18b8ad]" />,
  "Educational Technology Solutions": <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
};

const specializations = [
  { name: "Report Automation", desc: "Streamline manual reporting processes to save time and reduce errors." },
  { name: "Dashboard Development", desc: "Interactive dashboards that provide real-time visibility into business performance." },
  { name: "Data Visualization", desc: "Transform complex datasets into clear, actionable visual insights." },
  { name: "Spreadsheet / Excel Consulting", desc: "Advanced spreadsheet modeling and optimization for complex workflows." },
  { name: "Process Automation", desc: "Eliminate repetitive tasks by automating core business processes." },
  { name: "Business Intelligence", desc: "Comprehensive BI strategies to build a data-driven culture." },
  { name: "Digital Transformation", desc: "End-to-end modernization of legacy systems and operational workflows." },
  { name: "Enterprise Technology", desc: "Custom platforms and technology architecture for scalable growth." },
  { name: "Corporate Training", desc: "Capability building programs to upskill teams in analytics and automation." },
  { name: "Educational Technology Solutions", desc: "Systems and training to bridge the gap between academia and industry." },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      {/* SECTION 01: About / Page Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              About
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              About <span className="text-[#18b8ad]">The Strategist</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              The Strategist is an analytics, automation, technology and learning organization focused on helping businesses and institutions make smarter decisions, improve operations and build future-ready capabilities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 02: Company Introduction */}
      <Section className="bg-white py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight mb-6">
                Bridging the Gap Between Data and Actionable Strategy
              </h2>
              <div className="flex flex-col gap-6 text-base text-[#56666b] leading-relaxed">
                <p>
                  <strong className="text-[#071820]">Who We Are:</strong> We are a team of data specialists, automation engineers, and strategic consultants dedicated to simplifying complexity.
                </p>
                <p>
                  <strong className="text-[#071820]">What We Do:</strong> We design intelligent systems that eliminate operational bottlenecks, along with practical learning programs that empower professionals to maintain them.
                </p>
                <p>
                  <strong className="text-[#071820]">Who We Serve:</strong> From forward-thinking enterprises aiming to optimize their reporting workflows to educational institutions building industry-ready talent.
                </p>
                <p>
                  <strong className="text-[#071820]">How We Create Value:</strong> By integrating Business Intelligence, Data Analytics, and Digital Transformation, we turn raw data into strategic assets that drive real-world outcomes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#18b8ad]/20 to-[#071820]/5 rounded-3xl transform rotate-3 scale-105"></div>
                <div className="absolute inset-0 bg-[#F1F6FA] border border-[#dce6ee] rounded-3xl flex items-center justify-center p-8 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 w-full h-full">
                    <div className="bg-white rounded-2xl border border-[#dce6ee] flex items-center justify-center shadow-xs text-[#18b8ad]"><LineChart className="h-10 w-10" /></div>
                    <div className="bg-white rounded-2xl border border-[#dce6ee] flex items-center justify-center shadow-xs text-[#18b8ad]"><Zap className="h-10 w-10" /></div>
                    <div className="bg-white rounded-2xl border border-[#dce6ee] flex items-center justify-center shadow-xs text-[#18b8ad]"><Network className="h-10 w-10" /></div>
                    <div className="bg-white rounded-2xl border border-[#dce6ee] flex items-center justify-center shadow-xs text-[#18b8ad]"><Presentation className="h-10 w-10" /></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SECTION 03: Key Experience / Impact Metrics */}
      <section className="py-24 bg-[#071820] text-white border-y border-[#0d2f3a]">
        <div className="container-page">
          <RevealGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center divide-x divide-white/10">
            {[
              { label: "Years of Experience", value: "16+" },
              { label: "Client Organizations", value: "20+" },
              { label: "Projects Delivered", value: "500+" },
              { label: "Professionals Trained", value: "50k+" },
              { label: "Regions Served", value: "6+" },
            ].map((metric) => (
              <RevealItem key={metric.label}>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#18b8ad] font-sans">{metric.value}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#a1b4b9] uppercase tracking-wider">{metric.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SECTION 04: We Specialize In */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Expertise
            </span>
            <h2 className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl">
              We Specialize In
            </h2>
          </div>
          
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map((spec, i) => (
              <RevealItem key={spec.name}>
                <div className="group relative flex flex-col justify-between p-7 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-5 shadow-xs group-hover:scale-105 transition-all">
                      {SPEC_ICONS[spec.name] || <CheckCircle2 className="h-5 w-5 text-[#18b8ad]" />}
                    </div>
                    <h3 className="text-lg font-bold text-[#071820] leading-snug">{spec.name}</h3>
                    <p className="text-sm text-[#56666b] leading-relaxed mt-2.5">{spec.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#dce6ee]/60">
                    <span className="text-[10px] font-black text-[#8a979b] uppercase tracking-wider">
                      Area {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-7 w-7 rounded-full bg-[#F1F6FA] border border-[#dce6ee] group-hover:bg-[#18b8ad] group-hover:text-white transition-colors grid place-items-center shadow-xs">
                      <ArrowRight className="h-3.5 w-3.5 text-[#18b8ad] group-hover:text-white" />
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* SECTION 05: Our Impact */}
      <Section className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                  Our Impact
                </span>
                <h2 className="font-sans mt-3 text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
                  Driving Results Across Geographies and Sectors
                </h2>
                <p className="text-base text-[#56666b] leading-relaxed mt-4">
                  The Strategist actively works with businesses, enterprises, educational institutions, professionals, and students to create lasting systemic improvements and robust analytical foundations.
                </p>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7">
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                <RevealItem>
                  <div className="flex items-start gap-4 p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs">
                    <Building className="h-6 w-6 text-[#18b8ad] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#071820]">Enterprises & Corporates</h3>
                      <p className="text-sm text-[#56666b] mt-1.5 leading-relaxed">Modernizing legacy workflows and building resilient data architectures.</p>
                    </div>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="flex items-start gap-4 p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs">
                    <GraduationCap className="h-6 w-6 text-[#18b8ad] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#071820]">Educational Institutions</h3>
                      <p className="text-sm text-[#56666b] mt-1.5 leading-relaxed">Developing industry-aligned curricula and automated academic reporting.</p>
                    </div>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="flex items-start gap-4 p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs">
                    <Briefcase className="h-6 w-6 text-[#18b8ad] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#071820]">Professionals</h3>
                      <p className="text-sm text-[#56666b] mt-1.5 leading-relaxed">Upskilling workforces with practical automation and BI capabilities.</p>
                    </div>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="flex items-start gap-4 p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs">
                    <MapPin className="h-6 w-6 text-[#18b8ad] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#071820]">Global Reach</h3>
                      <p className="text-sm text-[#56666b] mt-1.5 leading-relaxed">Delivering solutions across India, UAE, Oman, USA, and Europe.</p>
                    </div>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 06: Our Vision (& Mission) */}
      <section className="relative overflow-hidden py-24 bg-[#071820] text-center border-b border-[#0d2f3a]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container-page relative z-10">
          <Reveal className="max-w-4xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-4 bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-sm">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Our Vision
              </span>
              <p className="font-sans text-2xl sm:text-4xl text-white font-extrabold leading-tight tracking-tight">
                "To help organizations become smarter, more efficient and future-ready through analytics, automation, technology and practical learning."
              </p>
            </div>
            
            <div className="flex flex-col gap-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a1b4b9]">
                Our Mission
              </span>
              <p className="text-sm sm:text-base text-[#97aba2] leading-relaxed">
                To transform complex business and institutional challenges into practical, technology-driven solutions that improve decision-making, operational efficiency and long-term growth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 07: Final CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Let's Build Smarter Systems Together
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#2d524f] leading-relaxed">
              Whether you are a business looking to improve analytics, automate operations and modernize your technology, or an institution seeking practical and industry-ready learning solutions, The Strategist is ready to support your transformation journey.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              Contact Our Team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions/corporate"
              className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad] bg-white/50 text-[#071820] hover:bg-white transition-all font-bold shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              View Solutions
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
