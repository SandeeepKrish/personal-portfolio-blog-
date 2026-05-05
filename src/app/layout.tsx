import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Sandeep Yadav — Full-Stack Developer",
    template: "%s | Sandeep Yadav",
  },
  description:
    "Full-Stack Developer specializing in React, Next.js, Node.js, and AI integrations. Explore my portfolio, projects, and blog.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Sandeep Yadav" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sandeep Yadav Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0f] text-slate-100 min-h-screen antialiased">
        {/* Ambient background blobs — fixed + clipped so they never create scroll */}
        <div
          className="pointer-events-none"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -10,
            overflow: "hidden",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-600/8 blur-[120px]" />
        </div>

        <Navbar />
        <main>{children}</main>

        <footer className="border-t border-white/5 py-10 mt-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Sandeep Yadav. Built with{" "}
              <span className="gradient-text font-medium">Next.js 14</span> &amp;{" "}
              <span className="gradient-text font-medium">Tailwind CSS</span>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
