/**
 * GET    /api/posts/[id] — Get a single post by ID
 * PUT    /api/posts/[id] — Update a post (admin only)
 * DELETE /api/posts/[id] — Delete a post (admin only)
 */
import { NextResponse } from "next/server";
import { getPostById, updatePost, deletePost } from "@/lib/posts";
import { isAuthenticated } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: Params) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updatePost(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deletePost(id);
  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Post deleted" });
}
