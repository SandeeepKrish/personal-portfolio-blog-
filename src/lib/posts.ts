/**
 * posts.ts — Blog post data access layer
 * Uses a JSON file as the database (no DB setup required for this level)
 */
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}

// Resolve path to our JSON "database"
const DB_PATH = path.join(process.cwd(), "data", "posts.json");

/** Read all posts from the JSON file */
export function getAllPosts(): BlogPost[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

/** Save all posts back to the JSON file */
function savePosts(posts: BlogPost[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

/** Get only published posts */
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.status === "published");
}

/** Get a single post by its URL slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Get a single post by its ID */
export function getPostById(id: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.id === id);
}

/** Create a new blog post */
export function createPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
): BlogPost {
  const posts = getAllPosts();
  const now = new Date().toISOString();
  const newPost: BlogPost = {
    ...data,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(newPost);
  savePosts(posts);
  return newPost;
}

/** Update an existing blog post by ID */
export function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "id" | "createdAt">>
): BlogPost | null {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
  savePosts(posts);
  return posts[index];
}

/** Delete a blog post by ID */
export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  savePosts(filtered);
  return true;
}
