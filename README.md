# Zuno Clothing — Minimalist Fashion Blog & CMS Engine

A modern, high-performance custom CMS and Blog Engine built for **[zunoclothing.com](https://zunoclothing.com)** (fashion, apparel, and lifestyle publication). Architected specifically to meet **Google AdSense approval standards** with **100/100 Core Web Vitals**, zero cumulative layout shift (CLS), structured data, and an intuitive Admin Panel.

---

## 1. Tech Stack & Architecture

- **Framework:** Next.js (App Router, Turbopack, React 19, TypeScript)
- **Styling:** Tailwind CSS (Modern, high-contrast, black & white minimalist fashion aesthetic)
- **Database & ORM:** Prisma ORM with PostgreSQL (Neon)
- **Authentication:** Secure HTTP-only JWT sessions (`jose` + `bcryptjs`) with Next.js Middleware route protection
- **Rich Text Editor:** TipTap (Headless, headings H2/H3, bold, italic, underline, lists, blockquotes, horizontal dividers, links, and inline images with alt-text)
- **SEO & Structured Data:** JSON-LD `Article` & `BreadcrumbList` schemas, dynamic OpenGraph & Twitter Cards, auto-generating `sitemap.xml`, and `robots.txt`

---

## 2. Project Structure

```
├── app/
│   ├── (public)/                 # Public blog routes
│   │   ├── page.tsx              # Homepage (split hero, trending, paginated feed, sidebar)
│   │   ├── guide/[slug]/page.tsx # Single article (reading time, share, JSON-LD)
│   │   ├── category/[slug]/page.tsx # Category archive with pagination
│   │   ├── about/page.tsx        # Company & editorial mission
│   │   ├── contact/page.tsx      # Contact form & direct email
│   │   ├── privacy-policy/page.tsx # GDPR & Google AdSense compliant privacy policy
│   │   ├── terms/page.tsx        # Terms of service
│   │   ├── disclaimer/page.tsx   # FTC affiliate & advertising disclosures
│   │   └── layout.tsx            # Public layout (Header/Navbar + Footer)
│   ├── admin/                    # Password-protected Admin Panel
│   │   ├── login/page.tsx        # Minimalist Admin Login
│   │   ├── posts/
│   │   │   ├── page.tsx          # Post management table (search, filter, delete modal)
│   │   │   ├── new/page.tsx      # Create new article
│   │   │   └── [id]/edit/page.tsx # Edit existing article
│   │   ├── categories/page.tsx   # Category CRUD manager (add, rename, delete)
│   │   ├── layout.tsx            # Admin sidebar navigation layout
│   │   └── page.tsx              # Admin dashboard with live stats & recent articles
│   ├── api/                      # RESTful API Route Handlers
│   │   ├── auth/login/route.ts   # Session login
│   │   ├── auth/logout/route.ts  # Session logout
│   │   ├── auth/me/route.ts      # Active session check
│   │   ├── posts/route.ts        # List & create articles
│   │   ├── posts/[id]/route.ts   # Update, delete article
│   │   ├── categories/route.ts   # List & create categories
│   │   ├── categories/[id]/route.ts # Update & delete category
│   │   ├── stats/route.ts        # Dashboard statistics
│   │   └── upload/route.ts       # Local file upload handler
│   ├── sitemap.ts                # Dynamic sitemap (posts + categories + legal pages)
│   ├── robots.ts                 # Robots.txt (allows search engines, protects /admin)
│   ├── layout.tsx                # Root layout with Geist font & SEO metadata base
│   └── globals.css               # Typography and TipTap prose styles
├── components/
│   ├── admin/                    # Admin components
│   │   ├── AdminSidebar.tsx      # Sidebar navigation & sign-out
│   │   ├── PostForm.tsx          # Unified create/edit form
│   │   ├── TipTapEditor.tsx      # TipTap WYSIWYG editor with formatting toolbar
│   │   ├── ImageUploader.tsx     # Featured image uploader + SEO alt text input
│   │   └── SeoDrawer.tsx         # SERP preview card & char counters
│   └── public/                   # Public components
│       ├── Navbar.tsx            # Header with text logo, nav links, and search drawer
│       ├── Footer.tsx            # Brand statement, quick links, compliance links
│       ├── HeroPost.tsx          # Featured post for the homepage hero
│       ├── RankedPostList.tsx    # Numbered Trending and Most Read lists
│       ├── PostListItem.tsx      # Horizontal article card for the homepage feed
│       ├── HomeSidebar.tsx       # Editorial card, Most Read, Topics
│       ├── Pagination.tsx        # Previous/Next page links
│       ├── PostCard.tsx          # 3-column responsive post card with next/image
│       ├── ShareButtons.tsx      # Sticky social sharing (X, FB, Pinterest, copy link)
│       ├── AuthorBio.tsx         # Post author bio box
│       └── JsonLd.tsx            # JSON-LD Schema.org injector
├── lib/
│   ├── prisma.ts                 # Global Prisma Client singleton
│   ├── auth.ts                   # JWT token creation & cookie verification
│   ├── jwt.ts                    # Reads JWT_SECRET, refuses to run without it
│   ├── images.ts                 # Allowed image hosts & upload file type detection
│   └── utils.ts                  # Reading time calculation, slugify, date formatting
└── prisma/
    ├── schema.prisma             # User, Category, and Post data models
    └── seed.ts                   # Database seeder (Admin user + 5 categories + 6 posts)
```

---

## 3. Quick Start & Local Development

### 1. Install dependencies:
```bash
npm install
```

### 2. Create the Database Tables:
Copy `DATABASE_URL` and `DATABASE_URL_UNPOOLED` from your Neon project into `.env`, then run:
```bash
npx prisma db push
```

### 3. Seed Sample Data:
Add these to `.env` (`JWT_SECRET` needs at least 32 characters, `ADMIN_PASSWORD` at least 12):
```env
JWT_SECRET="output of: openssl rand -base64 48"
ADMIN_PASSWORD="choose-a-long-unique-password"
```
Then seed:
```bash
npx tsx --env-file=.env prisma/seed.ts
```

### 4. Start Development Server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 4. Admin Login

- **Admin Login URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@zunoclothing.com`
- **Password:** the `ADMIN_PASSWORD` you seeded with. Seeding never changes the password of an existing admin.

---

## 5. Google AdSense & SEO Compliance Checklist

1. **Mandatory Legal & Policy Pages:**
   - `/about`: Company and editorial mission statement.
   - `/contact`: Direct contact details (`editorial@zunoclothing.com`) and contact form.
   - `/privacy-policy`: Comprehensive GDPR & CCPA compliant privacy policy explicitly addressing Google AdSense cookies, DART cookies, and advertising opt-outs.
   - `/terms`: Terms of service.
   - `/disclaimer`: FTC affiliate and sponsored content disclosures.
2. **Structured Data:**
   - Schema.org `Article` and `BreadcrumbList` JSON-LD tags automatically injected into all article pages.
3. **Dynamic Metadata:**
   - OpenGraph, Twitter Cards, Canonical URLs, and SEO Meta Titles/Descriptions configured for every post.
4. **Search Engine Indexing:**
   - Dynamic `sitemap.xml` generated at `/sitemap.xml` automatically tracking newly published articles and categories.
   - Dynamic `robots.txt` at `/robots.txt` allowing Googlebot and Mediapartners-Google while protecting the `/admin` portal.

---

## 6. Production Deployment (Vercel + Neon)

1. Connect this GitHub repository to a Vercel project.
2. In the Vercel project, open **Storage**, then connect a **Neon** database. This sets `DATABASE_URL` and `DATABASE_URL_UNPOOLED`.
3. In **Settings > Environment Variables**, add:
   ```env
   JWT_SECRET="output of: openssl rand -base64 48"
   NEXT_PUBLIC_SITE_URL="https://zunoclothing.com"
   ```
4. Copy both Neon URLs into your local `.env` and add a unique `ADMIN_PASSWORD`, then run:
   ```bash
   npx prisma db push
   npx tsx --env-file=.env prisma/seed.ts
   ```
5. Redeploy from Vercel. Prisma Client is generated during install by the `postinstall` script.

Featured images use an R2 image URL pasted in the post form, because Vercel can't store uploaded files in `public/uploads`.
