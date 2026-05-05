/**
 * GET  /api/posts        — List posts (admin: all, public: published only)
 * POST /api/posts        — Create a new post (admin only)
 */
import { NextResponse } from "next/server";
import { getAllPosts, getPublishedPosts, createPost } from "@/lib/posts";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin") === "true";

  // Admin view requires authentication
  if (admin) {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(getAllPosts());
  }

  // Public view — only published posts
  return NextResponse.json(getPublishedPosts());
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, author, tags, status } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "title, slug and content are required" },
        { status: 400 }
      );
    }

    const post = createPost({
      title,
      slug,
      excerpt: excerpt ?? "",
      content,
      coverImage: coverImage ?? "/blog-placeholder.jpg",
      author: author ?? "Sandeep Yadav",
      tags: tags ?? [],
      status: status ?? "draft",
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
