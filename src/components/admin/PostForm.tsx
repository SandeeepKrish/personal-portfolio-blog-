"use client";

import { useState, FormEvent } from "react";
import type { BlogPost } from "@/lib/posts";

interface Props {
  post: BlogPost | null;
  onSave: (data: Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
}

export default function PostForm({ post, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState<"published" | "draft">(post?.status ?? "draft");
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  function generateSlug(val: string) {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!post) setSlug(generateSlug(val)); // Only auto-generate for new posts
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      title,
      slug,
      excerpt,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      status,
      author: "Sandeep Yadav",
      coverImage: post?.coverImage ?? "/blog-placeholder.jpg",
    });
    setSaving(false);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-200 text-sm";

  const labelClass = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          {post ? "Edit Post" : "New Blog Post"}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {post ? "Update the details below and save." : "Fill in the details to create a new post."}
        </p>
      </div>

      <form onSubmit={handleSubmit} id="post-form" className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="post-title" className={labelClass}>Title *</label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="My Awesome Blog Post"
            required
            className={inputClass}
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="post-slug" className={labelClass}>
            Slug *
            <span className="ml-2 text-xs text-slate-500">(URL-friendly identifier)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm">/blog/</span>
            <input
              id="post-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-awesome-blog-post"
              required
              className={`${inputClass} flex-1`}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="post-excerpt" className={labelClass}>Excerpt</label>
          <textarea
            id="post-excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary of the post (shown in blog listing)..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="post-content" className={labelClass}>
            Content *
            <span className="ml-2 text-xs text-slate-500">(Markdown supported)</span>
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Your Post Title&#10;&#10;Write your content here using Markdown..."
            rows={16}
            required
            className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="post-tags" className={labelClass}>
            Tags
            <span className="ml-2 text-xs text-slate-500">(comma-separated)</span>
          </label>
          <input
            id="post-tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, TypeScript, Tutorial"
            className={inputClass}
          />
        </div>

        {/* Status */}
        <div>
          <label className={labelClass}>Status</label>
          <div className="flex gap-3" id="post-status-group">
            {(["draft", "published"] as const).map((s) => (
              <button
                key={s}
                type="button"
                id={`status-${s}`}
                onClick={() => setStatus(s)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  status === s
                    ? s === "published"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                    : "glass-card border-white/8 text-slate-400 hover:text-white"
                }`}
              >
                {s === "published" ? "✓ Published" : "Draft"}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <button
            type="button"
            id="post-cancel"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-300 glass-card border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            id="post-save"
            type="submit"
            disabled={saving}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 transition-all shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : post ? (
              "Save Changes"
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
