import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore the full-stack, AI, and web projects built by Sandeep Yadav.",
};

const projects = [
  {
    id: "p6",
    name: "Croplet-Jhumkeshwari",
    description:
      "A full-stack web application that connects local sellers of handmade products with customers digitally — enabling discovery, browsing, and ordering of local handmade goods.",
    img: "/jhumkeshwari11 (1).png",
    website: "https://jhumkeshwari.netlify.app/",
    repo: "https://github.com/SandeeepKrish/Croplet-Jhumkeshwari",
    gradient: "from-pink-600 to-rose-600",
    tags: ["React", "Node.js", "MongoDB", "Netlify"],
  },
  {
    id: "p2",
    name: "Hospital Management System",
    description:
      "Full-stack hospital management system built to digitalize clinical workflows — covering patient records, appointments, staff management, and billing.",
    img: "/Hospital.png",
    website: "https://hmsfjmu.netlify.app/",
    repo: "https://github.com/SandeeepKrish/HMS-3.0",
    gradient: "from-blue-600 to-cyan-600",
    tags: ["React", "Express", "MongoDB", "Netlify"],
  },
  {
    id: "p7",
    name: "MediAgent-AI",
    description:
      "AI-powered Health Management System featuring a Next.js frontend and FastAPI backend with Agentic AI capabilities for intelligent symptom analysis and patient data management.",
    img: "/MediAgent (1).png",
    website: "https://github.com/SandeeepKrish/MediAgent-AI",
    repo: "https://github.com/SandeeepKrish/MediAgent-AI",
    gradient: "from-violet-600 to-purple-600",
    tags: ["Next.js", "FastAPI", "LangChain", "AI"],
  },
  {
    id: "p3",
    name: "E-Kart Shopping App",
    description:
      "E-commerce UI clone with product cart, category filters, and a modern, responsive UX designed to replicate real-world shopping experiences.",
    img: "/ekart (1).png",
    website: "https://ecartcommerce.netlify.app/",
    repo: "#",
    gradient: "from-orange-600 to-amber-600",
    tags: ["React", "CSS", "Netlify"],
  },
  {
    id: "p1",
    name: "Career Guidance App",
    description:
      "Career portal with personalised recommendations, role-based guidance, and a user-friendly interface to help students navigate career decisions.",
    img: "/career (1).png",
    website: "#",
    repo: "https://github.com/SandeeepKrish/carrerconnect",
    gradient: "from-emerald-600 to-teal-600",
    tags: ["React", "JavaScript", "GitHub Pages"],
  },
  {
    id: "p4",
    name: "NewsDuniya",
    description:
      "Live news dashboard that fetches and displays real-time news updates across categories using a public news API.",
    img: "/newsduniya (1).png",
    website: "#",
    repo: "https://github.com/SandeeepKrish/newsduniya",
    gradient: "from-sky-600 to-blue-600",
    tags: ["React", "News API", "JavaScript"],
  },
  {
    id: "p5",
    name: "Sticker Generator",
    description:
      "A fun web app to generate and instantly download custom funny stickers — built for quick, creative expression.",
    img: "/sticker (1).png",
    website: "https://stickermakerg.netlify.app/",
    repo: "https://github.com/SandeeepKrish/StickerMaker",
    gradient: "from-yellow-500 to-orange-500",
    tags: ["JavaScript", "Canvas API", "Netlify"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pb-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 text-violet-300 text-sm mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          My Work
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          A collection of projects I&apos;ve built — from AI systems to full-stack web apps
          and developer tools.
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <article
            key={project.id}
            id={`project-${project.id}`}
            className="group glass-card rounded-2xl border border-white/5 hover:border-white/12 transition-all duration-400 overflow-hidden hover:-translate-y-2 flex flex-col"
          >
            {/* Project image */}
            <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
              <Image
                src={project.img}
                alt={project.name}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              {/* Index badge */}
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-xs font-bold text-white">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} bg-opacity-10 text-white/70 border border-white/10`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {project.name}
              </h2>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex gap-3 mt-5">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  id={`project-${project.id}-github`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium glass-card border border-white/8 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Code
                </a>
                {project.website !== "#" && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    id={`project-${project.id}-live`}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${project.gradient} hover:opacity-90 transition-all`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-slate-500 mb-4">More projects on GitHub →</p>
        <a
          href="https://github.com/SandeeepKrish"
          target="_blank"
          rel="noreferrer"
          id="more-on-github"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 glass-card border border-white/10 hover:border-violet-500/30 hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View All on GitHub
        </a>
      </div>
    </div>
  );
}
