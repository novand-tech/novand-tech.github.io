import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const BACKUP_DIR = path.join(IMAGES_DIR, 'legacy-backup');
const PROJECTS_IMG_DIR = path.join(IMAGES_DIR, 'projects');
const SERVICES_IMG_DIR = path.join(IMAGES_DIR, 'services');
const TECH_IMG_DIR = path.join(IMAGES_DIR, 'tech');
const DIAGRAMS_DIR = path.join(IMAGES_DIR, 'diagrams');

[IMAGES_DIR, BACKUP_DIR, PROJECTS_IMG_DIR, SERVICES_IMG_DIR, TECH_IMG_DIR, DIAGRAMS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. Backup legacy images if not already backed up
const legacyFiles = [
  'audio-power.jpg',
  'business-office.jpg',
  'education-campus.jpg',
  'hardware-maintenance.jpg',
  'healthcare-facility.jpg',
  'hero-datacenter.jpg',
  'network-cabling.jpg',
  'residential-smart-home.jpg',
  'security-surveillance.jpg',
  'specialized-infrastructure.jpg',
];

for (const file of legacyFiles) {
  const src = path.join(IMAGES_DIR, file);
  const dst = path.join(BACKUP_DIR, file);
  if (fs.existsSync(src) && !fs.existsSync(dst)) {
    fs.copyFileSync(src, dst);
    console.log(`Backed up ${file} -> legacy-backup/`);
  }
}

// 2. Curated Unsplash photo mapping (1200x800 landscape high-res)
const downloads = [
  // Core upgraded images in /public/images/
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'hero-datacenter.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'network-cabling.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'residential-smart-home.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'business-office.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'education-campus.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'healthcare-facility.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'security-surveillance.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'specialized-infrastructure.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'audio-power.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(IMAGES_DIR, 'hardware-maintenance.jpg')
  },

  // Dedicated project images in /public/images/projects/
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(PROJECTS_IMG_DIR, 'tehran-metro-fiber.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(PROJECTS_IMG_DIR, 'pars-petro-campus.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(PROJECTS_IMG_DIR, 'aria-datacenter-tier3.jpg')
  },

  // Dedicated service images in /public/images/services/
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'smart-buildings.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'network-infrastructure.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'voip-telephony.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'fiber-optics.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'cctv-security.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'ups-power.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(SERVICES_IMG_DIR, 'hardware-maintenance.jpg')
  },

  // Technical gallery visual images in /public/images/tech/
  {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(TECH_IMG_DIR, 'hardware-lab.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=800&q=85',
    dest: path.join(TECH_IMG_DIR, 'global-telecom-backbone.jpg')
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// 3. Vector technical diagrams
function generateDiagrams() {
  const enterpriseTopologySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090e10" />
      <stop offset="100%" stop-color="#0d1417" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141b1f" />
      <stop offset="100%" stop-color="#0f1619" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="800" fill="url(#bg)" />

  <!-- Grid lines -->
  <g stroke="#1a2327" stroke-width="1" opacity="0.6">
    <line x1="100" y1="0" x2="100" y2="800" />
    <line x1="300" y1="0" x2="300" y2="800" />
    <line x1="600" y1="0" x2="600" y2="800" />
    <line x1="900" y1="0" x2="900" y2="800" />
    <line x1="1100" y1="0" x2="1100" y2="800" />
    <line x1="0" y1="150" x2="1200" y2="150" />
    <line x1="0" y1="400" x2="1200" y2="400" />
    <line x1="0" y1="650" x2="1200" y2="650" />
  </g>

  <!-- Header -->
  <text x="600" y="70" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="14" letter-spacing="4">NOVAND ARCHITECTURAL TOPOLOGY · توپولوژی معماری نُوَند</text>
  <text x="600" y="110" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">Enterprise High-Availability Network Architecture</text>

  <!-- Connection Links -->
  <path d="M 600 230 L 350 360" stroke="#00d2b5" stroke-width="3" stroke-dasharray="8,6" opacity="0.8" />
  <path d="M 600 230 L 850 360" stroke="#00d2b5" stroke-width="3" stroke-dasharray="8,6" opacity="0.8" />
  <path d="M 350 440 L 220 580" stroke="#00f2fe" stroke-width="2" opacity="0.7" />
  <path d="M 350 440 L 480 580" stroke="#00f2fe" stroke-width="2" opacity="0.7" />
  <path d="M 850 440 L 720 580" stroke="#00f2fe" stroke-width="2" opacity="0.7" />
  <path d="M 850 440 L 980 580" stroke="#00f2fe" stroke-width="2" opacity="0.7" />
  <path d="M 350 400 L 850 400" stroke="#00d2b5" stroke-width="4" filter="url(#glow)" />

  <!-- Core Layer Node -->
  <rect x="460" y="170" width="280" height="90" rx="8" fill="url(#cardGrad)" stroke="#00d2b5" stroke-width="2" filter="url(#glow)" />
  <text x="600" y="205" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="12" letter-spacing="2">CORE ROUTING LAYER</text>
  <text x="600" y="235" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="bold">Cisco ASR 9000 &amp; BGP Border</text>

  <!-- Distribution Nodes -->
  <rect x="210" y="360" width="280" height="85" rx="8" fill="url(#cardGrad)" stroke="#00f2fe" stroke-width="2" />
  <text x="350" y="395" text-anchor="middle" fill="#00f2fe" font-family="monospace" font-size="12">AGGREGATION 01 (PRIMARY)</text>
  <text x="350" y="423" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="15" font-weight="600">Catalyst 9500 40G Stack</text>

  <rect x="710" y="360" width="280" height="85" rx="8" fill="url(#cardGrad)" stroke="#00f2fe" stroke-width="2" />
  <text x="850" y="395" text-anchor="middle" fill="#00f2fe" font-family="monospace" font-size="12">AGGREGATION 02 (HOT STANDBY)</text>
  <text x="850" y="423" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="15" font-weight="600">Catalyst 9500 VRRP Redundant</text>

  <!-- Edge Access Nodes -->
  <rect x="120" y="580" width="200" height="80" rx="6" fill="url(#cardGrad)" stroke="#1a2327" stroke-width="2" />
  <text x="220" y="612" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="11">ACCESS POE+ GIGABIT</text>
  <text x="220" y="638" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="13">VoIP &amp; WiFi 6 APs</text>

  <rect x="380" y="580" width="200" height="80" rx="6" fill="url(#cardGrad)" stroke="#1a2327" stroke-width="2" />
  <text x="480" y="612" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="11">SECURITY ENCLAVE</text>
  <text x="480" y="638" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="13">4K CCTV NVR SAN</text>

  <rect x="620" y="580" width="200" height="80" rx="6" fill="url(#cardGrad)" stroke="#1a2327" stroke-width="2" />
  <text x="720" y="612" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="11">SERVER FARM</text>
  <text x="720" y="638" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="13">Proxmox VE &amp; TrueNAS</text>

  <rect x="880" y="580" width="200" height="80" rx="6" fill="url(#cardGrad)" stroke="#1a2327" stroke-width="2" />
  <text x="980" y="612" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="11">BUILDING AUTOMATION</text>
  <text x="980" y="638" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="13">KNX / BACnet Gateway</text>

  <!-- Legend & Specs Footer -->
  <rect x="120" y="710" width="960" height="50" rx="4" fill="#090e10" stroke="#1a2327" />
  <text x="140" y="740" fill="#00d2b5" font-family="monospace" font-size="12">PROTOCOL SPEC:</text>
  <text x="260" y="740" fill="#f4f2f1" font-family="monospace" font-size="12">802.1Q VLAN Trunking · LACP 802.3ad · OSPF Multi-Area · 10G OM4 &amp; OS2 Fiber Backbone</text>
</svg>`;

  const ftthGponSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090e10" />
      <stop offset="100%" stop-color="#0d1417" />
    </linearGradient>
    <linearGradient id="fiberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d2b5" />
      <stop offset="50%" stop-color="#00f2fe" />
      <stop offset="100%" stop-color="#00a389" />
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg2)" />

  <text x="600" y="70" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="14" letter-spacing="4">NOVAND FTTH INFRASTRUCTURE · زیرساخت فیبر نوری نُوَند</text>
  <text x="600" y="110" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">GPON / XGS-PON Optical Distribution Network</text>

  <!-- OLT Node -->
  <rect x="80" y="260" width="220" height="240" rx="8" fill="#141b1f" stroke="#00d2b5" stroke-width="2" />
  <text x="190" y="300" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="14" font-weight="bold">CENTRAL OLT</text>
  <text x="190" y="325" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="13">Optical Line Terminal</text>
  <text x="190" y="360" text-anchor="middle" fill="#a0aec0" font-family="monospace" font-size="11">10G XGS-PON Ports</text>
  <text x="190" y="385" text-anchor="middle" fill="#a0aec0" font-family="monospace" font-size="11">Dual 48V DC Power</text>
  <text x="190" y="440" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="11">SFP+ C++ Transceivers</text>

  <!-- Fiber Trunk -->
  <path d="M 300 380 L 480 380" stroke="url(#fiberGrad)" stroke-width="6" />
  <text x="390" y="365" text-anchor="middle" fill="#00f2fe" font-family="monospace" font-size="11">OS2 Feeder Fiber</text>

  <!-- Splitter 1:8 -->
  <polygon points="480,310 580,380 480,450" fill="#141b1f" stroke="#00f2fe" stroke-width="2" />
  <text x="515" y="385" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">1:8</text>
  <text x="515" y="405" text-anchor="middle" fill="#00f2fe" font-family="monospace" font-size="10">SPLITTER</text>

  <!-- Distribution Lines -->
  <path d="M 580 380 L 740 240" stroke="#00d2b5" stroke-width="2" />
  <path d="M 580 380 L 740 330" stroke="#00d2b5" stroke-width="2" />
  <path d="M 580 380 L 740 430" stroke="#00d2b5" stroke-width="2" />
  <path d="M 580 380 L 740 520" stroke="#00d2b5" stroke-width="2" />

  <!-- FAT / FDB Box -->
  <rect x="740" y="190" width="180" height="90" rx="6" fill="#141b1f" stroke="#1a2327" stroke-width="2" />
  <text x="830" y="225" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="12">FAT-01 (Building A)</text>
  <text x="830" y="250" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="12">Drop Cable to ONT</text>

  <rect x="740" y="300" width="180" height="90" rx="6" fill="#141b1f" stroke="#1a2327" stroke-width="2" />
  <text x="830" y="335" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="12">FAT-02 (Building B)</text>
  <text x="830" y="360" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="12">Drop Cable to ONT</text>

  <rect x="740" y="410" width="180" height="90" rx="6" fill="#141b1f" stroke="#1a2327" stroke-width="2" />
  <text x="830" y="445" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="12">FAT-03 (Building C)</text>
  <text x="830" y="470" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="12">Drop Cable to ONT</text>

  <rect x="740" y="520" width="180" height="90" rx="6" fill="#141b1f" stroke="#1a2327" stroke-width="2" />
  <text x="830" y="555" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="12">FAT-04 (Executive)</text>
  <text x="830" y="580" text-anchor="middle" fill="#f4f2f1" font-family="sans-serif" font-size="12">Dedicated Dark Fiber</text>

  <!-- End Subscriber ONT -->
  <rect x="990" y="330" width="140" height="120" rx="6" fill="#141b1f" stroke="#00d2b5" stroke-width="2" />
  <text x="1060" y="365" text-anchor="middle" fill="#00d2b5" font-family="monospace" font-size="13" font-weight="bold">Wi-Fi 6 ONT</text>
  <text x="1060" y="390" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11">Gigabit Subscriber</text>
  <text x="1060" y="415" text-anchor="middle" fill="#00f2fe" font-family="monospace" font-size="10">VoIP + IPTV Ready</text>
  <path d="M 920 345 L 990 390" stroke="#00d2b5" stroke-width="2" stroke-dasharray="4,3" />

  <!-- Specs banner -->
  <rect x="80" y="670" width="1050" height="60" rx="4" fill="#090e10" stroke="#1a2327" />
  <text x="100" y="705" fill="#00d2b5" font-family="monospace" font-size="12">FTTH STANDARDS:</text>
  <text x="250" y="705" fill="#f4f2f1" font-family="monospace" font-size="12">ITU-T G.984 GPON · ITU-T G.9807.1 XGS-PON · SC/APC Low Reflection Connectors · OTDR Calibrated</text>
</svg>`;

  fs.writeFileSync(path.join(DIAGRAMS_DIR, 'enterprise-topology.svg'), enterpriseTopologySvg);
  fs.writeFileSync(path.join(DIAGRAMS_DIR, 'ftth-gpon-architecture.svg'), ftthGponSvg);
  console.log('Generated architectural diagrams in public/images/diagrams/');
}

async function main() {
  console.log(`Starting asset download and upgrade (${downloads.length} image targets)...`);
  generateDiagrams();

  for (const item of downloads) {
    try {
      console.log(`Downloading ${path.basename(item.dest)}...`);
      await downloadFile(item.url, item.dest);
      const stat = fs.statSync(item.dest);
      console.log(`✓ Saved ${path.basename(item.dest)} (${Math.round(stat.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.url}:`, err.message);
    }
  }

  console.log('All image assets successfully upgraded!');
}

main();
