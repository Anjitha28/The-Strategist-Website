import type { Metadata } from "next";
import Link from "next/link";
import { Laptop, Clock, ArrowRight, CheckCircle2, ArrowLeft, BookOpen, Layers, Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Online Courses | The Strategist",
  description: "Self-paced video curricula. Code spreadsheets, build telemetry dashboards, and consolidate financial pipelines.",
};

export default function OnlineCoursesPage() {
  const courses = SITE_CONFIG.training.courses;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Training", url: "/training" },
          { name: "Online Courses", url: "/training/online-courses" },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10">
          <Link
            href="/training"
            className="inline-flex items-center text-xs font-bold text-[#56666b] hover:text-[#18b8ad] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Training Hub</span>
          </Link>

          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95] mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Syllabus Catalog
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] font-extrabold tracking-tight leading-[1.08] mb-5">
              Online <span className="text-[#18b8ad]">Courses</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#56666b] leading-relaxed max-w-2xl font-medium">
              Self-paced video curricula. Code spreadsheets, build telemetry dashboards, and consolidate financial pipelines.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Courses Catalog Grid */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <RevealItem key={course.slug || idx} className="h-full">
                <div className="flex flex-col justify-between p-8 bg-white border border-[#dce6ee] rounded-3xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full group">
                  <div>
                    {/* Header badge & icon */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#e7f6f4] border border-[#18b8ad]/20 grid place-items-center text-[#18b8ad] shadow-xs group-hover:scale-105 transition-transform">
                        <Laptop className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#dce6ee] text-[11px] font-bold text-[#56666b]">
                        <Clock className="w-3.5 h-3.5 text-[#18b8ad]" />
                        {course.duration}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#071820] leading-snug mb-3 group-hover:text-[#18b8ad] transition-colors">
                      {course.title}
                    </h2>

                    <p className="text-sm text-[#56666b] leading-relaxed mb-6">
                      {course.overview}
                    </p>

                    {/* Tools Covered */}
                    {course.toolsCovered && course.toolsCovered.length > 0 && (
                      <div className="mb-6">
                        <div className="text-[11px] font-black uppercase tracking-wider text-[#8a979b] mb-2.5">
                          Tools Covered
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {course.toolsCovered.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 rounded-lg bg-[#f8fafc] border border-[#dce6ee] text-xs font-bold text-[#071820]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Highlights */}
                    {course.learningObjectives && course.learningObjectives.length > 0 && (
                      <div className="space-y-2 mb-8 pt-4 border-t border-[#dce6ee]/70">
                        {course.learningObjectives.slice(0, 3).map((obj, oIdx) => (
                          <div key={oIdx} className="flex items-start gap-2 text-xs text-[#56666b] font-medium leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#18b8ad] shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-[#dce6ee] flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/training/${course.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full font-bold bg-[#071820] text-white py-3.5 px-5 text-xs shadow-xs hover:bg-[#0d2f3a] transition-all"
                    >
                      <span>View Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#18b8ad]" />
                    </Link>
                    <Link
                      href={`/contact?service=${encodeURIComponent("Course Inquiry: " + course.title)}#form`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full font-bold border border-[#dce6ee] bg-[#F1F6FA] text-[#071820] py-3.5 px-5 text-xs hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
                    >
                      <span>Inquire Now</span>
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Looking for Customized Team Training?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#2d524f] leading-relaxed font-bold max-w-2xl mx-auto">
              We engineer tailored training cohorts for corporate departments and college campuses with live projects and verified assessments.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-4">
            <Link
              href="/contact?service=Training#form"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-8 py-4 text-sm"
            >
              Contact a Training Advisor <ArrowRight className="h-4 w-4 text-[#18b8ad]" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
