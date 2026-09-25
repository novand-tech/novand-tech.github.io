import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');
const STICKERS_DIR = path.join(PUBLIC_DIR, 'stickers');
const ANIMATIONS_DIR = path.join(PUBLIC_DIR, 'animations');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');
const BRANDING_DIR = path.join(PUBLIC_DIR, 'branding');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const FONTS_DIR = path.join(PUBLIC_DIR, 'fonts');

// Ensure all target directories exist
[ICONS_DIR, STICKERS_DIR, ANIMATIONS_DIR, VIDEOS_DIR, BRANDING_DIR, IMAGES_DIR].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// Load embedded font base64 for standalone rendering
const vazirBoldB64 = fs.existsSync(path.join(FONTS_DIR, 'Vazirmatn-Bold.ttf'))
  ? fs.readFileSync(path.join(FONTS_DIR, 'Vazirmatn-Bold.ttf')).toString('base64')
  : '';
const spaceBoldB64 = fs.existsSync(path.join(FONTS_DIR, 'SpaceGrotesk-Bold.ttf'))
  ? fs.readFileSync(path.join(FONTS_DIR, 'SpaceGrotesk-Bold.ttf')).toString('base64')
  : '';
const jetbrainsB64 = fs.existsSync(path.join(FONTS_DIR, 'JetBrainsMono-Bold.ttf'))
  ? fs.readFileSync(path.join(FONTS_DIR, 'JetBrainsMono-Bold.ttf')).toString('base64')
  : '';

const fontStyles = `
  <style>
    @font-face {
      font-family: 'Vazirmatn';
      font-weight: 700;
      src: url('data:font/ttf;base64,${vazirBoldB64}') format('truetype');
    }
    @font-face {
      font-family: 'Space Grotesk';
      font-weight: 700;
      src: url('data:font/ttf;base64,${spaceBoldB64}') format('truetype');
    }
    @font-face {
      font-family: 'JetBrains Mono';
      font-weight: 700;
      src: url('data:font/ttf;base64,${jetbrainsB64}') format('truetype');
    }
  </style>
`;

function renderAndSave(svgContent, targetSvgPath, targetPngPath, pngWidth = 800) {
  fs.writeFileSync(targetSvgPath, svgContent, 'utf-8');
  if (targetPngPath) {
    try {
      const resvg = new Resvg(svgContent, {
        fitTo: { mode: 'width', value: pngWidth },
        font: { loadSystemFonts: false }
      });
      const pngData = resvg.render();
      fs.writeFileSync(targetPngPath, pngData.asPng());
      console.log(`Rendered: ${path.basename(targetPngPath)} (${pngWidth}px)`);
    } catch (err) {
      console.warn(`Could not render PNG for ${path.basename(targetSvgPath)}:`, err.message);
    }
  }
}

console.log('--- Generating Novand System Icons ---');

// ==========================================
// 1. ICONS (public/icons/)
// ==========================================
const icons = [
  {
    name: 'smart-home',
    title: 'Smart Home & Building Automation',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-sh" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <path d="M12 24 L24 13 L36 24 V36 C36 37.1 35.1 38 34 38 H14 C12.9 38 12 37.1 12 36 Z" stroke="#f4f2f1" stroke-width="2" stroke-linejoin="round"/>
      <path d="M20 38 V28 H28 V38" stroke="url(#grad-sh)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="24" cy="20" r="2.5" fill="#00d2b5"/>
      <path d="M21.5 20 A2.5 2.5 0 0 1 26.5 20" stroke="#00d2b5" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M19 17.5 A6 6 0 0 1 29 17.5" stroke="#00d2b5" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="1 2"/>
    </svg>`
  },
  {
    name: 'network-core',
    title: 'Enterprise Routing & Switching',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-nc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <rect x="10" y="14" width="28" height="8" rx="2" stroke="#f4f2f1" stroke-width="2"/>
      <rect x="10" y="26" width="28" height="8" rx="2" stroke="#f4f2f1" stroke-width="2"/>
      <circle cx="15" cy="18" r="1.5" fill="#00d2b5"/>
      <circle cx="20" cy="18" r="1.5" fill="#10b981"/>
      <circle cx="15" cy="30" r="1.5" fill="#00d2b5"/>
      <circle cx="20" cy="30" r="1.5" fill="#10b981"/>
      <path d="M28 18 H33" stroke="url(#grad-nc)" stroke-width="2" stroke-linecap="round"/>
      <path d="M28 30 H33" stroke="url(#grad-nc)" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 22 V26" stroke="#00d2b5" stroke-width="2"/>
      <path d="M18 34 V38 H30 V34" stroke="#f4f2f1" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`
  },
  {
    name: 'enterprise-server',
    title: 'Enterprise Server Infrastructure',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-es" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <rect x="11" y="11" width="26" height="7" rx="1.5" stroke="#f4f2f1" stroke-width="1.8"/>
      <rect x="11" y="20.5" width="26" height="7" rx="1.5" stroke="#f4f2f1" stroke-width="1.8"/>
      <rect x="11" y="30" width="26" height="7" rx="1.5" stroke="#f4f2f1" stroke-width="1.8"/>
      <circle cx="16" cy="14.5" r="1.2" fill="#00d2b5"/>
      <circle cx="16" cy="24" r="1.2" fill="#00d2b5"/>
      <circle cx="16" cy="33.5" r="1.2" fill="#10b981"/>
      <line x1="22" y1="14.5" x2="32" y2="14.5" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="22" y1="24" x2="32" y2="24" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="22" y1="33.5" x2="32" y2="33.5" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'virtualization',
    title: 'Virtualization & Cloud Infrastructure',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-vz" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <path d="M24 11 L35 17.5 V30.5 L24 37 L13 30.5 V17.5 Z" stroke="#f4f2f1" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M24 11 V24 L35 17.5" stroke="url(#grad-vz)" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M24 24 L13 17.5" stroke="url(#grad-vz)" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M24 24 V37" stroke="url(#grad-vz)" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="24" cy="24" r="2.5" fill="#00d2b5"/>
    </svg>`
  },
  {
    name: 'cctv-surveillance',
    title: 'CCTV Surveillance & Physical Security',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-cctv" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <path d="M12 18 L28 14 L34 26 L18 30 Z" stroke="#f4f2f1" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="31" cy="20" r="4" stroke="url(#grad-cctv)" stroke-width="2" fill="#0d1417"/>
      <circle cx="31" cy="20" r="1.5" fill="#00d2b5"/>
      <path d="M18 30 L16 37 H26 L24 30" stroke="#f4f2f1" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M12 37 H30" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="16" x2="40" y2="15" stroke="#00d2b5" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="37" y1="20" x2="42" y2="20" stroke="#00d2b5" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="36" y1="24" x2="40" y2="25" stroke="#00d2b5" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'critical-power',
    title: 'UPS Critical Power & Telemetry',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-cp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <rect x="13" y="14" width="22" height="23" rx="2" stroke="#f4f2f1" stroke-width="2"/>
      <line x1="20" y1="11" x2="20" y2="14" stroke="#00d2b5" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="28" y1="11" x2="28" y2="14" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M25 19 L20 27 H25 L23 33 L29 24 H24 L26 19 Z" fill="url(#grad-cp)"/>
    </svg>`
  },
  {
    name: 'hardware-chip',
    title: 'Hardware Maintenance & Lab Repairs',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-hw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <rect x="16" y="16" width="16" height="16" rx="2" stroke="#f4f2f1" stroke-width="2"/>
      <rect x="20" y="20" width="8" height="8" rx="1" fill="url(#grad-hw)"/>
      <line x1="20" y1="12" x2="20" y2="16" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="12" x2="24" y2="16" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="28" y1="12" x2="28" y2="16" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="20" y1="32" x2="20" y2="36" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="32" x2="24" y2="36" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="28" y1="32" x2="28" y2="36" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="20" x2="16" y2="20" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="24" x2="16" y2="24" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="12" y1="28" x2="16" y2="28" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="32" y1="20" x2="36" y2="20" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="32" y1="24" x2="36" y2="24" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="32" y1="28" x2="36" y2="28" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'fiber-optic',
    title: 'FTTH & High-Speed Optical Splicing',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-fo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="14" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="9" stroke="#f4f2f1" stroke-width="1.8"/>
      <circle cx="24" cy="24" r="3.5" fill="url(#grad-fo)"/>
      <line x1="10" y1="24" x2="15" y2="24" stroke="#00d2b5" stroke-width="2" stroke-linecap="round"/>
      <line x1="33" y1="24" x2="38" y2="24" stroke="#00d2b5" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="10" x2="24" y2="15" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="33" x2="24" y2="38" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
      <circle cx="24" cy="24" r="1" fill="#f4f2f1"/>
    </svg>`
  },
  {
    name: 'cyber-security',
    title: 'Network Security & Firewall Isolation',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-cs" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <path d="M24 11 L35 15 V25 C35 32 29 37 24 39 C19 37 13 32 13 25 V15 Z" stroke="#f4f2f1" stroke-width="2" stroke-linejoin="round"/>
      <path d="M24 18 V28" stroke="url(#grad-cs)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20 23 L24 28 L28 23" stroke="url(#grad-cs)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    name: 'voip-telephony',
    title: 'Enterprise VoIP & SIP Trunking',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-voip" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <path d="M16 14 C14.5 14 13 15.5 13 17 C13 26 21 34 30 34 C31.5 34 33 32.5 33 31 L30.5 26.5 L26 28 C23 26.5 20.5 24 19 21 L20.5 16.5 Z" stroke="#f4f2f1" stroke-width="2" stroke-linejoin="round"/>
      <path d="M27 15 A6 6 0 0 1 33 21" stroke="url(#grad-voip)" stroke-width="2" stroke-linecap="round"/>
      <path d="M27 11 A10 10 0 0 1 37 21" stroke="url(#grad-voip)" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'iot-telemetry',
    title: 'IoT Environmental Telemetry & Sensors',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-iot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="5" stroke="#f4f2f1" stroke-width="2"/>
      <circle cx="24" cy="24" r="2" fill="url(#grad-iot)"/>
      <path d="M15 15 A13 13 0 0 1 33 15" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M12 12 A17 17 0 0 1 36 12" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 3"/>
      <path d="M15 33 A13 13 0 0 0 33 33" stroke="#00d2b5" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  {
    name: 'datacenter-rack',
    title: '42U Enclosure & Structured Cabling',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
      <defs>
        <linearGradient id="grad-dr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="10" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <rect x="13" y="10" width="22" height="28" rx="1.5" stroke="#f4f2f1" stroke-width="2"/>
      <line x1="17" y1="15" x2="31" y2="15" stroke="url(#grad-dr)" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="17" y1="20" x2="31" y2="20" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="17" y1="25" x2="31" y2="25" stroke="url(#grad-dr)" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="17" y1="30" x2="31" y2="30" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="30" cy="34" r="1" fill="#00d2b5"/>
    </svg>`
  }
];

icons.forEach(ic => {
  const svgPath = path.join(ICONS_DIR, `${ic.name}.svg`);
  const pngPath = path.join(ICONS_DIR, `${ic.name}.png`);
  renderAndSave(ic.svg, svgPath, pngPath, 256);
});

console.log('--- Generating Novand Engineering Stickers & Badges ---');

// ==========================================
// 2. STICKERS & BADGES (public/stickers/)
// ==========================================
const stickers = [
  {
    name: 'novand-certified-engineering',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
      ${fontStyles}
      <defs>
        <linearGradient id="stk-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
        <radialGradient id="stk-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00d2b5" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#0d1417" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Base Outer Hexagon / Shield -->
      <circle cx="200" cy="200" r="185" fill="#0d1417" stroke="#1a2327" stroke-width="4"/>
      <circle cx="200" cy="200" r="172" fill="url(#stk-glow)" stroke="#00d2b5" stroke-width="2" stroke-dasharray="6 4"/>
      <circle cx="200" cy="200" r="148" fill="#141210" stroke="#15120e" stroke-width="2"/>

      <!-- Inner Technical Ring with Ticks -->
      <g stroke="#00d2b5" stroke-width="2" opacity="0.6">
        <line x1="200" y1="35" x2="200" y2="45" />
        <line x1="200" y1="355" x2="200" y2="365" />
        <line x1="35" y1="200" x2="45" y2="200" />
        <line x1="365" y1="200" x2="355" y2="200" />
      </g>

      <!-- Novand Emblem Center -->
      <g transform="translate(160, 135) scale(0.8)">
        <path d="M50 18 L22 38 V68 H48" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M50 18 L84 42" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
        <rect x="46" y="39" width="8" height="8" fill="#00d2b5" rx="1" />
        <circle cx="84" cy="42" r="6" fill="#10b981" />
        <circle cx="22" cy="38" r="4.5" fill="#00d2b5" />
        <circle cx="22" cy="68" r="4.5" fill="#00d2b5" />
      </g>

      <!-- Typography -->
      <text x="200" y="98" font-family="'Space Grotesk', sans-serif" font-size="12.5" font-weight="700" fill="#00d2b5" text-anchor="middle" letter-spacing="4">★ NOVAND CERTIFIED ★</text>
      <text x="200" y="118" font-family="'JetBrains Mono', monospace" font-size="9" fill="#f4f2f1" text-anchor="middle" letter-spacing="2" opacity="0.75">SYSTEM ARCHITECTURE</text>
      
      <text x="200" y="240" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">100% DETERMINISTIC</text>
      <text x="200" y="260" font-family="'JetBrains Mono', monospace" font-size="10.5" fill="#00d2b5" text-anchor="middle" letter-spacing="2">ZERO-FAULT STANDARD</text>
      <text x="200" y="295" font-family="'Vazirmatn', sans-serif" font-size="13" font-weight="700" fill="#f4f2f1" text-anchor="middle">تأییدیه مهندسی یکپارچه نُوَند</text>

      <!-- Bottom verification seal code -->
      <rect x="130" y="312" width="140" height="20" rx="3" fill="#0d1417" stroke="#00d2b5" stroke-width="1"/>
      <text x="200" y="325" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00d2b5" text-anchor="middle" letter-spacing="1.5">VERIFIED // NVD-2026</text>
    </svg>`
  },
  {
    name: 'high-availability-99999',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
      ${fontStyles}
      <defs>
        <linearGradient id="stk-em" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#00d2b5" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="40" fill="#0d1417" stroke="#1a2327" stroke-width="4"/>
      <circle cx="200" cy="180" r="120" stroke="#10b981" stroke-width="3" stroke-dasharray="8 6" opacity="0.7"/>
      <circle cx="200" cy="180" r="100" fill="#141210" stroke="#15120e" stroke-width="2"/>

      <text x="200" y="150" font-family="'JetBrains Mono', monospace" font-size="12" fill="#10b981" text-anchor="middle" letter-spacing="3">MISSION CRITICAL</text>
      <text x="200" y="195" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="-1">99.999%</text>
      <text x="200" y="222" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00d2b5" text-anchor="middle" letter-spacing="2">UPTIME SLA GUARANTEE</text>

      <path d="M120 280 H280" stroke="#1a2327" stroke-width="2"/>
      <text x="200" y="315" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#f4f2f1" text-anchor="middle" letter-spacing="1">FAILOVER ARCHITECTURE</text>
      <text x="200" y="340" font-family="'Vazirmatn', sans-serif" font-size="13" font-weight="700" fill="#10b981" text-anchor="middle">پایداری پنج‌نه زیرساخت سرور و شبکه</text>
    </svg>`
  },
  {
    name: 'optical-fiber-standard',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
      ${fontStyles}
      <defs>
        <linearGradient id="stk-fo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="185" fill="#0d1417" stroke="#00d2b5" stroke-width="3"/>
      <circle cx="200" cy="200" r="165" fill="#141210" stroke="#1a2327" stroke-width="2"/>

      <!-- Optical Core Wave Graphics -->
      <circle cx="200" cy="180" r="55" stroke="url(#stk-fo-grad)" stroke-width="4"/>
      <circle cx="200" cy="180" r="35" stroke="#f4f2f1" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="200" cy="180" r="12" fill="#00d2b5"/>

      <line x1="120" y1="180" x2="80" y2="180" stroke="#00d2b5" stroke-width="3" stroke-linecap="round"/>
      <line x1="280" y1="180" x2="320" y2="180" stroke="#00d2b5" stroke-width="3" stroke-linecap="round"/>

      <text x="200" y="95" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="#00d2b5" text-anchor="middle" letter-spacing="3">TIA-568-D COMPLIANT</text>
      <text x="200" y="275" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">FTTH OPTICAL FIBER</text>
      <text x="200" y="300" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00d2b5" text-anchor="middle" letter-spacing="2">CERTIFIED OTDR TESTED</text>
      <text x="200" y="335" font-family="'Vazirmatn', sans-serif" font-size="13" font-weight="700" fill="#f4f2f1" text-anchor="middle">استاندارد کابل‌کشی ساخت‌یافته و فیبر نوری</text>
    </svg>`
  },
  {
    name: 'cisco-mikrotik-seal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
      ${fontStyles}
      <rect width="400" height="400" rx="30" fill="#0d1417" stroke="#15120e" stroke-width="4"/>
      <rect x="25" y="25" width="350" height="350" rx="20" fill="#141210" stroke="#1a2327" stroke-width="2"/>

      <text x="200" y="80" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00d2b5" text-anchor="middle" letter-spacing="3">ACTIVE INFRASTRUCTURE</text>
      <text x="200" y="115" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">CISCO &amp; MIKROTIK</text>
      
      <!-- Network Nodes Symbol -->
      <g transform="translate(130, 140)">
        <circle cx="20" cy="40" r="16" fill="#0d1417" stroke="#00d2b5" stroke-width="2.5"/>
        <circle cx="120" cy="40" r="16" fill="#0d1417" stroke="#10b981" stroke-width="2.5"/>
        <circle cx="70" cy="100" r="18" fill="#0d1417" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="32" y1="48" x2="58" y2="88" stroke="#00d2b5" stroke-width="3"/>
        <line x1="108" y1="48" x2="82" y2="88" stroke="#10b981" stroke-width="3"/>
        <line x1="36" y1="40" x2="104" y2="40" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
      </g>

      <text x="200" y="285" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#00d2b5" text-anchor="middle" letter-spacing="1">CCNA ENTERPRISE GRADE</text>
      <text x="200" y="310" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle" opacity="0.75">VLAN ISOLATION // ZERO-TRUST</text>
      <text x="200" y="345" font-family="'Vazirmatn', sans-serif" font-size="13" font-weight="700" fill="#10b981" text-anchor="middle">مهندسی مسیریابی و امنیت لایه‌های شبکه</text>
    </svg>`
  },
  {
    name: 'bilingual-architecture-seal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
      ${fontStyles}
      <circle cx="200" cy="200" r="185" fill="#0d1417" stroke="#10b981" stroke-width="3"/>
      <circle cx="200" cy="200" r="165" fill="#141210" stroke="#1a2327" stroke-width="2"/>

      <text x="200" y="90" font-family="'JetBrains Mono', monospace" font-size="11" fill="#10b981" text-anchor="middle" letter-spacing="3">DUAL ARCHITECTURE</text>
      <text x="200" y="140" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle">FA / EN</text>
      <text x="200" y="180" font-family="'Vazirmatn', sans-serif" font-size="22" font-weight="700" fill="#00d2b5" text-anchor="middle">دو زبانه رسمی و متقارن</text>

      <line x1="100" y1="215" x2="300" y2="215" stroke="#1a2327" stroke-width="2"/>

      <text x="200" y="255" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="#f4f2f1" text-anchor="middle" letter-spacing="1">TEHRAN HEADQUARTERS</text>
      <text x="200" y="280" font-family="'JetBrains Mono', monospace" font-size="10" fill="#00d2b5" text-anchor="middle">SAADAT ABAD // DISTRICT 2</text>
      <text x="200" y="325" font-family="'Vazirmatn', sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">مرکز مهندسی و مدیریت فناوری نووند</text>
    </svg>`
  },
  {
    name: 'hardware-diagnostic-seal',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
      ${fontStyles}
      <defs>
        <linearGradient id="stk-diag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="30" fill="#0d1417" stroke="#00d2b5" stroke-width="3"/>
      <circle cx="200" cy="170" r="70" fill="#141210" stroke="#1a2327" stroke-width="2"/>
      
      <!-- Diagnostic Wave & Microchip -->
      <path d="M150 170 H175 L185 145 L195 195 L205 160 L215 175 L225 170 H250" stroke="url(#stk-diag)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <text x="200" y="70" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00d2b5" text-anchor="middle" letter-spacing="3">LABORATORY CERTIFIED</text>
      <text x="200" y="275" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">COMPONENT-LEVEL REPAIR</text>
      <text x="200" y="300" font-family="'JetBrains Mono', monospace" font-size="11" fill="#10b981" text-anchor="middle" letter-spacing="2">OEM EQUIPMENT &amp; BOM SOURCING</text>
      <text x="200" y="335" font-family="'Vazirmatn', sans-serif" font-size="13" font-weight="700" fill="#f4f2f1" text-anchor="middle">تعمیرات تخصصی سخت‌افزار و تأمین قطعات اصلی</text>
    </svg>`
  }
];

stickers.forEach(stk => {
  const svgPath = path.join(STICKERS_DIR, `${stk.name}.svg`);
  const pngPath = path.join(STICKERS_DIR, `${stk.name}.png`);
  renderAndSave(stk.svg, svgPath, pngPath, 800);
});

console.log('--- Generating Novand Interactive SVG Animations ---');

// ==========================================
// 3. ANIMATIONS (public/animations/)
// ==========================================
const animations = [
  {
    name: 'network-packet-flow',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400" fill="none">
      ${fontStyles}
      <style>
        @keyframes pulsePacket {
          0% { stroke-dashoffset: 200; opacity: 0.2; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes blinkNode {
          0%, 100% { fill: #00d2b5; filter: drop-shadow(0 0 6px #00d2b5); }
          50% { fill: #10b981; filter: drop-shadow(0 0 12px #10b981); }
        }
        @keyframes waveRing {
          0% { r: 16px; opacity: 0.8; }
          100% { r: 36px; opacity: 0; }
        }
        .packet-line {
          stroke: #00d2b5;
          stroke-width: 3;
          stroke-dasharray: 10 15;
          animation: pulsePacket 2.5s linear infinite;
        }
        .packet-line-rev {
          stroke: #10b981;
          stroke-width: 3;
          stroke-dasharray: 10 15;
          animation: pulsePacket 2s linear infinite reverse;
        }
        .beacon {
          animation: blinkNode 2s ease-in-out infinite;
        }
        .pulse-wave {
          animation: waveRing 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
      </style>
      <rect width="800" height="400" rx="16" fill="#0d1417" stroke="#1a2327" stroke-width="2"/>
      
      <!-- Background grid lines -->
      <g stroke="#141b1f" stroke-width="1">
        <line x1="0" y1="100" x2="800" y2="100"/>
        <line x1="0" y1="200" x2="800" y2="200"/>
        <line x1="0" y1="300" x2="800" y2="300"/>
        <line x1="200" y1="0" x2="200" y2="400"/>
        <line x1="400" y1="0" x2="400" y2="400"/>
        <line x1="600" y1="0" x2="600" y2="400"/>
      </g>

      <!-- Network Connections (Base dim paths) -->
      <path d="M120 200 H320" stroke="#1e2c34" stroke-width="4"/>
      <path d="M320 200 L480 120" stroke="#1e2c34" stroke-width="4"/>
      <path d="M320 200 L480 280" stroke="#1e2c34" stroke-width="4"/>
      <path d="M480 120 H680" stroke="#1e2c34" stroke-width="4"/>
      <path d="M480 280 H680" stroke="#1e2c34" stroke-width="4"/>

      <!-- Animated Data Packet Lines -->
      <path d="M120 200 H320" class="packet-line"/>
      <path d="M320 200 L480 120" class="packet-line"/>
      <path d="M320 200 L480 280" class="packet-line-rev"/>
      <path d="M480 120 H680" class="packet-line"/>
      <path d="M480 280 H680" class="packet-line-rev"/>

      <!-- Node 1: Edge Router -->
      <g transform="translate(120, 200)">
        <circle cx="0" cy="0" r="16" class="pulse-wave" stroke="#00d2b5" stroke-width="2" fill="none"/>
        <circle cx="0" cy="0" r="24" fill="#141210" stroke="#00d2b5" stroke-width="3"/>
        <circle cx="0" cy="0" r="8" class="beacon"/>
        <text x="0" y="44" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle">EDGE-GW</text>
        <text x="0" y="60" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#00d2b5" text-anchor="middle">10 Gbps FTTH</text>
      </g>

      <!-- Node 2: Core Switch / Firewall -->
      <g transform="translate(320, 200)">
        <circle cx="0" cy="0" r="16" class="pulse-wave" stroke="#10b981" stroke-width="2" fill="none"/>
        <rect x="-26" y="-26" width="52" height="52" rx="10" fill="#141210" stroke="#10b981" stroke-width="3"/>
        <rect x="-10" y="-10" width="20" height="20" rx="4" class="beacon"/>
        <text x="0" y="44" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle">CORE-SW-01</text>
        <text x="0" y="60" font-family="'Space Grotesk', sans-serif" font-size="9" fill="#10b981" text-anchor="middle">CISCO CATALYST</text>
      </g>

      <!-- Node 3: Server Cluster Top -->
      <g transform="translate(480, 120)">
        <rect x="-22" y="-22" width="44" height="44" rx="8" fill="#141210" stroke="#00d2b5" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="6" fill="#00d2b5"/>
        <text x="0" y="38" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle">VM-HOST-A</text>
      </g>

      <!-- Node 4: Storage SAN Bottom -->
      <g transform="translate(480, 280)">
        <rect x="-22" y="-22" width="44" height="44" rx="8" fill="#141210" stroke="#10b981" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="6" fill="#10b981"/>
        <text x="0" y="38" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle">SAN-STORAGE</text>
      </g>

      <!-- Node 5: Enterprise Endpoints -->
      <g transform="translate(680, 120)">
        <circle cx="0" cy="0" r="18" fill="#141210" stroke="#ffffff" stroke-width="2"/>
        <circle cx="0" cy="0" r="5" fill="#00d2b5"/>
        <text x="0" y="34" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle">VLAN-STAFF</text>
      </g>

      <g transform="translate(680, 280)">
        <circle cx="0" cy="0" r="18" fill="#141210" stroke="#ffffff" stroke-width="2"/>
        <circle cx="0" cy="0" r="5" fill="#10b981"/>
        <text x="0" y="34" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="middle">VLAN-CCTV</text>
      </g>

      <!-- Header HUD Overlay -->
      <rect x="25" y="25" width="220" height="28" rx="4" fill="#141210" stroke="#1a2327" stroke-width="1"/>
      <text x="35" y="44" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00d2b5">● TELEMETRY // REAL-TIME FLOW</text>
    </svg>`
  },
  {
    name: 'server-rack-telemetry',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500" fill="none">
      ${fontStyles}
      <style>
        @keyframes ledBlinkFast {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes meterWave {
          0%, 100% { width: 45px; }
          50% { width: 95px; }
        }
        .led-g { fill: #10b981; animation: ledBlinkFast 1.2s infinite; }
        .led-c { fill: #00d2b5; animation: ledBlinkFast 0.8s infinite; }
        .meter-bar { animation: meterWave 3s ease-in-out infinite; }
      </style>
      <rect width="600" height="500" rx="16" fill="#0d1417" stroke="#1a2327" stroke-width="2"/>

      <!-- 42U Rack Frame -->
      <rect x="80" y="40" width="240" height="420" rx="6" fill="#141210" stroke="#1e2c34" stroke-width="3"/>
      <line x1="92" y1="40" x2="92" y2="460" stroke="#1a2327" stroke-width="2"/>
      <line x1="308" y1="40" x2="308" y2="460" stroke="#1a2327" stroke-width="2"/>

      <!-- Unit 1: Patch Panel -->
      <rect x="98" y="55" width="204" height="40" rx="3" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="115" cy="75" r="4" class="led-c"/>
      <circle cx="130" cy="75" r="4" class="led-g"/>
      <circle cx="145" cy="75" r="4" class="led-c"/>
      <circle cx="160" cy="75" r="4" class="led-g"/>
      <text x="280" y="79" font-family="'JetBrains Mono', monospace" font-size="9" fill="#64748b" text-anchor="end">FIBER-ODF 24P</text>

      <!-- Unit 2: Core Switch -->
      <rect x="98" y="105" width="204" height="48" rx="3" fill="#0d1417" stroke="#00d2b5" stroke-width="1.5"/>
      <circle cx="115" cy="129" r="4" class="led-c"/>
      <circle cx="130" cy="129" r="4" class="led-c"/>
      <line x1="150" y1="124" x2="220" y2="124" stroke="#1e2c34" stroke-width="4" stroke-linecap="round"/>
      <line x1="150" y1="134" x2="220" y2="134" stroke="#1e2c34" stroke-width="4" stroke-linecap="round"/>
      <text x="280" y="133" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00d2b5" text-anchor="end">CISCO-CATALYST</text>

      <!-- Unit 3: Blade Server 1 -->
      <rect x="98" y="163" width="204" height="60" rx="3" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="115" cy="193" r="5" class="led-g"/>
      <text x="130" y="196" font-family="'JetBrains Mono', monospace" font-size="10" fill="#f4f2f1">HPE PROLIANT DL380</text>
      <rect x="130" y="204" width="100" height="6" rx="2" fill="#1e2c34"/>
      <rect x="130" y="204" width="70" height="6" rx="2" fill="#00d2b5" class="meter-bar"/>

      <!-- Unit 4: Blade Server 2 -->
      <rect x="98" y="233" width="204" height="60" rx="3" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="115" cy="263" r="5" class="led-g"/>
      <text x="130" y="266" font-family="'JetBrains Mono', monospace" font-size="10" fill="#f4f2f1">VMWARE ESXi HOST</text>
      <rect x="130" y="274" width="100" height="6" rx="2" fill="#1e2c34"/>
      <rect x="130" y="274" width="85" height="6" rx="2" fill="#10b981" class="meter-bar"/>

      <!-- Unit 5: Storage Array -->
      <rect x="98" y="303" width="204" height="65" rx="3" fill="#0d1417" stroke="#1a2327" stroke-width="1.5"/>
      <circle cx="115" cy="335" r="4" class="led-c"/>
      <text x="130" y="335" font-family="'JetBrains Mono', monospace" font-size="10" fill="#f4f2f1">ALL-FLASH SAN 48TB</text>
      <text x="130" y="352" font-family="'JetBrains Mono', monospace" font-size="8" fill="#10b981">RAID-10 REBUILD OPTIMAL</text>

      <!-- Unit 6: Dual Online UPS -->
      <rect x="98" y="378" width="204" height="70" rx="3" fill="#0d1417" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="115" cy="413" r="5" class="led-g"/>
      <text x="130" y="410" font-family="'JetBrains Mono', monospace" font-size="10" fill="#f4f2f1">APC ON-LINE UPS 10kVA</text>
      <text x="130" y="428" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00d2b5">BATT 100% // LOAD 32%</text>

      <!-- Right Telemetry Panel -->
      <g transform="translate(360, 50)">
        <rect x="0" y="0" width="200" height="400" rx="8" fill="#141210" stroke="#1a2327" stroke-width="1.5"/>
        <text x="20" y="35" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#ffffff">RACK-01 STATUS</text>
        <text x="20" y="55" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00d2b5">HEALTH: 100% NORMAL</text>

        <line x1="20" y1="75" x2="180" y2="75" stroke="#1a2327" stroke-width="1"/>

        <text x="20" y="105" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b">THERMAL GAUGE</text>
        <text x="20" y="130" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#00d2b5">21.4 °C</text>

        <text x="20" y="170" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b">INPUT VOLTAGE</text>
        <text x="20" y="195" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#ffffff">228.4 V</text>

        <text x="20" y="235" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b">FIBER THROUGHPUT</text>
        <text x="20" y="260" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#10b981">8.94 Gbps</text>

        <text x="20" y="300" font-family="'JetBrains Mono', monospace" font-size="10" fill="#64748b">BACKUP SCHEDULE</text>
        <text x="20" y="325" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="#f4f2f1">VEEAM 02:00 OK</text>

        <rect x="20" y="350" width="160" height="28" rx="4" fill="#0d1417" stroke="#10b981" stroke-width="1"/>
        <text x="100" y="368" font-family="'JetBrains Mono', monospace" font-size="10" fill="#10b981" text-anchor="middle">ACTIVE MONITORING</text>
      </g>
    </svg>`
  },
  {
    name: 'radar-surveillance-sweep',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500" fill="none">
      ${fontStyles}
      <style>
        @keyframes rotateRadar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blipFade {
          0%, 100% { opacity: 0.1; }
          20% { opacity: 1; filter: drop-shadow(0 0 8px #00d2b5); }
        }
        .radar-beam {
          transform-origin: 250px 250px;
          animation: rotateRadar 4s linear infinite;
        }
        .target-blip {
          animation: blipFade 4s ease-in-out infinite;
        }
      </style>
      <defs>
        <radialGradient id="radar-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00d2b5" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#00d2b5" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="500" height="500" rx="20" fill="#0d1417" stroke="#1a2327" stroke-width="2"/>

      <!-- Concentric Radar Rings -->
      <circle cx="250" cy="250" r="200" stroke="#1e2c34" stroke-width="2"/>
      <circle cx="250" cy="250" r="150" stroke="#1e2c34" stroke-width="1.5"/>
      <circle cx="250" cy="250" r="100" stroke="#1e2c34" stroke-width="1.5"/>
      <circle cx="250" cy="250" r="50" stroke="#00d2b5" stroke-width="1.5" stroke-dasharray="4 4"/>
      <circle cx="250" cy="250" r="4" fill="#00d2b5"/>

      <!-- Crosshairs -->
      <line x1="50" y1="250" x2="450" y2="250" stroke="#1e2c34" stroke-width="1.5"/>
      <line x1="250" y1="50" x2="250" y2="450" stroke="#1e2c34" stroke-width="1.5"/>

      <!-- Rotating Sweep Beam -->
      <g class="radar-beam">
        <path d="M250 250 L450 250 A200 200 0 0 0 391 108 Z" fill="url(#radar-grad)"/>
        <line x1="250" y1="250" x2="450" y2="250" stroke="#00d2b5" stroke-width="2"/>
      </g>

      <!-- Target Blips -->
      <circle cx="320" cy="180" r="6" fill="#00d2b5" class="target-blip"/>
      <circle cx="190" cy="140" r="5" fill="#10b981" class="target-blip" style="animation-delay: 1.5s;"/>
      <circle cx="280" cy="340" r="5" fill="#00d2b5" class="target-blip" style="animation-delay: 2.8s;"/>

      <!-- Top Overlay -->
      <text x="35" y="45" font-family="'JetBrains Mono', monospace" font-size="12" fill="#00d2b5">CCTV SECTOR // ACTIVE RADAR</text>
      <text x="35" y="65" font-family="'Space Grotesk', sans-serif" font-size="10" fill="#f4f2f1" opacity="0.7">PERIMETER SURVEILLANCE &amp; PTZ</text>
      <text x="465" y="45" font-family="'JetBrains Mono', monospace" font-size="12" fill="#10b981" text-anchor="end">360° SWEEP</text>
    </svg>`
  },
  {
    name: 'smart-building-nodes',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="700" height="450" fill="none">
      ${fontStyles}
      <style>
        @keyframes pulseGlow {
          0%, 100% { r: 8px; opacity: 0.6; }
          50% { r: 14px; opacity: 0.1; }
        }
        .glow-halo { animation: pulseGlow 2.5s ease-in-out infinite; }
      </style>
      <rect width="700" height="450" rx="16" fill="#0d1417" stroke="#1a2327" stroke-width="2"/>

      <!-- Isometric Building Wireframe -->
      <g transform="translate(150, 100)" stroke="#2b424d" stroke-width="2">
        <!-- Floor 3 -->
        <polygon points="200,40 360,110 200,180 40,110" fill="#141210" fill-opacity="0.8"/>
        <!-- Floor 2 -->
        <polygon points="200,120 360,190 200,260 40,190" fill="#141210" fill-opacity="0.8"/>
        <!-- Floor 1 -->
        <polygon points="200,200 360,270 200,340 40,270" fill="#141210" fill-opacity="0.8"/>
        <!-- Vertical Pillars -->
        <line x1="40" y1="110" x2="40" y2="270"/>
        <line x1="200" y1="180" x2="200" y2="340"/>
        <line x1="360" y1="110" x2="360" y2="270"/>
      </g>

      <!-- Connected Automation Nodes -->
      <!-- Node: HVAC Level 3 -->
      <g transform="translate(350, 200)">
        <circle cx="0" cy="0" r="14" class="glow-halo" fill="#00d2b5"/>
        <circle cx="0" cy="0" r="7" fill="#00d2b5"/>
        <text x="16" y="5" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1">HVAC // 22°C</text>
      </g>

      <!-- Node: Lighting Level 2 -->
      <g transform="translate(230, 280)">
        <circle cx="0" cy="0" r="14" class="glow-halo" fill="#10b981" style="animation-delay: 0.8s;"/>
        <circle cx="0" cy="0" r="7" fill="#10b981"/>
        <text x="-15" y="24" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1" text-anchor="end">DALI-2 LIGHTING</text>
      </g>

      <!-- Node: Access Control Level 1 -->
      <g transform="translate(470, 340)">
        <circle cx="0" cy="0" r="14" class="glow-halo" fill="#00d2b5" style="animation-delay: 1.6s;"/>
        <circle cx="0" cy="0" r="7" fill="#00d2b5"/>
        <text x="18" y="5" font-family="'JetBrains Mono', monospace" font-size="11" fill="#f4f2f1">RFID ACCESS // SECURE</text>
      </g>

      <!-- HUD Title -->
      <text x="40" y="45" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700" fill="#ffffff">INTELLIGENT BUILDING MESH</text>
      <text x="40" y="68" font-family="'JetBrains Mono', monospace" font-size="11" fill="#00d2b5">CENTRALIZED PROTOCOL // BACNET &amp; KNX</text>
    </svg>`
  }
];

animations.forEach(anim => {
  const svgPath = path.join(ANIMATIONS_DIR, `${anim.name}.svg`);
  renderAndSave(anim.svg, svgPath, null); // Keep interactive SVGs pristine
  console.log(`Saved Animated SVG: ${anim.name}.svg`);
});

console.log('--- Generating Novand Upgraded Branding Assets ---');

// ==========================================
// 4. BRANDING ASSETS (public/branding/)
// ==========================================
const brandingUpgrades = [
  {
    name: 'novand-emblem-animated',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
      <style>
        @keyframes circuitPulse {
          0%, 100% { stroke: #00d2b5; filter: drop-shadow(0 0 3px #00d2b5); }
          50% { stroke: #10b981; filter: drop-shadow(0 0 10px #10b981); }
        }
        .pulsing-circuit { animation: circuitPulse 3s ease-in-out infinite; }
      </style>
      <rect width="200" height="200" rx="30" fill="#0d1417" stroke="#1a2327" stroke-width="2"/>
      <g transform="translate(50, 45)">
        <path d="M50 18 L22 38 V68 H48" class="pulsing-circuit" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M50 18 L84 42" class="pulsing-circuit" stroke-width="6" stroke-linecap="round" />
        <rect x="45" y="38" width="10" height="10" fill="#00d2b5" rx="1.5" />
        <circle cx="84" cy="42" r="7" fill="#10b981" />
        <circle cx="22" cy="38" r="6" fill="#00d2b5" />
        <circle cx="22" cy="68" r="6" fill="#00d2b5" />
      </g>
    </svg>`
  },
  {
    name: 'novand-social-card-square',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080" fill="none">
      ${fontStyles}
      <defs>
        <linearGradient id="sc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00d2b5" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>
      <!-- Background Canvas -->
      <rect width="1080" height="1080" fill="#0d1417"/>
      
      <!-- Architectural Grid -->
      <g stroke="#141b1f" stroke-width="2">
        <line x1="0" y1="180" x2="1080" y2="180"/>
        <line x1="0" y1="360" x2="1080" y2="360"/>
        <line x1="0" y1="540" x2="1080" y2="540"/>
        <line x1="0" y1="720" x2="1080" y2="720"/>
        <line x1="0" y1="900" x2="1080" y2="900"/>
        <line x1="180" y1="0" x2="180" y2="1080"/>
        <line x1="360" y1="0" x2="360" y2="1080"/>
        <line x1="540" y1="0" x2="540" y2="1080"/>
        <line x1="720" y1="0" x2="720" y2="1080"/>
        <line x1="900" y1="0" x2="900" y2="1080"/>
      </g>

      <!-- Diagonal Accent Line -->
      <line x1="120" y1="120" x2="960" y2="960" stroke="#00d2b5" stroke-width="1.5" stroke-dasharray="10 10" opacity="0.3"/>

      <!-- Header Wordmark Lockup -->
      <g transform="translate(100, 100)">
        <!-- Emblem -->
        <g transform="scale(1.2)">
          <path d="M50 18 L22 38 V68 H48" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M50 18 L84 42" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
          <rect x="46" y="39" width="8" height="8" fill="#00d2b5" rx="1" />
          <circle cx="84" cy="42" r="6" fill="#10b981" />
          <circle cx="22" cy="38" r="5" fill="#00d2b5" />
          <circle cx="22" cy="68" r="5" fill="#00d2b5" />
        </g>
        <text x="130" y="52" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="700" fill="#ffffff" letter-spacing="-1">NOVAND</text>
        <text x="132" y="80" font-family="'JetBrains Mono', monospace" font-size="14" fill="#00d2b5" letter-spacing="4">INTEGRATED TECHNOLOGY INFRASTRUCTURE</text>
      </g>

      <!-- Main Headline in Persian and English -->
      <text x="100" y="380" font-family="'Vazirmatn', sans-serif" font-size="64" font-weight="700" fill="#ffffff">راهکارهای مهندسی یکپارچه</text>
      <text x="100" y="450" font-family="'Vazirmatn', sans-serif" font-size="34" font-weight="700" fill="#00d2b5">شبکه، سرور، هوشمندسازی ساختمان و امنیت فیزیکی</text>

      <!-- 4 Pillars Grid Boxes -->
      <g transform="translate(100, 520)">
        <!-- Box 1 -->
        <rect x="0" y="0" width="410" height="150" rx="12" fill="#141210" stroke="#1a2327" stroke-width="2"/>
        <text x="30" y="48" font-family="'JetBrains Mono', monospace" font-size="14" fill="#00d2b5">01 // NETWORKING</text>
        <text x="30" y="85" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#ffffff">Cisco &amp; FTTH Fiber</text>
        <text x="30" y="115" font-family="'Vazirmatn', sans-serif" font-size="16" fill="#64748b">کابل‌کشی ساخت‌یافته و فیبر نوری</text>

        <!-- Box 2 -->
        <rect x="470" y="0" width="410" height="150" rx="12" fill="#141210" stroke="#1a2327" stroke-width="2"/>
        <text x="500" y="48" font-family="'JetBrains Mono', monospace" font-size="14" fill="#10b981">02 // SERVERS</text>
        <text x="500" y="85" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#ffffff">VMware &amp; Linux Cloud</text>
        <text x="500" y="115" font-family="'Vazirmatn', sans-serif" font-size="16" fill="#64748b">مجازی‌سازی و کلاسترینگ دیتاسنتر</text>

        <!-- Box 3 -->
        <rect x="0" y="180" width="410" height="150" rx="12" fill="#141210" stroke="#1a2327" stroke-width="2"/>
        <text x="30" y="228" font-family="'JetBrains Mono', monospace" font-size="14" fill="#00d2b5">03 // AUTOMATION</text>
        <text x="30" y="265" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#ffffff">Smart Building &amp; IoT</text>
        <text x="30" y="295" font-family="'Vazirmatn', sans-serif" font-size="16" fill="#64748b">اتوماسیون خانه‌های مدرن و پردیس‌ها</text>

        <!-- Box 4 -->
        <rect x="470" y="180" width="410" height="150" rx="12" fill="#141210" stroke="#1a2327" stroke-width="2"/>
        <text x="500" y="228" font-family="'JetBrains Mono', monospace" font-size="14" fill="#10b981">04 // SURVEILLANCE</text>
        <text x="500" y="265" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#ffffff">CCTV &amp; Situation Room</text>
        <text x="500" y="295" font-family="'Vazirmatn', sans-serif" font-size="16" fill="#64748b">نظارت هوشمند و اتاق مانیتورینگ</text>
      </g>

      <!-- Footer Contact Bar -->
      <g transform="translate(100, 910)">
        <rect x="0" y="0" width="880" height="80" rx="10" fill="#141210" stroke="#00d2b5" stroke-width="1.5"/>
        <text x="40" y="46" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="700" fill="#ffffff">novand-tech.com</text>
        <text x="440" y="46" font-family="'JetBrains Mono', monospace" font-size="16" fill="#00d2b5">+98 912 932 1550</text>
        <text x="840" y="46" font-family="'Vazirmatn', sans-serif" font-size="18" font-weight="700" fill="#10b981" text-anchor="end">سعادت‌آباد، تهران</text>
      </g>
    </svg>`
  }
];

brandingUpgrades.forEach(b => {
  const svgPath = path.join(BRANDING_DIR, `${b.name}.svg`);
  const pngPath = path.join(BRANDING_DIR, `${b.name}.png`);
  renderAndSave(b.svg, svgPath, pngPath, 1080);
});

console.log('--- Generating Video Loop / Animated Motion Backdrop ---');

// ==========================================
// 5. VIDEOS & MOTION GRAPHICS (public/videos/)
// ==========================================
const videoLoopSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" fill="none">
  <style>
    @keyframes circuitFlow {
      0% { stroke-dashoffset: 1000; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes beaconBlink {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    .flow-stream-1 {
      stroke: #00d2b5;
      stroke-width: 2.5;
      stroke-dasharray: 40 120;
      animation: circuitFlow 8s linear infinite;
    }
    .flow-stream-2 {
      stroke: #10b981;
      stroke-width: 2.5;
      stroke-dasharray: 60 140;
      animation: circuitFlow 12s linear infinite reverse;
    }
    .beacon-pulse {
      animation: beaconBlink 2.5s ease-in-out infinite;
      transform-origin: center;
    }
  </style>
  <rect width="1920" height="1080" fill="#0d1417"/>
  
  <!-- Subtle Isometric Traces -->
  <g stroke="#141b1f" stroke-width="1.5">
    <path d="M0 270 H1920"/>
    <path d="M0 540 H1920"/>
    <path d="M0 810 H1920"/>
    <path d="M480 0 V1080"/>
    <path d="M960 0 V1080"/>
    <path d="M1440 0 V1080"/>
  </g>

  <!-- Flowing Highway Circuits -->
  <path d="M0 360 L480 360 L720 540 L1200 540 L1440 360 L1920 360" stroke="#1e2c34" stroke-width="4"/>
  <path d="M0 360 L480 360 L720 540 L1200 540 L1440 360 L1920 360" class="flow-stream-1"/>

  <path d="M0 720 L360 720 L600 540 L1320 540 L1560 720 L1920 720" stroke="#1e2c34" stroke-width="4"/>
  <path d="M0 720 L360 720 L600 540 L1320 540 L1560 720 L1920 720" class="flow-stream-2"/>

  <!-- Glowing Strategic Nodes -->
  <circle cx="480" cy="360" r="10" fill="#00d2b5" class="beacon-pulse"/>
  <circle cx="720" cy="540" r="12" fill="#10b981" class="beacon-pulse" style="animation-delay: 1s;"/>
  <circle cx="1200" cy="540" r="12" fill="#00d2b5" class="beacon-pulse" style="animation-delay: 0.5s;"/>
  <circle cx="1440" cy="360" r="10" fill="#10b981" class="beacon-pulse" style="animation-delay: 1.8s;"/>

  <!-- Ambient Novand Watermark -->
  <g transform="translate(860, 480) scale(1.5)" opacity="0.12">
    <path d="M50 18 L22 38 V68 H48" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50 18 L84 42" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
  </g>
</svg>`;

fs.writeFileSync(path.join(VIDEOS_DIR, 'datacenter-circuit-stream.svg'), videoLoopSvg, 'utf-8');
console.log('Saved Video Motion Loop: datacenter-circuit-stream.svg');

console.log('=== All Assets Generated Successfully ===');
