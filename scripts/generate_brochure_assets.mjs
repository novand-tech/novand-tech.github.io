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

// 4. Shared Definitions
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
      <clipPath id="clip-p1-hero"><rect width="1030" height="720" rx="16" /></clipPath>
      <clipPath id="clip-p2-hero"><rect width="1030" height="520" rx="16" /></clipPath>
      <clipPath id="clip-p3-hero"><rect width="1030" height="520" rx="16" /></clipPath>
      <clipPath id="clip-p4-hero"><rect width="1030" height="520" rx="16" /></clipPath>
      <clipPath id="clip-p5-hero"><rect width="1030" height="420" rx="16" /></clipPath>
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
  const cardBorder = isDark ? '#1e2c34' : '#e2e8f0';
  const strokeCore = isDark ? '#ffffff' : '#0f172a';
  const fillDot = isDark ? '#0b1013' : '#ffffff';

  return `
    <!-- Header Indicator -->
    <g transform="translate(1095, 140)">
      <rect x="-380" y="0" width="380" height="46" rx="23" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <circle cx="-355" cy="23" r="5" fill="${accent}" />
      <text x="-335" y="30" fill="${textSecondary}" class="space-bold" font-size="17" letter-spacing="2">ENGINEERING PROFILE</text>
    </g>

    <!-- Logo & Brand Header -->
    <g transform="translate(1095, 290)">
      <g transform="translate(-160, -80)">
        ${getNovandEmblemMarkup({ scale: 1.8, strokeCore, glowId: `brochure-grad-${theme}`, fillDot })}
      </g>
      <text x="-210" y="0" fill="${textPrimary}" class="vazir-bold" font-size="90" text-anchor="end">نُـوَند</text>
      <text x="-210" y="62" fill="${accent}" class="space-bold" font-size="34" letter-spacing="9" text-anchor="end">NOVAND</text>
    </g>

    <!-- Main Slogan & Subtitles -->
    <g transform="translate(1095, 520)">
      <text x="0" y="0" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">راهکارهای یکپارچه فناوری و مهندسی زیرساخت</text>
      <text x="0" y="55" fill="${accent}" class="space-bold" font-size="20" letter-spacing="2" text-anchor="end">INTEGRATED TECHNOLOGY &amp; INFRASTRUCTURE</text>
      <line x1="-1030" y1="95" x2="0" y2="95" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Hero Visual Stage -->
    <g transform="translate(65, 680)">
      <rect width="1030" height="720" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g clip-path="url(#clip-p1-hero)">
        <image href="${imgHeroDatacenter}" width="1030" height="720" preserveAspectRatio="xMidYMid slice" opacity="${isDark ? '0.88' : '0.96'}" />
        <rect width="1030" height="720" fill="${isDark ? 'rgba(11,16,19,0.35)' : 'rgba(0,0,0,0.08)'}" />
      </g>
      <!-- Sleek Minimal HUD Badge -->
      <rect x="25" y="25" width="280" height="44" rx="8" fill="${cardBg}" opacity="0.92" stroke="${accent}" stroke-width="1.5" />
      <text x="45" y="53" fill="${accent}" class="space-bold" font-size="17" letter-spacing="1">ENTERPRISE CONVERGENCE</text>
      
      <rect x="25" y="645" width="980" height="52" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="679" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">طراحی، تأمین تجهیزات اصلی، اجرا و پشتیبانی تخصصی</text>
      <text x="50" y="678" fill="${accent}" class="space-bold" font-size="17" text-anchor="start">SMART · CCTV · NETWORK · VOIP</text>
    </g>

    <!-- Core 4 Pillars Grid (Clean, Modern, Minimal) -->
    <g transform="translate(1095, 1490)">
      <!-- Pillar 1 -->
      <g transform="translate(0, 0)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="22" text-anchor="middle">۰۱</text>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">خانه‌ها و مجتمع‌های هوشمند</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">Smart Buildings &amp; Automation</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">کنترل هوشمند روشنایی، تهویه مطبوع و پروتکل‌های KNX</text>
      </g>

      <!-- Pillar 2 -->
      <g transform="translate(-535, 0)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="22" text-anchor="middle">۰۲</text>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">سیستم‌های نظارتی و CCTV</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">AI CCTV &amp; Physical Security</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">دوربین‌های IP 4K، هوش مصنوعی لبه و اتاق‌های مانیتورینگ</text>
      </g>

      <!-- Pillar 3 -->
      <g transform="translate(0, 205)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <text x="-50" y="58" fill="${accent}" class="vazir-bold" font-size="22" text-anchor="middle">۰۳</text>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">زیرساخت شبکه و خدمات IT</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">Enterprise Network Infrastructure</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">کابل‌کشی ساخت‌یافته مس، سوئیچینگ سیسکو و فایروال</text>
      </g>

      <!-- Pillar 4 -->
      <g transform="translate(-535, 205)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${accent}" />
        <text x="-50" y="58" fill="${isDark ? '#0d1417' : '#ffffff'}" class="vazir-bold" font-size="22" text-anchor="middle">۰۴</text>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">فیبر نوری و مراکز تلفن VoIP</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">Fiber Optics &amp; Unified VoIP</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">لینک‌های FTTH، سیپ‌ترانک، مجازی‌سازی و تله‌متری توان</text>
      </g>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(65, 2220)">
      <rect width="1030" height="105" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="62" fill="${textPrimary}" class="vazir-bold" font-size="23" text-anchor="end">پرتال رسمی و معرفی راهکارها</text>
      <text x="50" y="65" fill="${accent}" class="space-bold" font-size="28" letter-spacing="2" text-anchor="start">novand-tech.com</text>
    </g>
  `;
}

// PAGE 2: SMART LIVING, EDUCATIONAL TECH & AUTOMATION
function renderPanel2Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1e2c34' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1095, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">02 // SMART AUTOMATION &amp; SPACES</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">هوشمندسازی ساختمان، مدارس و اتوماسیون</text>
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">همگرایی معماری مدرن، اتوماسیون یکپارچه و بسترهای آموزشی</text>
      <line x1="-1030" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Image Stage -->
    <g transform="translate(65, 310)">
      <rect width="1030" height="520" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g clip-path="url(#clip-p2-hero)">
        <image href="${imgResidential}" width="1030" height="520" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="25" y="450" width="980" height="46" rx="8" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="480" fill="${textPrimary}" class="vazir-bold" font-size="19" text-anchor="end">اتوماسیون لوکس و پنهان‌سازی تجهیزات در هماهنگی کامل با طراحی معماری</text>
      <text x="45" y="480" fill="${accent}" class="space-bold" font-size="15" text-anchor="start">SMART SPACES &amp; BMS</text>
    </g>

    <!-- Card 1: Smart Homes & Buildings -->
    <g transform="translate(65, 870)">
      <rect width="1030" height="480" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">اتوماسیون ساختمان، روشنایی و تهویه (Smart Homes &amp; BMS)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">INTELLIGENT LIVING &amp; FACILITY AUTOMATION</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">کنترل هوشمند روشنایی تطبیقی، تهویه مطبوع (HVAC) و پرده‌های برقی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">مدیریت سناریوهای روشنایی، سرمایش و گرمایش بر پایه حضور افراد و سنجش دمای محیط جهت کاهش مصرف انرژی.</text>
      </g>

      <g transform="translate(0, 200)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پروتکل‌های استاندارد جهانی (KNX, Zigbee, Modbus)</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">معماری باز و بدون وابستگی انحصاری به برندها با قابلیت یکپارچه‌سازی با برترین برندهای تجهیزات هوشمند جهان.</text>
      </g>

      <g transform="translate(0, 285)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سیستم‌های صوتی چندناحیه‌ای (Multi-Zone Audio)</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">پخش موسیقی اختصاصی و مدیریت استریم در زون‌های مختلف ساختمان به شکل بی‌سیم و تحت شبکه یکپارچه.</text>
      </g>

      <g transform="translate(0, 370)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">داشبوردهای مدیریتی روی تاچ‌پنل‌های دیواری و کنترل امن از راه دور</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">نظارت و مدیریت کامل وضعیت فضا بر روی تبلت‌های دیواری و اپلیکیشن موبایل با رمزنگاری پیشرفته داده‌ها.</text>
      </g>
    </g>

    <!-- Card 2: Smart Schools & Educational Tech -->
    <g transform="translate(65, 1380)">
      <rect width="1030" height="420" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">تجهیز و هوشمندسازی مدارس و مراکز آموزشی (Smart Schools)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">INTERACTIVE CLASSROOMS &amp; EDUCATIONAL INFRASTRUCTURE</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">نمایشگرهای لمسی تعاملی و بردهای هوشمند آموزشی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">تجهیز کلاس‌ها به پنل‌های لمسی با قابلیت نوشتن دیجیتال، اتصال بی‌سیم به تبلت اساتید و نمایش همزمان چندرسانه‌ای.</text>
      </g>

      <g transform="translate(0, 205)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سیستم صوتی پیجینگ هوشمند، فراخوان کلاسی و زنگ خودکار</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">زمان‌بندی هوشمند پخش آلارم، زنگ مدارس و پیام‌های صوتی مستقل در زون‌های کلاسی، راهروها و حیاط مدرسه.</text>
      </g>

      <g transform="translate(0, 295)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">بستر امن ارتباطات کلاسی، حضور و غیاب دیجیتال و شبکه وایرلس پرسرعت</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">پیکربندی شبکه وای‌فای امن با دسترسی تفکیک‌شده برای کادر آموزشی و دانش‌آموزان به همراه ثبت اتوماتیک حضور/غیاب.</text>
      </g>
    </g>

    <!-- Card 3: Environmental & Industrial Automation -->
    <g transform="translate(65, 1830)">
      <rect width="1030" height="360" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">اتوماسیون صنعتی، گلخانه‌ها و پایش محیطی (Environmental IoT)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">PRECISION SENSING &amp; ENVIRONMENTAL TELEMETRY</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پایش سنسوری بلادرنگ دما، رطوبت، گازها و روشنایی محیطی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">استقرار حسگرهای دقیق صنعتی در مراکز داده، انبارها و فضاهای حساس با ارسال اخطارهای خودکار پیامکی و آنلاین.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">اتوماسیون دقیق گلخانه‌ها، آبیاری خودکار و تهویه کنترل‌شده</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">تنظیم خودکار فن‌ها، پدهای خنک‌کننده، روشنایی مصنوعی و پمپ‌های آبیاری متناسب با جدول زیستی محصول.</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(65, 2240)">
      <line x1="0" y1="0" x2="1030" y2="0" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="1030" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="19" text-anchor="start">PAGE // 02</text>
    </g>
  `;
}

// PAGE 3: AI CCTV, SECURITY & HARDWARE ENGINEERING
function renderPanel3Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1e2c34' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1095, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">03 // SECURITY SYSTEMS &amp; HARDWARE</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">نظارت تصویری هوشمند و خدمات تخصصی سخت‌افزار</text>
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">حفاظت پیرامونی لبه هوش مصنوعی، مانیتورینگ متمرکز و عیب‌یابی بردهای الکترونیکی</text>
      <line x1="-1030" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Image Stage -->
    <g transform="translate(65, 310)">
      <rect width="1030" height="520" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g clip-path="url(#clip-p3-hero)">
        <image href="${imgSecurity}" width="1030" height="520" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="25" y="450" width="980" height="46" rx="8" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="480" fill="${textPrimary}" class="vazir-bold" font-size="19" text-anchor="end">دوربین‌های مداربسته هوش مصنوعی، اتاق‌های کنترل و مانیتورینگ متمرکز سازمانی</text>
      <text x="45" y="480" fill="${accent}" class="space-bold" font-size="15" text-anchor="start">AI CCTV &amp; MONITORING</text>
    </g>

    <!-- Card 1: AI CCTV & Surveillance -->
    <g transform="translate(65, 870)">
      <rect width="1030" height="580" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">سیستم‌های نظارت تصویری و حفاظت پیرامونی (AI CCTV &amp; Security)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">INTELLIGENT SURVEILLANCE &amp; PERIMETER PROTECTION</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">دوربین‌های تحت شبکه (IP CCTV) با تحلیل هوشمند تصاویر در لبه</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">رزولوشن‌های 4K، تشخیص چهره، پلاک‌خوان هوشمند (LPR) و خطوط فرضی هشدار با دید در شب رنگی فوق‌پیشرفته.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سرورهای ذخیره‌سازی NVR/VMS و اتاق‌های مانیتورینگ متمرکز</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">طراحی اتاق‌های کنترل، پیاده‌سازی دیوارهای ویدئویی (Video Walls) و مدیریت سطوح دسترسی نگهبانی و حراست.</text>
      </g>

      <g transform="translate(0, 315)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سامانه‌های کنترل تردد بیومتریک و اعلام حریق و سرقت</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">قفل‌های مغناطیسی، گیت‌های تردد پرسنل با کارت، اثر انگشت و چهره و یکپارچه‌سازی با سامانه اعلام سرقت و حریق.</text>
      </g>

      <g transform="translate(0, 415)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">انتقال تصویر پایدار، بدون قطعی و کاملاً امن</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">مشاهده مستقیم تصاویر دوربین‌ها روی گوشی و تبلت با پروتکل‌های امن اختصاصی بدون قطعی و نشت داده.</text>
      </g>
    </g>

    <!-- Card 2: Hardware Repair & Maintenance -->
    <g transform="translate(65, 1490)">
      <rect width="1030" height="700" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">تعمیرات تخصصی و سرویس سخت‌افزار (Hardware Repair &amp; Maintenance)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">COMPONENT-LEVEL DIAGNOSTICS &amp; WORKSTATION SERVICING</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">عیب‌یابی فوق‌تخصصی و تعمیر بردهای الکترونیکی در سطح کامپوننت</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">بررسی دقیق المان‌های مدار، لحیم‌کاری میکروسکوپی (Micro-Soldering)، تعویض چیپ‌های BGA و احیای بردهای آسیب‌دیده.</text>
      </g>

      <g transform="translate(0, 220)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">تعمیر، بازسازی و سرویس دوره‌ای سوئیچ‌های شبکه، روترها و سرورها</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">تعمیر منابع تغذیه (Power Supplies)، فن‌ها، ماژول‌های شبکه و مادربردهای سرورهای HP و سوئیچ‌های سازمانی سیسکو.</text>
      </g>

      <g transform="translate(0, 325)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سرویس تخصصی و ارتقای کامپیوترها، ورک‌استیشن‌ها و لپ‌تاپ‌های اداری</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">ارتقای رم، حافظه‌های پرسرعت NVMe SSD، بهبود خنک‌کنندگی و سرویس دوره‌ای سخت‌افزارهای دفتری و سازمانی.</text>
      </g>

      <g transform="translate(0, 430)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">تأمین قطعات یدکی اورجینال و خدمات پشتیبانی فنی در محل کارفرما</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">تأمین بدون واسطه قطعات سخت‌افزاری اصلی با ضمانت، تست‌های استرس‌بار قطعات و اعزام کارشناس فنی جهت تعمیرات در محل.</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(65, 2240)">
      <line x1="0" y1="0" x2="1030" y2="0" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="1030" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="19" text-anchor="start">PAGE // 03</text>
    </g>
  `;
}

// PAGE 4: NETWORKS, FIBER OPTICS, VOIP & BATTERY TELEMETRY
function renderPanel4Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1e2c34' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1095, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">04 // NETWORKS, OPTICS &amp; POWER FABRIC</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">زیرساخت شبکه، فیبر نوری، ویپ و تاب‌آوری انرژی</text>
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">کابل‌کشی ساخت‌یافته، فیبر نوری، تلفن ابری و پایش تله‌متری باتری</text>
      <line x1="-1030" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Image Stage -->
    <g transform="translate(65, 310)">
      <rect width="1030" height="520" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g clip-path="url(#clip-p4-hero)">
        <image href="${imgCabling}" width="1030" height="520" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect x="25" y="450" width="980" height="46" rx="8" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="480" fill="${textPrimary}" class="vazir-bold" font-size="19" text-anchor="end">کابل‌کشی فیبر نوری FTTH، پچ‌پنل‌های نوری و کلاسترهای پردازشی سرور</text>
      <text x="45" y="480" fill="${accent}" class="space-bold" font-size="15" text-anchor="start">OPTICAL &amp; DATA FABRIC</text>
    </g>

    <!-- Card 1: Network Infrastructure -->
    <g transform="translate(65, 870)">
      <rect width="1030" height="440" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">زیرساخت شبکه پسیو و اکتیو (Enterprise Network Infrastructure)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">STRUCTURED CABLING, CISCO &amp; MIKROTIK ROUTING</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">کابل‌کشی ساخت‌یافته استاندارد مس (Cat6A / Cat7) و آزمون فلوک</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">نصب ترانکینگ استاندارد، پچ‌پنل، برچسب‌گذاری مهندسی، آرایش رک و ارائه سرتیفیکیت معتبر تست فلوک نودها.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پیکربندی تجهیزات اکتیو سازمانی (Cisco &amp; MikroTik)</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">سوئیچ‌های مدیریتی لایه ۲ و ۳، روترهای مرزی، توزیع بار اینترنت (Load Balancing) و برقراری Site-to-Site VPN.</text>
      </g>

      <g transform="translate(0, 315)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">امنیت شبکه با تفکیک VLAN و وای‌فای سازمانی با رومینگ سراسری</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">ایزوله‌سازی ترافیک مالی، اداری و مهمان، فایروال‌های سخت‌افزاری و پوشش اکسس‌پوینت‌ها با رومینگ یکپارچه.</text>
      </g>
    </g>

    <!-- Card 2: Fiber Optics & VoIP -->
    <g transform="translate(65, 1345)">
      <rect width="1030" height="420" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">زیرساخت فیبر نوری و مراکز تلفن ویپ (Fiber Optics &amp; Enterprise VoIP)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">FTTH FIBER BACKBONES &amp; UNIFIED TELEPHONY</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">اجرای لینک‌های فیبر نوری FTTH و FTTB با فیوژن دقیق و تست OTDR</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">مسیرسازی تخصصی فیبر نوری، سربندی پچ‌پنل‌ها و تضمین ارتباطات پرسرعت 10G/40G بین طبقات و ساختمان‌ها.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">راه‌اندازی سرورهای تلفنی VoIP و اتصال خطوط سیپ‌ترانک مخابرات</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">راه‌اندازی سرورهای مبتنی بر ایزابل و استریسک، خطوط مخابراتی پرظرفیت SIP Trunk و منشی تلفنی هوشمند (IVR).</text>
      </g>

      <g transform="translate(0, 315)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">داخلی‌های تلفن روی موبایل و تجهیز سالن‌های جلسات به ویدئوکنفرانس</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">پاسخگویی به تماس‌های سازمان در هر نقطه از دنیا، ضبط هوشمند مکالمات و صف‌های مدیریت ارتباط با مشتریان.</text>
      </g>
    </g>

    <!-- Card 3: Servers, Power & Battery Telemetry -->
    <g transform="translate(65, 1795)">
      <rect width="1030" height="395" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">سرورها، پایش سلامت باتری و سامانه‌های تغذیه (Virtualization &amp; Battery Telemetry)</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">SERVER VIRTUALIZATION &amp; REAL-TIME BATTERY HEALTH MONITORING</text>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پیکربندی سرورهای HP ProLiant و مجازی‌سازی منابع با VMware ESXi</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">بهینه‌سازی منابع سخت‌افزاری، استقرار ماشین‌های مجازی، سرویس‌های اکتیودایرکتوری و بکاپ‌گیری خودکار با Veeam.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پایش برخط سلامت باتری‌ها (Battery Health Telemetry) و یوپی‌اس‌های صنعتی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">محاسبه توان اضطراری، پایش لحظه‌ای مقاومت داخلی و ولتاژ سلول‌ها و پیشگیری از خاموشی ناگهانی دیتاسنترها.</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(65, 2240)">
      <line x1="0" y1="0" x2="1030" y2="0" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="1030" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="19" text-anchor="start">PAGE // 04</text>
    </g>
  `;
}

// PAGE 5: 4-STEP SERVICE MODEL, SOURCING & SOFTWARE WORKFLOWS
function renderPanel5Content(theme) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const textBody = isDark ? '#cbd5e1' : '#334155';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1e2c34' : '#e2e8f0';

  return `
    <!-- Top Header -->
    <g transform="translate(1095, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">05 // 4-STEP LIFECYCLE &amp; PROCUREMENT</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">فرآیند ۴ مرحله‌ای خدمات و تأمین قطعات</text>
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">از ارزیابی و تأمین مستقیم تا استقرار دقیق، توسعه نرم‌افزار و پشتیبانی</text>
      <line x1="-1030" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Visual Banner / Lead -->
    <g transform="translate(65, 310)">
      <rect width="1030" height="260" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g clip-path="url(#clip-p5-hero)">
        <image href="${imgBusiness}" width="1030" height="260" preserveAspectRatio="xMidYMid slice" opacity="${isDark ? '0.7' : '0.88'}" />
        <rect width="1030" height="260" fill="${isDark ? 'rgba(11,16,19,0.6)' : 'rgba(255,255,255,0.25)'}" />
      </g>
      <rect x="35" y="30" width="960" height="200" rx="12" fill="${cardBg}" opacity="0.95" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="955" y="75" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">چرخه مهندسی یکپارچه و بدون شکاف؛ پاسخگویی تک‌منبعی</text>
      <text x="955" y="118" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">ما مسئولیت تمام فازهای پروژه را بر عهده می‌گیریم؛ حذف واسطه‌ها و ارتباط مستقیم با یک تیم فنی</text>
      <text x="955" y="152" fill="${textBody}" class="vazir-reg" font-size="20" text-anchor="end">باعث سرعت بالا در اجرا، کاهش چشمگیر هزینه‌ها و تضمین تطابق کامل استانداردها می‌شود.</text>
      <text x="955" y="200" fill="${accent}" class="space-bold" font-size="18" text-anchor="end">AUDIT · SUPPLY &amp; BOM · DEPLOYMENT · SLA SUPPORT</text>
    </g>

    <!-- 4 Steps Flow (Numbered, Minimal, Impactful) -->
    <!-- Step 1: مشاوره -->
    <g transform="translate(65, 600)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۱</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">مشاوره و تحلیل نیازها (Consultation &amp; Audit)</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">COMPREHENSIVE DISCOVERY &amp; SITE ASSESSMENT</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">بازدید میدانی از پروژه، ممیزی مسیرهای کابل‌کشی و تحلیل پهنای باند مصرفی و بار الکتریکی تجهیزات.</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">جلسات تخصصی با کارفرما جهت شفاف‌سازی نیازمندی‌ها، اولویت‌بندی اجرایی و جلوگیری از هزینه‌های اضافی.</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">گزارش ممیزی فنی سایت · تحلیل بار و نیازمندی‌ها · برآورد اقتصادی بهینه</text>
    </g>

    <!-- Step 2: تأمین تجهیزات و BOM -->
    <g transform="translate(65, 935)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۲</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">تأمین تجهیزات اصلی و ساختار شکست اقلام (Sourcing &amp; BOM)</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">DIRECT SOURCING &amp; BILL OF MATERIALS ENGINEERING</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">تأمین مستقیم و بدون واسطه تجهیزات اصلی از معتبرترین برندهای بین‌المللی (Cisco, MikroTik, HP, Nexans).</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">ارائه لیست تفصیلی مهندسی خرید (BOM) همراه با ضمانت‌نامه کتبی اصالت کالا و گارانتی رسمی تعویض.</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">ساختار شکست اقلام (BOM) · تضمین اصالت ۱۰۰٪ کالا · قیمت رقابتی</text>
    </g>

    <!-- Step 3: اجرا و پیاده‌سازی -->
    <g transform="translate(65, 1270)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۳</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">اجرا و پیاده‌سازی استاندارد (Deployment &amp; Commissioning)</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">STANDARD COMMISSIONING &amp; FIELD IMPLEMENTATION</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">کابل‌کشی ساخت‌یافته، فیوژن فیبر نوری، آرایش دقیق رک‌ها و استقرار سرورها بر اساس مستندات مهندسی.</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">کانفیگ تخصصی سوئیچ‌ها، فایروال‌ها و سامانه‌های حفاظتی، امن‌سازی فریم‌ورها و تست‌های زیر بار نهایی.</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">تست فلوک معتبر کابل‌کشی · نقشه‌های دقیق As-Built · آزمون عملیاتی تحویل</text>
    </g>

    <!-- Step 4: پشتیبانی و نگهداری -->
    <g transform="translate(65, 1605)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۴</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">پشتیبانی و نگهداری مستمر (Ongoing Support &amp; SLA)</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">PROACTIVE MONITORING &amp; SLA-BACKED RESPONSE</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">پایش دوره‌ای تجهیزات، عیب‌یابی فوری حضوری و آنلاین، به‌روزرسانی مداوم فریم‌ورها و بکاپ‌گیری منظم.</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">پاسخگویی سریع بر پایه توافق‌نامه سطح خدمات (SLA) جهت اطمینان از تاب‌آوری و کارکرد ۲۴ ساعته سیستم‌ها.</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">دستاوردهای این مرحله:</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">پاسخگویی سریع بر اساس SLA · مانیتورینگ پیشگیرانه · آرامش خاطر کارفرما</text>
    </g>

    <!-- Supplementary: Software, Web & AI Workflows -->
    <g transform="translate(65, 1940)">
      <rect width="1030" height="260" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="48" fill="${textPrimary}" class="vazir-bold" font-size="24" text-anchor="end">توسعه نرم‌افزار، پرتال‌های سازمانی و گردش‌کارهای هوش مصنوعی (Software &amp; AI Workflows)</text>
      <text x="980" y="80" fill="${accent}" class="space-bold" font-size="15" text-anchor="end">ENTERPRISE WEB PLATFORMS, LINUX SYSTEMS &amp; AI-ASSISTED AUTOMATION</text>
      
      <g transform="translate(0, 105)">
        <circle cx="985" cy="16" r="7" fill="${accent}" />
        <text x="965" y="22" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">استقرار و پیکربندی سیستم‌عامل‌های سرور (Linux Enterprise / Windows Server) و راهکارهای ذخیره‌سازی داده.</text>
      </g>
      <g transform="translate(0, 150)">
        <circle cx="985" cy="16" r="7" fill="${accent}" />
        <text x="965" y="22" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">طراحی و توسعه پرتال‌های تحت وب سازمانی و یکپارچه‌سازی سامانه‌ها از طریق وب‌سرویس و رابط‌های برنامه‌نویسی API.</text>
      </g>
      <g transform="translate(0, 195)">
        <circle cx="985" cy="16" r="7" fill="${accent}" />
        <text x="965" y="22" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">بهینه‌سازی و اتوماسیون فرآیندهای داخلی سازمان‌ها با استفاده از ابزارهای مدرن و گردش‌کارهای هوش مصنوعی.</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(65, 2240)">
      <line x1="0" y1="0" x2="1030" y2="0" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="1030" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="19" text-anchor="start">PAGE // 05</text>
    </g>
  `;
}

// PAGE 6: BACK COVER (جلد پشت بروشور و راه‌های ارتباطی - Minimalist & Modern)
function renderPanel6Content(theme, qrInnerSvg) {
  const isDark = theme === 'dark';
  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#475569';
  const accent = isDark ? '#00d2b5' : '#008775';
  const cardBg = isDark ? '#121a1f' : '#f8fafc';
  const cardBorder = isDark ? '#1e2c34' : '#e2e8f0';
  const strokeCore = isDark ? '#ffffff' : '#0f172a';
  const fillDot = isDark ? '#0b1013' : '#ffffff';

  return `
    <!-- Top Header -->
    <g transform="translate(1095, 140)">
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">06 // DIRECT CONTACT &amp; INQUIRIES</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">ارتباط مستقیم و شروع پروژه</text>
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">مشاوره تخصصی حضوری، بازدید از محل و استعلام قیمت تجهیزات</text>
      <line x1="-1030" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Company Lockup Card (Modern, Minimal) -->
    <g transform="translate(65, 310)">
      <rect width="1030" height="210" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g transform="translate(980, 45)">
        ${getNovandEmblemMarkup({ scale: 1.25, strokeCore, glowId: `brochure-grad-${theme}`, fillDot })}
      </g>
      <text x="825" y="85" fill="${textPrimary}" class="vazir-bold" font-size="40" text-anchor="end">نُـوَند | NOVAND</text>
      <text x="825" y="125" fill="${accent}" class="vazir-bold" font-size="22" text-anchor="end">راهکارهای جامع فناوری، هوشمندسازی، نظارت تصویری و شبکه</text>
      <text x="825" y="165" fill="${textSecondary}" class="space-bold" font-size="16" letter-spacing="1" text-anchor="end">ENGINEERING SYSTEMS &amp; INFRASTRUCTURE INTEGRATION</text>
    </g>

    <!-- Contact Details Card (Exclusively Mahmoud Ahmadi, Clean & Elegant) -->
    <g transform="translate(65, 560)">
      <rect width="1030" height="660" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      
      <!-- Primary Phone (Mahmoud Ahmadi) -->
      <g transform="translate(0, 50)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <path d="M962 28v5a3 3 0 0 1-3.27 3 29.7 29.7 0 0 1-13-4.6 29.2 29.2 0 0 1-9-9 29.7 29.7 0 0 1-4.6-13A3 3 0 0 1 935 6h5a3 3 0 0 1 3 2.6 19.3 19.3 0 0 0 1 4.2 3 3 0 0 1-.7 3.2l-1.9 1.9a24 24 0 0 0 9 9l1.9-1.9a3 3 0 0 1 3.2-.7 19.3 19.3 0 0 0 4.2 1 3 3 0 0 1 2.6 3z" fill="${accent}" />
        
        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">مدیر فنی و مشاوره مهندسی:</text>
        <text x="890" y="65" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">مهندس محمود احمدی</text>
        <text x="50" y="52" fill="${accent}" class="space-bold" font-size="38" letter-spacing="2" text-anchor="start">0912 932 1550</text>
      </g>
      <line x1="50" y1="160" x2="980" y2="160" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Instagram -->
      <g transform="translate(0, 200)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <rect x="940" y="20" width="30" height="30" rx="8" fill="none" stroke="${accent}" stroke-width="2.5" />
        <circle cx="955" cy="35" r="7" fill="none" stroke="${accent}" stroke-width="2.5" />
        <circle cx="963" cy="27" r="1.5" fill="${accent}" />

        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">صفحه رسمی اینستاگرام:</text>
        <text x="890" y="65" fill="${textPrimary}" class="vazir-bold" font-size="25" text-anchor="end">نمونه پروژه‌های اجرایی، آموزش‌ها و ویدیوها</text>
        <text x="50" y="52" fill="${accent}" class="space-bold" font-size="32" letter-spacing="1" text-anchor="start">@novand_tech</text>
      </g>
      <line x1="50" y1="310" x2="980" y2="310" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Email -->
      <g transform="translate(0, 350)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <rect x="938" y="24" width="34" height="24" rx="4" fill="none" stroke="${accent}" stroke-width="2.5" />
        <path d="M938 27l17 11 17-11" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" />

        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">مکاتبات رسمی و ارسال نقشه‌ها:</text>
        <text x="890" y="65" fill="${textPrimary}" class="vazir-bold" font-size="25" text-anchor="end">دریافت استعلام قیمت و اسناد مناقصه</text>
        <text x="50" y="52" fill="${textPrimary}" class="space-bold" font-size="27" letter-spacing="1" text-anchor="start">novand.info@gmail.com</text>
      </g>
      <line x1="50" y1="460" x2="980" y2="460" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Address -->
      <g transform="translate(0, 500)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <path d="M955 18c-7.7 0-14 6.3-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="${accent}" />

        <text x="890" y="30" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">نشانی دفتر مرکزی نُـوَند:</text>
        <text x="890" y="64" fill="${textPrimary}" class="vazir-bold" font-size="23" text-anchor="end">تهران، سعادت‌آباد، بلوار مدیریت، خیابان علامه طباطبایی جنوبی</text>
        <text x="890" y="96" fill="${textPrimary}" class="vazir-bold" font-size="23" text-anchor="end">بیست‌وچهارم غربی، پلاک ۲۶، واحد ۱۷</text>
      </g>
    </g>

    <!-- Modern Minimalist QR Code Section (No clutter, No unnecessary tutorials) -->
    <g transform="translate(65, 1260)">
      <rect width="1030" height="600" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      
      <!-- Clean Minimal QR Tile (Pure white, subtle accent border) -->
      <g transform="translate(340, 50)">
        <rect width="350" height="350" rx="16" fill="#ffffff" stroke="${accent}" stroke-width="2" />
        <svg x="20" y="20" width="310" height="310" viewBox="0 0 31 31" shape-rendering="crispEdges">
          ${qrInnerSvg}
        </svg>
      </g>

      <!-- Minimal, High-Aesthetic Labeling (Eliminates all cluttered instructions) -->
      <g transform="translate(515, 455)">
        <text x="0" y="0" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="middle">اسکن کارت ویزیت دیجیتال و دسترسی سریع</text>
        <text x="0" y="42" fill="${accent}" class="space-bold" font-size="20" letter-spacing="3" text-anchor="middle">DIGITAL BUSINESS CARD &amp; DIRECT CONNECT</text>
        <text x="0" y="90" fill="${textSecondary}" class="space-bold" font-size="25" letter-spacing="2" text-anchor="middle">novand-tech.com/card</text>
      </g>
    </g>

    <!-- Bottom CTA Bar -->
    <g transform="translate(65, 1900)">
      <rect width="1030" height="300" rx="16" fill="${isDark ? '#080d0f' : '#f1f5f9'}" stroke="${cardBorder}" stroke-width="1.5" />
      <g transform="translate(515, 60)">
        <text x="0" y="0" fill="${textPrimary}" class="vazir-bold" font-size="32" text-anchor="middle">پروژه بعدی خود را با استانداردهای نُـوَند مهندسی کنید</text>
        <text x="0" y="45" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="middle">از مشاوره اولیه و ارزیابی سایت تا تأمین قطعات اورجینال، اجرای دقیق و پشتیبانی دائمی</text>
      </g>

      <g transform="translate(515, 175)">
        <rect x="-320" y="0" width="640" height="65" rx="12" fill="url(#brochure-grad-${theme})" />
        <text x="0" y="42" fill="${isDark ? '#0d1417' : '#ffffff'}" class="vazir-bold" font-size="25" text-anchor="middle">تماس با مدیر فنی: 09129321550</text>
      </g>
    </g>

    <!-- Page Footer Indicator -->
    <g transform="translate(65, 2240)">
      <line x1="0" y1="0" x2="1030" y2="0" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="1030" y="45" fill="${textSecondary}" class="vazir-reg" font-size="18" text-anchor="end">نُـوَند · دفترچه رسمی خدمات مهندسی</text>
      <text x="0" y="45" fill="${accent}" class="space-bold" font-size="19" text-anchor="start">PAGE // 06 · BACK COVER</text>
    </g>
  `;
}

// 6. Generate Individual Page SVG (Dimensions: 1169 x 2480 = A4 1/3 panel at 300 DPI)
function generatePageSvg({ pageNumber, theme, qrInnerSvg }) {
  const isDark = theme === 'dark';
  const bgCanvas = isDark ? '#090e10' : '#ffffff';
  const borderMargin = isDark ? '#141c21' : '#f1f5f9';

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
  const bgCanvas = isDark ? '#090e10' : '#ffffff';
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
