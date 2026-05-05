import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on full-stack development, AI, DevOps, and modern web technologies by Sandeep Yadav.",
};

// Force dynamic rendering so new posts appear without rebuild
export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 pb-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 text-violet-300 text-sm mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Writing &amp; Thoughts
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Deep dives into full-stack development, AI engineering, cloud architecture, and lessons
          learned from real-world projects.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-slate-300 mb-2">No posts yet</h2>
          <p className="text-slate-500">Check back soon for articles and tutorials.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              id={`blog-post-${post.id}`}
              className="group block glass-card rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className="h-1 bg-gradient-to-r from-violet-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="p-6 space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white leading-snug group-hover:text-violet-300 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-500">{post.author}</span>
                  </div>
                  <time className="text-xs text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
