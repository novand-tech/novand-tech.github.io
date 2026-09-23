import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import QRCode from 'qrcode';
import { Resvg } from '@resvg/resvg-js';

const CARD_URL = 'https://novand-tech.com/card';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'branding');

// Load Vazirmatn and Space Grotesk fonts from public/fonts
const vazirBoldBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'Vazirmatn-Bold.ttf'));
const vazirRegularBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'Vazirmatn-Regular.ttf'));
const spaceBoldBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'SpaceGrotesk-Bold.ttf'));
const spaceMedBuffer = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'SpaceGrotesk-Medium.ttf'));

const vazirBoldB64 = vazirBoldBuffer.toString('base64');
const vazirRegularB64 = vazirRegularBuffer.toString('base64');
const spaceBoldB64 = spaceBoldBuffer.toString('base64');
const spaceMedB64 = spaceMedBuffer.toString('base64');

// Canonical Novand vector emblem SVG markup
function getNovandEmblemMarkup({ scale = 1.0, strokeCore = '#ffffff', glowId = 'circ-glow', fillDot = '#0d1417' }) {
  return `
    <g transform="scale(${scale})">
      <path d="M50 18 L22 38 V68 H48" stroke="${strokeCore}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M50 18 L84 42" stroke="${strokeCore}" stroke-width="5" stroke-linecap="round" />
      <rect x="46" y="39" width="6" height="6" fill="${strokeCore}" rx="0.5" />
      <rect x="54" y="39" width="6" height="6" fill="${strokeCore}" rx="0.5" />
      <rect x="46" y="47" width="6" height="6" fill="${strokeCore}" rx="0.5" />
      <rect x="54" y="47" width="6" height="6" fill="${strokeCore}" rx="0.5" />
      <path d="M30 76 H54 L76 54" stroke="url(#${glowId})" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="80" cy="50" r="4.5" stroke="url(#${glowId})" stroke-width="3.5" fill="${fillDot}" />
      <path d="M45 84 H60 L76 68" stroke="url(#${glowId})" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="80" cy="64" r="4.5" stroke="url(#${glowId})" stroke-width="3.5" fill="${fillDot}" />
      <path d="M61 90 H70 L77 83" stroke="url(#${glowId})" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="80" cy="80" r="4.5" stroke="url(#${glowId})" stroke-width="3.5" fill="${fillDot}" />
    </g>
  `;
}

// Generate the minimal, elegant, print-ready Business Card Front SVG
function generateBusinessCardSvg({
  theme = 'dark',
  name = 'مهندس محمود احمدی',
  phone = '0912 932 1550',
  qrInnerSvg = '',
}) {
  const isDark = theme === 'dark';

  // Palette Tokens
  const bgCanvas = isDark ? '#0b1013' : '#ffffff';
  const borderCard = isDark ? '#1a242a' : '#e2e8f0';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#3b3f48';
  const accentTurquoise = isDark ? '#00d2b5' : '#008775';
  const accentEmerald = isDark ? '#10b981' : '#059669';
  const strokeCore = isDark ? '#f8fafc' : '#0f172a';
  const fillDot = isDark ? '#0b1013' : '#ffffff';
  const iconBadgeBg = isDark ? '#121a1f' : '#f8fafc';
  const iconBadgeBorder = isDark ? '#1f2d35' : '#cbd5e1';
  const dockBg = isDark ? '#121a1f' : '#f8fafc';
  const dockBorder = isDark ? '#1f2d35' : '#e2e8f0';
  const qrTileBg = '#ffffff';
  const qrTileBorder = isDark ? '#00d2b5' : '#008775';

  return `<svg width="1050" height="600" viewBox="0 0 1050 600" fill="none" xmlns="http://www.w3.org/2000/svg" direction="rtl">
  <defs>
    <style>
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 700;
        src: url('data:font/ttf;base64,${vazirBoldB64}') format('truetype');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 400;
        src: url('data:font/ttf;base64,${vazirRegularB64}') format('truetype');
      }
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 700;
        src: url('data:font/ttf;base64,${spaceBoldB64}') format('truetype');
      }
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 500;
        src: url('data:font/ttf;base64,${spaceMedB64}') format('truetype');
      }
      .font-vazir-bold { font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; }
      .font-vazir-reg { font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400; }
      .font-space-bold { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; }
      .font-space-med { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 500; }
    </style>

    <linearGradient id="card-grad-${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentTurquoise}" />
      <stop offset="100%" stop-color="${accentEmerald}" />
    </linearGradient>

    <linearGradient id="divider-grad-${theme}" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="${accentTurquoise}" stop-opacity="0.85" />
      <stop offset="50%" stop-color="${isDark ? '#1f2e36' : '#cbd5e1'}" stop-opacity="0.5" />
      <stop offset="100%" stop-color="${isDark ? '#1f2e36' : '#cbd5e1'}" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <!-- Base Card Canvas with Clean Print Margins -->
  <rect width="1050" height="600" fill="${bgCanvas}" />
  <rect x="21" y="21" width="1008" height="558" rx="14" fill="${bgCanvas}" stroke="${borderCard}" stroke-width="1.5" />

  <!-- ============================================================== -->
  <!-- TOP BRAND HEADER: Logo + Brand Name + Core Engineering Focus   -->
  <!-- ============================================================== -->
  <g id="brand-header">
    <!-- Emblem -->
    <g transform="translate(885, 28)">
      ${getNovandEmblemMarkup({ scale: 1.35, strokeCore, glowId: `card-grad-${theme}`, fillDot })}
    </g>

    <!-- Brand Typography & Subtitle -->
    <text x="885" y="90" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="44" text-anchor="end">نُـوَند</text>
    <text x="765" y="85" fill="${accentTurquoise}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="900" font-size="19" letter-spacing="4.5" text-anchor="end">NOVAND</text>
    <text x="885" y="125" fill="${accentTurquoise}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="17" text-anchor="end">هوشمندسازی خانه  ·  سیستم‌های امنیتی و نظارت تصویری  ·  زیرساخت شبکه</text>

    <!-- Left Header Callout -->
    <text x="72" y="85" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="20" text-anchor="start">مهندسی سیستم‌ها و فناوری نُـوَند</text>
    <text x="65" y="125" fill="${accentTurquoise}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="15" letter-spacing="1.2" text-anchor="start">SMART HOMES · CCTV · NETWORKS</text>
  </g>

  <!-- Clean Separation Line -->
  <line x1="55" y1="114" x2="995" y2="114" stroke="url(#divider-grad-${theme})" stroke-width="1.5" />

  <!-- ============================================================== -->
  <!-- RIGHT REGION: Personal Identity & Direct Contact Information   -->
  <!-- ============================================================== -->
  <g id="person-identity">
    <text x="990" y="196" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="38" text-anchor="end">${name}</text>
    <rect x="890" y="215" width="100" height="3" rx="1.5" fill="url(#card-grad-${theme})" />
  </g>

  <!-- Contact Rows (Phone, Website, Instagram, Address) -->
  <g id="contact-list">
    <!-- Row 1: Phone (English numerals with Space Grotesk) -->
    <g transform="translate(0, 238)">
      <rect x="952" y="0" width="38" height="38" rx="9" fill="${iconBadgeBg}" stroke="${iconBadgeBorder}" stroke-width="1.2" />
      <g transform="translate(959, 7)" stroke="${accentTurquoise}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </g>
      <text x="932" y="27" fill="${textPrimary}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="25" letter-spacing="1.2" text-anchor="end">${phone}</text>
    </g>

    <!-- Row 2: Website (Direct domain) -->
    <g transform="translate(0, 292)">
      <rect x="952" y="0" width="38" height="38" rx="9" fill="${iconBadgeBg}" stroke="${iconBadgeBorder}" stroke-width="1.2" />
      <g transform="translate(959, 7)" stroke="${accentTurquoise}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </g>
      <text x="932" y="26" fill="${textPrimary}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="25" letter-spacing="1" text-anchor="end">novand-tech.com</text>
    </g>

    <!-- Row 3: Instagram -->
    <g transform="translate(0, 346)">
      <rect x="952" y="0" width="38" height="38" rx="9" fill="${iconBadgeBg}" stroke="${iconBadgeBorder}" stroke-width="1.2" />
      <g transform="translate(959, 7)" stroke="${accentTurquoise}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </g>
      <text x="932" y="26" fill="${accentTurquoise}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="25" letter-spacing="0.5" text-anchor="end">@novand_tech</text>
    </g>

    <!-- Row 4: Location Address -->
    <g transform="translate(0, 404)">
      <rect x="952" y="0" width="38" height="38" rx="9" fill="${iconBadgeBg}" stroke="${iconBadgeBorder}" stroke-width="1.2" />
      <g transform="translate(959, 7)" stroke="${accentTurquoise}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </g>
      <text x="932" y="10" fill="${textPrimary}" class="font-vazir-reg" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="22" text-anchor="end">،تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی</text>
      <text x="932" y="40" fill="${textPrimary}" class="font-vazir-reg" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="22" text-anchor="end">بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷</text>
    </g>
  </g>

  <!-- ============================================================== -->
  <!-- LEFT REGION: Clean Scannable QR Code (No tutorial/text clutter)-->
  <!-- ============================================================== -->
  <g id="qr-code-section" transform="translate(110, 196)">
    <rect x="0" y="0" width="220" height="220" rx="14" fill="${qrTileBg}" stroke="${qrTileBorder}" stroke-width="1.8" />
    <svg x="15" y="15" width="190" height="190" viewBox="0 0 31 31" shape-rendering="crispEdges">
      ${qrInnerSvg}
    </svg>
  </g>

  <!-- ============================================================== -->
  <!-- BOTTOM ARCHITECTURAL DOCK: Compact & Minimal Core Services     -->
  <!-- ============================================================== -->
  <g id="services-dock" transform="translate(55, 475)">
    <rect x="0" y="0" width="940" height="70" rx="10" fill="${dockBg}" stroke="${dockBorder}" stroke-width="1.2" />
    
    <!-- Item 1 (Right): VoIP & Fiber -->
    <g transform="translate(0, 0)">
      <text x="927" y="38" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="19" text-anchor="end">و فیبر نوری VoIP مرکز تلفن</text>
    </g>


    <!-- Item 2 (Center-Right): Hardware & Software -->
    <g transform="translate(0, 0)">
      <circle cx="705" cy="35" r="3.5" fill="${accentTurquoise}" />
      <text x="665" y="38" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="19" text-anchor="end">سخت‌افزار و نرم‌افزار</text>
    </g>


    <!-- Item 3 (Center-Left): Audio & Video -->
    <g transform="translate(0, 0)">
      <circle cx="470" cy="35" r="3.5" fill="${accentTurquoise}" />
      <text x="410" y="38" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="19" text-anchor="end">صوت و تصویر</text>
    </g>

    <!-- Item 4 (Left): UPS & Power -->
    <g transform="translate(0, 0)">
      <circle cx="235" cy="35" r="3.5" fill="${accentTurquoise}" />
      <text x="170" y="38" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="19" text-anchor="end">UPS برق و</text>
    </g>

  </g>

</svg>`;
}

// Generate the companion Corporate Reverse / Back Side SVG markup
function generateBusinessCardBackSvg({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const bgCanvas = isDark ? '#0b1013' : '#ffffff';
  const borderCard = isDark ? '#1a242a' : '#e2e8f0';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#3b3f48';
  const accentTurquoise = isDark ? '#00d2b5' : '#008775';
  const accentEmerald = isDark ? '#10b981' : '#059669';
  const strokeCore = isDark ? '#f8fafc' : '#0f172a';
  const fillDot = isDark ? '#0b1013' : '#ffffff';

  return `<svg width="1050" height="600" viewBox="0 0 1050 600" fill="none" xmlns="http://www.w3.org/2000/svg" direction="rtl">
  <defs>
    <style>
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 700;
        src: url('data:font/ttf;base64,${vazirBoldB64}') format('truetype');
      }
      @font-face {
        font-family: 'Vazirmatn';
        font-style: normal;
        font-weight: 400;
        src: url('data:font/ttf;base64,${vazirRegularB64}') format('truetype');
      }
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 700;
        src: url('data:font/ttf;base64,${spaceBoldB64}') format('truetype');
      }
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 500;
        src: url('data:font/ttf;base64,${spaceMedB64}') format('truetype');
      }
      .font-vazir-bold { font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; }
      .font-vazir-reg { font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400; }
      .font-space-bold { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700; }
      .font-space-med { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 500; }
    </style>

    <linearGradient id="back-accent-grad-${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentTurquoise}" />
      <stop offset="100%" stop-color="${accentEmerald}" />
    </linearGradient>
  </defs>

  <!-- Base Canvas -->
  <rect width="1050" height="600" fill="${bgCanvas}" />
  <rect x="21" y="21" width="1008" height="558" rx="14" fill="${bgCanvas}" stroke="${borderCard}" stroke-width="1.5" />

  <!-- Center Novand Emblem -->
  <g transform="translate(515, 150)">
    <g transform="translate(-110, -110)">
      ${getNovandEmblemMarkup({ scale: 2.3, strokeCore, glowId: `back-accent-grad-${theme}`, fillDot })}
    </g>
  </g>

  <!-- Corporate Typography Lockup -->
  <g transform="translate(525, 330)">
    <text x="0" y="0" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="56" text-anchor="middle">نُـوَند</text>
    <text x="0" y="40" fill="${accentTurquoise}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="20" letter-spacing="7" text-anchor="middle">NOVAND</text>
    
    <line x1="-160" y1="62" x2="160" y2="62" stroke="url(#back-accent-grad-${theme})" stroke-width="2.5" stroke-linecap="round" />

    <text x="0" y="102" fill="${textPrimary}" class="font-vazir-bold" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="28" text-anchor="middle">هوشمندسازی خانه  ·  سیستم‌های امنیتی و نظارت تصویری  ·  زیرساخت شبکه</text>
    <text x="0" y="140" fill="${textSecondary}" class="font-vazir-reg" font-family="Vazirmatn, sans-serif" font-weight="700" font-size="24" text-anchor="middle">مشاوره،  تامین تجهیزات،  طراحی، پیاده‌سازی و پشتیبانی فنی پروژه‌ها</text>
  </g>

  <!-- Bottom Website Bar (Homepage Only) -->
  <g transform="translate(525, 530)">
    <text x="0" y="0" fill="${accentTurquoise}" class="font-space-bold" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="26" letter-spacing="2.5" text-anchor="middle">novand-tech.com</text>
  </g>

</svg>`;
}

async function main() {
  console.log('Generating QR Code SVG matching /card for:', CARD_URL);
  // Generate the exact same QR code SVG as /card (margin 1, dark #0d1417, light #ffffff)
  const fullQrSvg = await QRCode.toString(CARD_URL, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#0d1417',
      light: '#ffffff'
    }
  });

  // Extract the inner paths from the QR code SVG
  const qrInnerSvg = fullQrSvg.replace(/<svg[^>]*>/, '').replace('</svg>', '');
  console.log('QR Code extracted. Inner SVG length:', qrInnerSvg.length);

  const cardDefinitions = [
    // 1. Mahmoud Ahmadi - Dark
    {
      id: 'novand-business-card-ahmadi-dark',
      theme: 'dark',
      name: 'مهندس محمود احمدی',
      phone: '0912 932 1550',
      type: 'front',
    },
    // 2. Mahmoud Ahmadi - Light
    {
      id: 'novand-business-card-ahmadi-light',
      theme: 'light',
      name: 'مهندس محمود احمدی',
      phone: '0912 932 1550',
      type: 'front',
    },
    // 3. Hesamoddin Ashari - Dark
    {
      id: 'novand-business-card-ashari-dark',
      theme: 'dark',
      name: 'حسام‌الدین اشعری',
      phone: '0919 691 8758',
      type: 'front',
    },
    // 4. Hesamoddin Ashari - Light
    {
      id: 'novand-business-card-ashari-light',
      theme: 'light',
      name: 'حسام‌الدین اشعری',
      phone: '0919 691 8758',
      type: 'front',
    },
    // 5. Corporate Reverse / Back - Dark
    {
      id: 'novand-business-card-back-dark',
      theme: 'dark',
      type: 'back',
    },
    // 6. Corporate Reverse / Back - Light
    {
      id: 'novand-business-card-back-light',
      theme: 'light',
      type: 'back',
    }
  ];

  console.log('Generating business card SVGs and 300 DPI PNGs...');

  for (const card of cardDefinitions) {
    let svgContent = '';
    if (card.type === 'front') {
      svgContent = generateBusinessCardSvg({
        theme: card.theme,
        name: card.name,
        phone: card.phone,
        qrInnerSvg,
      });
    } else {
      svgContent = generateBusinessCardBackSvg({
        theme: card.theme,
      });
    }

    const svgPath = path.join(OUTPUT_DIR, `${card.id}.svg`);
    fs.writeFileSync(svgPath, svgContent, 'utf-8');
    console.log(`Saved SVG: ${card.id}.svg (${(svgContent.length / 1024).toFixed(1)} KB)`);

    // Rasterize with @resvg/resvg-js to 300 DPI high-definition PNG (1050x600 px)
    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: 1050,
      },
      font: {
        loadSystemFonts: false,
        fontDirs: [path.join(process.cwd(), 'public', 'fonts')],
        defaultFontFamily: 'Vazirmatn',
      },
      shapeRendering: 2, // geometricPrecision
      textRendering: 1, // optimizeLegibility
      imageRendering: 1, // optimizeQuality
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const pngPath = path.join(OUTPUT_DIR, `${card.id}.png`);
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Saved 300 DPI PNG: ${card.id}.png (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
  }

  // Update novand-brand-assets.zip archive
  console.log('Packaging all brand assets and business cards into novand-brand-assets.zip using python3 zipfile...');
  const pyScriptPath = path.join(process.cwd(), 'scripts', 'zip_branding.py');
  fs.writeFileSync(pyScriptPath, `import zipfile, os
branding_dir = "${OUTPUT_DIR}"
zip_path = os.path.join(branding_dir, "novand-brand-assets.zip")
files = [f for f in os.listdir(branding_dir) if f != "novand-brand-assets.zip" and not f.startswith('.')]
files.sort()
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files:
        full_path = os.path.join(branding_dir, file)
        zipf.write(full_path, arcname=file)
print(f"Archive created with {len(files)} files, size: {os.path.getsize(zip_path)} bytes")
`, 'utf-8');

  execSync(`python3 "${pyScriptPath}"`, { stdio: 'inherit' });
  try { fs.unlinkSync(pyScriptPath); } catch (e) {}
  console.log('Business card generation and brand pack update completed successfully!');
}

main().catch((err) => {
  console.error('Fatal error during business card generation:', err);
  process.exit(1);
});
