import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for published posts (SSG)
export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  // Convert simple markdown-like content to HTML
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        if (line.startsWith("# ")) return `<h1>${line.slice(2)}</h1>`;
        if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
        if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
        if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
        if (line.startsWith("```")) return line.startsWith("```\n") ? "<pre><code>" : "</code></pre>";
        if (line.trim() === "") return "<br/>";
        return `<p>${line}</p>`;
      })
      .join("\n");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 pb-24">
      {/* Back link */}
      <Link
        href="/blog"
        id="back-to-blog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10 animated-underline"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </Link>

      {/* Post header */}
      <header className="mb-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 text-glow">
          {post.title}
        </h1>

        <p className="text-xl text-slate-400 leading-relaxed mb-8">{post.excerpt}</p>

        {/* Author & date */}
        <div className="flex items-center gap-4 pb-8 border-b border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold text-white">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{post.author}</p>
            <p className="text-xs text-slate-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Article content */}
      <article
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
      />

      {/* Bottom nav */}
      <div className="mt-16 pt-8 border-t border-white/5">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 glass-card border border-white/10 hover:border-violet-500/30 hover:text-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All Posts
        </Link>
      </div>
    </div>
  );
}
