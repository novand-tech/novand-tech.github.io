# Novand Project Architecture & Design Rules

## 1. Project Overview & Identity
- **Brand**: Novand (نُوَند) — Integrated Technology & Infrastructure Engineering.
- **Domain**: High-end enterprise IT, structured cabling, FTTH fiber optics, Cisco/MikroTik networking, Linux/macOS & VMware virtualization, IP telephony/VoIP, CCTV physical security, critical power/UPS, smart homes, and intelligent building automation.
- **Languages**: Dual-language architecture. Persian (`fa`, RTL) is default at root (`/`), English (`en`, LTR) is scoped under `/en/`.
- **Theme System**: Dual theme (Light mode default, Dark mode technical). Maintained via `html.dark` class and `localStorage.getItem('novand_theme')`.
- **Header & Footer Invariant**: Global Header, Footer, and 01-06 Capability Strip maintain 100% dark theme parity across all light/dark viewports for brand consistency.
- **Isolated Pages**: `/card` (and `/en/card`, `/connect`, `/links`) is a standalone digital business card page. Must NEVER be linked in main site Header or Footer.

## 2. Color Palette & Visual System
- **Dark Canvas**: `#141210` (Almond dark base), `#0d1417` (Jet surface), `#090e10` (Deep technical), `#15120e` (Elevated surface), `#1a2327` (Border & subtle container).
- **Light Canvas**: `#ffffff` (Pure white surface), `#eef1f5` (Canvas base), `#e2e7ec` (Section contrast), `#cbd5e1` / `#e2e8f0` (Hairline technical borders).
- **Accent Signals**:
  - Technical Signal Accent: `#00d2b5` (Dark theme cyan/teal) / `#008f7a` (Light theme contrast teal).
  - Routing Accent: `#10b981` (Emerald).
  - Text Primary: `#f4f2f1` (Dark) / `#0f172a` (Light).
  - Text Secondary: `rgba(244, 242, 241, 0.75)` (Dark) / `#334155` (Light).

## 3. Core Services & Solutions Matrix
- **7 Core Services** (must maintain exact bilingual symmetry):
  1. `smart-homes-buildings`
  2. `network-infrastructure`
  3. `enterprise-services`
  4. `infrastructure-administration`
  5. `security-surveillance`
  6. `audio-power`
  7. `hardware-support`
- **5 Target Industry Solutions**:
  1. `residential` (Residential Complexes & Private Homes)
  2. `business` (Corporate & Office Environments)
  3. `education` (Schools & University Campuses)
  4. `healthcare-hospitality` (Healthcare & Hospitality)
  5. `specialized-facilities` (Specialized Facilities & Warehouses)
- **3 Flagship Projects**:
  1. `corporate-hq-network`
  2. `smart-campus-automation`
  3. `high-availability-datacenter`

## 4. Visual Assets & Media Architecture
- **Directory Structure & Catalog**:
  - `/public/images/`: High-resolution imagery for services, solutions, projects, and hero sections.
    - Verified 1:1 thematic alignment between service slugs and hero images.
  - `/public/icons/`: High-fidelity domain SVG icons and 256px raster PNGs (clean line geometry, `#00d2b5` cyan accents, `#10b981` emerald accents):
    - `smart-home`, `network-core`, `enterprise-server`, `virtualization`, `cctv-surveillance`, `critical-power`, `hardware-chip`, `fiber-optic`, `cyber-security`, `voip-telephony`, `iot-telemetry`, `datacenter-rack`.
  - `/public/stickers/`: High-tech engineering badges, verification seals, quality stamps in SVG and 800px 300-DPI PNG:
    - `novand-certified-engineering` (100% Deterministic Cabling & Zero-Fault Standard)
    - `high-availability-99999` (Mission Critical 99.999% SLA Uptime)
    - `optical-fiber-standard` (TIA-568-D Compliant & OTDR Certified)
    - `cisco-mikrotik-seal` (Enterprise Routing & Switching CCNA Grade)
    - `bilingual-architecture-seal` (Dual Architecture FA & EN Tehran HQ)
    - `hardware-diagnostic-seal` (Laboratory Certified Component-Level Repair)
  - `/public/animations/`: Interactive and animated SVGs with CSS keyframes:
    - `network-packet-flow.svg` (Live packet flow across routers, switches, and servers)
    - `server-rack-telemetry.svg` (42U enclosure with blinking LEDs, load gauges, and thermal HUD)
    - `radar-surveillance-sweep.svg` (360-degree security radar sweep)
    - `smart-building-nodes.svg` (Three-tier isometric intelligent building mesh)
  - `/public/videos/`: Motion graphics and looping animated backdrops:
    - `datacenter-circuit-stream.svg` (1920x1080 seamless optical highway motion loop)
  - `/public/branding/`: Corporate logos, business cards, social banners, and press kits.
    - `novand-emblem-animated.svg` (Pulsing vector brand mark)
    - `novand-social-card-square.svg` & `.png` (1080x1080 official social media graphic)
    - `novand-brand-assets.zip` (Complete archive including logos, business cards, stickers, and icons)
- **Asset Integrity Rules**:
  - All referenced images in data files (`services.ts`, `solutions.ts`, `projects.ts`, `adLandingData.ts`, `brochureData.ts`) MUST exist on disk in `public/`.
  - Imagery must be tailored, crisp, modern, and aligned with industrial-grade technical engineering (no generic clip art or blurry placeholders).
  - Zero broken images: all `<img>` tags must include `referrerPolicy="no-referrer"` and styled fallback containers.
  - Brand guidelines pages (`/brand` and `/en/brand`) feature dynamic category filters for all assets (execpt brochure assets, because of their too much size): `all`, `lockup`, `badge`, `mono`, `social`, `persian`, `light`, `cards`, `stickers`, `animations`, `icons`.

## 5. Frontend Design Constitution (Anti-Slop Discipline)
- **Zero-Pill Rule**: Never wrap static metadata (categories, tags, dates) in rounded pill badges or colored capsules. Use clean unboxed text separated by `·` or `/`.
- **Typography**: At most 2 font families (Vazirmatn for Persian, Space Grotesk / Inter for English) + 1 monospace (JetBrains Mono for technical specs/BOM/telemetry).
- **Single-Line Controls**: All buttons, nav links, and tabs must be single-line with `whitespace-nowrap`.
- **Top Bar Contract**: Exactly 3 zones: Brand title, 4-6 nav links, 1-2 primary actions.
- **Diagnostic Testing**: `npm test` runs comprehensive automated checks against bilingual symmetry, slug validity, file existence, and layout rules. Must always pass before committing any changes.

## 6. Persian Commercial Invoice & Local Excel Generator (.xlsx)
- **Public Web Invariant**: Commercial invoice pages (`/invoice` and `/en/invoice`) are strictly removed and omitted from the public website to maintain internal commercial privacy. No invoice pages or public quoting routes are published or indexed in `sitemap.xml`.
- **Local Generation Architecture**: Commercial quotation and bill of materials (BOM) Excel spreadsheets are generated locally and offline via Node/TypeScript CLI:
  - Run `npm run generate:invoice` (or `tsx scripts/generate_invoice_excel.ts [outputPath]`).
  - Outputs to `/invoices/novand-invoice-template.xlsx` (or specified custom path), alongside maintaining offline templates.
- **Design Philosophy**: Standard Iranian statutory tax and commercial invoice layout merged with Novand's high-tech engineering brand identity.
- **Palette**: Dark Jet `#0F172A`, Signal Teal `#008F7A`, Light Teal Accent `#E6F7F5`, Soft Slate `#F8FAFC`, Hairline Border `#CBD5E1`.
- **Core Components & Data**:
  - `src/data/invoiceData.ts`: Single source of truth for seller specifications, legal identifiers (National ID, Economic Code, Registration No., Postal Code), bank accounts (Mellat Bank IBAN), terms & conditions, and sample BOM rows.
  - `scripts/generate_invoice_excel.ts`: Automated reproducible generator using `exceljs`, featuring native Right-to-Left (RTL) views, A4 portrait fit-to-1-page print settings, thousand separators (`#,##0`), and error-safe `IF` formulas for Row Total, Discount, 10% VAT, and Final Sums.

## 7. Blog Section, Technical Knowledge Base & Markdown Architecture
- **Purpose**: Authoritative engineering blog and technical library for sharing whitepapers, network designs, configuration baselines, and field documentation.
- **Routing & Bilingual Parity**:
  - Persian Hub: `/blog` and individual posts: `/blog/[slug]`
  - English Hub: `/en/blog` and individual posts: `/en/blog/[slug]`
  - Header Navigation: 5 links maintained across both languages (Projects, Blog, About, Consulting, Contact).
  - Footer Integration: Added under the Company section with bilingual labels.
- **Markdown Source Files**:
  - Persian posts stored in `src/content/blog/fa/*.md`
  - English posts stored in `src/content/blog/en/*.md`
  - Slugs must match 1:1 between Persian and English for cross-language consistency.
- **Frontmatter Schema Requirements**:
  - `title`: string (descriptive, clear engineering title)
  - `slug`: string (URL-safe kebab-case identifier)
  - `description`: string (compelling 1-2 sentence technical summary)
  - `publishDate`: string (ISO `YYYY-MM-DD`)
  - `author`: string (e.g. `واحد مهندسی زیرساخت نُوَند` / `Novand Optical Infrastructure Engineering Team`)
  - `category`: string (domain category title)
  - `categorySlug`: string (slug for interactive tab filtering)
  - `readingTime`: string (e.g. `۸ دقیقه مطالعه` / `8 min read`)
  - `image`: string (path to high-resolution asset in `/public/images/`)
  - `tags`: string[] (technical keyword tags)
  - `relatedServices`: string[] (valid service slugs connecting content to Novand core capabilities)
- **Visual Design & Site Architecture Consistency**:
  - Dedicated Breadcrumbs Bar: Integrated within `<div class="bg-[#141210] border-b border-[#15120e] py-3">` for seamless alignment with all other site pages (`/services`, `/projects`, etc.).
  - Canonical Page Hero: Both `/blog` and `/blog/[slug]` use the canonical site hero `<section class="bg-[#141210] text-[#f4f2f1] py-16 sm:py-24 border-b border-[#15120e] bg-grid-subtle">` with high-contrast text (`text-[#f4f2f1]` title, `text-[#f4f2f1]/70` description) that dynamically converts to dark jet `#0f172a` and slate `#334155` on light canvas `#eef1f5`.
  - Zero-Pill Metadata: Article cards and headers use clean unboxed text separated by `·` or `/`.
  - Interactive Filter Tabs: Category selector uses segmented button controls (`<button>`) with dedicated `.filter-tab` and `.filter-tab.active` classes for crisp high-contrast state in both light and dark modes.
  - Removal of Dedicated "Attached Learning Materials" Feature: No dedicated upload/download materials sections or cards in the blog index or posts. Any necessary technical downloads are integrated contextually when required.
  - Single-Elevation Presence: Subtle border `border-slate-200 dark:border-[#1e293b]` without nested card traps.
  - Typography: `.blog-prose` styling supports Vazirmatn for Persian, Space Grotesk for English, and JetBrains Mono for CLI code blocks, equations, and tables.
  - Light Theme Strict Contrast: Light mode surfaces maintain WCAG AAA/AA contrast. Technical signal accents on light backgrounds strictly use `#008f7a` (contrast teal) rather than washed-out cyan `#00d2b5`. All metadata texts use `text-slate-600` or `text-slate-700` (avoiding low-contrast `text-slate-400` on light canvases).
  - Dark-Surface Immunity (`keep-dark`): Any permanently dark component (such as the sidebar consultation card, code blocks, or image watermark badges) must include the `.keep-dark` class to prevent the global light theme conversion layer from forcing dark text on dark surfaces.
  - Interactive Features: Real-time client-side search, category filtering, reading progress bar, and one-click copy URL.
  - Blog Text Box & Contrast Enforcement: In light theme, all interactive and content text boxes (search input `.blog-search-field`, filter track `.blog-filter-bar`, share box `.blog-share-box`, navigation cards `.blog-nav-card`, sidebar related service items `.blog-service-item`, tag chips `.blog-tag-chip`, and prose blockquotes) maintain verified WCAG AAA/AA contrast. Placeholders strictly use `#64748b` (preventing white-on-white invisibility), and nested cards employ tinted surfaces (`#f8fafc`/`#e2e8f0`) to avoid white-on-white trap blending.