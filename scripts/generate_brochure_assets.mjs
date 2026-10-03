import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import QRCode from 'qrcode';
import { Resvg } from '@resvg/resvg-js';

const CARD_URL = 'https://novand-tech.com/card';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'brochure');
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
      <rect x="-380" y="-10" width="380" height="46" rx="23" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <circle cx="-30" cy="13" r="5" fill="${accent}" />
      <text x="-200" y="17" fill="${textSecondary}" class="vazir-bold" font-size="20" letter-spacing="2">نمایه مهندسی</text>
    </g>

    <!-- Logo & Brand Header -->
    <g transform="translate(1095, 290)">
      <g transform="translate(-180, -90)">
        ${getNovandEmblemMarkup({ scale: 2.2, strokeCore, glowId: `brochure-grad-${theme}`, fillDot })}
      </g>
      <text x="-220" y="20" fill="${textPrimary}" class="vazir-bold" font-size="90" text-anchor="end">نُـوَند</text>
      <text x="-220" y="82" fill="${accent}" class="space-bold" font-size="34" letter-spacing="9" text-anchor="end">NOVAND</text>
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
      <text x="70" y="51" fill="${accent}" class="vazir-bold" font-size="17" letter-spacing="1">زیرساخت مهندسی یکپارچه</text>
      
      <rect x="25" y="645" width="980" height="52" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" opacity="0.94" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="675" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">طراحی، تأمین تجهیزات اصلی، اجرا و پشتیبانی تخصصی</text>
      <text x="50" y="677" fill="${accent}" class="space-bold" font-size="17" text-anchor="start">SMART HOME · CCTV · NETWORK · VOIP</text>
    </g>

    <!-- Core 4 Pillars Grid (Clean, Modern, Minimal) -->
    <g transform="translate(1095, 1490)">
      <!-- Pillar 1 -->
      <g transform="translate(0, 0)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <g transform="scale(1.0), translate(-65, 35)">
          <path d="M12.324 7.506h15.177v2.493H12.324a4.8 4.8 0 0 1 -0.828 1.731 5.1 5.1 0 0 1 -1.413 1.299 5.1 5.1 0 0 1 -1.821 0.669C5.985 14.067 3.693 12.717 2.85 10.59a5.1 5.1 0 0 1 -0.351 -1.836c0 -2.283 1.644 -4.407 3.903 -4.884 0.705 -0.15 1.428 -0.153 2.133 -0.009a4.8 4.8 0 0 1 1.635 0.669 5.1 5.1 0 0 1 2.157 2.976Zm-5.043 -1.248c-1.026 0.144 -1.881 0.765 -2.181 1.788a2.526 2.526 0 0 0 2.502 3.207 2.532 2.532 0 0 0 2.391 -2.28 2.532 2.532 0 0 0 -2.712 -2.715Zm10.395 16.236H2.499v-2.493h15.18c0.153 -0.633 0.456 -1.224 0.84 -1.746a4.8 4.8 0 0 1 1.302 -1.215 4.875 4.875 0 0 1 3.513 -0.717c2.394 0.402 4.17 2.493 4.173 4.923a5.1 5.1 0 0 1 -0.372 1.896 5.1 5.1 0 0 1 -1.029 1.578c-0.366 0.39 -0.81 0.717 -1.284 0.963a5.1 5.1 0 0 1 -1.518 0.507c-2.55 0.435 -4.968 -1.23 -5.625 -3.693ZM22.377 18.75c-1.251 0.108 -2.241 1.005 -2.367 2.277 -0.147 1.482 1.17 2.847 2.664 2.721a2.55 2.55 0 0 0 2.307 -2.148 2.532 2.532 0 0 0 -2.604 -2.85Z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
        </g>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">خانه‌ها و مجتمع‌های هوشمند</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">Smart Buildings &amp; Automation</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">کنترل هوشمند روشنایی، دما و تهویه مطبوع</text>
      </g>

      <!-- Pillar 2 -->
      <g transform="translate(-535, 0)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <g transform="scale(1.0), translate(-65, 35)">
          <path d="M9.137 10.599c-0.11 0.033 -0.21 0.103 -0.313 0.156 -0.192 0.098 -0.392 0.185 -0.596 0.253 -0.847 0.284 -1.758 0.298 -2.615 0.048 -2.165 -0.63 -3.499 -2.895 -3.034 -5.096 0.154 -0.727 0.501 -1.408 0.985 -1.971 0.335 -0.39 0.752 -0.717 1.201 -0.964a4.326 4.326 0 0 1 1.439 -0.486c2.024 -0.305 4.023 0.848 4.749 2.767 0.206 0.544 0.291 1.112 0.28 1.693 -0.011 0.597 -0.173 1.19 -0.432 1.726 0.916 0.687 1.832 1.375 2.747 2.062 0.43 -0.255 0.864 -0.479 1.347 -0.618 1.313 -0.378 3.018 -0.155 4.133 0.677 0.47 -0.542 0.94 -1.085 1.41 -1.628 -0.226 -0.41 -0.362 -0.879 -0.413 -1.342 -0.05 -0.454 -0.011 -0.907 0.107 -1.347 0.404 -1.501 1.771 -2.668 3.334 -2.771 1.08 -0.072 2.134 0.342 2.911 1.084 1.821 1.737 1.332 4.807 -0.86 5.976 -0.707 0.377 -1.526 0.523 -2.32 0.404 -0.329 -0.049 -0.62 -0.176 -0.936 -0.264 -0.518 0.607 -1.035 1.215 -1.553 1.822 0.305 0.71 0.536 1.409 0.546 2.192 0.027 2.269 -1.538 4.261 -3.707 4.859 -0.662 0.182 -1.373 0.218 -2.049 0.105 -0.193 -0.032 -0.387 -0.081 -0.575 -0.135 -0.12 -0.034 -0.237 -0.09 -0.361 -0.101 -0.814 0.807 -1.628 1.615 -2.442 2.422 0.279 0.622 0.422 1.259 0.368 1.945 -0.033 0.421 -0.149 0.846 -0.328 1.228 -0.85 1.812 -2.985 2.692 -4.852 1.902 -0.464 -0.196 -0.884 -0.486 -1.238 -0.844 -0.268 -0.271 -0.488 -0.588 -0.662 -0.926 -0.996 -1.927 -0.083 -4.317 1.899 -5.15 0.704 -0.296 1.523 -0.378 2.268 -0.195 0.274 0.067 0.526 0.204 0.796 0.275l2.099 -2.126c-0.934 -1.109 -1.392 -2.526 -1.177 -3.972 0.085 -0.572 0.305 -1.099 0.552 -1.618 -0.902 -0.682 -1.805 -1.363 -2.707 -2.045Zm-2.296 -5.6c-1.298 0.05 -2.198 1.336 -1.711 2.569 0.111 0.28 0.292 0.518 0.513 0.719 0.19 0.174 0.424 0.297 0.668 0.376 0.261 0.084 0.552 0.104 0.825 0.072 0.205 -0.024 0.415 -0.099 0.598 -0.193 1.436 -0.738 1.306 -2.868 -0.209 -3.425 -0.215 -0.079 -0.454 -0.127 -0.685 -0.118Zm16.766 1.257c-0.367 0.056 -0.705 0.251 -0.907 0.568 -0.437 0.685 -0.098 1.649 0.695 1.875 0.178 0.051 0.378 0.062 0.562 0.036 0.693 -0.096 1.143 -0.82 1.019 -1.484 -0.086 -0.46 -0.459 -0.837 -0.904 -0.958 -0.149 -0.041 -0.312 -0.061 -0.466 -0.038ZM16.104 12.505c-1.099 0.114 -2.038 0.808 -2.29 1.923 -0.355 1.569 0.885 3.163 2.528 3.072 1.216 -0.067 2.262 -0.998 2.396 -2.226 0.139 -1.282 -0.77 -2.505 -2.039 -2.729 -0.194 -0.034 -0.397 -0.06 -0.595 -0.039ZM8.647 22.502c-0.506 0.072 -0.97 0.401 -1.103 0.916 -0.2 0.78 0.402 1.619 1.235 1.584 0.608 -0.025 1.139 -0.487 1.215 -1.099 0.082 -0.657 -0.398 -1.286 -1.049 -1.384 -0.102 -0.015 -0.195 -0.033 -0.299 -0.018Z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
        </g>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">CCTV سیستم‌های نظارتی و</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">CCTV &amp; Physical Security</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">سیستم‌های امنیتی و نظارت تصویری</text>
      </g>

      <!-- Pillar 3 -->
      <g transform="translate(0, 205)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${isDark ? '#1a272f' : '#e0f2fe'}" />
        <g transform="scale(1.0), translate(-65, 35)">
          <path d="M6.243 12.507c-0.233 -0.033 -0.486 -0.009 -0.723 -0.009h-1.342c-0.483 0 -0.887 0.02 -1.27 -0.323 -0.391 -0.351 -0.409 -0.822 -0.409 -1.311v-6.685c0 -0.484 0.001 -0.936 0.363 -1.303 0.375 -0.38 0.844 -0.376 1.344 -0.376h6.575c0.28 0 0.57 -0.024 0.842 0.058 0.439 0.134 0.795 0.535 0.862 0.993 0.044 0.301 0.013 0.625 0.013 0.93v6.411c0 0.412 0.002 0.796 -0.267 1.134 -0.39 0.492 -0.85 0.473 -1.423 0.473h-1.315c-0.247 0 -0.501 -0.016 -0.747 0.009v8.747h8.748c0.022 -0.247 0.008 -0.499 0.008 -0.747v-1.315c0 -0.559 -0.008 -1.045 0.473 -1.422 0.341 -0.267 0.719 -0.267 1.133 -0.267h6.356c0.321 0 0.665 -0.035 0.982 0.013 0.472 0.072 0.865 0.43 1.001 0.883 0.077 0.255 0.053 0.53 0.053 0.793v6.603c0 0.494 0.005 0.956 -0.363 1.331 -0.374 0.38 -0.79 0.377 -1.29 0.377h-6.712c-0.503 0 -0.949 -0.006 -1.311 -0.411 -0.343 -0.384 -0.323 -0.785 -0.323 -1.27v-1.342c0 -0.236 0.025 -0.49 -0.01 -0.722 -0.804 -0.044 -1.632 -0.005 -2.438 -0.005h-5.808c-0.218 0 -0.441 0.014 -0.658 -0.002 -0.624 -0.047 -1.221 -0.329 -1.653 -0.783 -0.399 -0.42 -0.642 -0.98 -0.685 -1.556 -0.016 -0.217 -0.002 -0.44 -0.002 -0.658v-7.397c0 -0.282 0.013 -0.568 -0.005 -0.849Zm3.755 -7.507c-1.17 -0.039 -2.348 -0.002 -3.519 -0.002h-1.014c-0.146 0 -0.335 -0.031 -0.468 0.025v4.976h5.001zm10.003 15.002V25c0.395 0.022 0.795 0.004 1.19 0.004h3.315c0.156 0 0.352 0.031 0.497 -0.022V20.002z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
        </g>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">IT زیرساخت شبکه و خدمات</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">Enterprise Network Infrastructure</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">کابل‌کشی، سوئیچینگ سیسکو و انواع پیکربندی شبکه</text>
      </g>

      <!-- Pillar 4 -->
      <g transform="translate(-535, 205)">
        <rect x="-495" y="0" width="495" height="175" rx="14" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
        <circle cx="-50" cy="50" r="24" fill="${accent}" />
        <g transform="scale(1.0), translate(-65, 35)">
          <path d="M8.747 9.795v2.712c0 0.345 -0.087 0.821 0.202 1.079 0.229 0.206 0.533 0.165 0.819 0.165h10.466c0.294 0 0.626 0.045 0.847 -0.192 0.258 -0.276 0.174 -0.734 0.174 -1.08v-2.685c-0.081 -0.067 -0.198 -0.093 -0.294 -0.138 -0.188 -0.088 -0.373 -0.188 -0.545 -0.304 -0.596 -0.402 -1.087 -0.982 -1.367 -1.646 -0.189 -0.447 -0.294 -0.933 -0.301 -1.419C18.715 4.235 20.466 2.496 22.507 2.499c0.492 0.001 0.977 0.103 1.431 0.29 1.871 0.77 2.822 3.018 2.03 4.891 -0.415 0.981 -1.212 1.712 -2.201 2.09 -0.058 0.311 -0.015 0.666 -0.015 0.984v1.726c0 0.422 0.016 0.842 -0.061 1.259 -0.221 1.204 -1.227 2.203 -2.42 2.448 -0.558 0.115 -1.156 0.063 -1.723 0.063 -1.098 0 -2.202 -0.035 -3.298 0.003v3.973c1.934 0.728 2.971 2.787 2.29 4.767 -0.199 0.578 -0.555 1.079 -0.99 1.502 -0.333 0.322 -0.745 0.572 -1.175 0.743 -0.436 0.173 -0.904 0.265 -1.374 0.265 -0.493 0 -0.976 -0.105 -1.432 -0.289 -0.427 -0.173 -0.83 -0.437 -1.158 -0.761 -0.537 -0.531 -0.942 -1.203 -1.087 -1.952 -0.354 -1.833 0.659 -3.652 2.427 -4.275V16.26c-0.324 -0.053 -0.794 -0.011 -1.135 -0.011h-2.219c-0.496 0 -1.015 0.044 -1.506 -0.034 -0.954 -0.15 -1.777 -0.745 -2.251 -1.581 -0.183 -0.322 -0.311 -0.692 -0.359 -1.06 -0.047 -0.362 -0.032 -0.73 -0.032 -1.095v-1.644c0 -0.259 0.044 -0.848 -0.016 -1.068 -1.994 -0.75 -3.019 -2.956 -2.196 -4.951 0.2 -0.484 0.509 -0.916 0.882 -1.281 0.325 -0.317 0.725 -0.573 1.144 -0.745 0.462 -0.191 0.956 -0.293 1.457 -0.29 2.036 0.009 3.694 1.681 3.734 3.706 0.01 0.49 -0.095 0.992 -0.275 1.445 -0.276 0.696 -0.784 1.305 -1.408 1.716 -0.168 0.111 -0.346 0.207 -0.529 0.291 -0.096 0.044 -0.214 0.07 -0.296 0.136Zm-1.252 -4.795c-0.174 0.002 -0.348 0.042 -0.507 0.112 -1.215 0.535 -0.815 2.383 0.505 2.395 0.159 0.001 0.327 -0.039 0.475 -0.098 1.042 -0.416 1.022 -1.897 -0.005 -2.318 -0.145 -0.06 -0.31 -0.093 -0.468 -0.091Zm14.99 0c-0.181 0.006 -0.361 0.046 -0.524 0.126 -0.986 0.483 -0.918 1.91 0.109 2.297 0.135 0.051 0.292 0.085 0.437 0.084 0.165 -0.001 0.341 -0.044 0.492 -0.111 0.476 -0.21 0.798 -0.721 0.752 -1.245 -0.055 -0.634 -0.62 -1.172 -1.266 -1.152ZM14.894 22.502c-0.513 0.076 -0.985 0.413 -1.107 0.942 -0.179 0.774 0.415 1.589 1.238 1.558 0.62 -0.023 1.157 -0.502 1.219 -1.125 0.066 -0.653 -0.407 -1.26 -1.053 -1.358 -0.101 -0.015 -0.194 -0.032 -0.298 -0.017Z" fill="#ffffff" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
        </g>
        <text x="-90" y="48" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">VoIP فیبر نوری و مراکز تلفن</text>
        <text x="-90" y="82" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">Fiber Optics &amp; Unified VoIP</text>
        <text x="-90" y="122" fill="${textSecondary}" class="vazir-reg" font-size="19" text-anchor="end">سیپ‌ترانک و آنالوگ، منشی هوشمند، فیبر نوری</text>
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
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">02 // SMART HOMES &amp; AUTOMATED SPACES</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">هوشمندسازی خانه و مدارس</text>
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
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">اتوماسیون ساختمان، روشنایی و تهویه</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">INTELLIGENT LIVING &amp; FACILITY AUTOMATION</text>

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">کنترل هوشمند روشنایی تطبیقی، تهویه مطبوع و پرده‌های برقی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.مدیریت سناریوهای روشنایی، سرمایش و گرمایش بر پایه حضور افراد و سنجش دمای محیط جهت کاهش مصرف انرژی</text>
      </g>

      <g transform="translate(0, 200)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">(KNX, Zigbee, Modbus, LoRaWAN, Z-Wave) پروتکل‌های استاندارد جهانی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.معماری باز و بدون وابستگی انحصاری به برندها با قابلیت یکپارچه‌سازی با برترین برندهای تجهیزات هوشمند جهان</text>
      </g>

      <g transform="translate(0, 285)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">(Multi-Zone Audio) سیستم‌های صوتی چندناحیه‌ای</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.پخش موسیقی اختصاصی و مدیریت استریم در زون‌های مختلف ساختمان به شکل بی‌سیم و تحت شبکه یکپارچه</text>
      </g>

      <g transform="translate(0, 370)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">داشبوردهای مدیریتی روی تاچ‌پنل‌های دیواری و کنترل امن از راه دور</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.نظارت و مدیریت کامل وضعیت فضا بر روی تبلت‌های دیواری و اپلیکیشن موبایل با رمزنگاری پیشرفته داده‌ها</text>
      </g>
    </g>

    <!-- Card 2: Smart Schools & Educational Tech -->
    <g transform="translate(65, 1380)">
      <rect width="1030" height="420" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">تجهیز و هوشمندسازی مدارس و مراکز آموزشی</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">INTERACTIVE CLASSROOMS &amp; EDUCATIONAL INFRASTRUCTURE</text>

      <g transform="scale(1.0), translate(50, 30)">
        <path d="M99.984 48.025V94.063c-0.342 0.34 -0.438 0.781 -0.908 1.045 -0.9 0.502 -4.586 0.211 -5.789 0.211H6.348c-1.154 0 -4.549 0.277 -5.424 -0.211 -0.471 -0.264 -0.566 -0.705 -0.908 -1.045V47.961c0.412 -0.277 0.523 -0.848 1.092 -1.057 1.1 -0.404 4.787 -0.129 6.152 -0.129h11.143c1.438 0 4.012 0.279 5.311 -0.063 0.602 -1.543 -0.604 -3.762 0.391 -5.209 0.373 -0.543 1.15 -0.824 1.707 -1.127 1.273 -0.693 2.547 -1.408 3.803 -2.137 4.426 -2.566 8.947 -4.979 13.383 -7.527 1.279 -0.734 2.59 -1.418 3.863 -2.162 0.348 -0.203 1.109 -0.438 1.332 -0.77 0.211 -0.314 0.072 -1.068 0.072 -1.434 0.002 -1.219 0 -2.436 0 -3.654V11.734c0 -1.74 -0.16 -3.564 0.006 -5.297 0.16 -1.67 2.492 -2.52 3.271 -0.764 0.398 0.896 -0.043 1.926 0.285 2.805 3.215 0.264 6.545 0.027 9.771 0.027 1.088 0 2.91 -0.355 3.74 0.537 0.92 0.99 0.197 2.514 0.553 3.66 2.113 0.074 4.367 -0.262 6.461 0.031 0.857 0.121 1.609 0.826 1.578 1.736 -0.043 1.221 -1.6 3.703 -1.463 4.615 0.232 1.543 2.219 4.195 1.029 5.598 -0.822 0.971 -2.645 0.609 -3.77 0.609h-8.951c-1.082 0 -2.734 0.313 -3.66 -0.354 -1.344 -0.967 -0.172 -2.709 -0.814 -3.883l-4.484 -0.006c-0.346 0.805 -0.08 4.047 -0.08 5.113 0 0.398 -0.158 1.273 0.072 1.617 0.27 0.4 1.254 0.73 1.682 0.963 1.531 0.83 3.037 1.727 4.563 2.566 3.893 2.143 7.693 4.459 11.617 6.547 1.4 0.746 2.77 1.566 4.158 2.338 0.607 0.338 1.303 0.623 1.828 1.088 1.332 1.184 -0.012 4.045 0.645 5.473 1.471 0.316 3.906 0.051 5.48 0.051h11.141c1.258 0 4.957 -0.266 5.955 0.109 0.596 0.223 0.699 0.727 1.107 1.109ZM62.342 11.938H51.738v5.625h10.604zm3.457 4.297c-0.16 1.074 0.121 2.199 -0.021 3.264 -0.369 2.74 -4.486 0.783 -5.928 1.643v0.713h9.869c-0.168 -0.955 -0.82 -1.824 -0.824 -2.814 -0.004 -0.975 0.594 -1.844 0.695 -2.805zm6.984 75.637c0.289 -1.082 0.066 -2.482 0.066 -3.605V57.123c0 -3.166 0.025 -6.332 -0.008 -9.498 -0.01 -0.91 0.184 -3.256 -0.084 -3.992 -0.145 -0.396 -1.098 -0.723 -1.453 -0.92 -1.271 -0.707 -2.529 -1.424 -3.799 -2.135 -4.178 -2.338 -8.332 -4.715 -12.521 -7.023 -1.176 -0.648 -2.334 -1.316 -3.506 -1.973 -0.393 -0.219 -1.021 -0.762 -1.479 -0.762 -0.459 0 -1.084 0.545 -1.479 0.764 -1.172 0.652 -2.326 1.324 -3.502 1.973 -4.184 2.307 -8.385 4.613 -12.506 7.037 -1.252 0.736 -2.531 1.43 -3.801 2.139 -0.369 0.205 -1.357 0.537 -1.537 0.924 -0.193 0.414 -0.025 2.977 -0.025 3.604v41.006c0 1.121 -0.223 2.525 0.068 3.605h8.471c0.355 -1.211 0.074 -3.881 0.074 -5.25v-11.232c0 -1.301 -0.299 -4.623 0.207 -5.672 0.734 -1.527 4.604 -0.971 6.084 -0.971h16.529c1.412 0 4.729 -0.521 5.445 0.971 0.506 1.049 0.207 4.371 0.207 5.672v11.232c0 1.369 -0.281 4.039 0.074 5.25zM49.926 36.023c3.967 -0.195 7.551 3.582 7.287 7.518 -0.182 2.711 -1.67 4.855 -4.012 6.139 -0.965 0.529 -2.098 0.766 -3.201 0.76 -7.355 -0.037 -9.932 -9.867 -3.5 -13.484 1.057 -0.592 2.215 -0.871 3.426 -0.932Zm-0.367 3.469c-4.709 0.551 -4.08 7.818 0.625 7.518 5.146 -0.33 4.369 -8.104 -0.625 -7.518Zm-25.773 10.736H3.467v41.643h20.318zm72.748 0H76.215v41.643h20.318zM11.063 54.059v6.871H7.611v-6.871zm8.477 0v6.873H16.09v-6.873zm12.875 -0.006h6.861v3.412h-6.861zm21.045 0.002v3.408h-6.918v-3.408zm7.266 -0.002h6.861v3.412h-6.861zm23.186 0.006v6.873h-3.449v-6.873zm8.479 0v6.871h-3.451v-6.871zm-53.113 8.023v3.426h-6.863v-3.426zm14.186 0.002v3.42h-6.922v-3.42zm7.264 -0.002h6.863v3.426h-6.863zM11.063 67.596v6.893H7.613v-6.893zm8.477 0.029v6.861H16.09v-6.77c1.15 -0.031 2.301 -0.061 3.449 -0.092Zm64.371 0.092v6.77h-3.449v-6.861c1.148 0.031 2.299 0.061 3.449 0.092Zm8.477 -0.121v6.893h-3.449v-6.893zM39.238 72.211v19.66h9.023V72.211zm21.523 0h-9.023v19.66h9.023zM11.063 81.209v6.873H7.611v-6.873zm8.479 0.002v6.871H16.09V81.211zm64.369 0v6.871h-3.451V81.211zm8.479 -0.002v6.873h-3.451v-6.873z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0.7" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">نمایشگرهای لمسی تعاملی و بردهای هوشمند آموزشی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.تجهیز کلاس‌ها به پنل‌های لمسی با قابلیت نوشتن دیجیتال، اتصال بی‌سیم به تبلت اساتید و نمایش همزمان چندرسانه‌ای</text>
      </g>

      <g transform="translate(0, 205)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سیستم صوتی پیجینگ هوشمند، فراخوان کلاسی و زنگ خودکار</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.زمان‌بندی هوشمند پخش آلارم، زنگ مدارس و پیام‌های صوتی مستقل در زون‌های کلاسی، راهروها و حیاط مدرسه</text>
      </g>

      <g transform="translate(0, 295)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">بستر امن ارتباطات کلاسی، حضور و غیاب دیجیتال و شبکه وایرلس پرسرعت</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.پیکربندی شبکه وای‌فای امن با دسترسی تفکیک‌شده برای کادر آموزشی و دانش‌آموزان به همراه ثبت اتوماتیک حضور/غیاب</text>
      </g>
    </g>

    <!-- Card 3: Environmental & Industrial Automation -->
    <g transform="translate(65, 1830)">
      <rect width="1030" height="360" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">(Environmental IoT) اتوماسیون صنعتی، گلخانه‌ها و پایش محیطی</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">PRECISION SENSING &amp; ENVIRONMENTAL TELEMETRY</text>

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M71.877 68.787v12.42c0.771 0.139 1.656 -0.143 2.273 0.49 0.578 0.594 0.461 1.424 0.459 2.184 0 1.877 -0.318 3.523 -1.631 4.941 -1.68 1.814 -3.971 1.803 -6.266 1.803H34.383c-1.289 0 -2.736 0.184 -4.006 -0.059 -3.119 -0.596 -4.975 -3.117 -4.986 -6.229 -0.004 -0.91 -0.24 -2.217 0.656 -2.807 0.639 -0.42 1.371 -0.197 2.076 -0.324v-12.42c-0.977 -0.145 -1.984 -0.113 -2.963 -0.271 -3.416 -0.553 -6.67 -1.791 -9.551 -3.717C4.416 57.305 2.467 42.406 10.215 31.723c2.66 -3.666 6.723 -6.393 10.955 -7.85 1.357 -0.467 2.807 -0.809 4.236 -0.992 0.469 -0.059 1.555 0.063 1.922 -0.252 0.461 -0.398 0.736 -1.453 1.025 -1.996 0.721 -1.348 1.594 -2.645 2.578 -3.814 4.561 -5.428 11.379 -8.949 18.52 -9 5.201 -0.037 10.219 1.4 14.52 4.324 1.258 0.857 2.471 1.859 3.543 2.945 0.32 0.324 0.604 0.77 0.967 1.043 0.5 0.373 1.541 0.332 2.145 0.514 1.354 0.406 2.689 0.994 3.883 1.77 1.469 0.953 2.705 2.15 3.789 3.518 0.477 0.602 0.91 1.766 1.424 2.229 0.383 0.346 1.111 0.486 1.576 0.709 1.039 0.494 2.082 1.057 3.025 1.721 3.307 2.326 6.047 5.33 7.834 8.977 5.168 10.553 1.523 22.941 -8.105 29.443 -2.758 1.861 -5.961 2.938 -9.211 3.502 -0.977 0.168 -1.988 0.129 -2.963 0.275Zm0.002 -3.211c1.859 0.404 5.9 -0.938 7.68 -1.684 8.992 -3.773 13.813 -14.477 11.039 -23.754 -1.369 -4.582 -4.348 -8.568 -8.367 -11.188 -0.781 -0.51 -1.625 -0.975 -2.475 -1.355 -0.688 -0.311 -1.561 -0.475 -2.158 -0.943 -0.537 -0.42 -0.77 -1.246 -1.105 -1.822 -0.652 -1.115 -1.557 -2.104 -2.529 -2.949 -1.266 -1.1 -2.91 -1.9 -4.52 -2.316 -0.748 -0.193 -1.674 -0.127 -2.369 -0.469 -0.67 -0.33 -1.121 -1.137 -1.646 -1.648 -1.004 -0.977 -2.045 -1.938 -3.209 -2.729 -3.756 -2.547 -8.145 -3.791 -12.676 -3.773 -6.416 0.025 -12.539 3.293 -16.508 8.254 -1.021 1.277 -1.805 2.684 -2.551 4.127 -0.371 0.719 -0.51 1.754 -1.24 2.219 -0.639 0.408 -1.529 0.238 -2.258 0.322 -1.6 0.186 -3.186 0.406 -4.709 0.938 -6.164 2.145 -10.895 7.035 -12.85 13.256 -3.02 9.605 2.338 20.275 11.529 24.049 1.729 0.711 5.342 1.826 7.166 1.469v-6.16c-1.541 -0.271 -3.314 -0.041 -4.881 -0.041 -0.705 0 -1.531 0.135 -2.164 -0.23 -0.955 -0.549 -0.766 -1.729 -0.766 -2.662 0 -1.811 0.273 -5.129 -0.059 -6.758 -1.262 -0.762 -2.309 -1.432 -2.834 -2.914 -1.096 -3.098 1.471 -6.258 4.635 -6.184 3.027 0.07 5.313 3.309 4.271 6.193 -0.508 1.408 -1.559 2.311 -2.887 2.904v6.52h4.66c0.752 -2.703 1.883 -4.078 4.709 -4.693v-8.094c-4.967 -1.754 -3.598 -9.125 1.666 -9.082 5.096 0.043 6.357 7.707 1.467 9.061V51.563h28.117v-8.125c-4.889 -1.32 -3.729 -9.098 1.648 -9.061 5.152 0.035 6.32 7.338 1.484 9.082v8.094c1.842 0.395 3.5 1.342 4.258 3.164 0.207 0.498 0.273 1.029 0.469 1.531h4.643V49.727c-1.326 -0.59 -2.385 -1.498 -2.889 -2.904 -1.031 -2.891 1.236 -6.121 4.273 -6.193 3.15 -0.074 5.742 3.09 4.633 6.184 -0.531 1.484 -1.568 2.145 -2.832 2.914 -0.332 1.629 -0.059 4.947 -0.059 6.758 0 0.932 0.186 2.111 -0.768 2.658 -0.637 0.365 -1.451 0.234 -2.162 0.234 -1.566 0 -3.34 -0.232 -4.879 0.041zM48.291 25.064c4.102 -0.498 8.318 0.834 11.641 3.176 1.064 0.75 3.223 2.131 2.35 3.67 -0.383 0.676 -1.299 0.963 -2.012 0.646 -0.809 -0.361 -1.725 -1.504 -2.523 -2.039 -2.096 -1.406 -4.578 -2.244 -7.107 -2.377 -2.625 -0.137 -5.338 0.467 -7.619 1.775 -0.846 0.484 -1.584 1.236 -2.447 1.664 -0.709 0.352 -1.619 0.088 -2.02 -0.594 -0.777 -1.334 0.576 -2.25 1.535 -2.908 2.475 -1.699 5.23 -2.652 8.203 -3.014Zm0.725 6.211c2.637 -0.188 5.275 0.561 7.393 2.133 0.852 0.633 2.066 1.545 1.541 2.766 -0.295 0.689 -1.098 1.092 -1.826 0.9 -0.693 -0.184 -1.166 -0.889 -1.74 -1.277 -1.145 -0.771 -2.529 -1.342 -3.926 -1.404 -1.398 -0.064 -2.826 0.17 -4.07 0.813 -0.684 0.352 -1.287 1.016 -2.004 1.273 -0.621 0.225 -1.408 -0.047 -1.779 -0.586 -0.727 -1.057 0.051 -1.906 0.854 -2.525 1.555 -1.203 3.598 -1.953 5.559 -2.092ZM33.945 37.559c-1.891 0.578 -1.078 3.588 0.824 3.02 1.93 -0.576 1.125 -3.617 -0.824 -3.02Zm15.078 0.014c1.65 -0.402 6.246 1.268 4.227 3.488 -1.227 1.35 -2.006 -0.236 -3.068 -0.412 -1.168 -0.193 -2.719 1.732 -3.656 -0.088 -0.865 -1.68 1.193 -2.672 2.498 -2.988Zm16.156 -0.01c-1.859 0.592 -1.072 3.557 0.826 3.02 1.963 -0.555 1.131 -3.643 -0.826 -3.02Zm-43.646 6.223c-1.965 0.451 -1.27 3.514 0.699 3.051 1.934 -0.453 1.252 -3.5 -0.699 -3.051Zm56.256 -0.002c-1.971 0.445 -1.275 3.508 0.699 3.053 1.934 -0.443 1.244 -3.492 -0.699 -3.053Zm-9.068 37.465c0.203 -2.098 0.029 -4.297 0.029 -6.408v-16.986c0 -0.791 0.09 -1.635 -0.416 -2.305 -0.688 -0.906 -1.684 -0.859 -2.717 -0.859 -1.766 -0.002 -3.531 -0.002 -5.297 -0.002H39.133c-1.584 0 -3.166 0 -4.75 0.002 -1.014 0 -1.982 -0.051 -2.68 0.809 -0.547 0.676 -0.453 1.537 -0.453 2.355v16.986c0 2.111 -0.174 4.311 0.029 6.408zm-17.99 -15.635c2.734 -2.611 3.559 -2.064 7.014 -2.811 1.102 -0.236 2.969 -0.754 3.557 0.611 0.432 1.004 -0.367 2.49 -0.701 3.439 -1.012 2.877 -1.805 4.869 -5.033 5.748 -1.297 0.352 -2.734 0.23 -4 0.686v1.645c1.117 0.289 2.449 -0.24 3.547 0.125 1.066 0.355 1.512 1.691 0.725 2.559 -0.65 0.717 -1.777 0.51 -2.641 0.51H46.621c-0.896 0 -2.064 0.184 -2.613 -0.715 -0.268 -0.438 -0.338 -0.953 -0.131 -1.43 0.748 -1.713 3.158 -0.688 4.557 -1.049v-4.826c-2.959 -0.391 -6.285 -0.646 -7.955 -3.508 -0.521 -0.893 -0.742 -1.891 -1.074 -2.857 -0.334 -0.973 -1.209 -2.561 -0.643 -3.564 0.756 -1.336 2.57 -0.617 3.75 -0.449 2.734 0.389 5.4 0.67 7.031 3.193 0.523 0.807 0.605 2.004 1.188 2.693Zm-3.061 1.1c-0.383 -2.316 -1.578 -3.408 -3.879 -3.635 -0.471 -0.047 -0.893 -0.234 -1.357 -0.109 0.824 2.385 1.252 3.367 3.988 3.646 0.426 0.043 0.842 0.236 1.248 0.098Zm9.877 -0.641c-0.455 -0.094 -0.879 0.084 -1.336 0.131 -2.4 0.242 -3.375 1.291 -3.889 3.613 0.371 0.234 0.967 -0.045 1.393 -0.088 2.428 -0.242 3.314 -1.369 3.832 -3.656Zm13.908 18.305h-42.91C28.084 88.457 33.738 87.5 36.211 87.5h30.227c2.203 0 5.396 0.139 5.018 -3.123Z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0.7" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پایش سنسوری بلادرنگ دما، رطوبت، گازها و روشنایی محیطی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.استقرار حسگرهای دقیق صنعتی در مراکز داده، انبارها و فضاهای حساس با ارسال اخطارهای خودکار پیامکی و آنلاین</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">اتوماسیون دقیق گلخانه‌ها، آبیاری خودکار و تهویه کنترل‌شده</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.تنظیم خودکار فن‌ها، پدهای خنک‌کننده، روشنایی مصنوعی و پمپ‌های آبیاری متناسب با جدول زیستی محصول</text>
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
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">سیستم‌های امنیتی و نظارت تصویری، خدمات سخت‌افزار</text>
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
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">سیستم‌های نظارت تصویری و حفاظت پیرامونی</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">INTELLIGENT SURVEILLANCE &amp; PERIMETER PROTECTION</text>

      <g transform="scale(1.2), translate(40, 30)">
        <path d="M62.404 22.663c0.212 0.207 0.48 0.362 0.701 0.568 0.61 0.57 1.094 1.286 1.368 2.077 0.93 2.691 -0.567 5.755 -3.293 6.623 -1.014 0.322 -2.003 0.226 -3.038 0.097 -0.489 -0.061 -1.036 -0.234 -1.522 -0.161 -0.327 1.33 -0.384 2.766 -0.588 4.121 -0.094 0.625 -0.094 1.256 -0.572 1.733 -0.653 0.651 -1.467 0.469 -2.285 0.351 -0.921 -0.133 -1.844 -0.249 -2.766 -0.376 -3.148 -0.43 -6.314 -0.786 -9.446 -1.289 -0.706 -0.113 -1.42 -0.182 -2.127 -0.298 -0.607 -0.1 -1.308 -0.286 -1.919 -0.236 -0.55 0.868 -0.798 1.499 -1.604 2.222 -0.243 0.218 -1.376 0.854 -1.444 0.996 -0.11 0.232 -0.089 0.569 -0.138 0.818 -0.146 0.767 -0.246 1.543 -0.373 2.313 -0.352 2.137 -0.702 4.269 -1.052 6.406 -0.197 1.206 -0.161 2.829 -1.232 3.636 -0.757 0.571 -1.559 0.533 -2.467 0.533H13.584c-0.482 0 -1.035 -0.073 -1.502 0.039 -0.081 0.623 -0.024 1.288 -0.024 1.917v3.645c0 0.773 0.167 1.769 -0.608 2.244 -0.53 0.324 -1.301 0.188 -1.894 0.188H5.402c-0.453 0 -1.399 -0.124 -1.779 0.061 -0.115 1.008 0.123 2.065 -0.026 3.068 -0.069 0.47 -0.558 0.776 -1.011 0.622 -0.7 -0.239 -0.534 -1.132 -0.534 -1.708 -0.001 -1.683 0 -3.367 0 -5.05V39.987c0 -1.385 -0.009 -2.771 0 -4.155 0.004 -0.547 0.068 -1.242 0.792 -1.231 0.599 0.01 0.758 0.549 0.761 1.039 0.004 0.753 -0.144 2.068 0.041 2.749 0.609 0.087 1.268 0.02 1.883 0.02H9.302c0.74 0 1.767 -0.208 2.353 0.342 0.581 0.546 0.404 1.477 0.404 2.195 0 1.818 -0.098 3.666 0.014 5.48h14.132c0.335 -1.916 0.61 -3.845 0.934 -5.763 0.096 -0.565 0.169 -1.138 0.283 -1.7 0.053 -0.265 0.192 -0.69 0.131 -0.955 -0.029 -0.128 -0.841 -1.02 -0.991 -1.249 -0.486 -0.743 -0.642 -1.555 -0.846 -2.399 -0.4 -0.219 -0.998 -0.181 -1.448 -0.247 -1.081 -0.161 -2.165 -0.307 -3.247 -0.454 -3.653 -0.495 -7.298 -1.033 -10.954 -1.511 -1.088 -0.142 -2.175 -0.287 -3.26 -0.452 -0.559 -0.086 -1.186 -0.073 -1.699 -0.339 -0.938 -0.487 -0.894 -1.468 -0.757 -2.367 0.172 -1.124 0.32 -2.255 0.466 -3.383 0.63 -4.865 1.412 -9.713 2.009 -14.58 0.146 -1.192 0.295 -2.388 0.482 -3.573 0.107 -0.676 0.154 -1.29 0.733 -1.742 0.806 -0.629 2.305 -0.179 3.243 -0.038 2.783 0.418 5.583 0.79 8.372 1.152 11.65 1.513 23.253 3.32 34.906 4.79 3.199 0.403 6.385 0.935 9.587 1.317 1.028 0.123 2.915 0.105 3.524 1.059 0.724 1.134 -0.202 2.113 -0.885 2.966 -0.986 1.233 -1.948 2.491 -2.901 3.749 -0.47 0.62 -1.16 1.251 -1.485 1.955ZM39.174 5.651c0.6 -0.117 1.693 0.109 1.65 0.893 -0.01 0.194 -0.091 0.382 -0.232 0.518 -0.409 0.395 -1.632 0.254 -1.926 -0.243 -0.27 -0.457 -0.021 -1.064 0.508 -1.168Zm4.47 0.578c0.503 -0.035 1.087 0.143 1.585 0.216 0.895 0.131 1.795 0.249 2.692 0.373 2.661 0.367 5.322 0.737 7.985 1.088 0.958 0.126 1.999 0.169 2.935 0.407 0.398 0.102 0.653 0.499 0.581 0.905 -0.07 0.398 -0.457 0.627 -0.834 0.613 -1.02 -0.038 -2.057 -0.287 -3.071 -0.415 -2.778 -0.351 -5.546 -0.77 -8.32 -1.144 -0.891 -0.12 -1.782 -0.237 -2.671 -0.367 -0.367 -0.053 -0.799 -0.043 -1.148 -0.179 -0.775 -0.301 -0.533 -1.442 0.265 -1.497Zm22.721 8.633c-0.327 -0.216 -0.929 -0.189 -1.32 -0.236 -0.938 -0.111 -1.876 -0.248 -2.81 -0.385 -3.404 -0.499 -6.822 -0.926 -10.228 -1.41a3021.698 3021.698 0 0 0 -29.901 -4.103c-3.183 -0.42 -6.36 -0.898 -9.544 -1.315 -0.788 -0.104 -1.577 -0.216 -2.365 -0.329 -0.367 -0.052 -0.853 -0.202 -1.215 -0.119 -0.678 4.955 -1.356 9.91 -2.033 14.866 1.261 0.286 2.602 0.372 3.887 0.545 2.517 0.34 5.028 0.691 7.543 1.033 8.124 1.106 16.249 2.216 24.37 3.351 3.231 0.451 6.461 0.903 9.696 1.328 0.834 0.109 1.664 0.259 2.5 0.351 0.22 0.024 0.651 0.184 0.855 0.095 0.273 -0.118 0.535 -0.643 0.718 -0.875 0.613 -0.776 1.206 -1.566 1.816 -2.344 1.911 -2.438 3.782 -4.909 5.697 -7.341 0.545 -0.691 1.079 -1.392 1.622 -2.085 0.237 -0.301 0.626 -0.655 0.713 -1.025Zm-11.109 15.215c-1.121 -0.316 -2.384 -0.355 -3.54 -0.512 -2.34 -0.319 -4.685 -0.635 -7.026 -0.961 -7.405 -1.029 -14.814 -2.027 -22.218 -3.054 -3.443 -0.478 -6.898 -0.907 -10.336 -1.416 -1.135 -0.168 -2.278 -0.296 -3.411 -0.477 -0.624 -0.101 -1.414 -0.314 -2.035 -0.228l-0.853 6.521c0.546 0.27 1.375 0.238 1.977 0.316 1.349 0.176 2.693 0.387 4.043 0.561 3.202 0.411 6.389 0.904 9.59 1.32 1.001 0.131 2.001 0.279 3.004 0.406 0.426 0.054 0.89 0.198 1.316 0.146 0.389 -1.236 0.791 -2.303 1.759 -3.222 2.312 -2.199 6.164 -2.066 8.292 0.326 0.74 0.832 1.249 1.866 1.436 2.965 0.087 0.507 -0.013 1.033 0.065 1.53 0.977 0.31 2.624 0.391 3.69 0.535 2.735 0.367 5.467 0.768 8.203 1.131 1.145 0.151 2.287 0.318 3.432 0.476 0.532 0.073 1.206 0.284 1.726 0.16zm6.145 -6.148c-0.459 0.444 -0.807 1.028 -1.204 1.527 -0.784 0.982 -1.579 1.969 -2.319 2.985 -0.405 0.556 -1.052 1.067 -1.017 1.797 0.417 0.171 0.94 0.156 1.386 0.222 1.76 0.259 3.174 0.195 4.302 -1.373 0.927 -1.289 0.834 -3.15 -0.177 -4.361 -0.252 -0.302 -0.587 -0.681 -0.971 -0.796Zm-30.607 5.568c-0.506 0.086 -0.989 0.283 -1.433 0.535 -3.347 1.908 -2.491 6.906 1.164 7.812 0.645 0.16 1.332 0.144 1.981 0.01 0.447 -0.091 0.866 -0.315 1.253 -0.546 3.233 -1.929 2.338 -6.834 -1.23 -7.739 -0.557 -0.142 -1.166 -0.167 -1.735 -0.072Zm36.239 -0.003c1.296 -0.189 1.034 1.948 -0.071 1.921 -1.11 -0.027 -0.819 -1.791 0.071 -1.921Zm-1.723 2.555c0.665 -0.103 1.149 0.638 0.763 1.201 -0.635 0.93 -2.356 1.846 -3.393 2.232 -0.49 0.183 -1.098 0.437 -1.505 -0.034 -0.271 -0.313 -0.219 -0.794 0.084 -1.067 0.274 -0.248 0.762 -0.299 1.099 -0.436 0.564 -0.228 1.118 -0.527 1.607 -0.887 0.396 -0.291 0.848 -0.932 1.344 -1.009Zm-36.256 6.938c-0.256 0.378 -0.284 1.401 -0.369 1.89 -0.276 1.6 -0.537 3.202 -0.791 4.808 -0.082 0.513 -0.114 1.568 -0.406 1.973 -0.265 0.366 -0.717 0.307 -1.118 0.308 -0.916 0.002 -1.833 0.001 -2.749 0.001h-7.608c-1.306 0 -2.645 -0.086 -3.946 0.011v3.26c1.499 0.08 3.02 0.011 4.521 0.011h12.019c0.463 0 1.064 0.11 1.465 -0.175 0.511 -0.363 0.664 -2.261 0.741 -2.906 0.243 -2.005 0.636 -4.015 0.972 -6.006 0.12 -0.711 0.474 -1.974 0.402 -2.645 -0.295 -0.036 -0.595 0.015 -0.895 -0.004 -0.8 -0.05 -1.493 -0.253 -2.238 -0.527Zm-18.56 0.962H3.607v19.325h6.889zm5.908 15.175c0.627 -0.103 1.34 -0.013 1.975 -0.013h3.899c0.65 0 1.698 -0.103 1.624 0.858 -0.066 0.842 -1.109 0.686 -1.687 0.686H18.251c-0.599 0 -1.321 0.109 -1.905 -0.031 -0.769 -0.185 -0.726 -1.37 0.057 -1.499Zm9.334 0c0.322 -0.048 0.773 -0.064 1.043 0.146 0.421 0.328 0.382 0.985 -0.066 1.269 -0.399 0.252 -1.214 0.193 -1.485 -0.228 -0.292 -0.452 -0.044 -1.106 0.507 -1.186Z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="1.5" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">دوربین‌های تحت شبکه با تحلیل هوشمند تصاویر</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.رزولوشن‌های بالا، تشخیص چهره، پلاک‌خوان هوشمند و خطوط فرضی هشدار با دید در شب رنگی فوق‌پیشرفته</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سرورهای ذخیره‌سازی و اتاق‌های مانیتورینگ متمرکز</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.و مدیریت سطوح دسترسی نگهبانی و حراست (Video Wall) طراحی اتاق‌های کنترل، پیاده‌سازی دیوارهای ویدئویی</text>
      </g>

      <g transform="translate(0, 315)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سامانه‌های دزدگیر و کنترل تردد بیومتریک و اعلام حریق و سرقت</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.قفل‌های مغناطیسی، گیت‌های تردد پرسنل با کارت، دزدگیر، اثر انگشت و چهره و یکپارچه‌سازی با سامانه اعلام سرقت و حریق</text>
      </g>

      <g transform="translate(0, 415)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">انتقال تصویر پایدار، بدون قطعی و کاملاً امن</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.مشاهده مستقیم تصاویر دوربین‌ها روی گوشی و تبلت با پروتکل‌های امن اختصاصی بدون قطعی و نشت داده</text>
      </g>
    </g>

    <!-- Card 2: Hardware Repair & Maintenance -->
    <g transform="translate(65, 1490)">
      <rect width="1030" height="700" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="27" text-anchor="end">تعمیرات تخصصی و سرویس سخت‌افزار</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">COMPONENT-LEVEL DIAGNOSTICS &amp; WORKSTATION SERVICING</text>
      
      <g transform="scale(1.0), translate(40, 40)">
        <path d="M65.697 9.361c1.992 0.141 4.039 0.014 6.037 0.014h11.873c2.268 0 5.828 -0.51 7.813 0.627C93.865 11.402 93.75 14.018 93.75 16.484v30.502c0 1.076 -0.107 2.221 0.039 3.287 0.84 0.545 1.656 0.889 2.25 1.766 1.365 2.021 0.836 5.459 0.836 7.824v30.137c0 2.307 0.074 4.535 -1.994 6.02 -1.775 1.275 -4.279 0.855 -6.342 0.855H11.279c-2.051 0 -4.381 0.367 -6.162 -0.854 -2.197 -1.506 -1.992 -4.025 -1.992 -6.387V60.867c0 -2.465 -0.543 -6.789 0.836 -8.828 0.592 -0.873 1.422 -1.211 2.25 -1.766 0.145 -1.066 0.039 -2.209 0.039 -3.287V16.576c0 -2.35 -0.199 -4.875 2.004 -6.359C10.295 8.842 13.729 9.375 16.119 9.375h12.055c2.027 0 4.105 0.129 6.129 -0.014 0.156 -0.596 0.049 -1.262 0.08 -1.881 0.07 -1.385 0.879 -2.762 2.027 -3.537C38.271 2.689 40.836 3.125 42.969 3.125h13.973c2.021 0 4.557 -0.434 6.371 0.639 1.217 0.719 2.07 2.016 2.275 3.406 0.105 0.721 -0.074 1.492 0.109 2.191Zm-3.27 0.014c0.273 -1.078 0.188 -2.725 -1.105 -3.082 -1.139 -0.313 -3.65 -0.043 -4.93 -0.043h-15.617c-0.654 0 -1.461 -0.129 -2.096 0.047 -1.295 0.361 -1.383 1.99 -1.107 3.078zm28.121 40.623c0.246 -0.875 0.076 -2.004 0.076 -2.92V15.205c0 -0.859 0.143 -1.904 -0.701 -2.434 -0.939 -0.59 -2.592 -0.271 -3.668 -0.271H12.375c-0.844 0 -1.896 -0.188 -2.557 0.467C9.166 13.615 9.375 14.742 9.375 15.57v31.508c0 0.916 -0.17 2.045 0.076 2.92h3.014c0.314 -2.512 0.035 -5.803 0.035 -8.4V18.676c0 -0.832 -0.203 -1.932 0.445 -2.584C13.816 15.215 15.816 15.625 16.941 15.625h65.844c1.111 0 3.529 -0.35 4.309 0.518 0.613 0.68 0.406 1.785 0.406 2.625v22.922c0 2.568 -0.275 5.824 0.035 8.309zM84.375 18.75H15.625v31.248h9.352c0.107 -1.293 0.023 -2.625 0.023 -3.926 0 -0.617 0.133 -1.412 -0.076 -1.998 -0.32 -0.898 -1.313 -1.342 -2 -1.93 -1.014 -0.863 -1.932 -2.021 -2.572 -3.188 -2.873 -5.221 -1.709 -11.994 2.967 -15.771 0.783 -0.631 1.664 -1.328 2.623 -1.672 2.33 -0.842 2.184 1.914 2.184 3.281v5.113c0 0.549 -0.199 1.574 0.043 2.066 0.107 0.221 0.545 0.4 0.744 0.529 0.713 0.465 1.549 1.275 2.367 1.488 0.453 -0.184 2.84 -1.65 3.035 -2.01 0.242 -0.445 0.061 -1.389 0.061 -1.891v-4.566c0 -1.072 -0.387 -2.943 0.52 -3.738 1.283 -1.125 3.207 0.525 4.217 1.34 3.012 2.43 4.68 6.117 4.633 9.979 -0.037 2.982 -1.256 5.803 -3.184 8.047 -0.699 0.814 -2.404 1.793 -2.832 2.559 -0.309 0.559 -0.229 1.199 -0.229 1.814 -0.002 1.279 -0.264 3.295 0.08 4.475h21.793v-12.477c-0.559 -0.039 -1.121 0.012 -1.68 -0.031 -2.4 -0.184 -0.889 -3.211 -1.561 -4.387 -2.639 0.922 -4.621 5.082 -6.604 7.066 -0.834 0.832 -2.25 0.412 -2.598 -0.678 -0.316 -0.986 -0.061 -2.434 -0.057 -3.467 0.035 -8.182 6.494 -14.152 14.541 -14.152h4.84c2.887 0 5.014 -0.248 5.662 3.119h1.461c0.713 -2.934 2.025 -3.119 4.84 -3.119 1.145 0 2.582 -0.191 2.984 1.184 0.273 0.934 0.047 2.227 0.047 3.197v6.941c0 1.035 0.313 2.641 -0.244 3.557 -0.57 0.939 -1.756 0.746 -2.695 0.746 -2.842 0 -4.191 -0.139 -4.932 -3.119h-1.461c-0.096 0.619 0.059 1.285 -0.082 1.898 -0.34 1.473 -1.959 1.168 -3.084 1.242V50H84.375zm-15.654 6.303c-1.424 -0.279 -3.107 -0.053 -4.566 -0.053 -4.844 0 -8.635 0.121 -11.85 4.246 -0.754 0.967 -2.443 3.805 -2.031 4.998 2.035 -2.123 2.799 -3.842 6.021 -4.408 0.969 -0.17 2.256 -0.377 2.84 0.658 0.607 1.072 0.133 2.689 0.271 3.879h9.314c0.094 -0.867 -0.213 -1.977 0.48 -2.664 0.85 -0.842 4.059 -0.459 5.273 -0.459 0.592 0 1.174 0.006 1.625 0.451 0.688 0.678 0.434 1.795 0.477 2.66H78.125v-9.35h-1.545c-0.059 0.863 0.211 1.969 -0.473 2.652 -0.451 0.451 -1.037 0.461 -1.633 0.461 -1.213 0 -4.436 0.383 -5.277 -0.467 -0.691 -0.697 -0.355 -1.74 -0.477 -2.605Zm-43.834 0.873c-3.266 3.434 -4.209 8.369 -1.229 12.377 1.18 1.586 3.207 2.451 4.047 4.266 1.053 2.273 0.045 5.043 0.469 7.432h6.119c0.617 -2.053 -0.516 -5.189 0.488 -7.4 0.832 -1.836 2.877 -2.664 4.043 -4.273 2.623 -3.617 2.441 -9.482 -1.244 -12.395 -0.566 1.73 0.422 5.645 -0.156 7.336 -0.344 1.004 -1.717 1.559 -2.537 2.121 -0.83 0.57 -2.457 1.949 -3.4 2.096 -0.627 0.096 -1.1 -0.25 -1.592 -0.572 -1.137 -0.744 -2.256 -1.523 -3.389 -2.273 -0.432 -0.287 -0.996 -0.551 -1.27 -1.012 -0.525 -0.891 -0.236 -4.605 -0.236 -5.818 -0.002 -0.533 0.168 -1.438 -0.113 -1.883ZM62.5 37.506v12.488h3.125v-12.488zM7.375 53.186c-1.117 0.344 -1.125 1.412 -1.125 2.385v35.344c0 0.799 -0.166 1.793 0.48 2.402 0.832 0.783 3.508 0.434 4.639 0.434h77.535c1.363 0 4.139 0.598 4.75 -1.053 0.305 -0.824 0.096 -2.008 0.096 -2.881V56.211c0 -0.859 0.213 -2.008 -0.492 -2.662 -0.867 -0.803 -4.219 -0.424 -5.449 -0.424H13.563c-1.289 0 -5.193 -0.244 -6.188 0.061Zm27.854 3.109c1.164 -0.191 2.453 -0.045 3.631 -0.045h19.451c2.029 0 4.092 -0.107 6.119 0.012 2.592 0.15 4.732 2.758 4.277 5.346 -0.656 3.738 -3.496 4.018 -6.652 4.018h-19.361c-2.211 0 -6.877 0.414 -8.746 -0.441 -4.146 -1.902 -3.129 -8.166 1.281 -8.889Zm0.451 3.102c-1.635 0.258 -1.703 2.682 -0.105 3.063 0.676 0.16 1.496 0.041 2.188 0.041h20.549c1.801 0 4.309 0.268 6.027 -0.023 0.68 -0.115 1.242 -0.764 1.281 -1.445 0.043 -0.744 -0.494 -1.465 -1.229 -1.625 -1.318 -0.289 -4.064 -0.031 -5.531 -0.031H38.127c-0.793 0 -1.664 -0.102 -2.447 0.021Z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0.7" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">عیب‌یابی فوق‌تخصصی و تعمیر بردهای الکترونیکی در سطح کامپوننت</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.بررسی دقیق المان‌های مدار، لحیم‌کاری میکروسکوپی، تعویض چیپ‌ها و احیای بردهای آسیب‌دیده</text>
      </g>

      <g transform="translate(0, 220)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">تعمیر، بازسازی و سرویس دوره‌ای سوئیچ‌های شبکه، روترها و سرورها</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.تعمیر منابع تغذیه، فن‌ها، ماژول‌های شبکه و مادربردهای سرورها و سوئیچ‌های سازمانی برند‌های مختلف داخلی و خارجی</text>
      </g>

      <g transform="translate(0, 325)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">سرویس تخصصی و ارتقای کامپیوترها، ورک‌استیشن‌ها و لپ‌تاپ‌های اداری</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.ارتقای رم، حافظه‌های پرسرعت، بهبود خنک‌کنندگی و سرویس دوره‌ای سخت‌افزارهای دفتری و سازمانی</text>
      </g>

      <g transform="translate(0, 430)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">تأمین قطعات یدکی اورجینال و خدمات پشتیبانی فنی در محل کارفرما</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.تأمین بدون واسطه قطعات سخت‌افزاری اصلی با ضمانت، تست‌های استرس‌بار قطعات و اعزام کارشناس فنی جهت تعمیرات در محل</text>
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
      <text x="965" y="480" fill="${textPrimary}" class="vazir-bold" font-size="19" text-anchor="end">کابل‌کشی فیبر نوری، پچ‌پنل‌های نوری و کلاسترهای پردازشی سرور</text>
      <text x="45" y="480" fill="${accent}" class="space-bold" font-size="15" text-anchor="start">OPTICAL &amp; DATA FABRIC</text>
    </g>

    <!-- Card 1: Network Infrastructure -->
    <g transform="translate(65, 870)">
      <rect width="1030" height="440" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">زیرساخت شبکه پسیو و اکتیو</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">STRUCTURED CABLING, CISCO &amp; MIKROTIK ROUTING</text>

      <g transform="scale(1.2), translate(40, 30)">
        <path d="M15.039 17.039c1.281 -2.801 2.195 -5.43 4.258 -7.832C25.262 2.258 35.84 -0.613 44.359 3.227c2.594 1.168 4.984 2.676 7.016 4.707 1.016 1.02 1.91 2.871 3.117 3.562 7.828 -4.977 17.512 -5.191 24.352 1.781 1.391 1.418 2.645 3.023 3.516 4.809 0.371 0.762 0.582 1.656 1.039 2.367 1.203 0.211 2.637 -0.188 3.902 -0.094 2.371 0.172 4.805 1.344 6.617 2.84 6.816 5.617 5.543 17.066 -2.52 20.867 -4.648 2.188 -11.488 1.246 -16.594 1.246 -1.551 0 -3.594 -0.344 -5.078 0.109 -0.305 0.945 -0.609 1.895 -0.91 2.84 1.066 0.578 3.203 0.176 4.426 0.176 4.555 0 9.324 -0.398 11.816 4.203 0.91 1.676 0.383 3.465 0.98 5.105 2.898 0.527 9.332 -1.07 11.457 0.945 1.246 1.184 0.941 3.109 0.941 4.656v10.938c0 1.508 0.281 3.371 -0.945 4.52 -1.871 1.754 -4.668 0.328 -6.855 0.98v3.031h3.102V85.938h-18.727v-3.129h3.102v-3.055c-2.109 -0.309 -5.266 0.734 -6.922 -1.008 -1.164 -1.23 -0.879 -3.039 -0.879 -4.594v-10.805c0 -1.551 -0.309 -3.473 0.941 -4.656 2.473 -2.332 8.488 0.109 11.492 -0.98 1.191 -6.574 -5.047 -6.148 -9.375 -6.148 -1.488 0 -4.93 -0.434 -6.195 0.063 -0.73 0.285 -1.488 1.906 -2.039 2.512 -1.57 1.742 -3.465 3.25 -5.527 4.371a20.195 20.195 0 0 1 -5.309 1.973c-0.906 0.195 -1.867 0.168 -2.73 0.523v6.117c3.137 0.453 6.922 -0.773 9.879 0.531 2.629 1.16 2.613 4.09 2.613 6.5v10.027c0 1.543 -0.211 3.273 0.066 4.785 0.75 0.309 1.586 0.398 2.18 1.039 2.801 3.035 -0.965 7.664 -4.133 8.344 -1.594 0.34 -3.457 0.09 -5.078 0.09h-10.938c-2.605 0 -5.938 0.559 -8.461 -0.117 -2.969 -0.793 -7.027 -5.465 -3.945 -8.379 0.617 -0.582 1.379 -0.672 2.117 -0.977 0.277 -1.512 0.066 -3.242 0.066 -4.785v-10.027c0 -2.5 0.004 -5.359 2.715 -6.52 3.051 -1.305 6.691 0.367 9.781 -0.547v-6.082c-0.867 -0.352 -1.828 -0.328 -2.734 -0.52 -1.82 -0.387 -3.684 -1.078 -5.309 -1.977 -2.063 -1.145 -3.949 -2.617 -5.531 -4.367 -0.547 -0.605 -1.297 -2.234 -2.031 -2.52 -1.371 -0.527 -5.109 -0.059 -6.723 -0.059 -3.324 0 -7.219 -0.555 -8.633 3.203 -0.316 0.84 -0.496 2.129 -0.184 2.98 3.375 0.613 8.035 -1.227 10.844 1.297 1.734 1.559 1.555 3.727 1.555 5.867v24.738c0 1.922 0.418 4.387 -0.48 6.152 -1.332 2.609 -3.91 2.637 -6.484 2.637H10.871c-1.719 0 -3.949 0.375 -5.609 -0.094C1.469 97.277 1.563 93.844 1.563 90.559V68.945c0 -2.781 -0.762 -6.746 0.883 -9.145 2.645 -3.859 8.078 -0.828 11.551 -2.09 0.266 -1.461 -0.043 -2.953 0.598 -4.367 2.422 -5.352 6.984 -4.906 12.035 -4.906 1.25 0 3.461 0.414 4.555 -0.176 -0.301 -0.945 -0.605 -1.891 -0.91 -2.84 -1.477 -0.461 -3.531 -0.109 -5.078 -0.109 -4.969 0 -10.777 0.859 -15.402 -1.258 -8.43 -3.855 -10.898 -15.262 -4.645 -22.176 1.824 -2.016 4.223 -3.508 6.828 -4.234 0.977 -0.273 2.141 -0.199 3.063 -0.605Zm36.832 -3.301c-0.645 -2.199 -3.398 -4.387 -5.203 -5.652 -6.68 -4.68 -15.867 -4.418 -22.313 0.578 -2.352 1.824 -4.336 4.383 -5.539 7.086 -0.633 1.426 -0.75 3.137 -1.414 4.496 -0.855 0.238 -1.867 0.047 -2.754 0.094 -1.887 0.102 -3.949 0.934 -5.461 2.055C3.047 26.953 3.387 36.504 9.887 40.566 13.93 43.09 19.453 42.188 24.023 42.188c1.664 0 4.027 0.422 5.598 -0.09 0.426 -1.828 0.129 -3.906 0.512 -5.801 0.605 -3.004 2.09 -5.848 3.953 -8.27 8.348 -10.852 24.84 -9.867 32.613 1.043 1.973 2.762 3.063 6.063 3.504 9.406 0.16 1.188 -0.094 2.484 0.176 3.625 1.816 0.578 5.523 0.086 7.551 0.086 6.5 0 14.25 1.215 16.91 -6.406 2.883 -8.258 -5.953 -14.723 -13.395 -11.297 -0.781 -0.773 -0.672 -2.109 -1.074 -3.09 -0.793 -1.93 -1.75 -3.742 -3.148 -5.32 -4.773 -5.379 -13.164 -6.672 -19.379 -3.09 -2.262 1.305 -3.562 3.145 -5.305 4.969 -0.84 -0.578 -1.68 -1.16 -2.523 -1.742 0.621 -0.824 1.238 -1.648 1.855 -2.473Zm-3.887 -0.262c-0.41 0.727 -1.633 1.84 -2.477 1.902 -7.133 -6.996 -15.27 -5.684 -20.703 2.34 -0.871 -0.371 -1.742 -0.746 -2.613 -1.117 -0.242 -1.855 3.598 -5.141 5.027 -6.121 6.84 -4.68 15.359 -2.754 20.766 2.996Zm6.637 16.199c-0.105 -1.828 -2.559 -6.273 -4.688 -6.227 -2.059 0.047 -4.441 4.449 -4.555 6.227zM43.945 24.691c-1.836 0.117 -6.266 3.285 -6.996 4.98h5.043c0.652 -1.66 1.301 -3.32 1.953 -4.98Zm12.109 -0.004c0.652 1.66 1.301 3.324 1.953 4.984h5.043c-0.734 -1.707 -5.152 -4.852 -6.996 -4.984Zm-14.773 8.32c-0.727 -0.406 -1.855 -0.195 -2.676 -0.195 -1 0 -2.922 -0.371 -3.816 0.086 -0.941 0.488 -1.793 5.09 -1.906 6.152h7.676c0.242 -2.016 0.484 -4.027 0.723 -6.043Zm14.121 -0.191h-10.805c-0.262 2.082 -0.523 4.16 -0.781 6.238h12.367c-0.258 -2.078 -0.52 -4.156 -0.781 -6.238Zm11.715 6.234c-0.113 -1.063 -0.969 -5.66 -1.906 -6.152 -0.887 -0.461 -2.82 -0.086 -3.816 -0.086 -0.82 0 -1.953 -0.211 -2.68 0.195l0.727 6.043zm-26.559 3.148H32.883c0.117 1.078 0.949 5.641 1.91 6.148 0.887 0.465 2.816 0.09 3.813 0.09 0.82 0 1.949 0.211 2.676 -0.195 -0.238 -2.016 -0.48 -4.027 -0.723 -6.043Zm15.625 -0.004h-12.367c0.258 2.078 0.52 4.156 0.781 6.238h10.805c0.262 -2.082 0.523 -4.16 0.781 -6.238Zm10.934 0.004h-7.676l-0.727 6.043c0.723 0.406 1.863 0.195 2.68 0.195 0.988 0 2.934 0.379 3.809 -0.094 0.961 -0.516 1.797 -5.063 1.914 -6.145Zm-25.125 9.379H36.969c0.688 1.707 5.156 4.84 6.977 4.984 -0.652 -1.66 -1.301 -3.32 -1.953 -4.984Zm12.629 -0.004h-9.242c0.102 1.824 2.551 6.273 4.688 6.223 2.063 -0.047 4.426 -4.445 4.555 -6.223Zm8.422 0.004H58.008c-0.652 1.664 -1.301 3.324 -1.953 4.984 1.832 -0.16 6.285 -3.27 6.988 -4.984Zm-36.547 18.73c0.297 -2.078 0.066 -4.34 0.066 -6.441 0 -0.859 0.168 -1.832 -0.504 -2.492 -0.656 -0.637 -1.723 -0.438 -2.555 -0.438h-14.453c-0.938 0 -2.551 -0.309 -3.395 0.113 -0.352 0.172 -0.758 0.566 -0.895 0.938 -0.285 0.785 -0.223 7.469 0.027 8.32zm68.813 -9.367h-21.867v9.367h21.867zm-84.383 3.133v3.102h-3.102v-3.102zm6.25 0v3.102h-3.102v-3.102zm43.695 24.984c0.613 -4.316 0.066 -9.105 0.066 -13.473 0 -1.297 0.488 -3.746 -0.441 -4.77 -0.672 -0.734 -1.855 -0.504 -2.75 -0.504h-14.711c-0.852 0 -2.344 -0.285 -3.09 0.168 -1.391 0.844 -0.883 3.066 -0.883 4.453v9.508c0 1.426 -0.301 3.254 0.102 4.617zm-34.313 -15.617H4.691v9.367h21.867zm31.25 -0.004v12.5h-15.617v-12.5zm37.492 0.004h-21.852v3.117h21.852zm-78.125 3.133v3.102h-3.102v-3.102zm6.25 0v3.102h-3.102v-3.102zm31.254 -0.008h-9.359v6.242h9.359zm32.809 3.129h-6.227v3.109h6.227zM26.461 85.941H4.754c-0.297 2.078 -0.066 4.34 -0.066 6.441 0 0.805 -0.18 1.797 0.438 2.426 0.684 0.695 1.73 0.504 2.621 0.504h14.586c0.926 0 2.523 0.305 3.344 -0.168 0.332 -0.191 0.672 -0.527 0.809 -0.895 0.285 -0.785 0.23 -7.453 -0.023 -8.309Zm-15.535 3.133v3.102h-3.102v-3.102zm6.25 0v3.102h-3.102v-3.102zm46.82 3.117H36.004c-0.242 3.086 3.199 3.121 5.336 3.121h17.578c2.105 0 5.297 -0.168 5.078 -3.121Z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0.5" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">کابل‌کشی ساخت‌یافته استاندارد مس و آزمون فلوک</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">نصب ترانکینگ استاندارد، پچ‌پنل، برچسب‌گذاری مهندسی، آرایش رک و ارائه سرتیفیکیت معتبر تست فلوک نودها.</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">.(Cisco &amp; MikroTik) پیکربندی تجهیزات اکتیو سازمانی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.VPN و راه اندازی انواع (Load Balancing) سوئیچ‌های مدیریتی لایه ۲ و ۳، روترهای مرزی، توزیع بار اینترنت</text>
      </g>

      <g transform="translate(0, 315)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">امنیت شبکه و وای‌فای سازمانی با رومینگ سراسری</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.ایزوله‌سازی ترافیک مالی، اداری و مهمان، فایروال‌های سخت‌افزاری و پوشش اکسس‌پوینت‌ها با رومینگ یکپارچه</text>
      </g>
    </g>

    <!-- Card 2: Fiber Optics & VoIP -->
    <g transform="translate(65, 1345)">
      <rect width="1030" height="420" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">VoIP زیرساخت فیبر نوری و مراکز تلفن</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">FTTH FIBER BACKBONES &amp; UNIFIED TELEPHONY</text>

      <g transform="scale(1.5), translate(15, 15)">
        <path d="M60.721 59.814c-0.308 -0.227 -0.62 -0.408 -0.853 -0.732 -1.542 -2.144 1.403 -3.95 2.427 -5.486 1.006 -1.231 1.684 -2.762 2.25 -4.235 -0.428 -0.023 -0.898 0.125 -1.326 0.193 -0.508 0.08 -1.022 0.144 -1.531 0.209 -1.27 0.162 -2.559 0.142 -3.835 0.255l-0.022 2.371c-0.065 0.963 -0.018 1.943 -0.018 2.909 0 0.411 0.048 0.857 -0.03 1.262 -0.162 0.834 -1.007 1.382 -1.833 1.226 -1.125 -0.212 -1.256 -1.169 -1.256 -2.122 0 -1.627 0.068 -3.272 -0.012 -4.897l-0.008 -0.765 -1.079 -0.06c-1.571 -0.194 -3.142 -0.386 -4.713 -0.579 0.234 0.835 0.634 1.656 1.016 2.433 0.521 1.058 1.008 1.852 -0.023 2.816 -0.191 0.107 -0.392 0.23 -0.61 0.265 -1.896 0.303 -2.216 -2.166 -2.959 -3.36 -0.352 -1.008 -0.704 -2.016 -1.057 -3.025 -0.32 -0.088 -0.639 -0.175 -0.959 -0.264 -0.81 -0.441 -1.968 -0.473 -2.647 -1.15 -1.131 -1.129 -0.161 -2.602 1.268 -2.694 0.506 0.182 1.011 0.364 1.516 0.547 0.095 -0.536 -0.221 -1.799 -0.293 -2.421 -0.163 -1.424 -0.238 -2.854 -0.263 -4.289 -0.025 -1.456 0.026 -2.937 0.164 -4.383 0.071 -0.739 0.41 -2.13 0.3 -2.784 -1.339 0.532 -2.641 1.119 -3.868 1.882 -0.635 0.395 -1.21 0.883 -1.858 1.253 -0.465 0.266 -1.003 0.351 -1.462 0.594 -0.469 -0.013 -0.918 0.061 -1.377 -0.101 -1.087 -0.384 -1.554 -1.485 -1.433 -2.579 0.173 -1.553 1.247 -3.815 2.03 -5.183 3.331 -5.816 8.664 -10.048 15.264 -11.507 0.758 -0.167 1.526 -0.321 2.294 -0.421 0.269 -0.035 0.561 0.01 0.819 -0.093 0.289 -0.115 0.458 -0.471 0.747 -0.637 0.922 -0.526 1.563 -0.009 2.176 0.622 11.236 0.409 20.883 9.266 22.047 20.506 0.284 2.736 0.113 5.549 -0.553 8.215 -1.482 5.925 -5.34 11.118 -10.575 14.256 -1.324 0.794 -3.941 2.152 -5.439 2.312 -0.882 0.094 -1.602 -0.14 -2.43 -0.357Zm-2.905 -41.763v7.931c0.948 0.11 1.917 0.072 2.869 0.154 1.35 0.117 2.679 0.418 4.018 0.549 0.042 -1.334 -1.833 -2.946 -0.125 -4.073 0.2 -0.132 0.436 -0.218 0.673 -0.237 0.991 -0.076 1.464 0.572 1.795 1.398 0.318 0.795 0.613 1.601 0.86 2.422 0.134 0.442 0.222 0.921 0.407 1.339 1.84 0.515 3.64 1.254 5.323 2.161 0.571 0.308 1.102 0.678 1.659 1.007 -0.024 -0.475 -0.363 -1.019 -0.574 -1.451 -0.547 -1.12 -1.191 -2.186 -1.936 -3.184 -3.315 -4.442 -8.274 -7.251 -13.748 -7.973 -0.401 -0.053 -0.82 -0.019 -1.224 -0.043Zm-3.122 0.147c-1.136 0.487 -2.065 1.434 -2.829 2.381 -1.448 1.795 -2.348 3.898 -3.142 6.042 0.574 0.093 1.246 -0.132 1.827 -0.219 1.368 -0.205 2.763 -0.331 4.144 -0.386zm-8.953 3.078c-0.703 0.321 -1.326 0.92 -1.922 1.404 -1.84 1.49 -3.412 3.415 -4.56 5.481 -0.408 0.734 -1.109 1.791 -1.222 2.611 1.204 -0.653 2.325 -1.414 3.581 -1.984 1.153 -0.524 2.379 -0.826 3.542 -1.293 0.179 -0.578 0.359 -1.156 0.538 -1.734 0.274 -0.6 0.454 -1.253 0.709 -1.866 0.597 -1.434 1.298 -2.836 2.171 -4.123 -0.311 0.006 -0.623 0.218 -0.909 0.362 -0.648 0.327 -1.378 0.668 -1.928 1.142Zm1.389 19.19c-0.053 1.506 0.368 3.977 0.77 5.445 0.69 0.134 1.381 0.268 2.07 0.402 0.536 0.218 1.195 0.208 1.763 0.279 0.965 0.12 1.948 0.25 2.925 0.248V29.142c-2.104 0.074 -4.826 0.397 -6.856 0.95 -0.136 0.384 -0.177 0.779 -0.245 1.178a38.539 38.539 0 0 0 -0.44 3.662c-0.082 1.127 -0.099 2.246 -0.095 3.379 0.002 0.724 -0.024 1.443 0.108 2.155Zm10.685 -11.334v17.734c2.381 -0.005 5.416 -0.311 7.711 -0.934 0.774 -2.938 0.975 -6.319 0.879 -9.356 -0.068 -2.164 -0.235 -4.38 -0.755 -6.484 -0.929 -0.265 -1.898 -0.388 -2.849 -0.532 -1.644 -0.25 -3.318 -0.454 -4.984 -0.427Zm11.272 1.939c-0.108 0.558 0.155 1.442 0.222 2.035 0.161 1.416 0.255 2.866 0.262 4.292 0.007 1.644 -0.086 3.299 -0.259 4.932 -0.07 0.666 -0.401 2.026 -0.316 2.598 2.318 -0.847 4.679 -2.005 6.355 -3.866 0.847 -0.941 1.512 -2.175 1.354 -3.481 -0.146 -1.21 -0.883 -2.265 -1.731 -3.103 -1.644 -1.626 -3.778 -2.557 -5.888 -3.406ZM46.022 63.571c-2.452 -0.229 -3.343 -1.499 -4.963 -3.123 -1.398 -1.402 -2.798 -2.803 -4.2 -4.202 -0.734 -0.732 -1.592 -1.437 -2.188 -2.289 -0.254 -0.363 -0.384 -0.792 -0.6 -1.163 -0.046 -0.293 -0.142 -0.582 -0.181 -0.877 -0.136 -0.994 0.165 -2.03 0.674 -2.878 0.561 -0.932 2.102 -1.684 1.591 -2.955 -0.237 -0.591 -1.301 -1.483 -1.779 -1.966 -1.3 -1.317 -2.585 -2.652 -3.895 -3.96 -0.494 -0.494 -1.363 -1.611 -1.977 -1.852 -0.848 -0.334 -1.551 0.276 -2.03 0.932l-2.828 2.834c-1.682 1.358 -2.297 3.802 -1.158 5.718 0.595 1.001 1.581 1.804 2.404 2.617 6.262 6.187 12.469 12.434 18.677 18.675 1.321 1.327 2.647 2.649 3.973 3.973 1.256 1.254 2.181 2.353 4.069 2.501 0.262 0.066 0.501 0.018 0.765 -0.012 0.422 -0.047 0.872 -0.11 1.254 -0.317 0.363 -0.196 0.663 -0.5 0.997 -0.74 0.492 -0.353 1.043 -0.584 1.629 -0.728 2.995 -0.584 5.49 1.99 6.1 4.745 0.342 1.546 0.161 3.254 0.161 4.83 0 0.828 0.141 2.336 -0.073 3.085 -0.222 0.783 -1.076 1.191 -1.839 1.047 -1.43 -0.269 -1.223 -1.971 -1.223 -3.036v-1.735c0 -0.98 0.124 -2.351 -0.029 -3.285 -0.154 -0.939 -0.781 -2.106 -1.687 -2.508 -0.847 -0.376 -1.422 0.334 -2.051 0.768 -0.355 0.246 -0.739 0.44 -1.144 0.588 -1.974 0.715 -4.202 0.578 -6.062 -0.408 -1.534 -0.814 -2.679 -2.202 -3.891 -3.416 -1.932 -1.933 -3.864 -3.868 -5.799 -5.799 -4.037 -4.03 -8.064 -8.069 -12.1 -12.101 -1.99 -1.988 -4.075 -3.916 -5.977 -5.987 -2.135 -2.325 -2.429 -6.012 -0.86 -8.711 0.699 -1.201 1.771 -2.129 2.741 -3.105 1.708 -1.72 3.459 -4.109 6.205 -3.584 0.458 0.088 0.899 0.216 1.317 0.429 1.083 0.556 1.893 1.611 2.742 2.462 1.278 1.28 2.515 2.601 3.795 3.879 1.404 1.401 2.802 2.547 2.797 4.706 -0.003 0.995 -0.328 2.015 -0.974 2.787 -0.531 0.635 -1.564 1.265 -1.389 2.216 0.138 0.745 1.248 1.601 1.786 2.132 1.591 1.574 3.165 3.166 4.747 4.751 0.59 0.591 1.574 1.893 2.437 1.91 0.804 0.016 1.286 -0.771 1.926 -1.139 1.247 -0.717 2.742 -0.822 4.064 -0.246 1.14 0.497 1.962 1.519 2.82 2.383 1.396 1.405 2.81 2.792 4.202 4.201 0.799 0.809 1.889 1.716 0.91 2.916 -0.224 0.274 -0.525 0.434 -0.862 0.518 -0.941 0.235 -1.518 -0.505 -2.117 -1.092a271.142 271.142 0 0 1 -3.835 -3.835c-0.626 -0.638 -1.405 -1.577 -2.118 -2.079 -1.159 -0.818 -1.872 0.416 -2.76 0.92 -0.687 0.389 -1.417 0.53 -2.193 0.607ZM75.333 45.251c-0.349 0.118 -0.695 0.417 -1.019 0.617 -0.687 0.424 -1.412 0.802 -2.145 1.138 -0.893 0.41 -1.812 0.778 -2.744 1.088 -0.431 0.143 -0.898 0.24 -1.302 0.445 -0.209 0.563 -0.362 1.15 -0.568 1.713 -0.839 2.297 -2.02 4.477 -3.632 6.323 0.363 0.036 0.758 -0.208 1.1 -0.365 0.778 -0.357 1.531 -0.761 2.257 -1.214 2.746 -1.715 5.155 -4.122 6.742 -6.958 0.485 -0.866 1.082 -1.816 1.312 -2.787ZM60.527 68.8c2.121 -0.505 2.735 2.689 0.7 3.058 -1.953 0.354 -2.582 -2.611 -0.7 -3.058Z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0.3" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">اجرای لینک‌های حرفه‌ای و قابل اطمینان فیبر نوری</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.مسیرسازی تخصصی فیبر نوری، سربندی پچ‌پنل‌ها و تضمین ارتباطات پرسرعت بین طبقات و ساختمان‌ها</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">و پیرکربندی خطوط اتصال VoIP راه‌اندازی سرورهای تلفنی</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.راه‌اندازی سرورهای مبتنی بر ایزابل و استریسک، خطوط مخابراتی پرظرفیت سیپ‌ترانک و آنالوگ و منشی تلفنی هوشمند</text>
      </g>

      <g transform="translate(0, 315)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">داخلی‌های تلفن روی موبایل و تجهیز سالن‌های جلسات به ویدئوکنفرانس</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.پاسخگویی به تماس‌های سازمان در هر نقطه از دنیا، ضبط هوشمند مکالمات و صف‌های مدیریت ارتباط با مشتریان</text>
      </g>
    </g>

    <!-- Card 3: Servers, Power & Battery Telemetry -->
    <g transform="translate(65, 1795)">
      <rect width="1030" height="395" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="52" fill="${textPrimary}" class="vazir-bold" font-size="26" text-anchor="end">سرورها، پایش سلامت باتری و سامانه‌های تغذیه</text>
      <text x="980" y="85" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">SERVER VIRTUALIZATION &amp; REAL-TIME BATTERY HEALTH MONITORING</text>

      <g transform="scale(1.4), translate(30, 25)">
        <path d="M13.575 18.75c0.67 -0.102 1.409 -0.02 2.087 -0.02h67.397c1.47 0 3.87 -0.378 4.884 0.862 0.675 0.827 0.527 1.922 0.527 2.92v55.342c0 0.899 0.079 1.816 -0.527 2.555 -0.985 1.204 -2.778 0.865 -4.153 0.865h-67.58c-1.529 0 -3.544 0.362 -4.409 -1.249 -0.494 -0.922 -0.266 -3.011 -0.266 -4.089v-53.516c0 -1.653 -0.028 -3.354 2.04 -3.67Zm2.591 4.625v24.305h67.668V23.374zm8.818 5.52c0.808 -0.062 1.622 0.069 2.392 0.301 0.722 0.217 1.397 0.571 2 1.024 3.919 2.942 3.373 9.059 -1.017 11.247 -0.82 0.408 -1.735 0.653 -2.651 0.702 -0.779 0.041 -1.564 -0.087 -2.306 -0.315 -5.521 -1.7 -6.282 -9.363 -1.218 -12.136 0.868 -0.475 1.815 -0.748 2.801 -0.824Zm14.246 0c0.807 -0.062 1.623 0.069 2.392 0.301 0.723 0.219 1.396 0.572 2 1.024 3.928 2.941 3.362 9.056 -1.017 11.247 -0.818 0.409 -1.735 0.654 -2.65 0.703 -0.78 0.042 -1.563 -0.088 -2.306 -0.315 -5.532 -1.693 -6.276 -9.36 -1.219 -12.136 0.867 -0.476 1.816 -0.748 2.801 -0.824Zm10.063 0.003c0.822 -0.105 1.705 -0.018 2.533 -0.018h25.753c0.952 0 1.974 -0.127 2.777 0.489 0.942 0.722 0.913 1.838 0.913 2.915v5.388c0 0.932 0.136 1.979 -0.127 2.882 -0.434 1.495 -1.796 1.623 -3.107 1.623h-27.397c-0.876 0 -1.769 0.077 -2.504 -0.492 -1.046 -0.809 -0.905 -2.102 -0.905 -3.282v-4.932c0 -0.826 -0.095 -1.718 0.02 -2.536 0.15 -1.061 0.974 -1.9 2.043 -2.037Zm-24.31 4.643c-2.568 0.435 -1.827 4.55 0.882 3.962 2.48 -0.539 1.761 -4.41 -0.882 -3.962Zm14.247 -0.001c-2.57 0.435 -1.828 4.553 0.882 3.962 2.479 -0.541 1.759 -4.407 -0.882 -3.962Zm12.647 -0.023v4.018h24.751v-4.018zM16.166 52.324v24.305h67.668V52.324zm8.818 5.52c0.807 -0.062 1.623 0.068 2.392 0.301 0.722 0.219 1.396 0.571 2 1.024 3.921 2.939 3.371 9.063 -1.017 11.247 -0.82 0.408 -1.735 0.654 -2.651 0.702 -0.78 0.041 -1.564 -0.087 -2.306 -0.315 -5.521 -1.697 -6.283 -9.365 -1.218 -12.136 0.868 -0.475 1.815 -0.747 2.801 -0.824Zm14.247 0c0.806 -0.062 1.624 0.068 2.391 0.302 0.723 0.22 1.395 0.571 2 1.023 3.933 2.937 3.356 9.057 -1.017 11.247 -0.818 0.409 -1.735 0.654 -2.65 0.703 -0.78 0.042 -1.563 -0.088 -2.306 -0.315 -5.531 -1.689 -6.277 -9.363 -1.219 -12.136 0.868 -0.476 1.816 -0.747 2.802 -0.824Zm10.062 0.003c0.822 -0.105 1.705 -0.018 2.533 -0.018h25.753c0.952 0 1.974 -0.127 2.777 0.489 0.942 0.722 0.913 1.838 0.913 2.915v5.388c0 0.932 0.136 1.979 -0.126 2.882 -0.436 1.495 -1.796 1.623 -3.108 1.623h-27.397c-0.876 0 -1.77 0.077 -2.504 -0.492 -1.046 -0.809 -0.905 -2.102 -0.905 -3.282v-4.932c0 -0.826 -0.096 -1.718 0.02 -2.535 0.15 -1.062 0.974 -1.901 2.043 -2.038Zm-24.309 4.643c-2.569 0.436 -1.83 4.549 0.881 3.962 2.48 -0.537 1.76 -4.411 -0.881 -3.962Zm14.246 -0.001c-2.57 0.435 -1.828 4.554 0.882 3.963 2.479 -0.542 1.758 -4.408 -0.882 -3.963Zm12.647 -0.023v4.018h24.751v-4.018z" fill="${accent}" fill-rule="evenodd" stroke="${accent}" stroke-width="0.08" stroke-linejoin="round"/>
      </g>

      <g transform="translate(0, 115)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">پیکربندی سرورها و مجازی‌سازی منابع با تکنولوژی‌ها و بسترهای مختلف</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.بهینه‌سازی منابع سخت‌افزاری، استقرار ماشین‌های مجازی، سرویس‌های اکتیودایرکتوری و بکاپ‌گیری خودکار</text>
      </g>

      <g transform="translate(0, 215)">
        <circle cx="985" cy="18" r="8" fill="${accent}" />
        <text x="960" y="24" fill="${textPrimary}" class="vazir-bold" font-size="21" text-anchor="end">های صنعتیUPS پایش برخط سلامت باتری‌ها و</text>
        <text x="960" y="56" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.محاسبه توان اضطراری، پایش لحظه‌ای مقاومت داخلی و ولتاژ سلول‌ها و پیشگیری از خاموشی ناگهانی دیتاسنترها</text>
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
      <text x="0" y="0" fill="${accent}" class="space-bold" font-size="21" letter-spacing="3" text-anchor="end">05 // LIFECYCLE &amp; PROCUREMENT</text>
      <text x="0" y="55" fill="${textPrimary}" class="vazir-bold" font-size="44" text-anchor="end">فرآیند ۴ مرحله‌ای خدمات و تأمین و اجرا</text>
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
      <text x="955" y="200" fill="${accent}" class="space-bold" font-size="18" text-anchor="end">AUDIT · SUPPLY · DEPLOYMENT · SUPPORT</text>
    </g>

    <!-- 4 Steps Flow (Numbered, Minimal, Impactful) -->
    <!-- Step 1: مشاوره -->
    <g transform="translate(65, 600)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۱</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">مشاوره و طراحی</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">COMPREHENSIVE ANALYSIS &amp; SITE ASSESSMENT</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.بازدید میدانی از پروژه، ارائه طرح‌‌های مهندسی مناسب</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.جلسات تخصصی با کارفرما جهت شفاف‌سازی نیازمندی‌ها، اولویت‌بندی اجرایی و جلوگیری از هزینه‌های اضافی</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">:دستاوردهای این مرحله</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">گزارش بررسی فنی محل پروژه · تحلیل منابع و نیازمندی‌ها · برآورد اقتصادی بهینه</text>
    </g>

    <!-- Step 2: تأمین تجهیزات و BOM -->
    <g transform="translate(65, 935)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۲</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">تأمین تجهیزات و اقلام تخصصی</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">DIRECT SOURCING &amp; SUPLY OF MATERIALS</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.تأمین مستقیم و بدون واسطه تجهیزات از معتبرترین برندهای بین‌المللی</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.ارائه لیست تفصیلی تجهیزات متناسب و فاکتور خرید همراه با ضمانت اصالت و استاندارد فنی</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">:دستاوردهای این مرحله</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">صورت‌حساب تفصیلی · تضمین اصالت و سلامت کالا · قیمت رقابتی</text>
    </g>

    <!-- Step 3: اجرا و پیاده‌سازی -->
    <g transform="translate(65, 1270)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۳</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">اجرا و پیاده‌سازی استاندارد</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">STANDARD COMMISSIONING &amp; FIELD IMPLEMENTATION</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.کابل‌کشی ساخت‌یافته، ارتباطات فیبر نوری، آرایش دقیق رک‌ها و استقرار سرورها بر اساس مستندات مهندسی</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.کانفیگ تخصصی سوئیچ‌ها، فایروال‌ها و سامانه‌های حفاظتی، امن‌سازی فریم‌ورها و تست‌های فنی و عملیاتی نهایی</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">:دستاوردهای این مرحله</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">پیاده‌سازی استاندارد طرح‌های مهندسی · نقشه‌ها و مستندات فنی دقیق · آزمون عملیاتی و اعتبارسنجی</text>
    </g>

    <!-- Step 4: پشتیبانی و نگهداری -->
    <g transform="translate(65, 1605)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۴</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">پشتیبانی و نگهداری مستمر</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">PERMANENT MONITORING, SUPPLY &amp; MAINTENANCE</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.پایش دوره‌ای تجهیزات و سرویس‌ها، عیب‌یابی حضوری و آنلاین، به‌روزرسانی مداوم فریم‌ورها و بکاپ‌گیری منظم</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">پاسخگویی سریع , ارسال کارشناس فنی جهت تعمیرات و ارتقا، بررسی فنی و اطمینان از تاب‌آوری و کارکرد سیستم‌ها</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">:دستاوردهای این مرحله</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">پاسخگویی سریع و خدمات فنی مستمر · مانیتورینگ پیشگیرانه · آرامش خاطر کارفرما</text>
    </g>

    <!-- Supplementary: Software, Web & AI Workflows -->
    <g transform="translate(65, 1940)">
      <rect width="1030" height="260" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="980" y="48" fill="${textPrimary}" class="vazir-bold" font-size="24" text-anchor="end">توسعه نرم‌افزار، پرتال‌های سازمانی و گردش‌کارهای هوش مصنوعی</text>
      <text x="980" y="80" fill="${accent}" class="space-bold" font-size="15" text-anchor="end">ENTERPRISE WEB PLATFORMS, LINUX SYSTEMS &amp; AI-ASSISTED AUTOMATION</text>
      
      <g transform="translate(0, 105)">
        <circle cx="985" cy="16" r="7" fill="${accent}" />
        <text x="965" y="22" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.و راهکارهای ذخیره‌سازی داده (Linux / Windows Server) استقرار و پیکربندی سیستم‌عامل‌های سرور</text>
      </g>
      <g transform="translate(0, 150)">
        <circle cx="985" cy="16" r="7" fill="${accent}" />
        <text x="965" y="22" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.API طراحی و توسعه پرتال‌های تحت وب سازمانی و یکپارچه‌سازی سامانه‌ها از طریق وب‌سرویس و رابط‌های</text>
      </g>
      <g transform="translate(0, 195)">
        <circle cx="985" cy="16" r="7" fill="${accent}" />
        <text x="965" y="22" fill="${textBody}" class="vazir-reg" font-size="18" text-anchor="end">.بهینه‌سازی و اتوماسیون فرآیندهای داخلی سازمان‌ها با استفاده از ابزارهای مدرن و گردش‌کارهای هوش مصنوعی</text>
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
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">مشاوره تخصصی حضوری و بازدید از محل پروژه و استعلام قیمت تجهیزات</text>
      <line x1="-1030" y1="135" x2="0" y2="135" stroke="url(#brochure-line-${theme})" stroke-width="2.5" />
    </g>

    <!-- Company Lockup Card (Modern, Minimal) -->
    <g transform="translate(65, 310)">
      <rect width="1030" height="210" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <g transform="translate(850, 20)">
        ${getNovandEmblemMarkup({ scale: 1.5, strokeCore, glowId: `brochure-grad-${theme}`, fillDot })}
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
        <g transform="translate(8, 15)">
          <path d="M962 28v5a3 3 0 0 1-3.27 3 29.7 29.7 0 0 1-13-4.6 29.2 29.2 0 0 1-9-9 29.7 29.7 0 0 1-4.6-13A3 3 0 0 1 935 6h5a3 3 0 0 1 3 2.6 19.3 19.3 0 0 0 1 4.2 3 3 0 0 1-.7 3.2l-1.9 1.9a24 24 0 0 0 9 9l1.9-1.9a3 3 0 0 1 3.2-.7 19.3 19.3 0 0 0 4.2 1 3 3 0 0 1 2.6 3z" fill="${accent}" />
        </g>
        
        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">:مدیر فنی و مشاوره مهندسی</text>
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

        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">:صفحه رسمی اینستاگرام</text>
        <text x="890" y="65" fill="${textPrimary}" class="vazir-bold" font-size="25" text-anchor="end">نمونه پروژه‌های اجرایی، آموزش‌ها و ویدیوها</text>
        <text x="50" y="52" fill="${accent}" class="space-bold" font-size="32" letter-spacing="1" text-anchor="start">@novand_tech</text>
      </g>
      <line x1="50" y1="310" x2="980" y2="310" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Email -->
      <g transform="translate(0, 350)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <rect x="938" y="22" width="34" height="24" rx="4" fill="none" stroke="${accent}" stroke-width="2.5" />
        <path d="M938 25l17 11 17-11" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" />

        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">:مکاتبات رسمی و ارسال درخواست‌ها</text>
        <text x="890" y="65" fill="${textPrimary}" class="vazir-bold" font-size="25" text-anchor="end">دریافت استعلامات و اسناد، درخواست مشاوره</text>
        <text x="50" y="52" fill="${textPrimary}" class="space-bold" font-size="27" letter-spacing="1" text-anchor="start">novand.info@gmail.com</text>
      </g>
      <line x1="50" y1="460" x2="980" y2="460" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Address -->
      <g transform="translate(0, 500)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <path d="M955 15c-7.7 0-14 6.3-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="${accent}" />

        <text x="890" y="30" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">:نشانی دفتر مرکزی نُـوَند</text>
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
        <text x="0" y="0" fill="${textPrimary}" class="vazir-bold" font-size="30" text-anchor="middle">اسکن نمایه دیجیتال و دسترسی سریع به مسیرهای ارتباطی</text>
        <text x="0" y="42" fill="${accent}" class="space-bold" font-size="20" letter-spacing="3" text-anchor="middle">DIGITAL BUSINESS CARD &amp; DIRECT CONNECT</text>
        <text x="0" y="90" fill="${textSecondary}" class="space-bold" font-size="25" letter-spacing="2" text-anchor="middle">novand-tech.com/card</text>
      </g>
    </g>

    <!-- Bottom CTA Bar -->
    <g transform="translate(65, 1900)">
      <rect width="1030" height="300" rx="16" fill="${isDark ? '#080d0f' : '#f1f5f9'}" stroke="${cardBorder}" stroke-width="1.5" />
      <g transform="translate(515, 60)">
        <text x="0" y="0" fill="${textPrimary}" class="vazir-bold" font-size="32" text-anchor="middle">پروژه بعدی خود را با استانداردهای نُـوَند مهندسی کنید</text>
        <text x="0" y="45" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="middle">از مشاوره اولیه و ارزیابی محلی تا تأمین قطعات مناسب، اجرای دقیق طرح‌های مهندسی و پشتیبانی دائمی</text>
      </g>

      <g transform="translate(515, 175)">
        <rect x="-320" y="0" width="640" height="65" rx="12" fill="url(#brochure-grad-${theme})" />
        <text x="0" y="40" fill="${isDark ? '#0d1417' : '#ffffff'}" class="vazir-bold" font-size="25" text-anchor="middle">تماس با مدیر فنی: 09129321550</text>
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

  // 4. Creating the novand-brochure-assets.zip archive
  console.log('\nCreating novand-brochure-assets.zip to include all new brochure assets...');
  const pyScriptPath = path.join(process.cwd(), 'scripts', 'zip_brochure.py');
  fs.writeFileSync(pyScriptPath, `import zipfile, os
brochure_dir = "${OUTPUT_DIR}"
zip_path = os.path.join(brochure_dir, "novand-brochure-assets.zip")
files = [f for f in os.listdir(brochure_dir) if f != "novand-brochure-assets.zip" and not f.startswith('.')]
files.sort()
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files:
        full_path = os.path.join(brochure_dir, file)
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
