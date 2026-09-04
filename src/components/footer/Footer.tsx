import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#071820] text-[#F1F6FA] py-12">
      <div className="container-page grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Tagline */}
        <div>
          <Image src="/logo.svg" alt="The Strategist" width={120} height={40} />
          <p className="mt-4 text-sm">Empowering Businesses and Institutions Through Analytics, Automation &amp; Practical Learning.</p>
          <p className="mt-2 text-xs">
            The Strategist is an analytics, automation, technology, and training organization focused on delivering business‑focused technology solutions and industry‑oriented learning systems.
          </p>
        </div>
        {/* Locations */}
        <div>
          <h3 className="font-bold mb-2">Locations</h3>
          <ul className="space-y-1 text-sm">
            <li>Kerala</li>
            <li>India</li>
            <li>UAE</li>
            <li>Oman</li>
            <li>USA</li>
            <li>Europe</li>
          </ul>
        </div>
        {/* Corporate Solutions */}
        <div>
          <h3 className="font-bold mb-2">Corporate Solutions</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/solutions/report-automation" className="hover:underline">Report Automation</Link></li>
            <li><Link href="/solutions/dashboard-development" className="hover:underline">Dashboard Development</Link></li>
            <li><Link href="/solutions/data-visualization" className="hover:underline">Data Visualization</Link></li>
            <li><Link href="/solutions/process-automation" className="hover:underline">Process Automation</Link></li>
            <li><Link href="/solutions/corporate-training" className="hover:underline">Corporate Training</Link></li>
          </ul>
        </div>
        {/* Educational Solutions */}
        <div>
          <h3 className="font-bold mb-2">Educational Solutions</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/solutions/certification-programs" className="hover:underline">Certification Programs</Link></li>
            <li><Link href="/solutions/curriculum-development" className="hover:underline">Curriculum Development</Link></li>
            <li><Link href="/solutions/grade-scope" className="hover:underline">Grade Scope</Link></li>
            <li><Link href="/solutions/protrix" className="hover:underline">Protrix</Link></li>
            <li><Link href="/solutions/skill-development" className="hover:underline">Skill Development Programs</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p className="text-sm">
            <a href="mailto:info@thestrategist.co.in" className="underline hover:text-[#18b8ad]">info@thestrategist.co.in</a>
          </p>
        </div>
      </div>
      <div className="mt-8 border-t border-[#18b8ad]/20 pt-4 text-center text-xs">
        © 2026 The Strategist. All Rights Reserved.
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-conditions" className="hover:underline">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
