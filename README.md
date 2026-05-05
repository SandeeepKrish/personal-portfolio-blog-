# Sandeep Yadav — Personal Portfolio & Blog

A full-stack personal portfolio website with a blog management system built with **Next.js 14 (App Router)** and **Tailwind CSS**.

## 🌐 Live Site

> https://sandeep-portfolio-fawn.vercel.app/

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSG for blog, API routes for CRUD |
| **Styling** | Tailwind CSS | Fast, clean, utility-first UI |
| **Database** | JSON file (`posts.json`) | No DB setup needed for this level |
| **Auth** | Hardcoded credentials + JWT cookie (via `jose`) | As the assignment suggests |
| **Language** | TypeScript | Type safety throughout |
| **Deployment** | Vercel | Required by assignment |

## ✨ Features

### Public Pages
- **Home** — Name, profile photo, bio, skills grid with hover effects
- **Projects** — 3 featured projects with tech stack, highlights, and links
- **Blog** — Published posts with tag filtering
- **Blog Post** — Full post with markdown rendering and styled prose

### Admin Portal (`/admin`)
- **Login** — Hardcoded credentials (`admin` / `admin123`) + JWT cookie
- **Dashboard** — Stats (total, published, drafts), post list
- **Create Post** — Rich form with auto-slug generation, markdown editor
- **Edit Post** — Pre-filled form with live updates
- **Delete Post** — Confirmation dialog before deletion
- **Toggle Status** — One-click publish/draft toggle

## 🤖 AI Tools Used

| Tool | How It Was Used | Contribution |
|---|---|---|
| **Antigravity (Google DeepMind)** | Generated all pages, components, API routes, auth middleware, data layer, CSS animations, and README | ~80% of code |
| **Manual coding** | Custom persona content (bio, projects, skills), fine-tuning designs, testing flow | ~20% of code |

### Was the AI-generated code understood?
Yes — every file generated was reviewed and the purpose of each section is clear:
- The **JWT middleware** guards admin routes using `jose` for edge-compatible signing
- The **JSON file** acts as the database with read/write helpers in `src/lib/posts.ts`
- **Server Components** handle auth checks, while **Client Components** manage interactive UI
- **API routes** follow RESTful conventions: `GET /api/posts`, `POST /api/posts`, `PUT/DELETE /api/posts/[id]`

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/SandeeepKrish/personal-portfolio.git
cd personal-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

**Admin credentials:**
- Username: `admin`
- Password: `admin123`

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── projects/page.tsx     # Projects page
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Individual blog post
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard (protected)
│   │   └── login/page.tsx    # Login page
│   └── api/
│       ├── auth/login/       # POST — login
│       ├── auth/logout/      # POST — logout
│       └── posts/            # GET, POST, PUT, DELETE
├── components/
│   ├── Navbar.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       └── PostForm.tsx
├── lib/
│   ├── posts.ts              # Blog CRUD utilities
│   ├── auth.ts               # JWT helpers
│   └── data/posts.json       # Blog "database"
└── proxy.ts                  # Protects /admin/* routes (Next.js 16)
```

## 📦 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

> **Note:** The JSON file database works on Vercel's serverless functions but data will reset on each deployment. For persistence, migrate to a database like PlanetScale, Supabase, or MongoDB Atlas.
