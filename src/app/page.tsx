import Image from "next/image";
import Link from "next/link";

// ── Skill badges ─────────────────────────────────────────────────────────────
const skills = [
  { name: "TypeScript", color: "from-blue-500 to-blue-600" },
  { name: "React / Next.js", color: "from-cyan-500 to-blue-500" },
  { name: "Node.js", color: "from-green-500 to-emerald-600" },
  { name: "Python", color: "from-yellow-400 to-orange-500" },
  { name: "FastAPI", color: "from-teal-500 to-cyan-600" },
  { name: "LangChain / AI", color: "from-purple-500 to-violet-600" },
  { name: "PostgreSQL/MySQL", color: "from-blue-400 to-indigo-500" },
  { name: "MongoDB", color: "from-green-400 to-green-600" },
  { name: "AWS/S3/Lambda", color: "from-orange-400 to-amber-500" },
  { name: "Docker", color: "from-sky-400 to-blue-500" },
  { name: "Tailwind CSS", color: "from-cyan-400 to-teal-500" },
  { name: "Git / GitHub", color: "from-slate-400 to-slate-600" },
];

// ── Social links ──────────────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/SandeeepKrish",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sandeep-yadav",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:yadavsandeep0718@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-16 py-20"
      >
        {/* Text block */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 text-violet-300 text-sm mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-glow">
            Hi, I&apos;m <span className="gradient-text">Sandeep Yadav</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 font-medium">
            Full-Stack Developer &amp; AI Engineer
          </p>

          <p className="text-slate-400 leading-relaxed max-w-xl text-base md:text-lg">
            Full-Stack Developer with 1.5 years of hands-on experience building and shipping
            production web applications at 25 Technoarts. I specialize in designing RESTful APIs
            with Node.js and Express, managing data with MongoDB and MySQL, and deploying scalable
            solutions through cPanel. Beyond the core stack, I&apos;ve expanded into AI-powered
            development building intelligent applications using FastAPI and LangChain that bridge
            the gap between traditional web platforms and modern LLM capabilities. I&apos;m driven
            by a simple goal: turning complex technical problems into seamless, impactful user
            experiences.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <Link
              href="/projects"
              id="hero-view-projects"
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              id="hero-read-blog"
              className="px-6 py-3 rounded-xl font-semibold text-slate-300 glass-card border border-white/10 hover:border-violet-500/30 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Read Blog
            </Link>
          </div>

          {/* Social links */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                id={`social-${label.toLowerCase()}`}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                className="p-2.5 rounded-lg glass-card border border-white/8 text-slate-400 hover:text-white hover:border-violet-500/30 transition-all duration-200 hover:-translate-y-0.5"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="relative flex-shrink-0">
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-400 animate-spin-slow blur-sm opacity-60" />
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#0a0a0f] animate-float">
            <Image
              src="/1759405210518.jpg"
              alt="Sandeep Yadav — Full-Stack Developer"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Skills Section ────────────────────────────────────────────── */}
      <section id="skills" className="py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-slate-400">Technologies I work with day-to-day</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map(({ name, color }) => (
            <div
              key={name}
              className="group relative glass-card rounded-xl p-4 border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${color}`} />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="glass-card rounded-2xl border border-violet-500/15 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-blue-600/5 to-emerald-600/5 animate-gradient" />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3">
              Let&apos;s <span className="gradient-text">Work Together</span>
            </h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Open to freelance projects, full-time roles, and exciting collaborations.
            </p>
            <a
              href="mailto:yadavsandeep0718@gmail.com"
              id="cta-contact-email"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
