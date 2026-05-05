"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/posts";
import PostForm from "./PostForm";

interface Props {
  initialPosts: BlogPost[];
}

export default function AdminDashboard({ initialPosts }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const refreshPosts = useCallback(async () => {
    const res = await fetch("/api/posts?admin=true");
    if (res.ok) {
      const data = (await res.json()) as BlogPost[];
      setPosts(data);
    }
  }, []);

  // ── Logout ──────────────────────────────────────────────────────────
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  // ── Delete ───────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    setLoading(true);
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      setPosts((p) => p.filter((post) => post.id !== id));
      setDeleteConfirm(null);
      showToast("Post deleted successfully.");
    } else {
      showToast("Failed to delete post.", "error");
    }
  }

  // ── Toggle status ─────────────────────────────────────────────────────
  async function handleToggleStatus(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      await refreshPosts();
      showToast(`Post marked as ${newStatus}.`);
    } else {
      showToast("Failed to update status.", "error");
    }
  }

  // ── Save (create or update) ───────────────────────────────────────────
  async function handleSave(data: Partial<BlogPost>) {
    // Capture editingPost in a local const so TypeScript can narrow the type correctly
    const currentPost = editingPost;
    const isEdit = view === "edit" && currentPost !== null;
    const url = isEdit ? `/api/posts/${currentPost!.id}` : "/api/posts";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      await refreshPosts();
      setView("list");
      setEditingPost(null);
      showToast(isEdit ? "Post updated!" : "Post created!");
    } else {
      const err = (await res.json()) as { error?: string };
      showToast(err.error ?? "Save failed.", "error");
    }
  }

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="min-h-screen">
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-[#070709]/90">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <span className="font-semibold text-white">Admin Portal</span>
          </div>
          <div className="flex items-center gap-3">
            {view !== "list" && (
              <button
                id="admin-back"
                onClick={() => { setView("list"); setEditingPost(null); }}
                className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white glass-card border border-white/8 transition-all"
              >
                ← Back
              </button>
            )}
            <button
              id="admin-logout"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 glass-card border border-white/8 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Toast ────────────────────────────────────────────────────── */}
        {toast && (
          <div
            id="admin-toast"
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl border transition-all duration-300 ${
              toast.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-300"
                : "bg-red-500/15 border-red-500/25 text-red-300"
            }`}
          >
            {toast.msg}
          </div>
        )}

        {view === "list" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Posts", value: posts.length, color: "from-violet-600 to-blue-600" },
                { label: "Published", value: publishedCount, color: "from-emerald-600 to-teal-600" },
                { label: "Drafts", value: draftCount, color: "from-amber-600 to-orange-600" },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass-card rounded-xl border border-white/5 p-5">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                    {value}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
              <button
                id="admin-new-post"
                onClick={() => setView("create")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-violet-500/25"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </button>
            </div>

            {/* Posts table */}
            {posts.length === 0 ? (
              <div className="text-center py-20 glass-card rounded-2xl border border-white/5">
                <div className="text-5xl mb-4">📝</div>
                <p className="text-slate-400">No blog posts yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    id={`post-row-${post.id}`}
                    className="glass-card rounded-xl border border-white/5 hover:border-white/10 p-5 transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              post.status === "published"
                                ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-300"
                                : "bg-amber-500/15 border border-amber-500/25 text-amber-300"
                            }`}
                          >
                            {post.status}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white truncate">{post.title}</h3>
                        <p className="text-sm text-slate-500 truncate mt-0.5">{post.excerpt}</p>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {post.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-violet-500/10 border border-violet-500/15 text-violet-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Toggle status */}
                        <button
                          id={`toggle-${post.id}`}
                          onClick={() => handleToggleStatus(post)}
                          title={post.status === "published" ? "Set to Draft" : "Publish"}
                          className="p-2 rounded-lg glass-card border border-white/8 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/25 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button
                          id={`edit-${post.id}`}
                          onClick={() => { setEditingPost(post); setView("edit"); }}
                          className="p-2 rounded-lg glass-card border border-white/8 text-slate-400 hover:text-violet-400 hover:border-violet-500/25 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {/* Delete */}
                        {deleteConfirm === post.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-400">Sure?</span>
                            <button
                              id={`delete-confirm-${post.id}`}
                              onClick={() => handleDelete(post.id)}
                              disabled={loading}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1 rounded-lg text-xs font-medium glass-card border border-white/8 text-slate-400 hover:text-white transition-all"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            id={`delete-${post.id}`}
                            onClick={() => setDeleteConfirm(post.id)}
                            className="p-2 rounded-lg glass-card border border-white/8 text-slate-400 hover:text-red-400 hover:border-red-500/25 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {(view === "create" || view === "edit") && (
          <PostForm
            post={editingPost}
            onSave={handleSave}
            onCancel={() => { setView("list"); setEditingPost(null); }}
          />
        )}
      </div>
    </div>
  );
}
