import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import QRCode from 'qrcode';
import { Resvg } from '@resvg/resvg-js';

const CARD_URL = 'https://novand-tech.com/card';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'branding');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const FONTS_DIR = path.join(process.cwd(), 'public', 'fonts');

// 1. Read and encode fonts
const vazirBoldB64 = fs.readFileSync(path.join(FONTS_DIR, 'Vazirmatn-Bold.ttf')).toString('base64');
const vazirRegularB64 = fs.readFileSync(path.join(FONTS_DIR, 'Vazirmatn-Regular.ttf')).toString('base64');
const spaceBoldB64 = fs.readFileSync(path.join(FONTS_DIR, 'SpaceGrotesk-Bold.ttf')).toString('base64');
const spaceMedB64 = fs.readFileSync(path.join(FONTS_DIR, 'SpaceGrotesk-Medium.ttf')).toString('base64');

// 2. Read and encode images
function getImageB64(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/jpeg;base64,${data.toString('base64')}`;
  }
  return '';
}

const imgHeroDatacenter = getImageB64('hero-datacenter.jpg');
const imgResidential = getImageB64('residential-smart-home.jpg');
const imgSecurity = getImageB64('security-surveillance.jpg');
const imgCabling = getImageB64('network-cabling.jpg');
const imgBusiness = getImageB64('business-office.jpg');
const imgSpecialized = getImageB64('specialized-infrastructure.jpg');

// 3. Novand vector emblem SVG generator
function getNovandEmblemMarkup({ scale = 1.0, strokeCore = '#ffffff', glowId = 'grad', fillDot = '#0d1417' }) {
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

// 4. Panel generators: Each panel has standard dimensions W=1169, H=2480 (or inside a 3-panel A4 sheet 3508 x 2480)
// To keep things modular and reusable, each panel renders into width=1160, height=2480.
function getSharedDefs(theme) {
  const isDark = theme === 'dark';
  const accentTurquoise = isDark ? '#00d2b5' : '#008775';
  const accentEmerald = isDark ? '#10b981' : '#059669';

  return `
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
        .vazir-bold { font-family: 'Vazirmatn', sans-serif; font-weight: 700; }
        .vazir-reg { font-family: 'Vazirmatn', sans-serif; font-weight: 400; }
        .space-bold { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
        .space-med { font-family: 'Space Grotesk', sans-serif; font-weight: 500; }
      </style>
      <linearGradient id="brochure-grad-${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentTurquoise}" />
        <stop offset="100%" stop-color="${accentEmerald}" />
      </linearGradient>
      <linearGradient id="brochure-line-${theme}" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="${accentTurquoise}" stop-opacity="0.9" />
        <stop offset="50%" stop-color="${isDark ? '#23343d' : '#cbd5e1'}" stop-opacity="0.5" />
        <stop offset="100%" stop-color="${isDark ? '#23343d' : '#cbd5e1'}" stop-opacity="0.1" />
      </linearGradient>
      <clipPath id="clip-p1-hero"><rect width="1020" height="780" rx="20" /></clipPath>
      <clipPath id="clip-p2-hero"><rect width="1020" height="620" rx="16" /></clipPath>
      <clipPath id="clip-p3-hero"><rect width="1020" height="620" rx="16" /></clipPath>
      <clipPath id="clip-p4-hero"><rect width="1020" height="620" rx="16" /></clipPath>
      <clipPath id="clip-p5-hero"><rect width="1020" height="520" rx="16" /></clipPath>
    </defs>
  `;
}

// 5. Individual Panel Content Markups
// PAGE 1: FRONT COVER (جلد روی بروشور)
function renderPanel1Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1f2d35' : '#e2e8f0';
  const strokeCore = isDark ? '#ffffff' : '#0f172a';
  const fillDot = isDark ? '#0b1013' : '#ffffff';

  return `
    <!-- Header Badge -->
    <g transform="translate(1080, 140)">
      <rect x="-380" y="0" width="380" height="46" rx="23" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <circle cx="-355" cy="23" r="6" fill="${accent}" />
      <text x="-335" y="30" fill="${textSecondary}" class="space-bold" font-size="19" letter-spacing="2">OFFICIAL COMPANY PROFILE</text>
    </g>

    <!-- Logo & Brand Header -->
    <g transform="translate(1080, 290)">
      <g transform="translate(-160, -80)">
        ${getNovandEmblemMarkup({ scale: 1.8, strokeCore, glowId: `brochure-grad-${theme}`, fillDot })}
      </g>
      <text x="-210" y="0" fill="${textPrimary}" class="vazir-bold" font-size="88" text-anchor="end">نُـوَند</text>
      <text x="-210" y="62" fill="${accent}" class="space-bold" font-size="34" letter-spacing="9" text-anchor="end">NOVAND</text>
    </g>

    <!-- Main Slogan & Subtitles -->
    <g transform="translate(1080, 520)">
      <text x="0" y="0" fill="${textPrimary}" class="vazir-bold" font-size="46" text-anchor="end">راهکارهای جامع فناوری و مهندسی زیرساخت</text>
      <text x="0" y="55" fill="${accent}" class="space-bold" font-size="21" letter-spacing="2" text-anchor="end">INTEGRATED TECHNOLOGY &amp; INFRASTRUCTURE</text>
      <line x1="-1010" y1="95" x2="0" y2="95" stroke="url(#brochure-line-${theme})" stroke-width="3" />
    </g>

    <!-- Hero Visual Stage -->
    <g transform="translate(70, 680)">
      <rect width="1020" height="780" rx="20" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <g clip-path="url(#clip-p1-hero)">
        <image href="${imgHeroDatacenter}" width="1020" height="780" preserveAspectRatio="xMidYMid slice" opacity="${isDark ? '0.85' : '0.95'}" />
        <rect width="1020" height="780" fill="${isDark ? 'rgba(11,16,19,0.35)' : 'rgba(0,0,0,0.1)'}" />
      </g>
      <!-- Overlay Technical HUD -->
      <rect x="30" y="30" width="310" height="50" rx="10" fill="${cardBg}" opacity="0.92" stroke="${accent}" stroke-width="1.5" />
      <text x="50" y="62" fill="${accent}" class="space-bold" font-size="19" letter-spacing="1">ENGINEERED CONVERGENCE</text>
      
      <rect x="30" y="690" width="960" height="60" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="960" y="730" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">طراحی، تأمین تجهیزات، اجرا و پشتیبانی تخصصی</text>
      <text x="60" y="728" fill="${accent}" class="space-bold" font-size="18" text-anchor="start">SMART · CCTV · NETWORK · VOIP</text>
    </g>

    <!-- Core 4 Pillars Badges -->
    <g transform="translate(1080, 1550)">
      <!-- Pillar 1 -->
      <g transform="translate(0, 0)">
        <rect x="-485" y="0" width="485" height="150" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
        <circle cx="-50" cy="50" r="28" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="24" text-anchor="middle">۰۱</text>
        <text x="-95" y="48" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">خانه‌ها و ساختمان‌های هوشمند</text>
        <text x="-95" y="80" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">Smart Homes &amp; Automation</text>
        <text x="-95" y="118" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">کنترل هوشمند روشنایی، تهویه و BMS</text>
      </g>

      <!-- Pillar 2 -->
      <g transform="translate(-525, 0)">
        <rect x="-485" y="0" width="485" height="150" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
        <circle cx="-50" cy="50" r="28" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="24" text-anchor="middle">۰۲</text>
        <text x="-95" y="48" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">سیستم‌های نظارتی و CCTV</text>
        <text x="-95" y="80" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">CCTV &amp; Physical Security</text>
        <text x="-95" y="118" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">دوربین‌های IP، هوش مصنوعی و اتاق مانیتورینگ</text>
      </g>

      <!-- Pillar 3 -->
      <g transform="translate(0, 185)">
        <rect x="-485" y="0" width="485" height="150" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
        <circle cx="-50" cy="50" r="28" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="24" text-anchor="middle">۰۳</text>
        <text x="-95" y="48" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">زیرساخت شبکه و خدمات IT</text>
        <text x="-95" y="80" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">Network Infrastructure</text>
        <text x="-95" y="118" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">کابل‌کشی ساخت‌یافته، سوئیچینگ سیسکو و امنیت</text>
      </g>

      <!-- Pillar 4 -->
      <g transform="translate(-525, 185)">
        <rect x="-485" y="0" width="485" height="150" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
        <circle cx="-50" cy="50" r="28" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="24" text-anchor="middle">۰۴</text>
        <text x="-95" y="48" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">فیبر نوری و مراکز تلفن VoIP</text>
        <text x="-95" y="80" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">Fiber Optics &amp; VoIP</text>
        <text x="-95" y="118" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">لینک‌های FTTH، سیپ‌ترانک و مدیریت سرورها</text>
      </g>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(70, 2220)">
      <rect width="1020" height="110" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="65" fill="${textPrimary}" class="vazir-bold" font-size="24" text-anchor="end">پرتال رسمی و معرفی راهکارها</text>
      <text x="50" y="68" fill="${accent}" class="space-bold" font-size="29" letter-spacing="2" text-anchor="start">novand-tech.com</text>
    </g>
  `;
}

// PAGE 2: BUSINESS INTRODUCTION & SMART HOMES
function renderPanel2Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1f2d35' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1080, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="22" letter-spacing="3" text-anchor="end">02 // ABOUT &amp; SMART BUILDINGS</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">معرفی نُـوَند و خانه‌های هوشمند</text>
      <text x="0" y="100" fill="${textSecondary}" class="vazir-reg" font-size="22" text-anchor="end">همگرایی مهندسی، معماری مدرن و اتوماسیون یکپارچه</text>
      <line x1="-1010" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Intro Lead Card -->
    <g transform="translate(70, 320)">
      <rect width="1020" height="270" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <rect x="996" y="24" width="6" height="222" rx="3" fill="url(#brochure-grad-${theme})" />
      <text x="960" y="68" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">نُـوَند؛ شریک مهندسی فناوری یکپارچه</text>
      <text x="960" y="116" fill="${textBody}" class="vazir-reg" font-size="21" text-anchor="end">کسب‌وکارهای مدرن، مراکز آموزشی، اداری و فضاهای مسکونی امروزی به همگرایی</text>
      <text x="960" y="156" fill="${textBody}" class="vazir-reg" font-size="21" text-anchor="end">بی‌نقص شبکه‌های داده، امنیت فیزیکی، اتوماسیون محیطی و سرورها وابسته هستند.</text>
      <text x="960" y="196" fill="${textBody}" class="vazir-reg" font-size="21" text-anchor="end">هنگامی که این حوزه‌ها جزیره‌ای مهندسی شوند، هزینه‌ها و خطاها افزایش می‌یابد؛</text>
      <text x="960" y="236" fill="${accent}" class="vazir-bold" font-size="21" text-anchor="end">نُـوَند این ارکان را در قالب سامانه‌ای استاندارد و یکدست پیاده‌سازی می‌کند.</text>
    </g>

    <!-- Image Stage -->
    <g transform="translate(70, 630)">
      <rect width="1020" height="620" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <g clip-path="url(#clip-p2-hero)">
        <image href="${imgResidential}" width="1020" height="620" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="25" y="545" width="970" height="50" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="578" fill="${textPrimary}" class="vazir-bold" font-size="20" text-anchor="end">اتوماسیون لوکس و پنهان‌سازی تجهیزات در هماهنگی با طراحی معماری</text>
      <text x="50" y="578" fill="${accent}" class="space-bold" font-size="16" text-anchor="start">RESIDENTIAL &amp; BMS</text>
    </g>

    <!-- Core Focus: Smart Homes & Buildings -->
    <g transform="translate(70, 1300)">
      <rect width="1020" height="520" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">اتوماسیون ساختمان، روشنایی و تهویه (Smart Homes &amp; BMS)</text>
      <text x="970" y="90" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">INTELLIGENT LIVING &amp; FACILITY AUTOMATION</text>
      
      <!-- Feature 1 -->
      <g transform="translate(0, 125)">
        <circle cx="975" cy="20" r="10" fill="${accent}" />
        <text x="945" y="26" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">کنترل هوشمند روشنایی، تهویه (HVAC) و پرده‌های برقی</text>
        <text x="945" y="60" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">مدیریت سناریوهای روشنایی، سرمایش و گرمایش بر اساس حضور و دمای محیط جهت صرفه‌جویی انرژی.</text>
      </g>

      <!-- Feature 2 -->
      <g transform="translate(0, 220)">
        <circle cx="975" cy="20" r="10" fill="${accent}" />
        <text x="945" y="26" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">پروتکل‌های استاندارد جهانی (KNX, Zigbee, Modbus)</text>
        <text x="945" y="60" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">معماری باز و مستقل از برند بدون وابستگی انحصاری با قابلیت اتصال به تجهیزات برتر دنیا.</text>
      </g>

      <!-- Feature 3 -->
      <g transform="translate(0, 315)">
        <circle cx="975" cy="20" r="10" fill="${accent}" />
        <text x="945" y="26" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">سیستم‌های صوتی چندناحیه‌ای (Multi-Zone Audio)</text>
        <text x="945" y="60" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">پخش موزیک اختصاصی و مدیریت استریم در زون‌های مختلف ساختمان به صورت وایرلس و تحت شبکه.</text>
      </g>

      <!-- Feature 4 -->
      <g transform="translate(0, 410)">
        <circle cx="975" cy="20" r="10" fill="${accent}" />
        <text x="945" y="26" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">کنترل امن از راه دور و اپلیکیشن‌های موبایل</text>
        <text x="945" y="60" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">داشبوردهای مدیریتی روی تبلت‌های دیواری و گوشی‌های هوشمند با رمزنگاری پیشرفته داده‌ها.</text>
      </g>
    </g>

    <!-- Secondary Focus: Educational & Greenhouse -->
    <g transform="translate(70, 1860)">
      <rect width="1020" height="320" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">اتوماسیون مراکز آموزشی، مدارس و گلخانه‌های صنعتی</text>
      
      <g transform="translate(0, 85)">
        <rect x="525" y="0" width="460" height="200" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
        <text x="955" y="42" fill="${accent}" class="vazir-bold" font-size="21" text-anchor="end">مدارس هوشمند و کلاس‌های تعاملی</text>
        <text x="955" y="78" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">• تخته‌های هوشمند و نمایشگرهای لمسی</text>
        <text x="955" y="112" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">• سیستم‌های صوتی پیجینگ دوطرفه</text>
        <text x="955" y="146" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">• شبکه وایرلس امن کلاسی با تفکیک دسترسی</text>
      </g>

      <g transform="translate(0, 85)">
        <rect x="35" y="0" width="460" height="200" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
        <text x="465" y="42" fill="${accent}" class="vazir-bold" font-size="21" text-anchor="end">پایش محیطی و گلخانه صنعتی</text>
        <text x="465" y="78" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">• سنسورهای رطوبت، دما و دی‌اکسیدکربن</text>
        <text x="465" y="112" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">• اتوماسیون آبیاری و تهویه هوشمند</text>
        <text x="465" y="146" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">• داشبورد هشدار و مانیتورینگ آنلاین ۲۴ ساعته</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(70, 2240)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="${cardBorder}" stroke-width="2" />
      <text x="1020" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="20" text-anchor="start">PAGE // 02</text>
    </g>
  `;
}

// PAGE 3: CCTV & NETWORK INFRASTRUCTURE
function renderPanel3Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1f2d35' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1080, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="22" letter-spacing="3" text-anchor="end">03 // SECURITY &amp; DATA NETWORKS</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">نظارت تصویری و زیرساخت شبکه</text>
      <text x="0" y="100" fill="${textSecondary}" class="vazir-reg" font-size="22" text-anchor="end">حفاظت پیرامونی هوشمند و بستر ارتباطی فوق‌سریع سازمانی</text>
      <line x1="-1010" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Image Stage -->
    <g transform="translate(70, 310)">
      <rect width="1020" height="620" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <g clip-path="url(#clip-p3-hero)">
        <image href="${imgSecurity}" width="1020" height="620" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="25" y="545" width="970" height="50" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="578" fill="${textPrimary}" class="vazir-bold" font-size="20" text-anchor="end">دوربین‌های مداربسته هوش مصنوعی، اتاق‌های کنترل و مانیتورینگ متمرکز</text>
      <text x="50" y="578" fill="${accent}" class="space-bold" font-size="16" text-anchor="start">AI CCTV &amp; MONITORING</text>
    </g>

    <!-- Core Focus 1: CCTV & Physical Security -->
    <g transform="translate(70, 970)">
      <rect width="1020" height="580" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="52" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">سیستم‌های نظارت تصویری و امنیت فیزیکی (CCTV &amp; Surveillance)</text>
      <text x="970" y="86" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">INTELLIGENT SURVEILLANCE &amp; PERIMETER PROTECTION</text>

      <g transform="translate(0, 120)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">دوربین‌های تحت شبکه (IP CCTV) با تحلیل هوشمند تصاویر</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">رزولوشن‌های 4K، تشخیص چهره، پلاک‌خوان هوشمند (LPR) و اعلام ورود غیرمجاز با پردازش در لبه.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">سرورهای ذخیره‌سازی NVR/VMS و اتاق‌های مانیتورینگ</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">طراحی اتاق‌های کنترل، پیاده‌سازی ویدئو وال (Video Walls) و مدیریت دسترسی چندسطحی نگهبانی.</text>
      </g>

      <g transform="translate(0, 310)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">کنترل تردد بیومتریک و اعلام حریق و سرقت</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">قفل‌های مغناطیسی، گیت‌های تردد، سنسورهای اعلام سرقت پیرامونی و یکپارچه‌سازی با سامانه اعلان حریق.</text>
      </g>

      <g transform="translate(0, 405)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">انتقال تصویر پایدار بدون قطعی و کاملاً امن</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">مشاهده مستقیم تصاویر بر روی گوشی و تبلت با پروتکل‌های امن P2P و IP استاتیک بدون نشت اطلاعات.</text>
      </g>
    </g>

    <!-- Core Focus 2: Network Infrastructure -->
    <g transform="translate(70, 1590)">
      <rect width="1020" height="580" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="52" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">زیرساخت شبکه پسیو و اکتیو (Network Infrastructure)</text>
      <text x="970" y="86" fill="${accent}" class="space-bold" font-size="17" text-anchor="end">STRUCTURED CABLING &amp; ENTERPRISE ACTIVE NETWORKING</text>

      <g transform="translate(0, 120)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">کابل‌کشی ساخت‌یافته مس (Cat6A / Cat7) و آرایش رک</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">نصب استاندارد ترانکینگ، پچ‌پنل، برچسب‌گذاری مهندسی و ارائه تست فلوک معتبر برای تمامی نودها.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">تجهیزات اکتیو سازمانی (Cisco &amp; MikroTik)</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">پیکربندی سوئیچ‌های مدیریتی لایه ۲ و ۳، روترهای مرزی، توزیع بار (Load Balancing) و تجمیع خطوط اینترنت.</text>
      </g>

      <g transform="translate(0, 310)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">امنیت شبکه، فایروال و اتصال امن شعب (Site-to-Site VPN)</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">ایزوله‌سازی ترافیک با VLAN، فایروال‌های سخت‌افزاری و برقراری ارتباط دفاتر راه دور با پایداری کامل.</text>
      </g>

      <g transform="translate(0, 405)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">وای‌فای سازمانی با رومینگ یکپارچه و بدون نقطه کور</text>
        <text x="945" y="56" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">پوشش سراسری در طبقات با مدیریت کنترلر متمرکز و قابلیت جابجایی آزاد کاربران (Seamless Roaming).</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(70, 2240)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="${cardBorder}" stroke-width="2" />
      <text x="1020" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="20" text-anchor="start">PAGE // 03</text>
    </g>
  `;
}

// PAGE 4: FIBER OPTIC & VOIP CENTERS + SERVERS
function renderPanel4Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1f2d35' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1080, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="22" letter-spacing="3" text-anchor="end">04 // FIBER OPTIC, VOIP &amp; SERVERS</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">فیبر نوری، VoIP و پلتفرم‌های سرور</text>
      <text x="0" y="100" fill="${textSecondary}" class="vazir-reg" font-size="22" text-anchor="end">پهنای‌باند نوری، ارتباطات صوتی یکپارچه و تاب‌آوری مراکز داده</text>
      <line x1="-1010" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Image Stage -->
    <g transform="translate(70, 310)">
      <rect width="1020" height="620" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <g clip-path="url(#clip-p4-hero)">
        <image href="${imgCabling}" width="1020" height="620" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="25" y="545" width="970" height="50" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="578" fill="${textPrimary}" class="vazir-bold" font-size="20" text-anchor="end">کابل‌کشی فیبر نوری FTTH، پچ‌پنل‌های نوری و کلاسترهای مجازی‌سازی سرور</text>
      <text x="50" y="578" fill="${accent}" class="space-bold" font-size="16" text-anchor="start">OPTICAL &amp; VOIP FABRIC</text>
    </g>

    <!-- Pillar 1: Fiber Optics FTTH -->
    <g transform="translate(70, 970)">
      <rect width="1020" height="390" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">زیرساخت‌های فیبر نوری (FTTH / FTTB Fiber Optics)</text>
      <text x="970" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">HIGH-SPEED GIGABIT BACKBONES &amp; CABLING</text>

      <g transform="translate(0, 115)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">اجرای پروژه‌های فیبر نوری تا واحد (FTTH) و ساختمان (FTTB)</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">مسیرسازی تخصصی فیبر نوری، فیوژن با دستگاه‌های ژاپنی اتوماتیک و تست سلامت تارها با دستگاه OTDR.</text>
      </g>

      <g transform="translate(0, 205)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">بک‌بون‌های ارتباطی نوری میان ساختمان‌ها و رک‌های اصلی</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">انتقال ترافیک با سرعت‌های 10G/40G بدون تداخل الکترومغناطیسی با بالاترین مصونیت در برابر نویز محیطی.</text>
      </g>

      <g transform="translate(0, 295)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">تجهیزات انتهایی نوری OLT، ONT و پچ‌کوردهای زره‌دار</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">تأمین و کانفیگ کامل تجهیزات پسیو و اکتیو نوری برای مجتمع‌های مسکونی، برج‌ها و شهرک‌های اداری.</text>
      </g>
    </g>

    <!-- Pillar 2: VoIP Systems -->
    <g transform="translate(70, 1390)">
      <rect width="1020" height="420" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">مراکز تلفن ویپ سازمانی (VoIP &amp; Unified Communications)</text>
      <text x="970" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">ENTERPRISE TELEPHONY, SIP TRUNKS &amp; IVR</text>

      <g transform="translate(0, 115)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">راه‌اندازی سرورهای تلفنی VoIP (ایزابل، الستیکس و FreePBX)</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">مهاجرت از خطوط قدیمی آنالوگ به سیستم‌های مدرن تحت شبکه با کاهش چشمگیر هزینه‌های مکالمات سازمانی.</text>
      </g>

      <g transform="translate(0, 205)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">اتصال خطوط سیپ‌ترانک مخابرات (SIP Trunk) و منشی هوشمند</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">پاسخگویی به ده‌ها تماس همزمان، منشی تلفنی چندسطحی (IVR)، صف‌های پاسخگویی و گزارش‌گیری پیشرفته.</text>
      </g>

      <g transform="translate(0, 295)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">تلفن‌های تحت شبکه رومیزی، هدست‌ها و داخلی روی موبایل</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">امکان پاسخگویی به داخلی سازمانی در هر نقطه از دنیا از طریق نرم‌افزارهای امن موبایل و لپ‌تاپ.</text>
      </g>
    </g>

    <!-- Pillar 3: Servers & UPS -->
    <g transform="translate(70, 1840)">
      <rect width="1020" height="340" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <text x="970" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">مدیریت سرور، مجازی‌سازی و برق اضطراری (UPS)</text>
      <text x="970" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">SERVER VIRTUALIZATION &amp; POWER RESILIENCY</text>

      <g transform="translate(0, 115)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پیکربندی سرورهای HP ProLiant و مجازی‌سازی VMware ESXi</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">بهینه‌سازی منابع سخت‌افزاری، استقرار ماشین‌های مجازی، سیستم‌های اکتیودایرکتوری و بکاپ‌گیری Veeam.</text>
      </g>

      <g transform="translate(0, 205)">
        <circle cx="975" cy="18" r="9" fill="${accent}" />
        <text x="945" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">منابع برق اضطراری (UPS) و پایش شرایط محیطی اتاق سرور</text>
        <text x="945" y="54" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">محاسبه دقیق توان مصرفی، نصب یو‌پی‌اس‌های صنعتی آنلاین و حسگرهای دما جهت پیشگیری از صدمات خاموشی.</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(70, 2240)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="${cardBorder}" stroke-width="2" />
      <text x="1020" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="20" text-anchor="start">PAGE // 04</text>
    </g>
  `;
}

// PAGE 5: 4-STEP SERVICE MODEL (مدل خدمات ۴ مرحله‌ای نُوَند)
function renderPanel5Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1f2d35' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1080, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="22" letter-spacing="3" text-anchor="end">05 // 4-STEP SOLUTION PROCESS</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">مدل فرآیند خدمات ۴ مرحله‌ای نُـوَند</text>
      <text x="0" y="100" fill="${textSecondary}" class="vazir-reg" font-size="22" text-anchor="end">از تحلیل و تأمین تا اجرا و پشتیبانی مادام‌العمر</text>
      <line x1="-1010" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Visual Banner -->
    <g transform="translate(70, 310)">
      <rect width="1020" height="340" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <g clip-path="url(#clip-p5-hero)">
        <image href="${imgBusiness}" width="1020" height="340" preserveAspectRatio="xMidYMid slice" opacity="${isDark ? '0.75' : '0.9'}" />
        <rect width="1020" height="340" fill="${isDark ? 'rgba(11,16,19,0.55)' : 'rgba(255,255,255,0.2)'}" />
      </g>
      <rect x="40" y="40" width="940" height="260" rx="14" fill="${cardBg}" opacity="0.95" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="940" y="95" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">چرخه مهندسی بدون شکاف؛ پاسخگویی تک‌منبعی</text>
      <text x="940" y="145" fill="${textBody}" class="vazir-reg" font-size="21" text-anchor="end">ما مسئولیت تمام فازهای پروژه را بر عهده می‌گیریم. عدم نیاز به ارتباط با پیمانکاران متعدد</text>
      <text x="940" y="185" fill="${textBody}" class="vazir-reg" font-size="21" text-anchor="end">باعث سرعت بالا، کاهش هزینه‌ها و تضمین تطابق کامل استانداردها می‌شود.</text>
      <text x="940" y="240" fill="${accent}" class="space-bold" font-size="20" text-anchor="end">AUDIT · SUPPLY · IMPLEMENT · SUPPORT</text>
    </g>

    <!-- Step 1: مشاوره -->
    <g transform="translate(70, 680)">
      <rect width="1020" height="350" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <rect x="910" y="30" width="80" height="80" rx="16" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="2" />
      <text x="950" y="85" fill="${accent}" class="vazir-bold" font-size="44" text-anchor="middle">۰۱</text>
      
      <text x="880" y="65" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="end">مشاوره و تحلیل نیازها (Consultation &amp; Audit)</text>
      <text x="880" y="100" fill="${accent}" class="space-bold" font-size="18" text-anchor="end">COMPREHENSIVE DISCOVERY &amp; SITE ASSESSMENT</text>
      
      <text x="960" y="160" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">بازدید حضوری از محل پروژه، تحلیل محدودیت‌های فیزیکی، ممیزی کابل‌کشی و برآورد پهنای‌باند مصرفی.</text>
      <text x="960" y="195" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">جلسات تخصصی با کارفرما جهت شفاف‌سازی نیازمندی‌ها و جلوگیری از هزینه‌های غیرضروری بعدی.</text>
      
      <rect x="30" y="235" width="960" height="85" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="950" y="285" fill="${accent}" class="vazir-bold" font-size="19" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="730" y="285" fill="${textPrimary}" class="vazir-reg" font-size="19" text-anchor="end">گزارش ممیزی فنی سایت · تحلیل الزامات امنیتی · طرح اقتصادی بهینه</text>
    </g>

    <!-- Step 2: تأمین تجهیزات -->
    <g transform="translate(70, 1060)">
      <rect width="1020" height="350" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <rect x="910" y="30" width="80" height="80" rx="16" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="2" />
      <text x="950" y="85" fill="${accent}" class="vazir-bold" font-size="44" text-anchor="middle">۰۲</text>
      
      <text x="880" y="65" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="end">تأمین تجهیزات اصلی و تخصصی (Equipment Supply)</text>
      <text x="880" y="100" fill="${accent}" class="space-bold" font-size="18" text-anchor="end">DIRECT SOURCING &amp; GENUINE HARDWARE PROCUREMENT</text>
      
      <text x="960" y="160" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">تأمین بدون واسطه قطعات اصلی از معتبرترین برندهای جهانی (Cisco, MikroTik, Dahua, Hikvision, HP, Nexans).</text>
      <text x="960" y="195" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">ارائه ضمانت‌نامه کتبی اصالت تجهیزات و گارانتی رسمی، متناسب با بودجه تعریف‌شده کارفرما.</text>
      
      <rect x="30" y="235" width="960" height="85" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="950" y="285" fill="${accent}" class="vazir-bold" font-size="19" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="730" y="285" fill="${textPrimary}" class="vazir-reg" font-size="19" text-anchor="end">لیست مهندسی قطعات (BOM) · تضمین اصالت ۱۰۰٪ کالا · قیمت رقابتی</text>
    </g>

    <!-- Step 3: اجرا و پیاده‌سازی -->
    <g transform="translate(70, 1440)">
      <rect width="1020" height="350" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <rect x="910" y="30" width="80" height="80" rx="16" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="2" />
      <text x="950" y="85" fill="${accent}" class="vazir-bold" font-size="44" text-anchor="middle">۰۳</text>
      
      <text x="880" y="65" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="end">اجرا و پیاده‌سازی استاندارد (Implementation)</text>
      <text x="880" y="100" fill="${accent}" class="space-bold" font-size="18" text-anchor="end">STANDARD COMMISSIONING &amp; FIELD DEPLOYMENT</text>
      
      <text x="960" y="160" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">کابل‌کشی اصولی، ترانکینگ، فیوژن فیبر نوری، آرایش دقیق رک‌ها و استقرار سرورها و سوئیچ‌ها.</text>
      <text x="960" y="195" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">کانفیگ تخصصی نرم‌افزاری، امن‌سازی فریم‌ورها، اعمال پالیسی‌های شبکه و انجام تست‌های زیر بار نهایی.</text>
      
      <rect x="30" y="235" width="960" height="85" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="950" y="285" fill="${accent}" class="vazir-bold" font-size="19" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="730" y="285" fill="${textPrimary}" class="vazir-reg" font-size="19" text-anchor="end">تست فلوک کابل‌کشی · نقشه‌های دقیق As-Built · صورت‌جلسه تست تحویل</text>
    </g>

    <!-- Step 4: پشتیبانی و نگهداری -->
    <g transform="translate(70, 1820)">
      <rect width="1020" height="350" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <rect x="910" y="30" width="80" height="80" rx="16" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="2" />
      <text x="950" y="85" fill="${accent}" class="vazir-bold" font-size="44" text-anchor="middle">۰۴</text>
      
      <text x="880" y="65" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="end">پشتیبانی و نگهداری مستمر (Ongoing Support &amp; SLA)</text>
      <text x="880" y="100" fill="${accent}" class="space-bold" font-size="18" text-anchor="end">PROACTIVE MONITORING &amp; SLA-BACKED RESPONSE</text>
      
      <text x="960" y="160" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">پایش دوره‌ای سلامت سرورها، به‌روزرسانی مداوم فریم‌ورها، بکاپ‌گیری و رفع اشکال فوری به صورت حضوری و آنلاین.</text>
      <text x="960" y="195" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">پاسخگویی سریع به حوادث طبق توافق‌نامه سطح خدمات (SLA) جهت حفظ پایداری دائمی سازمان.</text>
      
      <rect x="30" y="235" width="960" height="85" rx="12" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="950" y="285" fill="${accent}" class="vazir-bold" font-size="19" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="730" y="285" fill="${textPrimary}" class="vazir-reg" font-size="19" text-anchor="end">پاسخگویی سریع مبتنی بر SLA · مانیتورینگ پیشگیرانه · آرامش خاطر کارفرما</text>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(70, 2240)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="${cardBorder}" stroke-width="2" />
      <text x="1020" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="20" text-anchor="start">PAGE // 05</text>
    </g>
  `;
}

// PAGE 6: BACK COVER (جلد پشت بروشور و راه‌های ارتباطی)
function renderPanel6Content(theme, qrInnerSvg) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1f2d35' : '#e2e8f0';
  const strokeCore = isDark ? '#ffffff' : '#0f172a';
  const fillDot = isDark ? '#0b1013' : '#ffffff';

  return `
    <!-- Top Header -->
    <g transform="translate(1080, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="22" letter-spacing="3" text-anchor="end">06 // CONTACT &amp; CONSULTATION</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">ارتباط مستقیم و شروع پروژه</text>
      <text x="0" y="100" fill="${textSecondary}" class="vazir-reg" font-size="22" text-anchor="end">مشاوره تخصصی حضوری، بازدید از محل و استعلام قیمت</text>
      <line x1="-1010" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Company Lockup Card -->
    <g transform="translate(70, 310)">
      <rect width="1020" height="210" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      <g transform="translate(970, 45)">
        ${getNovandEmblemMarkup({ scale: 1.25, strokeCore, glowId: `brochure-grad-${theme}`, fillDot })}
      </g>
      <text x="815" y="85" fill="${textPrimary}" class="vazir-bold" font-size="40" text-anchor="end">نُـوَند | NOVAND</text>
      <text x="815" y="125" fill="${accent}" class="vazir-bold" font-size="21" text-anchor="end">راهکارهای جامع فناوری، هوشمندسازی، نظارت تصویری و شبکه</text>
      <text x="815" y="165" fill="${textSecondary}" class="space-bold" font-size="17" letter-spacing="1" text-anchor="end">ENGINEERING SYSTEMS &amp; INFRASTRUCTURE INTEGRATION</text>
    </g>

    <!-- Contact Details Card -->
    <g transform="translate(70, 560)">
      <rect width="1020" height="780" rx="18" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      
      <!-- Primary Phone (Mahmoud Ahmadi) -->
      <g transform="translate(0, 50)">
        <rect x="910" y="0" width="70" height="70" rx="16" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <!-- Phone icon -->
        <path d="M952 28v5a3 3 0 0 1-3.27 3 29.7 29.7 0 0 1-13-4.6 29.2 29.2 0 0 1-9-9 29.7 29.7 0 0 1-4.6-13A3 3 0 0 1 925 6h5a3 3 0 0 1 3 2.6 19.3 19.3 0 0 0 1 4.2 3 3 0 0 1-.7 3.2l-1.9 1.9a24 24 0 0 0 9 9l1.9-1.9a3 3 0 0 1 3.2-.7 19.3 19.3 0 0 0 4.2 1 3 3 0 0 1 2.6 3z" fill="${accent}" />
        
        <text x="880" y="32" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">مدیر فنی و مشاوره مهندسی:</text>
        <text x="880" y="64" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">مهندس محمود احمدی</text>
        <text x="60" y="48" fill="${accent}" class="space-bold" font-size="34" letter-spacing="2" text-anchor="start">0912 932 1550</text>
      </g>
      <line x1="60" y1="160" x2="960" y2="160" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Secondary Phone (Hesamoddin Ashari) -->
      <g transform="translate(0, 195)">
        <rect x="910" y="0" width="70" height="70" rx="16" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <path d="M952 28v5a3 3 0 0 1-3.27 3 29.7 29.7 0 0 1-13-4.6 29.2 29.2 0 0 1-9-9 29.7 29.7 0 0 1-4.6-13A3 3 0 0 1 925 6h5a3 3 0 0 1 3 2.6 19.3 19.3 0 0 0 1 4.2 3 3 0 0 1-.7 3.2l-1.9 1.9a24 24 0 0 0 9 9l1.9-1.9a3 3 0 0 1 3.2-.7 19.3 19.3 0 0 0 4.2 1 3 3 0 0 1 2.6 3z" fill="${accent}" />
        
        <text x="880" y="32" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">هماهنگی پروژه‌ها و پشتیبانی:</text>
        <text x="880" y="64" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">حسام‌الدین اشعری</text>
        <text x="60" y="48" fill="${textPrimary}" class="space-bold" font-size="34" letter-spacing="2" text-anchor="start">0919 691 8758</text>
      </g>
      <line x1="60" y1="305" x2="960" y2="305" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Instagram -->
      <g transform="translate(0, 340)">
        <rect x="910" y="0" width="70" height="70" rx="16" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <!-- Instagram icon -->
        <rect x="930" y="20" width="30" height="30" rx="8" fill="none" stroke="${accent}" stroke-width="3" />
        <circle cx="945" cy="35" r="7" fill="none" stroke="${accent}" stroke-width="3" />
        <circle cx="953" cy="27" r="1.5" fill="${accent}" />

        <text x="880" y="32" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">صفحه رسمی اینستاگرام:</text>
        <text x="880" y="64" fill="${textPrimary}" class="vazir-bold" font-size="24" text-anchor="end">نمونه پروژه‌های اجرایی، آموزش‌ها و ویدیوها</text>
        <text x="60" y="48" fill="${accent}" class="space-bold" font-size="30" letter-spacing="1" text-anchor="start">@novand_tech</text>
      </g>
      <line x1="60" y1="450" x2="960" y2="450" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Email -->
      <g transform="translate(0, 485)">
        <rect x="910" y="0" width="70" height="70" rx="16" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <!-- Mail icon -->
        <rect x="928" y="24" width="34" height="24" rx="4" fill="none" stroke="${accent}" stroke-width="3" />
        <path d="M928 27l17 11 17-11" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" />

        <text x="880" y="32" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">مکاتبات رسمی و ارسال نقشه‌ها:</text>
        <text x="880" y="64" fill="${textPrimary}" class="vazir-bold" font-size="24" text-anchor="end">دریافت استعلام قیمت و اسناد مناقصه</text>
        <text x="60" y="48" fill="${textPrimary}" class="space-bold" font-size="26" letter-spacing="1" text-anchor="start">novand.info@gmail.com</text>
      </g>
      <line x1="60" y1="595" x2="960" y2="595" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Address -->
      <g transform="translate(0, 630)">
        <rect x="910" y="0" width="70" height="70" rx="16" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <!-- Pin icon -->
        <path d="M945 18c-7.7 0-14 6.3-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="${accent}" />

        <text x="880" y="30" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">نشانی دفتر مرکزی نُـوَند:</text>
        <text x="880" y="62" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی</text>
        <text x="880" y="94" fill="${textPrimary}" class="vazir-bold" font-size="22" text-anchor="end">بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷</text>
      </g>
    </g>

    <!-- Prominent QR Code Section -->
    <g transform="translate(70, 1380)">
      <rect width="1020" height="480" rx="20" fill="${cardBg}" stroke="${cardBorder}" stroke-width="2" />
      
      <!-- QR Box Left -->
      <g transform="translate(60, 45)">
        <rect width="390" height="390" rx="16" fill="#ffffff" stroke="${accent}" stroke-width="3" />
        <svg x="25" y="25" width="340" height="340" viewBox="0 0 31 31" shape-rendering="crispEdges">
          ${qrInnerSvg}
        </svg>
      </g>

      <!-- Text Callout Right -->
      <g transform="translate(500, 60)">
        <rect x="0" y="0" width="460" height="42" rx="10" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
        <text x="440" y="28" fill="${accent}" class="space-bold" font-size="18" letter-spacing="1" text-anchor="end">SCAN TO CONNECT // DIGITAL CARD</text>
        
        <text x="460" y="90" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="end">اسکن سریع برای دسترسی آنی</text>
        <text x="460" y="135" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">با اسکن بارکد روبه‌رو از طریق دوربین گوشی:</text>
        <text x="460" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">• ذخیره مستقیم کارت ویزیت در مخاطبین تلفن</text>
        <text x="460" y="220" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">• مسیریابی آسان به مقصد شرکت در نشان، بلد و گوگل</text>
        <text x="460" y="260" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">• شروع گفت‌وگوی مستقیم در واتس‌اپ و تلگرام</text>
        <text x="460" y="300" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">• مشاهده سوابق پروژه‌ها و پورتفولیوی آنلاین</text>

        <rect x="0" y="335" width="460" height="50" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
        <text x="440" y="368" fill="${accent}" class="space-bold" font-size="20" text-anchor="end">novand-tech.com/card</text>
      </g>
    </g>

    <!-- Bottom CTA Bar -->
    <g transform="translate(70, 1900)">
      <rect width="1020" height="280" rx="18" fill="url(#brochure-grad-${theme})" opacity="${isDark ? '0.15' : '0.12'}" stroke="${accent}" stroke-width="2" />
      <text x="960" y="70" fill="${textPrimary}" class="vazir-bold" font-size="34" text-anchor="end">آماده‌اید پروژه بعدی خود را مهندسی کنیم؟</text>
      <text x="960" y="125" fill="${textBody}" class="vazir-reg" font-size="22" text-anchor="end">جهت تعیین وقت بازدید کارشناسی رایگان از محل و بررسی نقشه‌های معماری،</text>
      <text x="960" y="170" fill="${textBody}" class="vazir-reg" font-size="22" text-anchor="end">هم‌اکنون با شماره مستقیم <tspan fill="${accent}" class="space-bold" font-weight="bold">0912 932 1550</tspan> تماس حاصل فرمایید.</text>
      <text x="960" y="235" fill="${accent}" class="space-bold" font-size="22" letter-spacing="1" text-anchor="end">NOVAND ENGINEERING · SAADAT ABAD, TEHRAN</text>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(70, 2240)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="${cardBorder}" stroke-width="2" />
      <text x="1020" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="20" text-anchor="start">PAGE // 06 (BACK COVER)</text>
    </g>
  `;
}

// 6. Generate Standalone 1-Page SVG (Dimensions: 1169 x 2480)
function generatePageSvg({ pageNumber, theme, qrInnerSvg }) {
  const isDark = theme === 'dark';
  const bgCanvas = isDark ? '#0b1013' : '#ffffff';
  const borderMargin = isDark ? '#1a242a' : '#e2e8f0';

  let contentMarkup = '';
  switch (pageNumber) {
    case 1: contentMarkup = renderPanel1Content(theme); break;
    case 2: contentMarkup = renderPanel2Content(theme); break;
    case 3: contentMarkup = renderPanel3Content(theme); break;
    case 4: contentMarkup = renderPanel4Content(theme); break;
    case 5: contentMarkup = renderPanel5Content(theme); break;
    case 6: contentMarkup = renderPanel6Content(theme, qrInnerSvg); break;
  }

  return `<svg width="1169" height="2480" viewBox="0 0 1169 2480" fill="none" xmlns="http://www.w3.org/2000/svg" direction="rtl">
    ${getSharedDefs(theme)}
    <!-- Base Background Canvas -->
    <rect width="1169" height="2480" fill="${bgCanvas}" />
    <rect x="25" y="25" width="1119" height="2430" rx="16" fill="${bgCanvas}" stroke="${borderMargin}" stroke-width="2" />
    ${contentMarkup}
  </svg>`;
}

// 7. Generate Tri-Fold 3-Panel Print Spread SVG (Dimensions: 3508 x 2480 = A4 Landscape at 300 DPI)
// Outside Spread: Panel 5 (Left), Panel 6 (Center), Panel 1 (Right)
// Inside Spread: Panel 4 (Left), Panel 3 (Center), Panel 2 (Right)
function generateSpreadSvg({ spreadType, theme, qrInnerSvg }) {
  const isDark = theme === 'dark';
  const bgCanvas = isDark ? '#0b1013' : '#ffffff';
  const foldColor = isDark ? '#23343d' : '#cbd5e1';

  let leftContent = '';
  let centerContent = '';
  let rightContent = '';
  let spreadTitle = '';

  if (spreadType === 'outside') {
    spreadTitle = 'OUTSIDE SPREAD // SHEET 1 (PANELS 5 - 6 - 1)';
    leftContent = renderPanel5Content(theme);
    centerContent = renderPanel6Content(theme, qrInnerSvg);
    rightContent = renderPanel1Content(theme);
  } else {
    spreadTitle = 'INSIDE SPREAD // SHEET 2 (PANELS 4 - 3 - 2)';
    leftContent = renderPanel4Content(theme);
    centerContent = renderPanel3Content(theme);
    rightContent = renderPanel2Content(theme);
  }

  return `<svg width="3508" height="2480" viewBox="0 0 3508 2480" fill="none" xmlns="http://www.w3.org/2000/svg" direction="rtl">
    ${getSharedDefs(theme)}
    <!-- Base Canvas -->
    <rect width="3508" height="2480" fill="${bgCanvas}" />

    <!-- Left Panel (X: 0 to 1169) -->
    <g transform="translate(0, 0)">
      ${leftContent}
    </g>

    <!-- Fold Line 1 (X = 1169) -->
    <g transform="translate(1169, 0)">
      <line x1="0" y1="40" x2="0" y2="2440" stroke="${foldColor}" stroke-dasharray="14 14" stroke-width="2" />
      <text x="25" y="80" fill="${foldColor}" class="space-med" font-size="14" transform="rotate(90, 25, 80)">FOLD LINE // خط تا</text>
    </g>

    <!-- Center Panel (X: 1169 to 2338) -->
    <g transform="translate(1169, 0)">
      ${centerContent}
    </g>

    <!-- Fold Line 2 (X = 2338) -->
    <g transform="translate(2338, 0)">
      <line x1="0" y1="40" x2="0" y2="2440" stroke="${foldColor}" stroke-dasharray="14 14" stroke-width="2" />
      <text x="25" y="80" fill="${foldColor}" class="space-med" font-size="14" transform="rotate(90, 25, 80)">FOLD LINE // خط تا</text>
    </g>

    <!-- Right Panel (X: 2338 to 3508) -->
    <g transform="translate(2338, 0)">
      ${rightContent}
    </g>

    <!-- Print Crop / Metadata Marker -->
    <text x="1754" y="2465" fill="${foldColor}" class="space-med" font-size="16" text-anchor="middle">A4 PRINT SPREAD (297 x 210 mm) · 300 DPI · ${spreadTitle} · NOVAND TECH</text>
  </svg>`;
}

// 8. Generate Showcase Mockup SVG (Dimensions: 1920 x 1080)
function generateShowcaseMockupSvg({ theme, qrInnerSvg }) {
  const isDark = theme === 'dark';
  const bgCanvas = isDark ? '#080d0f' : '#f1f5f9';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBorder = isDark ? '#1a242a' : '#cbd5e1';

  return `<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" direction="rtl">
    ${getSharedDefs(theme)}
    <!-- Background Canvas with Subtle Ambient Radial Glow -->
    <rect width="1920" height="1080" fill="${bgCanvas}" />
    <circle cx="960" cy="540" r="700" fill="${accent}" opacity="${isDark ? '0.04' : '0.03'}" />

    <!-- Top Showcase Header -->
    <g transform="translate(960, 70)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="16" letter-spacing="4" text-anchor="middle">OFFICIAL PRINT SPECIFICATION // A4 6-PAGE BOOKLET &amp; TRI-FOLD</text>
      <text x="0" y="38" fill="${textPrimary}" class="vazir-bold" font-size="34" text-anchor="middle">دفترچه و بروشور تبلیغاتی ۶ صفحه‌ای نُـوَند</text>
      <text x="0" y="70" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="middle">طراحی دوپوسته رسمی (تیره / روشن) آماده چاپ افست و دیجیتال در ابعاد استاندارد A4</text>
    </g>

    <!-- 3 Isometric / Angled Showcase Panels (Cover P1, Inner P3, Back P6) -->
    <!-- Panel 1: Front Cover (Right) -->
    <g transform="translate(1300, 200) scale(0.34)">
      <rect width="1169" height="2480" rx="20" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${accent}" stroke-width="5" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.3))" />
      ${renderPanel1Content(theme)}
      <rect x="0" y="2490" width="1169" height="90" rx="16" fill="${accent}" opacity="0.2" />
      <text x="584" y="2550" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="middle">جلد روی بروشور (صفحه ۱)</text>
    </g>

    <!-- Panel 2: Inner Focus P3 (Center) -->
    <g transform="translate(760, 200) scale(0.34)">
      <rect width="1169" height="2480" rx="20" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="4" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.3))" />
      ${renderPanel3Content(theme)}
      <rect x="0" y="2490" width="1169" height="90" rx="16" fill="${cardBorder}" opacity="0.4" />
      <text x="584" y="2550" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="middle">صفحات داخلی و زیرساخت (صفحه ۳)</text>
    </g>

    <!-- Panel 3: Back Cover P6 (Left) -->
    <g transform="translate(220, 200) scale(0.34)">
      <rect width="1169" height="2480" rx="20" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="4" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.3))" />
      ${renderPanel6Content(theme, qrInnerSvg)}
      <rect x="0" y="2490" width="1169" height="90" rx="16" fill="${cardBorder}" opacity="0.4" />
      <text x="584" y="2550" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="middle">جلد پشت و اطلاعات تماس (صفحه ۶)</text>
    </g>

    <!-- Bottom Specs Ribbon -->
    <g transform="translate(960, 1020)">
      <text x="0" y="0" fill="${textSecondary}" class="vazir-reg" font-size="16" text-anchor="middle">
        اندازه چاپ: A4 بازشده (۲۹۷×۲۱۰ میلی‌متر) · رزولوشن: 300DPI · تایپوگرافی: وزیرمتن و Space Grotesk · جهت: راست‌به‌چپ (RTL)
      </text>
    </g>
  </svg>`;
}

async function main() {
  console.log('--- Generating Novand 6-Page Advertisement Brochure Assets ---');
  console.log('Generating QR code SVG...');
  const fullQrSvg = await QRCode.toString(CARD_URL, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#0d1417',
      light: '#ffffff'
    }
  });
  const qrInnerSvg = fullQrSvg.replace(/<svg[^>]*>/, '').replace('</svg>', '');
  console.log('QR Code ready.');

  const themes = ['dark', 'light'];

  for (const theme of themes) {
    console.log(`\nGenerating assets for theme: [${theme.toUpperCase()}]`);

    // 1. Spreads (Outside: Panels 5-6-1, Inside: Panels 4-3-2)
    const spreads = [
      { id: `novand-brochure-spread-outside-${theme}`, type: 'outside' },
      { id: `novand-brochure-spread-inside-${theme}`, type: 'inside' }
    ];

    for (const spread of spreads) {
      const svg = generateSpreadSvg({ spreadType: spread.type, theme, qrInnerSvg });
      const svgPath = path.join(OUTPUT_DIR, `${spread.id}.svg`);
      fs.writeFileSync(svgPath, svg, 'utf-8');
      console.log(`Saved Spread SVG: ${spread.id}.svg (${(svg.length / 1024).toFixed(1)} KB)`);

      // Rasterize spread to 300 DPI high-definition PNG
      const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 3508 },
        font: {
          loadSystemFonts: false,
          fontDirs: [FONTS_DIR],
          defaultFontFamily: 'Vazirmatn',
        },
        shapeRendering: 2,
        textRendering: 1,
        imageRendering: 1,
      });
      const pngBuffer = resvg.render().asPng();
      const pngPath = path.join(OUTPUT_DIR, `${spread.id}.png`);
      fs.writeFileSync(pngPath, pngBuffer);
      console.log(`Saved Spread 300 DPI PNG: ${spread.id}.png (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
    }

    // 2. Individual Pages (Pages 1 to 6)
    for (let p = 1; p <= 6; p++) {
      const pageId = `novand-brochure-${theme}-p${p}`;
      const svg = generatePageSvg({ pageNumber: p, theme, qrInnerSvg });
      const svgPath = path.join(OUTPUT_DIR, `${pageId}.svg`);
      fs.writeFileSync(svgPath, svg, 'utf-8');

      // Rasterize individual page to high-res PNG (1169 x 2480 px)
      const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1169 },
        font: {
          loadSystemFonts: false,
          fontDirs: [FONTS_DIR],
          defaultFontFamily: 'Vazirmatn',
        },
        shapeRendering: 2,
        textRendering: 1,
        imageRendering: 1,
      });
      const pngBuffer = resvg.render().asPng();
      const pngPath = path.join(OUTPUT_DIR, `${pageId}.png`);
      fs.writeFileSync(pngPath, pngBuffer);
      console.log(`Saved Page ${p} SVG & PNG: ${pageId} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
    }

    // 3. Showcase Mockup (for Branding page & hero previews)
    const mockupId = `novand-brochure-showcase-${theme}`;
    const mockupSvg = generateShowcaseMockupSvg({ theme, qrInnerSvg });
    const mockupSvgPath = path.join(OUTPUT_DIR, `${mockupId}.svg`);
    fs.writeFileSync(mockupSvgPath, mockupSvg, 'utf-8');

    const resvgMockup = new Resvg(mockupSvg, {
      fitTo: { mode: 'width', value: 1920 },
      font: {
        loadSystemFonts: false,
        fontDirs: [FONTS_DIR],
        defaultFontFamily: 'Vazirmatn',
      },
      shapeRendering: 2,
      textRendering: 1,
      imageRendering: 1,
    });
    const mockupPngBuffer = resvgMockup.render().asPng();
    const mockupPngPath = path.join(OUTPUT_DIR, `${mockupId}.png`);
    fs.writeFileSync(mockupPngPath, mockupPngBuffer);
    console.log(`Saved Showcase Mockup SVG & PNG: ${mockupId} (${(mockupPngBuffer.length / 1024).toFixed(1)} KB)`);
  }

  // 4. Update the novand-brand-assets.zip archive
  console.log('\nUpdating novand-brand-assets.zip to include all new brochure assets...');
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
print(f"Archive updated with {len(files)} files, size: {os.path.getsize(zip_path)} bytes")
`, 'utf-8');

  execSync(`python3 "${pyScriptPath}"`, { stdio: 'inherit' });
  try { fs.unlinkSync(pyScriptPath); } catch (e) {}
  console.log('Novand 6-Page Brochure asset generation completed successfully!');
}

main().catch((err) => {
  console.error('Error generating brochure assets:', err);
  process.exit(1);
});
