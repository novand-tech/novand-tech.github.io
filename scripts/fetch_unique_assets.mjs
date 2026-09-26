import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { execSync } from 'node:child_process';
import crypto from 'node:crypto';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const PROJECTS_DIR = path.join(IMAGES_DIR, 'projects');
const SERVICES_DIR = path.join(IMAGES_DIR, 'services');
const TECH_DIR = path.join(IMAGES_DIR, 'tech');
const ANIMATIONS_DIR = path.join(PUBLIC_DIR, 'animations');
const VIDEOS_DIR = path.join(PUBLIC_DIR, 'videos');
const TMP_DIR = path.join(ROOT_DIR, '.tmp_asset_downloads');

[IMAGES_DIR, PROJECTS_DIR, SERVICES_DIR, TECH_DIR, ANIMATIONS_DIR, VIDEOS_DIR, TMP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 24 completely unique, verified online engineering photography resources
// Every single image has a distinct, dedicated online source ID.
const assets = [
  // 1. Core images in /public/images/
  {
    dest: path.join(IMAGES_DIR, 'hero-datacenter.jpg'),
    id: 'photo-1558494949-ef010cbdcc31',
    label: 'Modern Enterprise Datacenter with Server Racks & Blue LEDs'
  },
  {
    dest: path.join(IMAGES_DIR, 'network-cabling.jpg'),
    id: 'photo-1544197150-b99a580bb7a8',
    label: 'Structured Cabling & High-Density Ethernet Patch Panels'
  },
  {
    dest: path.join(IMAGES_DIR, 'residential-smart-home.jpg'),
    id: 'photo-1558002038-1055907df827',
    label: 'Smart Building & Automation Lighting Controls'
  },
  {
    dest: path.join(IMAGES_DIR, 'business-office.jpg'),
    id: 'photo-1486406146926-c627a92ad1ab',
    label: 'Modern Corporate Enterprise Glass Skyscraper Architecture'
  },
  {
    dest: path.join(IMAGES_DIR, 'education-campus.jpg'),
    id: 'photo-1562774053-701939374585',
    label: 'University Campus Educational Complex & Smart Classrooms'
  },
  {
    dest: path.join(IMAGES_DIR, 'healthcare-facility.jpg'),
    id: 'photo-1519494026892-80bbd2d6fd0d',
    label: 'Clinical Healthcare Facility & Mission-Critical Operations'
  },
  {
    dest: path.join(IMAGES_DIR, 'security-surveillance.jpg'),
    id: 'photo-1557597774-9d273605dfa9',
    label: 'Outdoor High-Resolution Security Dome Surveillance Camera'
  },
  {
    dest: path.join(IMAGES_DIR, 'specialized-infrastructure.jpg'),
    id: 'photo-1516937941344-00b4e0337589',
    label: 'Industrial Petrochemical Refinery Plant at Twilight'
  },
  {
    dest: path.join(IMAGES_DIR, 'audio-power.jpg'),
    id: 'photo-1473341304170-971dccb5ac1e',
    label: 'High Voltage Power Transmission & Transformer Infrastructure'
  },
  {
    dest: path.join(IMAGES_DIR, 'hardware-maintenance.jpg'),
    id: 'photo-1581091226825-a6a2a5aee158',
    label: 'Hardware Engineering Diagnostic & Repair Workbench'
  },

  // 2. Dedicated project images in /public/images/projects/
  {
    dest: path.join(PROJECTS_DIR, 'tehran-metro-fiber.jpg'),
    id: 'photo-1508739773434-c26b3d09e071',
    label: 'Glowing Optical Fiber Strands for Metro Fiber Backbone'
  },
  {
    dest: path.join(PROJECTS_DIR, 'pars-petro-campus.jpg'),
    id: 'photo-1518709268805-4e9042af9f23',
    label: 'Pars Petrochemical Plant Campus Infrastructure'
  },
  {
    dest: path.join(PROJECTS_DIR, 'aria-datacenter-tier3.jpg'),
    id: 'photo-1629654297299-c8506221ca97',
    label: 'Tier III Enterprise Server Room Containment Corridor'
  },

  // 3. Dedicated service images in /public/images/services/
  {
    dest: path.join(SERVICES_DIR, 'smart-buildings.jpg'),
    id: 'photo-1497366216548-37526070297c',
    label: 'Commercial Smart Building Interior & Automation'
  },
  {
    dest: path.join(SERVICES_DIR, 'network-infrastructure.jpg'),
    id: 'photo-1581092160607-ee22621dd758',
    label: 'Managed Network Switches & Status LEDs'
  },
  {
    dest: path.join(SERVICES_DIR, 'voip-telephony.jpg'),
    id: 'photo-1534536281715-e28d76689b4d',
    label: 'Corporate IP VoIP Desktop Communication Phone'
  },
  {
    dest: path.join(SERVICES_DIR, 'fiber-optics.jpg'),
    id: 'photo-1518770660439-4636190af475',
    label: 'Precision Silicon Microchip & Optical Bus'
  },
  {
    dest: path.join(SERVICES_DIR, 'cctv-security.jpg'),
    id: 'photo-1557804506-669a67965ba0',
    label: 'Security Operations Center Multi-Screen Surveillance Wall'
  },
  {
    dest: path.join(SERVICES_DIR, 'ups-power.jpg'),
    id: 'photo-1581092580497-e0d23cbdf1dc',
    label: 'Industrial Power Switchgear & Automated Battery Cabinet'
  },
  {
    dest: path.join(SERVICES_DIR, 'hardware-maintenance.jpg'),
    id: 'photo-1563770660941-20978e870e26',
    label: 'SMD Circuit Board Soldering & Component Diagnostics'
  },

  // 4. Technical gallery in /public/images/tech/
  {
    dest: path.join(TECH_DIR, 'hardware-lab.jpg'),
    id: 'photo-1550751827-4bd374c3f58b',
    label: 'High-Performance Silicon Computing Processor'
  },
  {
    dest: path.join(TECH_DIR, 'global-telecom-backbone.jpg'),
    id: 'photo-1451187580459-43490279c0fa',
    label: 'Global Telecommunications & Fiber Satellite Network'
  },
  {
    dest: path.join(TECH_DIR, 'fusion-splicer.jpg'),
    id: 'photo-1581092795360-fd1ca04f0952',
    label: 'Precision Optical Fiber Inspection & Alignment'
  },
  {
    dest: path.join(TECH_DIR, 'capacitors-pcb.jpg'),
    id: 'photo-1517420704952-d9f39e95b43e',
    label: 'Industrial Power Supply Capacitors & High Voltage Board'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function processAsset(item, index) {
  const tmpFile = path.join(TMP_DIR, `raw_${index}_${path.basename(item.dest)}`);
  const url = `https://images.unsplash.com/${item.id}?w=1600&h=1067&fit=crop&q=85`;
  
  console.log(`[${index + 1}/${assets.length}] Sourcing: ${item.label}`);
  console.log(`    Source ID: ${item.id} -> ${url}`);

  await downloadFile(url, tmpFile);

  const rawStat = fs.statSync(tmpFile);
  if (rawStat.size < 5000) {
    throw new Error(`Downloaded file too small (${rawStat.size} bytes) for ${item.id}`);
  }

  // Convert & crop to pristine 1200x800 landscape JPEG using ImageMagick
  const convertCmd = `convert "${tmpFile}" -resize 1200x800^ -gravity center -extent 1200x800 -quality 85 "${item.dest}"`;
  execSync(convertCmd, { stdio: 'inherit' });

  const finalStat = fs.statSync(item.dest);
  const hash = crypto.createHash('md5').update(fs.readFileSync(item.dest)).digest('hex');
  console.log(`    ✓ Processed & Stored: ${path.relative(ROOT_DIR, item.dest)} (${Math.round(finalStat.size / 1024)} KB, MD5: ${hash})\n`);

  return { dest: item.dest, hash, size: finalStat.size, id: item.id };
}

function generateMediaVisuals() {
  console.log('Generating animated GIF and video loop with FFmpeg...');

  // 1. Generate an animated GIF: 10-frame telemetry pulse (800x450)
  const gifDest = path.join(ANIMATIONS_DIR, 'telemetry-pulse.gif');
  const gifCmd = `ffmpeg -y -f lavfi -i "color=c=0x090e10:s=800x450:d=2" -vf "drawbox=x=100:y=200:w='mod(t*350,600)':h=12:color=0x00d2b5@0.9:t=fill" -r 15 "${gifDest}"`;
  try {
    execSync(gifCmd, { stdio: 'pipe' });
    console.log(`✓ Generated ${path.relative(ROOT_DIR, gifDest)} (${Math.round(fs.statSync(gifDest).size / 1024)} KB)`);
  } catch (e) {
    console.warn('GIF generation warning:', e.message);
  }

  // 2. Generate a short MP4 video loop: datacenter telemetry video (1280x720)
  const mp4Dest = path.join(VIDEOS_DIR, 'telemetry-loop.mp4');
  const mp4Cmd = `ffmpeg -y -f lavfi -i "color=c=0x0d1417:s=1280x720:d=3" -vf "drawbox=x=200:y=350:w='mod(t*400,880)':h=16:color=0x00d2b5@0.9:t=fill" -c:v libx264 -pix_fmt yuv420p -r 24 "${mp4Dest}"`;
  try {
    execSync(mp4Cmd, { stdio: 'pipe' });
    console.log(`✓ Generated ${path.relative(ROOT_DIR, mp4Dest)} (${Math.round(fs.statSync(mp4Dest).size / 1024)} KB)`);
  } catch (e) {
    console.warn('MP4 generation warning:', e.message);
  }
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`FETCHING ${assets.length} UNIQUE REAL ENGINEERING IMAGES FROM WEB`);
  console.log(`======================================================\n`);

  // Verify all source IDs in the definition are unique
  const sourceIds = new Set();
  for (const item of assets) {
    if (sourceIds.has(item.id)) {
      throw new Error(`CRITICAL CONFIG ERROR: Duplicate source ID found in definition: ${item.id}`);
    }
    sourceIds.add(item.id);
  }
  console.log(`Verified ${sourceIds.size} unique source IDs in specification.\n`);

  const hashes = new Map();
  const results = [];

  for (let i = 0; i < assets.length; i++) {
    const res = await processAsset(assets[i], i);
    if (hashes.has(res.hash)) {
      throw new Error(`CRITICAL DUPLICATE DETECTED: ${res.dest} has same MD5 hash as ${hashes.get(res.hash)}`);
    }
    hashes.set(res.hash, res.dest);
    results.push(res);
  }

  generateMediaVisuals();

  // Cleanup tmp dir
  fs.rmSync(TMP_DIR, { recursive: true, force: true });

  console.log(`\n======================================================`);
  console.log(`VERIFICATION SUMMARY:`);
  console.log(`- Total Images Processed: ${results.length}`);
  console.log(`- Total Unique MD5 Hashes: ${hashes.size}`);
  console.log(`- Zero Duplicates Found! Every image is 100% distinct.`);
  console.log(`======================================================\n`);
}

main().catch(err => {
  console.error('\nFATAL ERROR:', err.message);
  process.exit(1);
});
