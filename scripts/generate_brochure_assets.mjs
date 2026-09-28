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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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
      
      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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

      <g transform="scale(1.0), translate(40, 40)">
        <path d="M9.994 53.37c-0.67 -0.068 -1.263 -0.17 -1.839 -0.551 -1.912 -1.266 -1.909 -3.71 -0.398 -5.279 1.338 -1.388 2.739 -2.717 4.096 -4.087 2.314 -2.337 4.636 -4.667 6.972 -6.984 0.99 -0.982 1.962 -1.984 2.959 -2.959 0.333 -0.325 0.658 -0.657 0.99 -0.982 0.143 -0.141 0.42 -0.334 0.505 -0.514 0.152 -0.32 0.045 -1.202 0.045 -1.585V17.059c0 -1.666 -0.189 -3.801 0.223 -5.393 0.63 -2.442 2.671 -4.354 5.13 -4.869 1.251 -0.262 2.599 -0.134 3.87 -0.134h28.054c1.226 0 2.506 -0.103 3.722 0.075a6.704 6.704 0 0 1 4.303 2.552c1.55 2.05 1.363 3.878 1.363 6.308V68.128c0 1.788 0.246 3.359 -1.36 4.562 -1.133 0.85 -2.606 0.649 -3.937 0.649H15.234c-1.518 0 -3.094 0.177 -4.257 -0.99 -1.001 -1.002 -0.968 -2.095 -0.968 -3.418V57.972c0 -1.525 0.09 -3.082 -0.015 -4.602Zm19.998 -40.069c-0.083 0.479 -0.031 1.006 -0.031 1.494v15.562c0 0.346 -0.084 1.305 0.03 1.579 0.103 0.251 0.989 1.006 1.231 1.247q1.458 1.464 2.922 2.923c2.749 2.731 5.48 5.479 8.217 8.222 0.815 0.817 1.638 1.627 2.449 2.446 0.454 0.458 0.986 0.894 1.327 1.447 0.934 1.511 0.51 3.582 -0.99 4.56 -0.57 0.374 -1.164 0.461 -1.814 0.589v13.307h20.009V13.301zm13.341 6.719v6.642h-6.662v-6.642zm6.658 -0.001h6.686v6.643h-6.686zm0 13.433h6.686v6.547h-6.686zM26.703 38.064c-0.294 0.154 -0.525 0.461 -0.765 0.696 -0.529 0.518 -1.049 1.046 -1.57 1.571 -1.699 1.709 -3.394 3.425 -5.114 5.114 -0.627 0.615 -1.247 1.238 -1.866 1.861 -0.16 0.162 -0.648 0.553 -0.711 0.746 -0.112 0.337 -0.014 1.334 -0.014 1.738v15.27c0 0.534 -0.038 1.088 0.03 1.618h19.946c0.066 -0.506 0.03 -1.033 0.03 -1.545V49.863c0 -0.388 0.083 -1.506 -0.014 -1.811 -0.068 -0.214 -0.642 -0.676 -0.822 -0.854 -0.674 -0.666 -1.335 -1.344 -2.009 -2.011 -2.384 -2.362 -4.77 -4.728 -7.122 -7.123Zm23.287 8.61h6.686v6.662h-6.686zm-19.976 3.315v6.686h-6.689v-6.686z" fill="${accent}" fill-rule="evenodd" stroke="#000000" stroke-width="0.1141552511415525" stroke-linejoin="round"/>
      </g>

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
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">مشاوره و تحلیل نیازها</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">COMPREHENSIVE ANALYSIS &amp; SITE ASSESSMENT</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.بازدید میدانی از پروژه، تحلیل نیازمندی‌ها و امکان‌ها و بررسی طرح‌‌های مهندسی متناسب</text>
      <text x="970" y="180" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.جلسات تخصصی با کارفرما جهت شفاف‌سازی نیازمندی‌ها، اولویت‌بندی اجرایی و جلوگیری از هزینه‌های اضافی</text>
      
      <rect x="25" y="215" width="980" height="70" rx="10" fill="${isDark ? '#0b1013' : '#ffffff'}" stroke="${cardBorder}" stroke-width="1.5" />
      <text x="965" y="258" fill="${accent}" class="vazir-bold" font-size="18" text-anchor="end">:دستاوردهای این مرحله</text>
      <text x="750" y="258" fill="${textPrimary}" class="vazir-reg" font-size="18" text-anchor="end">گزارش بررسی فنی سایت · تحلیل منابع و نیازمندی‌ها · برآورد اقتصادی بهینه</text>
    </g>

    <!-- Step 2: تأمین تجهیزات و BOM -->
    <g transform="translate(65, 935)">
      <rect width="1030" height="310" rx="16" fill="${cardBg}" stroke="${cardBorder}" stroke-width="1.5" />
      <rect x="925" y="25" width="70" height="70" rx="14" fill="${isDark ? '#19252c' : '#e0f2fe'}" stroke="${accent}" stroke-width="1.5" />
      <text x="960" y="72" fill="${accent}" class="vazir-bold" font-size="38" text-anchor="middle">۰۲</text>
      
      <text x="895" y="55" fill="${textPrimary}" class="vazir-bold" font-size="28" text-anchor="end">تأمین تجهیزات اصلی و اقلام تخصصی</text>
      <text x="895" y="88" fill="${accent}" class="space-bold" font-size="16" text-anchor="end">DIRECT SOURCING &amp; SUPLY OF MATERIALS</text>
      
      <text x="970" y="145" fill="${textBody}" class="vazir-reg" font-size="19" text-anchor="end">.(Cisco, MikroTik, HP, ...) تأمین مستقیم و بدون واسطه تجهیزات اصلی از معتبرترین برندهای بین‌المللی</text>
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
      <text x="0" y="98" fill="${textSecondary}" class="vazir-reg" font-size="21" text-anchor="end">مشاوره تخصصی حضوری و بازدید از محل پروژه و استعلام قیمت تجهیزات</text>
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
        <g transform="translate(10, 10)">
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
        <rect x="938" y="24" width="34" height="24" rx="4" fill="none" stroke="${accent}" stroke-width="2.5" />
        <path d="M938 27l17 11 17-11" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" />

        <text x="890" y="32" fill="${textSecondary}" class="vazir-reg" font-size="20" text-anchor="end">:مکاتبات رسمی و ارسال درخواست‌ها</text>
        <text x="890" y="65" fill="${textPrimary}" class="vazir-bold" font-size="25" text-anchor="end">دریافت استعلامات و اسناد، درخواست مشاوره</text>
        <text x="50" y="52" fill="${textPrimary}" class="space-bold" font-size="27" letter-spacing="1" text-anchor="start">novand.info@gmail.com</text>
      </g>
      <line x1="50" y1="460" x2="980" y2="460" stroke="${cardBorder}" stroke-width="1.5" />

      <!-- Address -->
      <g transform="translate(0, 500)">
        <rect x="920" y="0" width="70" height="70" rx="14" fill="${isDark ? '#1a272f' : '#e0f2fe'}" stroke="${cardBorder}" stroke-width="1.5" />
        <path d="M955 18c-7.7 0-14 6.3-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="${accent}" />

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
