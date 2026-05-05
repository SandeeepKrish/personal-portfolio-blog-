import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Portfolio admin panel — manage blog posts.",
  robots: { index: false, follow: false }, // Keep admin out of search engines
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070709]">
      {children}
    </div>
  );
}
