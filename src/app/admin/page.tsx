import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  // Load all posts (including drafts) server-side for the initial render
  const initialPosts = getAllPosts();

  return <AdminDashboard initialPosts={initialPosts} />;
}
