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
  - `/public/branding/`: Corporate logos, business cards, brochure assets, social banners, and press kits.
    - `novand-emblem-animated.svg` (Pulsing vector brand mark)
    - `novand-social-card-square.svg` & `.png` (1080x1080 official social media graphic)
    - `novand-brand-assets.zip` (Complete archive including logos, business cards, brochures, stickers, and icons)
- **Asset Integrity Rules**:
  - All referenced images in data files (`services.ts`, `solutions.ts`, `projects.ts`, `adLandingData.ts`, `brochureData.ts`) MUST exist on disk in `public/`.
  - Imagery must be tailored, crisp, modern, and aligned with industrial-grade technical engineering (no generic clip art or blurry placeholders).
  - Zero broken images: all `<img>` tags must include `referrerPolicy="no-referrer"` and styled fallback containers.
  - Brand guidelines pages (`/brand` and `/en/brand`) feature dynamic category filters for all assets: `all`, `lockup`, `badge`, `mono`, `social`, `persian`, `light`, `cards`, `brochure`, `stickers`, `animations`, `icons`.

## 5. Frontend Design Constitution (Anti-Slop Discipline)
- **Zero-Pill Rule**: Never wrap static metadata (categories, tags, dates) in rounded pill badges or colored capsules. Use clean unboxed text separated by `·` or `/`.
- **Typography**: At most 2 font families (Vazirmatn for Persian, Space Grotesk / Inter for English) + 1 monospace (JetBrains Mono for technical specs/BOM/telemetry).
- **Single-Line Controls**: All buttons, nav links, and tabs must be single-line with `whitespace-nowrap`.
- **Top Bar Contract**: Exactly 3 zones: Brand title, 4-6 nav links, 1-2 primary actions.
- **Diagnostic Testing**: `npm test` runs comprehensive automated checks against bilingual symmetry, slug validity, file existence, and layout rules. Must always pass before committing any changes.
